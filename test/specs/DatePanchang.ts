import { browser, $ } from '@wdio/globals';
import { createWorker } from 'tesseract.js';
import { strict as assert } from 'node:assert';
import * as fs from 'node:fs';
import * as path from 'node:path';

const timeZone = 'Asia/Kolkata';
const vivaranFilePath = path.resolve(process.cwd(), 'DateVivaran.json');

function getIndianDate(now: Date): {
    day: string;
    month: string;
    monthIndex: number;
    year: string;
    weekday: string;
} {
    const parts = new Intl.DateTimeFormat('en', {
        timeZone,
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        weekday: 'long'
    }).formatToParts(now);
    const getPart = (type: Intl.DateTimeFormatPartTypes): string => {
        const value = parts.find(part => part.type === type)?.value;
        assert.ok(value, `Missing ${type} in India-time date`);
        return value;
    };

    return {
        day: getPart('day'),
        month: getPart('month'),
        monthIndex: Number(new Intl.DateTimeFormat('en', {
            timeZone,
            month: 'numeric'
        }).format(now)) - 1,
        year: getPart('year'),
        weekday: getPart('weekday')
    };
}

async function extractVivaran(image: Buffer): Promise<string> {
    const worker = await createWorker('hin+eng');
    try {
        const { data } = await worker.recognize(image);
        const lines = data.text.split(/\r?\n/).map(line => line.trim()).filter(Boolean);
        const vivaranLineIndex = lines.findIndex(line => line.includes('विवरण'));
        assert.notEqual(
            vivaranLineIndex,
            -1,
            `Could not find the Vivaran label in Panchang image OCR:\n${data.text}`
        );

        const vivaranOnLabelLine = lines[vivaranLineIndex]
            .slice(lines[vivaranLineIndex].indexOf('विवरण') + 'विवरण'.length)
            .replace(/^[\s:：|.-]+/, '')
            .trim();
        const vivaran = vivaranOnLabelLine || lines[vivaranLineIndex + 1];
        assert.ok(vivaran, `Could not read the Vivaran value from Panchang image OCR:\n${data.text}`);
        return Array.from(vivaran)
            .filter(character => /\s/u.test(character) || (
                /\p{Script=Devanagari}/u.test(character)
                && /[\p{L}\p{M}\p{N}]/u.test(character)
            ))
            .join('')
            .replace(/\s+/g, ' ')
            .trim();
    } finally {
        await worker.terminate();
    }
}

const rowLabels = {
    rashi: 'चंद्रराशि',
    rahuKaal: 'राहुकाल',
    yoga: 'योग',
    karan: 'करण'
} as const;

// Keeps only Devanagari words (letters, digits, marks); OCR noise from the background is dropped.
function cleanRowValue(text: string): string {
    return text
        .split(/\s+/)
        .map(token => Array.from(token)
            .filter(character => /\p{Script=Devanagari}/u.test(character) || /[:.]/.test(character))
            .join(''))
        .filter(token => /\p{Script=Devanagari}/u.test(token))
        .join(' ')
        .trim();
}

const devanagariDigits = '०१२३४५६७८९';

// Rahu Kaal is always about 1.5 hours long, which lets us reject OCR digit mistakes like २५:२७.
function isPlausibleRahuKaal(value: string): boolean {
    const times = Array.from(value.matchAll(/([०-९]{2}):([०-९]{2})/g)).map(match => {
        const toNumber = (digits: string) => Number(Array.from(digits).map(digit => devanagariDigits.indexOf(digit)).join(''));
        return toNumber(match[1]) * 60 + toNumber(match[2]);
    });
    if (times.length !== 2) {
        return false;
    }
    const minutes = times[1] - times[0];
    return minutes >= 60 && minutes <= 120;
}

