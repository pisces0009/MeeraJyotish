import panchangDetails from '../pageobjects/panchangDetails'
import * as fs from 'fs'
import * as path from 'path'


// Function to format the date in DD MMM YYYY format
function formatDate(date: Date): string {
    const options = { day: '2-digit', month: 'short', year: 'numeric', timeZone: 'Asia/Kolkata' } as const;
    return date.toLocaleDateString('en-GB', options);
}

// Function to get the current date in IST
function getIndianDate(): string {
    const date = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
    return formatDate(new Date(date));
}

// Function to get the background image based on the day of the week in IST
function getBackgroundImage(): string {
    const date = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
    const day = new Date(date).getDay();
    switch (day) {
        case 0: return 'images/orange.jpg'; // Sunday
        case 1: return 'images/white.jpg';  // Monday
        case 2: return 'images/red.jpg';    // Tuesday
        case 3: return 'images/green.jpg';  // Wednesday
        case 4: return 'images/yellow.jpg'; // Thursday
        case 5: return 'images/pink.jpg';   // Friday
        case 6: return 'images/blue.jpg';   // Saturday
        default: return 'images/yellow.jpg'; // Default to Thursday
    }
}

// Function to get the special details based on the date in IST
function getSpecialDetails(date: string): string {
    const specialDetails: { [key: string]: string } = {
    '01 Jun 2025': 'चांगला दिवस',
    '02 Jun 2025': 'उत्तम दिवस',
    '03 Jun 2025': '९ नं.चांगला',
    '04 Sep 2025': 'शुभ दिवस',
    '05 Sep 2025': 'शुभ दिवस',
    '06 Sep 2025': 'चांगला दिवस',
    '07 Jun 2025': 'वृद्धितिथी',
    '08 May 2025': '१२ नं. चांगला',
    '09 May 2025': 'शुभ दिवस',
    '10 Jun 2025': '१२प. चांगला',
    '11 Jun 2025': 'ज्येष्ठा वर्ज्य',
    '12 Jun 2025': 'चांगला दिवस',
    '13 Jun 2025': 'उत्तम दिवस',
    '14 Jun 2025': '१६ नं. चांगला',
    '15 May 2025': 'ज्येष्ठा वर्ज्य',
    '16 May 2025': 'उत्तम दिवस',
    '17 Jun 2025': '१५ प. चांगला',
    '18 Jun 2025': 'चांगला दिवस',
    '19 Jun 2025': 'उत्तम दिवस',
    '20 Jun 2025': 'उत्तम दिवस',
    '21 Jun 2025': 'क्षयतिथी',
    '22 May 2025': '१४ प. चांगला',
    '23 May 2025': 'उत्तम दिवस',
    '24 May 2025': '१९ प. चांगला',
    '25 May 2025': 'त्रयोदशी वर्जय',
    '26 May 2025': 'अमावास्या वर्ज्य',
    '27 May 2025': 'क्षयतिथी',
    '28 May 2025': 'शुभ दिवस',
    '29 Jun 2025': '९ नं. चांगला',
    '30 Jun 2025': '१७ प. चांगला',
    '31 May 2025': 'चांगला दिवस',

    };
    return specialDetails[date] || 'no details available';
}

