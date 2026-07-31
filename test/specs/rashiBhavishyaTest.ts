import rashiBhavishya from "../pageobjects/rashiBhavishya";
import * as fs from 'fs';

interface RashiData {
    name: string;
    fal: string;
    icon: string;
}

const RASHI_DETAILS = [
    { key: 'mesha-rashi', icon: 'mesh.jpg' },
    { key: 'vrishabha-rashi', icon: 'vrishabha.jpg' },
    { key: 'mithuna-rashi', icon: 'mithun.jpg' },
    { key: 'karka-rashi', icon: 'kark.jpg' },
    { key: 'simha-rashi', icon: 'singh.jpg' },
    { key: 'kanya-rashi', icon: 'kanya.jpg' },
    { key: 'tula-rashi', icon: 'tula.jpg' },
    { key: 'vrishchika-rashi', icon: 'vrishchik.jpg' },
    { key: 'dhanu-rashi', icon: 'dhanu.jpg' },
    { key: 'makara-rashi', icon: 'makar.jpg' },
    { key: 'kumbha-rashi', icon: 'kumbha.jpg' },
    { key: 'meena-rashi', icon: 'meen.jpg' }
];

let getDateAndDay: string;
let allRashiData: RashiData[] = [];

describe('get all rashi bhavishya', () => {
    before(async () => {
         // Clear the old data in the HTML file
         const filePath = 'RashiBhavishya.html';
         if (fs.existsSync(filePath)) {
             fs.writeFileSync(filePath, ''); // Clear the file by overwriting it with an empty string
             console.log('Old data cleared from RashiBhavishya.html');
         }

        // Navigate to the first page to get the date
        const firstRashi = RASHI_DETAILS[0];
        await browser.url(`https://www.drikpanchang.com/astrology/prediction/${firstRashi.key}/${firstRashi.key}-daily-rashiphal.html?lang=mr&ck=1`);
        getDateAndDay = await rashiBhavishya.dayAndDate.getText(); 
    })

    it('should get all rashi daily details', async () => {
        for (const rashi of RASHI_DETAILS) {
            const url = `https://www.drikpanchang.com/astrology/prediction/${rashi.key}/${rashi.key}-daily-rashiphal.html?lang=mr&ck=1`;
            await browser.url(url);

            const name = await rashiBhavishya.rashiName.getText();
            const fal = await rashiBhavishya.rashiFal.getText();

            allRashiData.push({ name, fal, icon: rashi.icon });
            console.log(`Scraped: ${name}`);
        }
    });

    after(async () => {
        // Generate the HTML for each card by mapping over the data array
        // Generate the final HTML content
        const htmlContent = `
            ${allRashiData.map(rashi => `
            <div class="rashi-card">
                <img src="./images/rashiIcons/${rashi.icon}" alt="${rashi.name}" class="rashi-icon">
                <h2 class="rashi-title">${rashi.name}</h2>
                <p class="rashi-detail"><strong>राशिफळ: </strong>${rashi.fal}</p>
            </div>
        `).join('')}
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
            <p class="date-subtitle"><strong>${getDateAndDay}</strong></p>

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
