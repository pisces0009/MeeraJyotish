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
            const labelWord = words.find(word => word.text.replace(/[^\p{L}\p{M}]/gu, '') === label);
            assert.ok(labelWord, `Could not find the ${label} label in Panchang image OCR:\n${data.text}`);

            const { bbox } = labelWord;
            const rowHeight = bbox.y1 - bbox.y0;
            const row = await worker.recognize(image, {
                rectangle: {
                    left: bbox.x1 + 10,
                    top: Math.max(0, bbox.y0 - 15),
                    width: 520,
                    height: rowHeight + 30
                }
            });
            values[key] = cleanRowValue(row.data.text);
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