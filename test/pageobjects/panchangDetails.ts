import { $ } from '@wdio/globals'
import Page from './page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class PanchangDetails extends Page {
    /**
     * define selectors using getter methods
     */
    get tithi () {
        return $('(//div[@class="dpTableCell dpTableValue"])[5]');
    }
    get tithi2 () {
        return $('(//div[@class="dpTableCell dpTableValue"])[7]');
    }
    get nakshatra () {
        return $('//h3[contains(text(), "पञ्चाङ्ग")]//following::div[7]');
    }
    get yoga () {
        return $('(//div[@class="dpTableCell dpTableValue"])[9]');
    }
    get karan () {
        return $('(//div[@class="dpTableCell dpTableValue"])[10]');
    }
    get karan2 () {
        return $('(//div[@class="dpTableCell dpTableValue"])[12]');
    }
    get var () {
        return $('//div[contains(text(), "वार")]//following::div[1]');
    }
    get rahuKaal () {
        return $('(//div[@class="dpTableCell dpTableValue"])[53]');
    }
    get rassi () {
        return $('(//div[@class="dpTableCell dpTableValue"])[25]');
    }
    get savastar1 () {
        return $('//*[@id="dpPHeaderId"]/div[1]/div[1]/div[1]/div[2]/div[2]');
    }
    get savastar2 () {
        return $('//*[@id="dpPHeaderId"]/div[1]/div[1]/div[1]/div[2]/div[3]');
    }
    get dinmaan () {
        return $('//div[contains(text(),"दिनमान")]//following::div[1]');
    }
    get rutu () {
        return $('//div[contains(text(),"द्रिक ऋतु")]//following::div[1]');
    }
    get aayan () {
        return $('//div[contains(text(),"द्रिक अयन")]//following::div[1]');
    }
    get sunGochaar () {
        return $('//*[@id="dp-planet-table"]/div/div[3]/div[1]//following::div[1]//strong');
    }
    get guruGochaar () {    
        return $('//*[@id="dp-planet-table"]/div/div[7]/div[1]//following::div[1]//strong');
    }
    get shaniGochaar () {
        return $('//*[@id="dp-planet-table"]/div/div[9]/div[1]//following::div[1]//strong');
    }
    get moonImage () {
        return $('#moon_img');
    }
}

export default new PanchangDetails();