describe('get all panchang details', () => {
    before(async () => {
        // Clear all saved data
        const filesToDelete = [
            'tithi.json', 'nakshatra.json', 'yoga.json', 'karan.json', 'var.json',
            'rahuKaal.json', 'rassi.json', 'savastar.json', 'dinmaan.json', 'rutu.json',
            'aayan.json', 'sunGochaar.json', 'guruGochaar.json', 'shaniGochaar.json'
        ];
        filesToDelete.forEach(file => {
            const filePath = path.join(__dirname, file);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        });

        await browser.url('https://www.drikpanchang.com/panchang/day-panchang.html?lang=hi&geoname-id=1275339&time-format=24hour')
        await browser.pause(1000)
    });
    it('should get all panchang details', async () => {
        const tithi1 = await panchangDetails.tithi.getText();
        const tithi2 = await panchangDetails.tithi2.getText();
        const tithi = `${tithi1} | ${tithi2}`; // Combine both tithi1 and tithi2
        const nakshatra = await panchangDetails.nakshatra.getText();
        let yoga = await panchangDetails.yoga.getText();
        yoga = yoga.replace('\nⓘ', ''); // Remove \nⓘ from yoga
        let var1 = await panchangDetails.var.getText();
        var1 = var1.replace('\nⓘ', ''); // Remove \nⓘ from var1
        const rahuKaal = await panchangDetails.rahuKaal.getText();
        const rassi = await panchangDetails.rassi.getText();
        const karan1 = await panchangDetails.karan.getText();
        let karan2 = await panchangDetails.karan2.getText();
        karan2 = karan2.replace('\nⓘ', ''); // Remove \nⓘ from karan2
        let karan = `${karan1} | ${karan2}`; // Combine both karan1 and karan2
        karan = karan.replace('\nⓘ', ''); // Remove \nⓘ from karan
        const savastar = await panchangDetails.savastar1.getText();
        //const savastar2 = await panchangDetails.savastar2.getText();
        //const savastar = `${savastar1} ${savastar2}`; // Combine both savastar1 and savastar2
        const dinmaan = await panchangDetails.dinmaan.getText();
        const rutu = await panchangDetails.rutu.getText();
        const aayan = await panchangDetails.aayan.getText();

        // Open new URL for sunGochaar
        await browser.newWindow('https://www.drikpanchang.com/jyotisha/kundali/kundali.html');
        await browser.pause(1000);
        const sunGochaar = await panchangDetails.sunGochaar.getText(); // Replace with actual selector
        const guruGochaar = await panchangDetails.guruGochaar.getText(); // Replace with actual selector
        const shaniGochaar = await panchangDetails.shaniGochaar.getText(); 
        await browser.closeWindow();
        await browser.switchWindow('https://www.drikpanchang.com/panchang/day-panchang.html?lang=hi&geoname-id=1275339&time-format=24hour');

        // Function to clear old data in a JSON file
function clearJsonFile(filePath: string) {
    if (fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, '{}'); // Overwrite with an empty JSON object
        console.log(`Cleared old data in file: ${filePath}`);
    }
}

        // Store tithi in a JSON file
const tithiFilePath = 'tithi.json';
clearJsonFile(tithiFilePath);
const data = { tithi };
fs.writeFileSync(tithiFilePath, JSON.stringify(data, null, 2));

// Store nakshatra in a JSON file
const nakshatraFilePath = 'nakshatra.json';
clearJsonFile(nakshatraFilePath);
const data1 = { nakshatra };
fs.writeFileSync(nakshatraFilePath, JSON.stringify(data1, null, 2));

// Store yoga in a JSON file
const yogaFilePath = 'yoga.json';
clearJsonFile(yogaFilePath);
const data2 = { yoga };
fs.writeFileSync(yogaFilePath, JSON.stringify(data2, null, 2));

// Store karan in a JSON file
const karanFilePath = 'karan.json';
clearJsonFile(karanFilePath);
const data3 = { karan };
fs.writeFileSync(karanFilePath, JSON.stringify(data3, null, 2));

// Store var in a JSON file
const varFilePath = 'var.json';
clearJsonFile(varFilePath);
const data4 = { var1 };
fs.writeFileSync(varFilePath, JSON.stringify(data4, null, 2));

// Store rahuKaal in a JSON file
const rahuKaalFilePath = 'rahuKaal.json';
clearJsonFile(rahuKaalFilePath);
const data5 = { rahuKaal };
fs.writeFileSync(rahuKaalFilePath, JSON.stringify(data5, null, 2));

// Store rassi in a JSON file
const rassiFilePath = 'rassi.json';
clearJsonFile(rassiFilePath);
const data6 = { rassi };
fs.writeFileSync(rassiFilePath, JSON.stringify(data6, null, 2));

// Store savastar in a JSON file
const savastarFilePath = 'savastar.json';
clearJsonFile(savastarFilePath);
const data7 = { savastar };
fs.writeFileSync(savastarFilePath, JSON.stringify(data7, null, 2));

// Store dinmaan in a JSON file
const dinmaanFilePath = 'dinmaan.json';
clearJsonFile(dinmaanFilePath);
const data8 = { dinmaan };
fs.writeFileSync(dinmaanFilePath, JSON.stringify(data8, null, 2));

// Store rutu in a JSON file
const rutuFilePath = 'rutu.json';
clearJsonFile(rutuFilePath);
const data9 = { rutu };
fs.writeFileSync(rutuFilePath, JSON.stringify(data9, null, 2));

// Store aayan in a JSON file
const aayanFilePath = 'aayan.json';
clearJsonFile(aayanFilePath);
const data10 = { aayan };
fs.writeFileSync(aayanFilePath, JSON.stringify(data10, null, 2));

// Store sunGochaar in a JSON file
const sunGochaarFilePath = 'sunGochaar.json';
clearJsonFile(sunGochaarFilePath);
const data11 = { sunGochaar };
fs.writeFileSync(sunGochaarFilePath, JSON.stringify(data11, null, 2));

// Store guruGochaar in a JSON file
const guruGochaarFilePath = 'guruGochaar.json';
clearJsonFile(guruGochaarFilePath);
const data12 = { guruGochaar };
fs.writeFileSync(guruGochaarFilePath, JSON.stringify(data12, null, 2));

// Store shaniGochaar in a JSON file
const shaniGochaarFilePath = 'shaniGochaar.json';
clearJsonFile(shaniGochaarFilePath);
const data13 = { shaniGochaar };
fs.writeFileSync(shaniGochaarFilePath, JSON.stringify(data13, null, 2));

    });

    after(async () => {
        // Read JSON files
        const tithiData = JSON.parse(fs.readFileSync('tithi.json', 'utf-8'))
        const nakshatraData = JSON.parse(fs.readFileSync('nakshatra.json', 'utf-8'))
        const yogaData = JSON.parse(fs.readFileSync('yoga.json', 'utf-8'))
        const karanData = JSON.parse(fs.readFileSync('karan.json', 'utf-8'))
        const varData = JSON.parse(fs.readFileSync('var.json', 'utf-8'))
        const rahuKaalData = JSON.parse(fs.readFileSync('rahuKaal.json', 'utf-8'))
        const rassiData = JSON.parse(fs.readFileSync('rassi.json', 'utf-8'))
        const savastarData = JSON.parse(fs.readFileSync('savastar.json', 'utf-8'))
        const dinmaanData = JSON.parse(fs.readFileSync('dinmaan.json', 'utf-8'))
        const rutuData = JSON.parse(fs.readFileSync('rutu.json', 'utf-8'))
        const aayanData = JSON.parse(fs.readFileSync('aayan.json', 'utf-8'))
        const sunGochaarData = JSON.parse(fs.readFileSync('sunGochaar.json', 'utf-8'))
        const guruGochaarData = JSON.parse(fs.readFileSync('guruGochaar.json', 'utf-8'))
        const shaniGochaarData = JSON.parse(fs.readFileSync('shaniGochaar.json', 'utf-8'))

        // Get today's date in DD MMM YYYY format
        const todayDate = getIndianDate();

        // Get the background image based on the day of the week in IST
        const backgroundImage = getBackgroundImage();

        // Get the special details based on the date in IST
        const specialDetails = getSpecialDetails(todayDate);

        // Create an array of panchang items with labels, values, and icons
        const panchangItems = [
            { label: 'वार', value: varData.var1, icon: '📅' },
            { label: 'संवत', value: `1948 पराभव, शक संवत, ज्येष्ठ, ${savastarData.savastar}`, icon: '📜' },
            { label: 'तिथी', value: tithiData.tithi, icon: '🌓' },
            { label: 'अयन', value: aayanData.aayan, icon: '☀️' },
            { label: 'ऋतु', value: rutuData.rutu, icon: '🍂' },
            { label: 'नक्षत्र', value: nakshatraData.nakshatra, icon: '✨' },
            { label: 'करण', value: karanData.karan, icon: '🌗' },
            { label: 'योग', value: yogaData.yoga, icon: '🧘' },
            { label: 'राशी', value: rassiData.rassi, icon: '♋' },
            { label: 'दिनमान', value: dinmaanData.dinmaan, icon: '⏳' },
            { label: 'राहू काळ', value: rahuKaalData.rahuKaal, icon: '🚫' },
            { label: 'दिनविशेष', value: specialDetails, icon: '⭐' }
        ];

        const gocharItems = [
            { label: 'सूर्य', value: sunGochaarData.sunGochaar },
            { label: 'गुरु', value: guruGochaarData.guruGochaar },
            { label: 'शनि', value: shaniGochaarData.shaniGochaar }
        ];

        // Generate HTML for the panchang grid
        const panchangGridHtml = panchangItems.map(item => `
            <div class="panchang-detail">
                <span class="panchang-icon">${item.icon}</span>
                <div class="panchang-text">
                    <span class="panchang-label">${item.label}:</span>
                    <span class="panchang-value">${item.value}</span>
                </div>
            </div>
        `).join('');

        // Generate HTML for the gochar details
        const gocharDetailsHtml = gocharItems.map(item => `<span class="gochar-item"><strong>${item.label}:</strong> ${item.value}</span>`).join('');

        // Generate HTML content with a timestamp
        const htmlContent = `
<!DOCTYPE html>
<html lang="mr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Panchang Details</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700&family=Poppins:wght@300;400;600&display=swap');

        :root {
            --text-color: #f0f0f0;
            --card-bg: rgba(0, 0, 0, 0.35);
            --card-border: rgba(255, 255, 255, 0.1);
            --card-shadow: rgba(0, 0, 0, 0.25);
            --accent-color: #00d9ff; /* A vibrant cyan */
            --accent-glow: rgba(0, 217, 255, 0.5);
        }

        body {
            background-image: url('${backgroundImage}');
            background-size: cover;
            background-position: center;
            background-attachment: fixed;
            font-family: 'Poppins', sans-serif;
            color: var(--text-color);
            margin: 0;
            padding: 20px;
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            align-items: center;
        }

        body.monday-theme {
            --text-color: #1a1a1a;
            --card-bg: rgba(255, 255, 255, 0.6);
            --card-border: rgba(0, 0, 0, 0.1);
            --accent-color: #d9005b;
            --accent-glow: rgba(217, 0, 91, 0.4);
        }

        .top-header {
            width: 100%;
            max-width: 850px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 15px 20px;
            background: rgba(0, 0, 0, 0.4);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border-radius: 15px;
            border: 1px solid var(--card-border);
            margin-bottom: 20px;
            position: relative;
            box-shadow: 0 4px 30px var(--card-shadow);
        }
        
        .page-title {
            font-family: 'Orbitron', sans-serif;
            font-size: 2em;
            font-weight: 600;
            margin: 0;
            flex-grow: 1;
            text-align: center;
            color: #fff;
            text-shadow: 0 0 8px var(--accent-glow), 0 0 15px var(--accent-glow), 0 0 25px var(--accent-glow);
        }

        body.monday-theme .page-title {
            color: var(--accent-color);
            text-shadow: 0 0 5px var(--accent-glow);
        }

        .burger-menu {
            position: absolute;
            left: 20px;
            top: 50%;
            transform: translateY(-50%);
            cursor: pointer;
            padding: 5px;
        }

        .burger-icon {
            width: 35px;
            height: 35px;
            transition: transform 0.3s ease;
        }
        .burger-menu:hover .burger-icon {
            transform: scale(1.1);
        }

        .main-container {
            width: 100%;
            max-width: 850px;
            background: var(--card-bg);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border-radius: 15px;
            border: 1px solid var(--card-border);
            box-shadow: 0 4px 30px var(--card-shadow);
            padding: 25px 35px;
        }

        .date-header {
            text-align: center;
            font-size: 1.6em;
            font-weight: 600;
            margin-bottom: 30px;
            color: var(--accent-color);
            text-shadow: 0 0 8px var(--accent-glow);
        }

        .panchang-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin-bottom: 30px;
        }

        .panchang-detail {
            display: flex;
            align-items: center;
            background: rgba(255, 255, 255, 0.05);
            padding: 12px;
            border-radius: 10px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            transition: background 0.3s, transform 0.3s;
        }
        .panchang-detail:hover {
            background: rgba(255, 255, 255, 0.1);
            transform: translateY(-3px);
        }

        .panchang-icon {
            font-size: 1.8em;
            margin-right: 15px;
            line-height: 1;
        }

        .panchang-text {
            display: flex;
            flex-direction: column;
        }

        .panchang-label {
            font-weight: 600;
            font-size: 0.9em;
            opacity: 0.8;
        }

        .panchang-value {
            font-size: 1em;
            line-height: 1.4;
        }

        .section-title {
            font-family: 'Orbitron', sans-serif;
            font-size: 1.5em;
            font-weight: 600;
            text-align: center;
            margin: 35px 0 20px 0;
            border-top: 1px solid var(--card-border);
            padding-top: 25px;
            color: var(--accent-color);
            text-shadow: 0 0 8px var(--accent-glow);
        }

        .gochar-details {
            text-align: center;
            font-size: 1.1em;
            line-height: 1.7;
            background: rgba(255, 255, 255, 0.05);
            padding: 15px;
            border-radius: 10px;
        }

        .gochar-item {
            display: inline-block;
            margin: 0 15px;
        }

        .jyotishacharya-details {
            text-align: center;
            font-size: 1.1em;
            line-height: 1.7;
        }

        .jyotishacharya-details p {
            margin: 5px 0;
        }
        .jyotishacharya-details .name {
            font-weight: 600;
            font-size: 1.2em;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
            .page-title {
                font-size: 1.8em;
            }
            .panchang-grid {
                grid-template-columns: 1fr;
            }
            .main-container {
                padding: 20px;
            }
        }

        @media (max-width: 480px) {
            body {
                padding: 10px;
            }
            .page-title {
                font-size: 1.5em;
            }
            .top-header {
                padding: 10px 15px;
            }
            .main-container {
                max-width: 100%;
            }
            .gochar-details {
                flex-direction: column;
                gap: 10px;
            }
        }
    </style>
</head>
<body>
    
    <div class="top-header">
         <div class="burger-menu" onclick="window.location.href='index.html'">
             <img src="./images/burger-icon.png" alt="Menu Icon" class="burger-icon">
         </div>
         <h1 class="page-title">||ॐ|| पंचांग ||卐||</h1>
     </div>

    <div class="main-container">
        <div class="date-header">
            ${todayDate}
        </div>
        
        <div class="panchang-grid">
            ${panchangGridHtml}
        </div>

        <div class="section-title">गोचर</div>
        <div class="gochar-details">
            ${gocharDetailsHtml}
        </div>

        <div class="section-title">ज्योतिषाचार्य</div>
        <div class="jyotishacharya-details">
            <p class="name">डॉ सौ.मीरा.बी.काळे</p>
            <p>(वेदांग ज्योतिष)</p>
        </div>
    </div>
     
</body>
<script>
    // Get the current day in IST
    const date = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
    const currentDay = new Date(date).getDay();

    // Change theme if it's Monday (1) for better readability on white background
    if (currentDay === 1) {
        document.body.classList.add('monday-theme');
    }
</script>
</html>
`

        // Write the HTML content to a file
        fs.writeFileSync('panchang.html', htmlContent)

        console.log('HTML file generated successfully.');
    });
});
