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

function getIndianDateParts(now: Date): { day: number; year: number } {
    const parts = new Intl.DateTimeFormat('en', {
        timeZone: 'Asia/Kolkata',
        day: 'numeric',
        year: 'numeric'
    }).formatToParts(now);
    const day = Number(parts.find(part => part.type === 'day')?.value);
    const year = Number(parts.find(part => part.type === 'year')?.value);
    if (!Number.isInteger(day) || !Number.isInteger(year)) {
        throw new Error('Could not determine the current India date.');
    }
    return { day, year };
}

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
        await browser.setTimeZone('Asia/Kolkata');
        await browser.url(`https://www.drikpanchang.com/astrology/prediction/${rashiConfigs[0].urlName}-rashi/${rashiConfigs[0].urlName}-rashi-daily-rashiphal.html?lang=mr&ck=1&geoname-id=1275339`);
        getDateAndDay = await rashiBhavishya.dayAndDate.getText(); 
        const displayedDate = getDateAndDay.match(/(\d{1,2}),?\s+(\d{4})/);
        if (!displayedDate) {
            throw new Error(`Could not read the date from Drik Panchang: ${getDateAndDay}`);
        }

        const indiaDate = getIndianDateParts(new Date());
        if (Number(displayedDate[1]) !== indiaDate.day || Number(displayedDate[2]) !== indiaDate.year) {
            throw new Error(
                `Drik Panchang shows ${getDateAndDay}, not today's India date (${indiaDate.day}/${indiaDate.year}).`
            );
        }
    });

    it('should get mesh rashi daily details', async () => {
        for (const config of rashiConfigs) {
            const url = `https://www.drikpanchang.com/astrology/prediction/${config.urlName}-rashi/${config.urlName}-rashi-daily-rashiphal.html?lang=mr&ck=1&geoname-id=1275339`;
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
            <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">
            <style>
                body {
                    font-family: 'Poppins', sans-serif;
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
                    justify-content: space-between;
                    gap: 10px;
                    max-width: 1200px;
                    margin: 0 auto 30px;
                }

                .header::after {
                    content: '';
                    width: 30px;
                    flex: none;
                }

                .header h1 {
                    font-family: 'Orbitron', sans-serif;
                    font-size: 2.6em;
                    color: #e0e0e0;
                    text-shadow: 0 0 10px rgba(0, 119, 230, 0.7), 0 0 18px rgba(0, 119, 230, 0.4);
                    margin: 0;
                }

                .header h1 .zodiac {
                    display: inline-block;
                    color: #ffb703;
                    text-shadow: 0 0 10px #ffb703, 0 0 22px #ff7b00;
                }
                .header h1 .zodiac {
                    width: 1.05em; height: 1.05em; border-radius: 50%; object-fit: cover;
                    vertical-align: middle; border: 2px solid #ffb703;
                    box-shadow: 0 0 10px #ffb703, 0 0 22px rgba(255, 123, 0, .6);
                    transition: opacity .35s ease, transform .35s ease;
                }
                .header h1 .zodiac.swap { opacity: 0; transform: scale(.4) rotate(-90deg); }
                .header h1 { position: relative; display: inline-block; }
                .header h1::after {
                    content: '';
                    position: absolute;
                    left: 50%; bottom: -6px;
                    width: 0; height: 2px;
                    transform: translateX(-50%);
                    background: linear-gradient(90deg, transparent, #ffb703, transparent);
                    animation: underlineGrow 3s ease-in-out infinite;
                }
                @keyframes underlineGrow { 0%,100% { width: 0; } 50% { width: 80%; } }
                @media (prefers-reduced-motion: reduce) { .header h1 .zodiac { transition: none !important; } .header h1::after { animation: none !important; width: 60%; } }

                .header .date {
                    font-size: 1.2em;
                    color: #00d9ff;
                    margin-top: 10px;
                }

                .header-content {
                    text-align: center;
                    min-width: 0;
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
                    color: #d0d0d0;
                }

                .rashi-fal.clamped {
                    display: -webkit-box;
                    -webkit-line-clamp: 6;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                .read-more {
                    margin-top: 10px;
                    padding: 6px 16px;
                    border-radius: 999px;
                    border: 1px solid rgba(0, 217, 255, 0.5);
                    background: rgba(0, 217, 255, 0.12);
                    color: #fff;
                    font-family: inherit;
                    cursor: pointer;
                }

                .burger-menu {
                    flex: none;
                    cursor: pointer;
                    padding: 5px;
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
                        font-size: 1.9em;
                    }
                    .header .date {
                        font-size: 0.95em;
                    }
                }
                @media (max-width: 480px) {
                    body {
                        padding: 12px;
                    }
                    .header {
                        flex-direction: column;
                        align-items: stretch;
                        gap: 6px;
                        margin-bottom: 20px;
                    }
                    .header::after {
                        display: none;
                    }
                    .burger-menu {
                        align-self: flex-start;
                    }
                    .header-content {
                        width: 100%;
                    }
                    .header h1 {
                        font-size: 1.5em;
                        white-space: nowrap;
                    }
                    .header .date {
                        font-size: 0.85em;
                        margin-top: 14px;
                        white-space: nowrap;
                    }
                    #date-nav {
                        gap: 6px !important;
                    }
                    #date-nav .nav-btn {
                        width: 34px !important;
                        height: 34px !important;
                        font-size: 13px !important;
                    }
                    .rashi-grid {
                        grid-template-columns: 1fr;
                    }
                }
            </style>
        </head>
        <meta name="page-date" content="${new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Kolkata' }).format(new Date())}">
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
                    <h1><img class="zodiac" id="zodiac-l" src="images/rashiIcons/mesh.jpg" alt=""> राशि भविष्य <img class="zodiac" id="zodiac-r" src="images/rashiIcons/tula.jpg" alt=""></h1>
                    <div class="date" id="date-nav">${getDateAndDay}</div>
                </div>
            </div>
            <div class="rashi-grid">
                ${rashiCardsHtml}
            </div>
            <script src="archive-nav.js"></script>
            <script>
                (function () {
                    var signs = ['mesh', 'vrishabha', 'mithun', 'kark', 'singh', 'kanya', 'tula', 'vrishchik', 'dhanu', 'makar', 'kumbha', 'meen'].map(function (n) { return 'images/rashiIcons/' + n + '.jpg'; });
                    var l = document.getElementById('zodiac-l'), r = document.getElementById('zodiac-r');
                    if (!l || !r || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
                    var i = 0;
                    setInterval(function () {
                        l.classList.add('swap'); r.classList.add('swap');
                        setTimeout(function () {
                            i = (i + 1) % 12;
                            l.src = signs[i]; r.src = signs[(i + 6) % 12];
                            l.classList.remove('swap'); r.classList.remove('swap');
                        }, 350);
                    }, 1800);
                })();
            </script>
            <script>
                document.querySelectorAll('.rashi-fal').forEach(function (fal) {
                    fal.classList.add('clamped');
                    if (fal.scrollHeight <= fal.clientHeight + 1) {
                        fal.classList.remove('clamped');
                        return;
                    }
                    var btn = document.createElement('button');
                    btn.type = 'button';
                    btn.className = 'read-more';
                    btn.textContent = 'अधिक वाचा';
                    btn.onclick = function () {
                        var open = fal.classList.toggle('clamped');
                        btn.textContent = open ? 'अधिक वाचा' : 'कमी दाखवा';
                    };
                    fal.insertAdjacentElement('afterend', btn);
                });
            </script>
        </body>
        </html>
        `;

        // Write the HTML content to a file
        fs.writeFileSync('RashiBhavishya.html', htmlContent);

        console.log('HTML file generated successfully.');
    });

});
