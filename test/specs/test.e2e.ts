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
        '01 May 2025': '११ प. चांगला',
    '02 May 2025': 'चांगला दिवस',
    '03 May 2025': 'चांगला दिवस',
    '04 May 2025': '७ प. चांगला',
    '05 May 2025': 'चांगला दिवस',
    '06 May 2025': 'चांगला दिवस',
    '07 May 2025': 'चांगला दिवस',
    '08 May 2025': '१२ नं. चांगला',
    '09 May 2025': 'शुभ दिवस',
    '10 May 2025': 'चांगला दिवस',
    '11 May 2025': 'व्यतीपात वर्ज्य',
    '12 May 2025': 'विशाखा वर्ज्य',
    '13 May 2025': '९ नं.चांगला',
    '14 May 2025': '१२ प. चांगला',
    '15 May 2025': 'ज्येष्ठा वर्ज्य',
    '16 May 2025': 'उत्तम दिवस',
    '17 May 2025': 'चांगला दिवस',
    '18 May 2025': 'वृद्धितिथी',
    '19 May 2025': 'क्षयतिथी',
    '20 May 2025': 'चांगला दिवस',
    '21 May 2025': 'वैधृति वर्ज्य',
    '22 May 2025': '१४ प. चांगला',
    '23 May 2025': 'उत्तम दिवस',
    '24 May 2025': '१९ प. चांगला',
    '25 May 2025': 'त्रयोदशी वर्जय',
    '26 May 2025': 'अमावास्या वर्ज्य',
    '27 May 2025': 'क्षयतिथी',
    '28 May 2025': 'शुभ दिवस',
    '29 May 2025': 'उत्तम दिवस',
    '30 May 2025': '१० प. चांगला',
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
    })

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
    })
})

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


// Translate data to Marathi
const translatedData = {
    tithi: "तिथी: " + tithiData.tithi,
    nakshatra: "नक्षत्र: " + nakshatraData.nakshatra,
    yoga: "योग: " + yogaData.yoga,
    karan: "करण: " + karanData.karan,
    var1: "वार: " + varData.var1,
    rahuKaal: "राहू काळ: " + rahuKaalData.rahuKaal,
    rassi: "राशी: " + rassiData.rassi,
    savastar: "1947 विश्वावसु शक संवत्सर, चैत्र, " + savastarData.savastar,
    dinmaan: "दिनमान: " + dinmaanData.dinmaan,
    rutu: "ऋतु: " + rutuData.rutu,
    aayan: "अयन: " + aayanData.aayan,
    sunGochaar: "सूर्य: " + sunGochaarData.sunGochaar,
    guruGochaar: "गुरु: " + guruGochaarData.guruGochaar,
    shaniGochaar: "शनि: " + shaniGochaarData.shaniGochaar

}

// Get today's date in DD MMM YYYY format
const todayDate = getIndianDate();

// Get the background image based on the day of the week in IST
const backgroundImage = getBackgroundImage();

// Get the special details based on the date in IST
const specialDetails = getSpecialDetails(todayDate);

