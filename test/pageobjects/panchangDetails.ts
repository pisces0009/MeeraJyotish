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
        return $('/html/body/div[5]/div[3]/div[11]/div[2]/div/div[3]/div[2]');
    }
    get karan () {
        return $("//div[contains(text(), 'करण')]//following::div[1]");
    }
    get karan2 () {
        return $("//div[contains(text(), 'करण')]//following::div[8]");
    }
    get var () {
        return $('//div[contains(text(), "वार")]//following::div[1]');
    }
    get rahuKaal () {
        return $('/html/body/div[5]/div[3]/div[11]/div[8]/div/div[1]/div[2]');
    }
    get rassi () {
        return $('/html/body/div[5]/div[3]/div[11]/div[4]/div/div[1]/div[2]');
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
