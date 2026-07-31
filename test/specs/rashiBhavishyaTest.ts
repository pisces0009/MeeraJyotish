import rashiBhavishya from "../pageobjects/rashiBhavishya";
import * as fs from 'fs';

// Define an interface for the Rashi data structure
interface RashiData {
    name: string;
    fal: string;
    icon: string;
}

// Array to store all the fetched rashi data
let allRashiData: RashiData[] = [];
let getDateAndDay: string;

// Configuration for all Rashis
const rashiConfigs = [
    { urlName: 'mesha', icon: 'mesh.jpg' },
    { urlName: 'vrishabha', icon: 'vrishabha.jpg' },
    { urlName: 'mithuna', icon: 'mithun.jpg' },
    { urlName: 'karka', icon: 'kark.jpg' },
    { urlName: 'simha', icon: 'singh.jpg' },
    { urlName: 'kanya', icon: 'kanya.jpg' },
    { urlName: 'tula', icon: 'tula.jpg' },
    { urlName: 'vrishchika', icon: 'vrishchik.jpg' },
    { urlName: 'dhanu', icon: 'dhanu.jpg' },
    { urlName: 'makara', icon: 'makar.jpg' },
    { urlName: 'kumbha', icon: 'kumbha.jpg' },
    { urlName: 'meena', icon: 'meen.jpg' }
];

describe('get all rashi bhavishya', () => {
    before(async () => {
         // Clear the old data in the HTML file
         const filePath = 'RashiBhavishya.html';
         if (fs.existsSync(filePath)) {
             fs.writeFileSync(filePath, ''); // Clear the file by overwriting it with an empty string
             console.log('Old data cleared from RashiBhavishya.html');
         }

        // Navigate to the first page to get the date
        await browser.url(`https://www.drikpanchang.com/astrology/prediction/${rashiConfigs[0].urlName}-rashi/${rashiConfigs[0].urlName}-rashi-daily-rashiphal.html?lang=mr&ck=1`);
        getDateAndDay = await rashiBhavishya.dayAndDate.getText(); 
    });

    it('should get mesh rashi daily details', async () => {
        for (const config of rashiConfigs) {
            const url = `https://www.drikpanchang.com/astrology/prediction/${config.urlName}-rashi/${config.urlName}-rashi-daily-rashiphal.html?lang=mr&ck=1`;
            await browser.url(url);

            const rashiName = await rashiBhavishya.rashiName.getText();
            const rashiFal = await rashiBhavishya.rashiFal.getText();

            allRashiData.push({
                name: rashiName,
                fal: rashiFal,
                icon: config.icon
            });
            console.log(`Fetched data for ${rashiName}`);
        }
    });

    after(async () => {
        // Generate the HTML for each rashi card by looping through the data
        const rashiCardsHtml = allRashiData.map(rashi => `
                <div class="rashi-card">
                    <img src="./images/rashiIcons/${rashi.icon}" alt="Rashi Icon" class="rashi-icon">
                    <div class="rashi-name">${rashi.name}</div>
                    <div class="rashi-fal">${rashi.fal}</div>
                </div>
        `).join('');

        // Generate final HTML content
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
                    top: 30%;
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
                ${rashiCardsHtml}
            </div>
        </body>
        </html>
        `;

        // Write the HTML content to a file
        fs.writeFileSync('RashiBhavishya.html', htmlContent);

        console.log('HTML file generated successfully.');
    });

});