// Generate HTML content with a timestamp
const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Panchang Details</title>
    <style>

         .top-header {
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            margin: 0;
            padding: 30px;
            font-size: 2.5em;
            width: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            box-shadow: 0 4px rgb(0, 0, 0, 0.1);
            animation: glow 1s ease-in-out infinite alternate;
        }

        body {
            background-image: url('${backgroundImage}');
            background-size: cover;
            color: black; /* Change the text color BLACK/WHITE as desired */
            font-family: Arial, sans-serif;
            text-align: center;
            padding: 20px;
        }
        .panchang-container {
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .panchang-detail {
            display: inline-block;
            margin: 7px 0;
            font-size: 1.2em;
            text-align: left; /* Align text to the left */
            width: 100%; /* Ensure all text starts from the same point */
            
        }
        h1 {
            font-size: 2em;
            text-align: left; /* Align text to the left */
            margin-left: 55px;
            margin-top: -15px;
        }
        .additional-text {
            font-weight: bold;
            color: red; /* Change the color black/red as desired */
            font-size: 1.2em;
            text-align: left; /* Align text to the left */
            width: 100%;
        }
         .circle-image {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            object-fit: cover;
            margin-left: 275px;
            margin-top: -130px;
        }
        .flex-container {
            display: flex;
            align-items: center;
        }

         .home-button {
            position: absolute;
            top: 7px;
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
            margin-left: -5px;
        }

        /* Burger Menu Icon */
     .burger-menu {
        position: absolute;
        top: 10px;
        left: 10px;
        z-index: 1000;
    }

    .burger-menu .burger-icon {
        width: 40px;
        height: 40px;
        cursor: pointer;
    }

     /* Dropdown Menu */
     .hidden-menu {
        display: none;
        position: absolute;
        top: 60px;
        left: 10px;
        background-color: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 10px;
        border-radius: 5px;
        z-index: 1000;
    }

    .hidden-menu ul {
        list-style: none;
        padding: 0;
        margin: 0;
        text-align: left;
    }

    .hidden-menu ul li {
        margin: 10px 0;
    }

    .hidden-menu ul li a {
        color: white;
        text-decoration: none;
        font-size: 1.2em;
        display: block; /* Ensure the link spans the full width */
        text-align: left; /* Align the text inside the link to the left */
        padding: 5px 10px; /* Add padding for better spacing */
    }

    .hidden-menu ul li a:hover {
        text-decoration: underline;
    }

            
    </style>
</head>
<body>

    <h1 class="top-header">
          
    </h1>
    
     <!-- Burger Menu -->
    <div class="burger-menu">
        <img src="./images/burger-icon.png" alt="Menu Icon" class="burger-icon" onclick="toggleMenu()">
    </div>
   <!-- Dropdown Menu -->
     <div id="menu" class="hidden-menu">
        <ul>
            <li><a href="index.html">* Home</a></li>
            <li><a href="RashiBhavishya.html">* दैनिक राशी भविष्य</a></li>
            <li><a href="shop.html">* राशी रत्न</a></li>
            
        </ul>
    </div>

     
     <h1>||ॐ|| पंचांग ||卐||</h1>
     <div class="additional-text">
        <p><strong>${todayDate}</strong></p>
    </div>
    <div class="panchang-container">
        <div class="panchang-detail"><strong>${translatedData.var1}</strong></div>
        <div class="panchang-detail"><strong>${translatedData.savastar}</strong></div>
        <div class="panchang-detail"><strong>${translatedData.tithi}</strong></div>
        <div class="panchang-detail"><strong>${translatedData.aayan}</strong></div>
        <div class="panchang-detail"><strong>${translatedData.rutu}</strong></div>
        <div class="panchang-detail"><strong>${translatedData.nakshatra}</strong></div>
        <div class="panchang-detail"><strong>${translatedData.karan}</strong></div>
        <div class="panchang-detail"><strong>${translatedData.yoga}</strong></div>
        <div class="panchang-detail"><strong>${translatedData.rassi}</strong></div>
        <div class="panchang-detail"><strong>${translatedData.dinmaan}</strong></div>
        <div class="panchang-detail"><strong>${translatedData.rahuKaal}</strong></div>
        <div class="panchang-detail"><strong>दिनविशेष: ${specialDetails}</strong></div>
        <div class="additional-text"><strong>गोचर</strong></div>
        <div class="panchang-detail"><strong>${translatedData.sunGochaar}</strong><strong>, ${translatedData.guruGochaar}</strong><strong>, ${translatedData.shaniGochaar}</strong></div></div>
        
    </div>
    
    <div class="additional-text">
    
        <p><strong>ज्योतिषाचार्य</strong></p>
        <p>डॉ सौ.मीरा.बी.काळे (वेदांग ज्योतिष)</p>
            <div class="flex-container">
        </div>
    </div>
     
</body>
<script>
    function toggleMenu() {
        const menu = document.getElementById('menu');
        if (menu.style.display === 'block') {
            menu.style.display = 'none';
        } else {
            menu.style.display = 'block';
        }
    }

    // Get the current day (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
        const currentDay = new Date().getDay();

        // Get the body element
        const bodyElement = document.getElementById('main-body');

        // Change the text color to black if it's Monday (1)
        if (currentDay === 1) {
            bodyElement.style.color = 'black';
        }
</script>
</html>
`

// Write the HTML content to a file
fs.writeFileSync('panchang.html', htmlContent)

console.log('HTML file generated successfully.')

