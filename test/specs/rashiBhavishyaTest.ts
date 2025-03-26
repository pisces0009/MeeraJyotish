import rashiBhavishya from "../pageobjects/rashiBhavishya";
import * as fs from 'fs';

let rashiName: string;
let rashiFal: string;
let vrishabhaRashiName: string;
let vrishabhaRashiFal: string;
let mithunaRashiName: string;
let mithunaRashiFal: string;
let karkaRashiName: string;
let karkaRashiFal: string;
let simhaRashiName: string;
let simhaRashiFal: string;
let kanyaRashiName: string;
let kanyaRashiFal: string;
let tulaRashiName: string;
let tulaRashiFal: string;
let vrishchikaRashiName: string;
let vrishchikaRashiFal: string;
let dhanuRashiName: string;
let dhanuRashiFal: string;
let makarRashiName: string;
let makarRashiFal: string;
let kumbhaRashiName: string;
let kumbhaRashiFal: string;
let meenRashiName: string;
let meenRashiFal: string;
let getDateAndDay: string;

describe('get all rashi bhavishya', () => {
    before(async () => {
        await browser.url('https://www.drikpanchang.com/astrology/prediction/mesha-rashi/mesha-rashi-daily-rashiphal.html?lang=mr&ck=1')
        await browser.pause(500)
        getDateAndDay = await rashiBhavishya.dayAndDate.getText(); 
    })

    it('should get mesh rashi daily details', async () => {
        rashiName = await rashiBhavishya.rashiName.getText();
        console.log(rashiName);
        rashiFal = await rashiBhavishya.rashiFal.getText();
        console.log(rashiFal);
        //await browser.refresh()
        //await browser.pause(200)
        
        //vrishabha rashi
        await browser.url('https://www.drikpanchang.com/astrology/prediction/vrishabha-rashi/vrishabha-rashi-daily-rashiphal.html?lang=mr&ck=1')
        vrishabhaRashiName = await rashiBhavishya.rashiName.getText();
        vrishabhaRashiFal = await rashiBhavishya.rashiFal.getText();
        //await browser.refresh()
        //await browser.pause(200)
   
        //mithun rashi
        await browser.url('https://www.drikpanchang.com/astrology/prediction/mithuna-rashi/mithuna-rashi-daily-rashiphal.html?lang=mr&ck=1')
        mithunaRashiName = await rashiBhavishya.rashiName.getText();
        mithunaRashiFal = await rashiBhavishya.rashiFal.getText();
        //await browser.refresh()
        //await browser.pause(200)

        //karka rashi
        await browser.url('https://www.drikpanchang.com/astrology/prediction/karka-rashi/karka-rashi-daily-rashiphal.html?lang=mr&ck=1')
        karkaRashiName = await rashiBhavishya.rashiName.getText();
        karkaRashiFal = await rashiBhavishya.rashiFal.getText();
        //await browser.refresh()
        //await browser.pause(200)
        
        //simha rashi
        await browser.url('https://www.drikpanchang.com/astrology/prediction/simha-rashi/simha-rashi-daily-rashiphal.html?lang=mr&ck=1')
        simhaRashiName = await rashiBhavishya.rashiName.getText();
        simhaRashiFal = await rashiBhavishya.rashiFal.getText();
        //await browser.refresh()
        //await browser.pause(200)

        //kanaya rashi
        await browser.url('https://www.drikpanchang.com/astrology/prediction/kanya-rashi/kanya-rashi-daily-rashiphal.html?lang=mr&ck=1')
        kanyaRashiName = await rashiBhavishya.rashiName.getText();
        kanyaRashiFal = await rashiBhavishya.rashiFal.getText();
        //await browser.refresh()
        //await browser.pause(200)
   
        //tula rashi
        await browser.url('https://www.drikpanchang.com/astrology/prediction/tula-rashi/tula-rashi-daily-rashiphal.html?lang=mr&ck=1')
        tulaRashiName = await rashiBhavishya.rashiName.getText();
        tulaRashiFal = await rashiBhavishya.rashiFal.getText();
        //await browser.refresh()
        //await browser.pause(200)
   
        //vrishchika rashi
        await browser.url('https://www.drikpanchang.com/astrology/prediction/vrishchika-rashi/vrishchika-rashi-daily-rashiphal.html?lang=mr&ck=1')
        vrishchikaRashiName = await rashiBhavishya.rashiName.getText();
        vrishchikaRashiFal = await rashiBhavishya.rashiFal.getText();
        //await browser.refresh()
        //await browser.pause(200)
  
        //dhanu rashi
        await browser.url('https://www.drikpanchang.com/astrology/prediction/dhanu-rashi/dhanu-rashi-daily-rashiphal.html?lang=mr&ck=1')
        dhanuRashiName = await rashiBhavishya.rashiName.getText();
        dhanuRashiFal = await rashiBhavishya.rashiFal.getText();
        //await browser.refresh()
        //await browser.pause(200)
   
        //makar rashi
        await browser.url('https://www.drikpanchang.com/astrology/prediction/makara-rashi/makara-rashi-daily-rashiphal.html?lang=mr&ck=1')
        makarRashiName = await rashiBhavishya.rashiName.getText();
        makarRashiFal = await rashiBhavishya.rashiFal.getText();
        //await browser.refresh()
        //await browser.pause(200)
    
        //kumbha rashi
        await browser.url('https://www.drikpanchang.com/astrology/prediction/kumbha-rashi/kumbha-rashi-daily-rashiphal.html?lang=mr&ck=1')
        kumbhaRashiName = await rashiBhavishya.rashiName.getText();       
        kumbhaRashiFal = await rashiBhavishya.rashiFal.getText();
        //await browser.refresh()
        //await browser.pause(200)
   
        //meen rashi
        await browser.url('https://www.drikpanchang.com/astrology/prediction/meena-rashi/meena-rashi-daily-rashiphal.html?lang=mr&ck=1')
        await browser.pause(200)    
        meenRashiName = await rashiBhavishya.rashiName.getText();
        meenRashiFal = await rashiBhavishya.rashiFal.getText();
    });

    after(async () => {
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

                         .home-button {
            position: absolute;
            top: 10px;
            left: 5px;
            display: flex;
            align-items: center;
        }
        .home-button a {
            text-decoration: none;
            font-size: 1.1em;
            color:#050000;
            display: flex;
            align-items: center;
        }
        .home-button img {
            width: 40px;
            height: 40px;
            margin-left: 8px;
        }
            </style>
        </head>
        <body>

        <div class="home-button">
        <a href="index.html">
            <img src="./images/home.png" alt="Home Icon">
        </a>
         </div>

            <h1>राशि भविष्य</h1>
            <div class="rashi-detail"><strong>${getDateAndDay}</strong></div>
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
