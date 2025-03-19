import rashiBhavishya from "../pageobjects/rashiBhavishya";
import * as fs from 'fs';

describe('get all rashi bhavishya', () => {
    before(async () => {
        await browser.url('https://www.drikpanchang.com/astrology/prediction/mesha-rashi/mesha-rashi-daily-rashiphal.html?lang=mr&ck=1')
        await browser.pause(500)
    })

    it('should get all rashi daily details', async () => {
        const rashiName = await rashiBhavishya.rashiName.getText();
        console.log(rashiName);
        const rashiFal = await rashiBhavishya.rashiFal.getText();
        console.log(rashiFal);

        await browser.url('https://www.drikpanchang.com/astrology/prediction/vrishabha-rashi/vrishabha-rashi-daily-rashiphal.html?lang=mr&ck=1')
        await browser.pause(200)
        const vrishabhaRashiName = await rashiBhavishya.rashiName.getText();
        const vrishabhaRashiFal = await rashiBhavishya.rashiFal.getText();

        //mithun rashi
        await browser.url('https://www.drikpanchang.com/astrology/prediction/mithuna-rashi/mithuna-rashi-daily-rashiphal.html?lang=mr&ck=1')
        await browser.pause(200)
        const mithunaRashiName = await rashiBhavishya.rashiName.getText();
        const mithunaRashiFal = await rashiBhavishya.rashiFal.getText();

        //karka rashi
        await browser.url('https://www.drikpanchang.com/astrology/prediction/karka-rashi/karka-rashi-daily-rashiphal.html?lang=mr&ck=1')
        await browser.pause(200)
        const karkaRashiName = await rashiBhavishya.rashiName.getText();
        const karkaRashiFal = await rashiBhavishya.rashiFal.getText();

        //simha rashi
        await browser.url('https://www.drikpanchang.com/astrology/prediction/simha-rashi/simha-rashi-daily-rashiphal.html?lang=mr&ck=1')
        await browser.pause(200)
        const simhaRashiName = await rashiBhavishya.rashiName.getText();
        const simhaRashiFal = await rashiBhavishya.rashiFal.getText();

        //kanaya rashi
        await browser.url('https://www.drikpanchang.com/astrology/prediction/kanya-rashi/kanya-rashi-daily-rashiphal.html?lang=mr&ck=1')
        await browser.pause(200)
        const kanyaRashiName = await rashiBhavishya.rashiName.getText();
        const kanyaRashiFal = await rashiBhavishya.rashiFal.getText();

        //tula rashi
        await browser.url('https://www.drikpanchang.com/astrology/prediction/tula-rashi/tula-rashi-daily-rashiphal.html?lang=mr&ck=1')
        await browser.pause(200)
        const tulaRashiName = await rashiBhavishya.rashiName.getText();
        const tulaRashiFal = await rashiBhavishya.rashiFal.getText();

        //vrishchika rashi
        await browser.url('https://www.drikpanchang.com/astrology/prediction/vrishchika-rashi/vrishchika-rashi-daily-rashiphal.html?lang=mr&ck=1')
        await browser.pause(200)
        const vrishchikaRashiName = await rashiBhavishya.rashiName.getText();
        const vrishchikaRashiFal = await rashiBhavishya.rashiFal.getText();

        //dhanu rashi
        await browser.url('https://www.drikpanchang.com/astrology/prediction/dhanu-rashi/dhanu-rashi-daily-rashiphal.html?lang=mr&ck=1')
        await browser.pause(200)
        const dhanuRashiName = await rashiBhavishya.rashiName.getText();
        const dhanuRashiFal = await rashiBhavishya.rashiFal.getText();

        //makar rashi
        await browser.url('https://www.drikpanchang.com/astrology/prediction/makara-rashi/makara-rashi-daily-rashiphal.html?lang=mr&ck=1')
        await browser.pause(200)
        const makarRashiName = await rashiBhavishya.rashiName.getText();
        const makarRashiFal = await rashiBhavishya.rashiFal.getText();

        //kumbha rashi
        await browser.url('https://www.drikpanchang.com/astrology/prediction/kumbha-rashi/kumbha-rashi-daily-rashiphal.html?lang=mr&ck=1')
        await browser.pause(200)
        const kumbhaRashiName = await rashiBhavishya.rashiName.getText();       
        const kumbhaRashiFal = await rashiBhavishya.rashiFal.getText();

        //meen rashi
        await browser.url('https://www.drikpanchang.com/astrology/prediction/meena-rashi/meena-rashi-daily-rashiphal.html?lang=mr&ck=1')
        await browser.pause(200)    
        const meenRashiName = await rashiBhavishya.rashiName.getText();
        const meenRashiFal = await rashiBhavishya.rashiFal.getText();
        // Generate HTML content
        const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Rashi Bhavishya</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    text-align: center;
                    padding: 20px;
                }
                .rashi-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                .rashi-detail {
                    margin: 10px 0;
                    font-size: 1.5em;
                }
                h1 {
                    font-size: 2em;
                }
                .rashi-icon {
                    width: 100px;
                    height: 100px;
                    object-fit: cover;
                    margin-bottom: 20px;
                }
            </style>
        </head>
        <body>
            <h1>राशि भविष्य</h1>
            <img src="./images/rashiIcons/mesh.jpg" alt="Rashi Icon" class="rashi-icon">
            <div class="rashi-container">
                <div class="rashi-detail"><strong>${rashiName}</strong></div>
                <div class="rashi-detail"><strong>राशिफळ: </strong>${rashiFal}</div>
            </div>

            <img src="./images/rashiIcons/vrishabha.jpg" alt="Rashi Icon" class="rashi-icon">
            <div class="rashi-container">
                <div class="rashi-detail"><strong>${vrishabhaRashiName}</strong></div>
                <div class="rashi-detail"><strong>राशिफळ: </strong>${vrishabhaRashiFal}</div>
            </div>

            <img src="./images/rashiIcons/mithun.jpg" alt="Rashi Icon" class="rashi-icon">
            <div class="rashi-container">
                <div class="rashi-detail"><strong>${mithunaRashiName}</strong></div>
                <div class="rashi-detail"><strong>राशिफळ: </strong>${mithunaRashiFal}</div>
            </div>

            <img src="./images/rashiIcons/kark.jpg" alt="Rashi Icon" class="rashi-icon">
            <div class="rashi-container">
                <div class="rashi-detail"><strong>${karkaRashiName}</strong></div>
                <div class="rashi-detail"><strong>राशिफळ: </strong>${karkaRashiFal}</div>
            </div>

            <img src="./images/rashiIcons/singh.jpg" alt="Rashi Icon" class="rashi-icon">
            <div class="rashi-container">
                <div class="rashi-detail"><strong>${simhaRashiName}</strong></div>
                <div class="rashi-detail"><strong>राशिफळ: </strong>${simhaRashiFal}</div>
            </div>

            <img src="./images/rashiIcons/kanya.jpg" alt="Rashi Icon" class="rashi-icon">
            <div class="rashi-container">
                <div class="rashi-detail"><strong>${kanyaRashiName}</strong></div>
                <div class="rashi-detail"><strong>राशिफळ: </strong>${kanyaRashiFal}</div>
            </div>

            <img src="./images/rashiIcons/tula.jpg" alt="Rashi Icon" class="rashi-icon">
            <div class="rashi-container">
                <div class="rashi-detail"><strong>${tulaRashiName}</strong></div>
                <div class="rashi-detail"><strong>राशिफळ: </strong>${tulaRashiFal}</div>
            </div>

            <img src="./images/rashiIcons/vrishchik.jpg" alt="Rashi Icon" class="rashi-icon">
            <div class="rashi-container">
                <div class="rashi-detail"><strong>${vrishchikaRashiName}</strong></div>
                <div class="rashi-detail"><strong>राशिफळ: </strong>${vrishchikaRashiFal}</div>
            </div>

            <img src="./images/rashiIcons/dhanu.jpg" alt="Rashi Icon" class="rashi-icon">
            <div class="rashi-container">
                <div class="rashi-detail"><strong>${dhanuRashiName}</strong></div>
                <div class="rashi-detail"><strong>राशिफळ: </strong>${dhanuRashiFal}</div>
            </div>

            <img src="./images/rashiIcons/makar.jpg" alt="Rashi Icon" class="rashi-icon">
            <div class="rashi-container">
                <div class="rashi-detail"><strong>${makarRashiName}</strong></div>
                <div class="rashi-detail"><strong>राशिफळ: </strong>${makarRashiFal}</div>
            </div>

            <img src="./images/rashiIcons/kumbha.jpg" alt="Rashi Icon" class="rashi-icon">
            <div class="rashi-container">
                <div class="rashi-detail"><strong>${kumbhaRashiName}</strong></div>
                <div class="rashi-detail"><strong>राशिफळ: </strong>${kumbhaRashiFal}</div>
            </div>

            <img src="./images/rashiIcons/meen.jpg" alt="Rashi Icon" class="rashi-icon">                    
            <div class="rashi-container">
                <div class="rashi-detail"><strong>${meenRashiName}</strong></div>
                <div class="rashi-detail"><strong>राशिफळ: </strong>${meenRashiFal}</div>
            </div>
        </body>
        </html>
        `;

        // Write the HTML content to a file
        fs.writeFileSync('RashiBhavishya.html', htmlContent);

        console.log('HTML file generated successfully.');
    });
});