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
        '14 Mar 2025': 'करीदिन',
        '15 Mar 2025': 'चांगला दिवस',
        '16 Mar 2025': 'उत्तम दिवस',
        '17 Mar 2025': '20 नंतर चांगला',
        '18 Mar 2025': '18 प. चांगला',
        '19 Mar 2025': 'विशाखा वर्ज्य',
        '20 Mar 2025': 'उत्तम दिवस',
        '21 Mar 2025': 'जेष्ठा वर्ज्य',
        '22 Mar 2025': '19 नंतर चांगला',
        '23 Mar 2025': 'चांगला दिवस',
        '24 Mar 2025': '17 प. चांगला',
        '25 Mar 2025': 'चांगला दिवस',
        '26 Mar 2025': 'शुभ दिवस',
        '27 Mar 2025': 'त्रयोदशी वर्ज्य',
        '28 Mar 2025': 'चतुर्दशी वर्ज्य',
        '29 Mar 2025': 'अमावास्या वर्ज्य'
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
        // Store tithi in a JSON file
        const data = { tithi }
        fs.writeFileSync('tithi.json', JSON.stringify(data, null, 2))
       
        //store nakshatra in a JSON file
        const data1 = { nakshatra }
        fs.writeFileSync('nakshatra.json', JSON.stringify(data1, null, 2))
        //store yoga in a JSON file
        const data2 = { yoga }
        fs.writeFileSync('yoga.json', JSON.stringify(data2, null, 2))
        //store karan in a JSON file
        const data3 = { karan }
        fs.writeFileSync('karan.json', JSON.stringify(data3, null, 2))
        //store var in a JSON file
        const data4 = { var1 }
        fs.writeFileSync('var.json', JSON.stringify(data4, null, 2))
        //store rahuKaal in a JSON file
        const data5 = { rahuKaal }
        fs.writeFileSync('rahuKaal.json', JSON.stringify(data5, null, 2))
        //store rassi in a JSON file
        const data6 = { rassi }
        fs.writeFileSync('rassi.json', JSON.stringify(data6, null, 2))
        //store savastar in a JSON file
        const data7 = { savastar }
        fs.writeFileSync('savastar.json', JSON.stringify(data7, null, 2))
        //store dinmaan in a JSON file
        const data8 = { dinmaan }  
        fs.writeFileSync('dinmaan.json', JSON.stringify(data8, null, 2))
        //store rutu in a JSON file
        const data9 = { rutu }
        fs.writeFileSync('rutu.json', JSON.stringify(data9, null, 2))
        //store aayan in a JSON file
        const data10 = { aayan }
        fs.writeFileSync('aayan.json', JSON.stringify(data10, null, 2))
        //store sunGochaar in a JSON file                                   
        const data11 = { sunGochaar }
        fs.writeFileSync('sunGochaar.json', JSON.stringify(data11, null, 2))
        //store guruGochaar in a JSON file
        const data12 = { guruGochaar }
        fs.writeFileSync('guruGochaar.json', JSON.stringify(data12, null, 2))
        //store shaniGochaar in a JSON file
        const data13 = { shaniGochaar } 
        fs.writeFileSync('shaniGochaar.json', JSON.stringify(data13, null, 2))
        
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
    savastar: "शके 1946 क्रोधी संवत्सर, फाल्गुन, " + savastarData.savastar,
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
        body {
            background-image: url('${backgroundImage}');
            background-size: cover;
            color: black; /* Change the text color as desired */
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
        }
        .additional-text {
            font-weight: bold;
            color: red; /* Change the color as desired */
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
            
    </style>
</head>
<body>
    
    <div class="home-button">
        <a href="index.html">
            <img src="./images/home.png" alt="Home Icon">
        </a>
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
            <img src="images/aai1.png" alt="Circle Image" class="circle-image">
        </div>
    </div>
     
</body>
</html>
`

// Write the HTML content to a file
fs.writeFileSync('panchang.html', htmlContent)

console.log('HTML file generated successfully.')