// The whole-image line read and the row-crop read each make different mistakes, so pick the better one.
function pickRowValue(key: keyof typeof rowLabels, lineValue: string, cropValue: string): string {
    // Yoga and Karan are a name followed by a time; anything after the time is background noise.
    const trimAfterTime = (value: string): string => {
        const tokens = value.split(' ');
        const timeIndex = tokens.findIndex(token => /[०-९]{2}:[०-९]{2}/.test(token));
        return timeIndex === -1 || key === 'rahuKaal' || key === 'rashi' ? value : tokens.slice(0, timeIndex + 1).join(' ');
    };
    const candidates = [lineValue, cropValue].filter(Boolean).map(trimAfterTime);
    if (key === 'rahuKaal') {
        const plausible = candidates.find(isPlausibleRahuKaal);
        assert.ok(plausible, `Could not read a valid Rahu Kaal time (got: ${candidates.join(' / ')})`);
        return plausible;
    }
    const wordCount = (value: string) => value.split(' ').length;
    return candidates.sort((a, b) => wordCount(b) - wordCount(a))[0] ?? '';
}

// Finds each row label, then reads only the value area to its right so the artwork doesn't confuse OCR.
async function extractRowValues(image: Buffer): Promise<Record<keyof typeof rowLabels, string>> {
    const worker = await createWorker('hin+eng');
    try {
        const { data } = await worker.recognize(image, {}, { blocks: true });
        const words = (data.blocks ?? [])
            .flatMap(block => block.paragraphs)
            .flatMap(paragraph => paragraph.lines)
            .flatMap(line => line.words);

        await worker.setParameters({ tessedit_pageseg_mode: '7' as never });

        const values = {} as Record<keyof typeof rowLabels, string>;
        for (const [key, label] of Object.entries(rowLabels) as [keyof typeof rowLabels, string][]) {
            // OCR often adds stray vowel marks (e.g. चंद्रराशिं), so compare base letters only.
            const baseLetters = (text: string) => text.replace(/[^\p{L}]/gu, '');
            const findLabelWord = (rowLabel: string) => {
                const expected = baseLetters(rowLabel);
                const expectedLetters = Array.from(expected);
                const exactMatch = words.find(word => baseLetters(word.text) === expected);
                if (exactMatch || expected.length < 6) {
                    return exactMatch;
                }

                return words.find(word => {
                    const actualLetters = Array.from(baseLetters(word.text));
                    return actualLetters.length === expectedLetters.length
                        && actualLetters.filter((letter, index) => letter !== expectedLetters[index]).length <= 1;
                });
            };
            const labelWord = findLabelWord(label);
            let bbox = labelWord?.bbox;
            if (!bbox && key === 'yoga') {
                const nakshatraWord = findLabelWord('नक्षत्र');
                const karanWord = findLabelWord(rowLabels.karan);
                assert.ok(nakshatraWord && karanWord, `Could not locate Yoga row in Panchang image OCR:\n${data.text}`);

                const rowHeight = Math.min(
                    nakshatraWord.bbox.y1 - nakshatraWord.bbox.y0,
                    karanWord.bbox.y1 - karanWord.bbox.y0
                );
                const rowCenter = (
                    (nakshatraWord.bbox.y0 + nakshatraWord.bbox.y1)
                    + (karanWord.bbox.y0 + karanWord.bbox.y1)
                ) / 2;
                bbox = {
                    x0: Math.min(nakshatraWord.bbox.x0, karanWord.bbox.x0),
                    x1: Math.max(nakshatraWord.bbox.x1, karanWord.bbox.x1),
                    y0: rowCenter - rowHeight / 2,
                    y1: rowCenter + rowHeight / 2
                };
            }
            assert.ok(bbox, `Could not find the ${label} label in Panchang image OCR:\n${data.text}`);

            const rowHeight = bbox.y1 - bbox.y0;
            const rowBounds = bbox;
            const lineValue = cleanRowValue(
                words
                    .filter(word => {
                        const centerY = (word.bbox.y0 + word.bbox.y1) / 2;
                        return word.bbox.x0 >= rowBounds.x1 - 5 && centerY >= rowBounds.y0 && centerY <= rowBounds.y1;
                    })
                    .sort((a, b) => a.bbox.x0 - b.bbox.x0)
                    .map(word => word.text)
                    .join(' ')
            );
            const row = await worker.recognize(image, {
                rectangle: {
                    left: bbox.x1 + 10,
                    top: Math.max(0, bbox.y0 - 15),
                    width: 520,
                    height: rowHeight + 30
                }
            });
            const cropValue = cleanRowValue(row.data.text);
            values[key] = pickRowValue(key, lineValue, cropValue);
            assert.ok(values[key], `Could not read the ${label} value from Panchang image OCR:\n${row.data.text}`);
        }
        return values;
    } finally {
        await worker.terminate();
    }
}

