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
        return vivaran;
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
        const nextDayButton = await $('button:has(svg path[d^="M10 6L8.59"])');
        await nextDayButton.waitForClickable();
        await nextDayButton.click();

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
                return currentImageSource !== previousImageSource && isLoaded;
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
        const vivaran = await extractVivaran(Buffer.from(imageBase64, 'base64'));

        fs.writeFileSync(
            vivaranFilePath,
            `${JSON.stringify({ vivaran }, null, 2)}\n`,
            'utf8'
        );
        console.log(`Updated ${vivaranFilePath} for ${expectedHeading}: ${vivaran}`);
    });
});