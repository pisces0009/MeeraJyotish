import * as fs from 'fs';
import * as path from 'path';

describe('Screenshot Task', () => {
    it('should navigate to the URL, click element and download the image', async () => {
        await browser.url('https://dinank.datepanchang.com/');
        // Wait for page to fully load
        await browser.pause(3000);

        // Click the target button
        const button = await $('//*[@id="main-root"]/div[1]/div[2]/div/div[2]/div/div/div[4]/button');
        await button.waitForDisplayed({ timeout: 5000 });
        await button.click();

        // Wait for any UI change after click
        await browser.pause(2000);

        // Get the image src
        const element = await $('//*[@id="main-root"]/div[1]/div[2]/div/div[1]/img');
        await element.waitForDisplayed({ timeout: 5000 });
        const imgSrc = await element.getAttribute('src');
        console.log('Image URL:', imgSrc);

        // Convert blob URL to base64 inside the browser and return it
        const base64Data = await browser.execute(async (blobUrl: string) => {
            const response = await fetch(blobUrl);
            const blob = await response.blob();
            return new Promise<string>((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    const result = reader.result as string;
                    // Strip the data:image/...;base64, prefix
                    resolve(result.split(',')[1]);
                };
                reader.readAsDataURL(blob);
            });
        }, imgSrc);

        // Save base64 as image file
        const savePath = path.resolve('./images/Vivaran.png');
        fs.writeFileSync(savePath, Buffer.from(base64Data, 'base64'));
        console.log('Image downloaded to ./images/Vivaran.png');
    });
});