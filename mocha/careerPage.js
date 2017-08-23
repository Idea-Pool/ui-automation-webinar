'use strict';

class CareerPage {
    constructor() {
        this.$ = {
            logo: element(by.css('a.logo')),
            searchForm: element(by.css(''))
        }
    }

    load() {
        browser.get('https://epam.com/careers');
        return browser.wait(ec.elementToBeClickable(this.$.logo), GLOBAL_TIMEOUT);
    }
}

module.exports = CareerPage;