describe('Date Panchang in Mumbai time', () => {
    it('updates the current India date, weekday, and Vivaran', async () => {
        const now = new Date();
        const expectedDate = getIndianDate(now);
        const expectedHeading = `${expectedDate.day} ${expectedDate.month} ${expectedDate.year}`;
        const dateAtUtc = new Date(Date.UTC(
            Number(expectedDate.year),
            expectedDate.monthIndex,
            Number(expectedDate.day)
        ));
        const weekdayForDate = new Intl.DateTimeFormat('en', {
            timeZone: 'UTC',
            weekday: 'long'
        }).format(dateAtUtc);

        assert.equal(weekdayForDate, expectedDate.weekday);

        await browser.url('https://dinank.datepanchang.com/');

        const dateHeading = await $('h6[class*="MuiTypography-h6-"]');
        await dateHeading.waitForDisplayed();
        const panchangImage = await $('img[alt="Panchang/Dinavishesha"]');
        await panchangImage.waitForDisplayed();
        const previousImageSource = await panchangImage.getAttribute('src');
        const currentHeading = (await dateHeading.getText()).trim();
        const shouldAdvance = currentHeading !== expectedHeading;

        if (shouldAdvance) {
            const nextDayButton = await $('button:has(svg path[d^="M10 6L8.59"])');
            await nextDayButton.waitForClickable();
            await nextDayButton.click();
        }

        await browser.waitUntil(
            async () => (await dateHeading.getText()).trim() === expectedHeading,
            {
                timeout: 15000,
                timeoutMsg: `Date Panchang did not advance to ${expectedHeading} in ${timeZone}`
            }
        );

        assert.equal((await dateHeading.getText()).trim(), expectedHeading);

        await browser.waitUntil(
            async () => {
                const currentImageSource = await panchangImage.getAttribute('src');
                const isLoaded = await browser.execute(() => {
                    const image = document.querySelector<HTMLImageElement>(
                        'img[alt="Panchang/Dinavishesha"]'
                    );
                    return Boolean(image?.complete && image.naturalWidth > 0);
                });
                const isSourceReady = Boolean(currentImageSource) && (!shouldAdvance || currentImageSource !== previousImageSource);
                return isSourceReady && isLoaded;
            },
            {
                timeout: 15000,
                timeoutMsg: `Panchang image did not update for ${expectedHeading}`
            }
        );

        const imageSource = await panchangImage.getAttribute('src');
        assert.ok(imageSource, 'Panchang image source is missing');
        const imageBase64 = await browser.execute(async (blobUrl: string) => {
            const response = await fetch(blobUrl);
            if (!response.ok) {
                throw new Error(`Could not read Panchang image: ${response.status}`);
            }
            const blob = await response.blob();
            return new Promise<string>((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => {
                    if (typeof reader.result !== 'string') {
                        reject(new Error('Could not encode Panchang image'));
                        return;
                    }
                    resolve(reader.result.split(',')[1]);
                };
                reader.onerror = () => reject(reader.error ?? new Error('Could not read Panchang image'));
                reader.readAsDataURL(blob);
            });
        }, imageSource);
        const imageBuffer = Buffer.from(imageBase64, 'base64');
        const vivaran = await extractVivaran(imageBuffer);
        const rowValues = await extractRowValues(imageBuffer);

        fs.writeFileSync(
            vivaranFilePath,
            `${JSON.stringify({ vivaran, ...rowValues }, null, 2)}\n`,
            'utf8'
        );
        console.log(`Updated ${vivaranFilePath} for ${expectedHeading}: ${JSON.stringify({ vivaran, ...rowValues })}`);
    });
});