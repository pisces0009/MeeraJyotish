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
        await browser.pause(100)
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
        // Organize the scraped data into a structured array
        const rashiData = [
            { name: rashiName, fal: rashiFal, icon: 'mesh.jpg' },
            { name: vrishabhaRashiName, fal: vrishabhaRashiFal, icon: 'vrishabha.jpg' },
            { name: mithunaRashiName, fal: mithunaRashiFal, icon: 'mithun.jpg' },
            { name: karkaRashiName, fal: karkaRashiFal, icon: 'kark.jpg' },
            { name: simhaRashiName, fal: simhaRashiFal, icon: 'singh.jpg' },
            { name: kanyaRashiName, fal: kanyaRashiFal, icon: 'kanya.jpg' },
            { name: tulaRashiName, fal: tulaRashiFal, icon: 'tula.jpg' },
            { name: vrishchikaRashiName, fal: vrishchikaRashiFal, icon: 'vrishchik.jpg' },
            { name: dhanuRashiName, fal: dhanuRashiFal, icon: 'dhanu.jpg' },
            { name: makarRashiName, fal: makarRashiFal, icon: 'makar.jpg' },
            { name: kumbhaRashiName, fal: kumbhaRashiFal, icon: 'kumbha.jpg' },
            { name: meenRashiName, fal: meenRashiFal, icon: 'meen.jpg' }
        ];

        // Generate the HTML for each card by mapping over the data array
        const rashiCardsHtml = rashiData.map(rashi => `
            <div class="rashi-card">
                <img src="./images/rashiIcons/${rashi.icon}" alt="${rashi.name}" class="rashi-icon">
                <h2 class="rashi-title">${rashi.name}</h2>
                <p class="rashi-detail"><strong>राशिफळ: </strong>${rashi.fal}</p>
            </div>
        `).join('');

        // Generate the final HTML content
        const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Rashi Bhavishya</title>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');

                body {
                    background-image: url('./images/indexbackground.jpg');
                    background-size: cover;
                    background-position: center;
                    background-attachment: fixed;
                    font-family: 'Poppins', sans-serif;
                    color: #ffffff;
                    margin: 0;
                    padding: 20px;
                }

                .top-header {
                    display: flex;
                    align-items: center;
                    justify-content: center; /* Center title */
                    padding: 15px 20px;
                    background: rgba(0, 0, 0, 0.4);
                    border-radius: 12px;
                    margin-bottom: 30px;
                    position: relative;
                }
                
                .top-header .page-title {
                    font-size: 2em;
                    font-weight: 600;
                    margin: 0;
                    flex-grow: 1; /* Allow title to take space */
                    text-align: center;
                }

                .burger-menu {
                    position: absolute;
                    left: 20px;
                    cursor: pointer;
                }

                .burger-icon {
                    width: 35px;
                    height: 35px;
                }

                .grid-container {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                    gap: 20px;
                    width: 100%;
                    max-width: 1200px;
                    margin: 0 auto;
                }

                .rashi-card {
                    background: rgba(255, 255, 255, 0.1);
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                    border-radius: 15px;
                    border: 1px solid rgba(255, 255, 255, 0.18);
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
                    padding: 20px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }

                .rashi-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
                }

                .rashi-icon {
                    width: 80px;
                    height: 80px;
                    object-fit: cover;
                    border-radius: 50%;
                    border: 2px solid rgba(255, 255, 255, 0.3);
                    margin-bottom: 15px;
                }

                .rashi-title {
                    font-size: 1.5em;
                    font-weight: 600;
                    margin: 0 0 10px 0;
                }

                .rashi-detail {
                    font-size: 0.95em;
                    line-height: 1.6;
                    text-align: justify;
                }
                
                .date-subtitle {
                    text-align: center;
                    font-size: 1.1em;
                    font-weight: 400;
                    margin: -15px 0 30px 0;
                }

                /* Responsive Design */
                @media (max-width: 768px) {
                    .grid-container {
                        grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                    }
                    .top-header .page-title {
                        font-size: 1.8em;
                    }
                }

                @media (max-width: 480px) {
                    body {
                        padding: 10px;
                    }
                    .grid-container {
                        grid-template-columns: 1fr; /* Single column on small screens */
                    }
                    .top-header .page-title {
                        font-size: 1.5em;
                    }
                }
            </style>
        </head>
        <body>
            <div class="top-header">
                <div class="burger-menu">
                    <a href="index.html"><img src="./images/burger-icon.png" alt="Menu Icon" class="burger-icon"></a>
                </div>
                <h1 class="page-title">राशि भविष्य</h1>
            </div>
            <p class="date-subtitle"><strong>\${getDateAndDay}</strong></p>

            <div class="grid-container">
                \${rashiCardsHtml}
            </div>
        </body>
        </html>
        `;

        // Write the HTML content to a file
        fs.writeFileSync('RashiBhavishya.html', htmlContent);

        console.log('HTML file generated successfully.');
    });

});
