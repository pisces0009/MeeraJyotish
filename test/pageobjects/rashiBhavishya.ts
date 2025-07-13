import { $ } from '@wdio/globals'
import Page from './page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class RashiBhavishya extends Page {
    /**
     * define selectors using getter methods
     */
    get dayAndDate() {
        return $('/html/body/div[5]/div[3]/div[3]/div[1]/div[2]/div')
    }
 get rashiName() { 
    return $('(//h2[@class="dpRashiTitle dpRedTitle"])[1]')
  }

  get rashiFal() {
    return $('(//p[@class="dpContent"])[1]')
  }

  get vrishabhaRashi() {
    return $('/html/body/div[4]/div[3]/div[3]/div[8]/a[2]')
  }
  get mithunRashi() {
    return $('//img[@alt="Mithuna Rashifal"]')
  }
  get karkaRashi() {
    return $('//img[@alt="Karka Rashifal"]')
  } 
  get simhaRashi() {
    return $('//img[@alt="Simha Rashifal"]')
  }
  get kanyaRashi() {
    return $('//img[@alt="Kanya Rashifal"]')
  }
    get tulaRashi() {
        return $('//img[@alt="Tula Rashifal"]')
    }
    get vrishchikaRashi() {
        return $('//img[@alt="Vrishchika Rashifal"]')
    }
    get dhanuRashi() {
        return $('//img[@alt="Dhanu Rashifal"]')
    }
    get makarRashi() {
        return $('//img[@alt="Makara Rashifal"]')
    }
    get kumbhaRashi() {
        return $('//img[@alt="Kumbha Rashifal"]')
    }
    get meenRashi() {
        return $('//img[@alt="Meena Rashifal"]')
    }
    get rashiIcon() {
        return $('/html/body/div[4]/div[3]/div[3]/div[1]/div[1]/img')
    }
}

export default new RashiBhavishya();