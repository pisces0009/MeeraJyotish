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
         // Clear the old data in the HTML file
         const filePath = 'RashiBhavishya.html';
         if (fs.existsSync(filePath)) {
             fs.writeFileSync(filePath, ''); // Clear the file by overwriting it with an empty string
             console.log('Old data cleared from RashiBhavishya.html');
         }

        await browser.url('https://www.drikpanchang.com/astrology/prediction/mesha-rashi/mesha-rashi-daily-rashiphal.html?lang=mr&ck=1')
        //await browser.pause(300)
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
        //await browser.pause(100)
        vrishabhaRashiName = await rashiBhavishya.rashiName.getText();
        vrishabhaRashiFal = await rashiBhavishya.rashiFal.getText();
        //await browser.refresh()
        //await browser.pause(200)
   
        //mithun rashi
        await browser.url('https://www.drikpanchang.com/astrology/prediction/mithuna-rashi/mithuna-rashi-daily-rashiphal.html?lang=mr&ck=1')
        //await browser.pause(100)
        mithunaRashiName = await rashiBhavishya.rashiName.getText();
        mithunaRashiFal = await rashiBhavishya.rashiFal.getText();
        //await browser.refresh()
        //await browser.pause(200)

        //karka rashi
        await browser.url('https://www.drikpanchang.com/astrology/prediction/karka-rashi/karka-rashi-daily-rashiphal.html?lang=mr&ck=1')
        //await browser.pause(100)
        karkaRashiName = await rashiBhavishya.rashiName.getText();
        karkaRashiFal = await rashiBhavishya.rashiFal.getText();
        //await browser.refresh()
        //await browser.pause(200)
        
        //simha rashi
        await browser.url('https://www.drikpanchang.com/astrology/prediction/simha-rashi/simha-rashi-daily-rashiphal.html?lang=mr&ck=1')
        //await browser.pause(100)
        simhaRashiName = await rashiBhavishya.rashiName.getText();
        simhaRashiFal = await rashiBhavishya.rashiFal.getText();
        //await browser.refresh()
        //await browser.pause(200)

        //kanaya rashi
        await browser.url('https://www.drikpanchang.com/astrology/prediction/kanya-rashi/kanya-rashi-daily-rashiphal.html?lang=mr&ck=1')
        //await browser.pause(100)
        kanyaRashiName = await rashiBhavishya.rashiName.getText();
        kanyaRashiFal = await rashiBhavishya.rashiFal.getText();
        //await browser.refresh()
        //await browser.pause(200)
   
        //tula rashi
        await browser.url('https://www.drikpanchang.com/astrology/prediction/tula-rashi/tula-rashi-daily-rashiphal.html?lang=mr&ck=1')
        //await browser.pause(200)
        tulaRashiName = await rashiBhavishya.rashiName.getText();
        tulaRashiFal = await rashiBhavishya.rashiFal.getText();
        //await browser.refresh()
        //await browser.pause(200)
   
        //vrishchika rashi
        await browser.url('https://www.drikpanchang.com/astrology/prediction/vrishchika-rashi/vrishchika-rashi-daily-rashiphal.html?lang=mr&ck=1')
        //await browser.pause(200)
        vrishchikaRashiName = await rashiBhavishya.rashiName.getText();
        vrishchikaRashiFal = await rashiBhavishya.rashiFal.getText();
        //await browser.refresh()
        //await browser.pause(200)
  
        //dhanu rashi
        await browser.url('https://www.drikpanchang.com/astrology/prediction/dhanu-rashi/dhanu-rashi-daily-rashiphal.html?lang=mr&ck=1')
        //await browser.pause(200)
        dhanuRashiName = await rashiBhavishya.rashiName.getText();
        dhanuRashiFal = await rashiBhavishya.rashiFal.getText();
        //await browser.refresh()
        //await browser.pause(200)
   
        //makar rashi
        await browser.url('https://www.drikpanchang.com/astrology/prediction/makara-rashi/makara-rashi-daily-rashiphal.html?lang=mr&ck=1')
        //await browser.pause(200)
        makarRashiName = await rashiBhavishya.rashiName.getText();
        makarRashiFal = await rashiBhavishya.rashiFal.getText();
        //await browser.refresh()
        //await browser.pause(200)
    
        //kumbha rashi
        await browser.url('https://www.drikpanchang.com/astrology/prediction/kumbha-rashi/kumbha-rashi-daily-rashiphal.html?lang=mr&ck=1')
        //await browser.pause(200)
        kumbhaRashiName = await rashiBhavishya.rashiName.getText();       
        kumbhaRashiFal = await rashiBhavishya.rashiFal.getText();
        //await browser.refresh()
        //await browser.pause(200)
   
        //meen rashi
        await browser.url('https://www.drikpanchang.com/astrology/prediction/meena-rashi/meena-rashi-daily-rashiphal.html?lang=mr&ck=1')
        //await browser.pause(200)    
        meenRashiName = await rashiBhavishya.rashiName.getText();
        meenRashiFal = await rashiBhavishya.rashiFal.getText();
    });

    after(async () => {
        // Generate HTML content
        const htmlContent = `
        <!DOCTYPE html>
        <html lang="mr">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Rashi Bhavishya</title>
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Roboto:wght@300;400&display=swap" rel="stylesheet">
            <style>
                body {
                    font-family: 'Roboto', sans-serif;
                    background: #0f0c29;
                    background: -webkit-linear-gradient(to right, #24243e, #302b63, #0f0c29);
                    background: linear-gradient(to right, #24243e, #302b63, #0f0c29);
                    color: #f0f0f0;
                    margin: 0;
                    padding: 20px;
                    box-sizing: border-box;
                }

                .header {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    margin-bottom: 40px;
                }

                .header h1 {
                    font-family: 'Orbitron', sans-serif;
                    font-size: 3em;
                    color: #e0e0e0;
                    text-shadow: 0 0 10px rgba(0, 119, 230, 0.7), 0 0 18px rgba(0, 119, 230, 0.4);
                    margin: 0;
                }

                .header .date {
                    font-size: 1.5em;
                    color: #a0a0a0;
                    margin-top: 5px;
                }

                .header-content {
                    text-align: center;
                }

                .rashi-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 25px;
                    max-width: 1200px;
                    margin: 0 auto;
                }

                .rashi-card {
                    background: rgba(255, 255, 255, 0.05);
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                    border-radius: 15px;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    padding: 25px;
                    text-align: center;
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }

                .rashi-card:hover {
                    transform: translateY(-10px);
                    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 119, 255, 0.5);
                }

                .rashi-icon {
                    width: 80px;
                    height: 80px;
                    object-fit: cover;
                    border-radius: 50%;
                    margin-bottom: 15px;
                    border: 3px solid rgba(255, 255, 255, 0.2);
                }

                .rashi-name {
                    font-family: 'Orbitron', sans-serif;
                    font-size: 1.8em;
                    font-weight: 700;
                    color: #fff;
                    margin: 10px 0;
                }

                .rashi-fal {
                    font-size: 1em;
                    line-height: 1.6;
                    color: #c0c0c0;
                }

                .burger-menu {
                    position: absolute;
                    left: 0;
                    top: 50%;
                    transform: translateY(-50%);
                    z-index: 1001;
                    cursor: pointer;
                }
                .burger-icon {
                    width: 30px;
                    height: 22px;
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }
                .burger-icon span {
                    display: block;
                    width: 100%;
                    height: 3px;
                    background-color: #ffffff;
                    border-radius: 3px;
                    transition: all 0.3s ease-in-out;
                }
                .burger-menu:hover .burger-icon span:nth-child(1) {
                    transform: translateY(9.5px) rotate(45deg);
                }
                .burger-menu:hover .burger-icon span:nth-child(2) {
                    opacity: 0;
                }
                .burger-menu:hover .burger-icon span:nth-child(3) {
                    transform: translateY(-9.5px) rotate(-45deg);
                }
                @media (max-width: 768px) {
                    .header h1 {
                        font-size: 2.5em;
                    }
                    .rashi-grid {
                        grid-template-columns: 1fr;
                    }
                }
            </style>
        </head>
        <body>

            <div class="header">
                <div class="burger-menu" onclick="window.location.href='index.html'" role="button" aria-label="Go to homepage">
                    <div class="burger-icon">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <div class="header-content">
                    <h1>राशि भविष्य</h1>
                    <div class="date">${getDateAndDay}</div>
                </div>
            </div>
            <div class="rashi-grid">
                <div class="rashi-card">
                    <img src="./images/rashiIcons/mesh.jpg" alt="Rashi Icon" class="rashi-icon">
                    <div class="rashi-name">${rashiName}</div>
                    <div class="rashi-fal">${rashiFal}</div>
                </div>
                <div class="rashi-card">
                    <img src="./images/rashiIcons/vrishabha.jpg" alt="Rashi Icon" class="rashi-icon">
                    <div class="rashi-name">${vrishabhaRashiName}</div>
                    <div class="rashi-fal">${vrishabhaRashiFal}</div>
                </div>
                <div class="rashi-card">
                    <img src="./images/rashiIcons/mithun.jpg" alt="Rashi Icon" class="rashi-icon">
                    <div class="rashi-name">${mithunaRashiName}</div>
                    <div class="rashi-fal">${mithunaRashiFal}</div>
                </div>
                <div class="rashi-card">
                    <img src="./images/rashiIcons/kark.jpg" alt="Rashi Icon" class="rashi-icon">
                    <div class="rashi-name">${karkaRashiName}</div>
                    <div class="rashi-fal">${karkaRashiFal}</div>
                </div>
                <div class="rashi-card">
                    <img src="./images/rashiIcons/singh.jpg" alt="Rashi Icon" class="rashi-icon">
                    <div class="rashi-name">${simhaRashiName}</div>
                    <div class="rashi-fal">${simhaRashiFal}</div>
                </div>
                <div class="rashi-card">
                    <img src="./images/rashiIcons/kanya.jpg" alt="Rashi Icon" class="rashi-icon">
                    <div class="rashi-name">${kanyaRashiName}</div>
                    <div class="rashi-fal">${kanyaRashiFal}</div>
                </div>
                <div class="rashi-card">
                    <img src="./images/rashiIcons/tula.jpg" alt="Rashi Icon" class="rashi-icon">
                    <div class="rashi-name">${tulaRashiName}</div>
                    <div class="rashi-fal">${tulaRashiFal}</div>
                </div>
                <div class="rashi-card">
                    <img src="./images/rashiIcons/vrishchik.jpg" alt="Rashi Icon" class="rashi-icon">
                    <div class="rashi-name">${vrishchikaRashiName}</div>
                    <div class="rashi-fal">${vrishchikaRashiFal}</div>
                </div>
                <div class="rashi-card">
                    <img src="./images/rashiIcons/dhanu.jpg" alt="Rashi Icon" class="rashi-icon">
                    <div class="rashi-name">${dhanuRashiName}</div>
                    <div class="rashi-fal">${dhanuRashiFal}</div>
                </div>
                <div class="rashi-card">
                    <img src="./images/rashiIcons/makar.jpg" alt="Rashi Icon" class="rashi-icon">
                    <div class="rashi-name">${makarRashiName}</div>
                    <div class="rashi-fal">${makarRashiFal}</div>
                </div>
                <div class="rashi-card">
                    <img src="./images/rashiIcons/kumbha.jpg" alt="Rashi Icon" class="rashi-icon">
                    <div class="rashi-name">${kumbhaRashiName}</div>
                    <div class="rashi-fal">${kumbhaRashiFal}</div>
                </div>
                <div class="rashi-card">
                    <img src="./images/rashiIcons/meen.jpg" alt="Rashi Icon" class="rashi-icon">
                    <div class="rashi-name">${meenRashiName}</div>
                    <div class="rashi-fal">${meenRashiFal}</div>
                </div>
            </div>
        </body>
        </html>
        `;

        // Write the HTML content to a file
        fs.writeFileSync('RashiBhavishya.html', htmlContent);

        console.log('HTML file generated successfully.');
    });

});
