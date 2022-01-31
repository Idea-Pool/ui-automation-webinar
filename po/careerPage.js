'use strict'

const { element, browser, protractor } = require("protractor");
var ec = protractor.ExpectedConditions;

class CareerPage {
    constructor(){
        this.logo = element (by.css('.header__logo-container'));
        this.cookieAccept = element (by.css('.cookie-disclaimer__button'));

        this.jobSearchFilterForm = element(by.css('.recruiting-search__form'));
        this.jobSearchButton = element(by.css('.recruiting-search__submit'))
        
        this.locationSelection = this.jobSearchFilterForm.element (by.css('.select2-selection'));
        this.locationFilter = element(by.css('.select2-results > .select2-results__options.open'));
        this.countryOfLocation = country => element(by.css(`li[aria-label="${country}"] strong`));
        this.cityOfLocation = city => element(by.css(`[id*="${city}"]`));
        this.selectedLocation = this.jobSearchFilterForm.element (by.css('.select2-selection__rendered'));

        this.skillsSelection = this.jobSearchFilterForm.element (by.css('.job-search__departments'));
        this.skillsFilter = element(by.css('.multi-select-dropdown'));
        this.getSkillsCheckbox = skill => this.skillsFilter.element (by.css(`[data-value="${skill}"] ~ span`));
        this.skillsCounter = this.skillsSelection.element (by.css('.counter'));

        this.searchResult = element (by.css('.search-result__list'));
        this.jobLocation = element (by.css('.search-result__location'));
        this.jobViewAndApplyButton = element (by.css('.search-result__item-apply'))

    }

    load(){
        browser.get('https://www.epam.com/careers');
        return browser.wait(ec.elementToBeClickable(this.logo), GLOBAL_TIMEOUT);
    };

    async acceptCookie(){
        return await browser.isElementPresent(this.cookieAccept)
        .then(isPresent => {
            if (isPresent) {               
                this.cookieAccept.click();
            }
        });         
    };

   selectCityInCountry(country, city) {
        this.locationSelection.click();
        // need to add check if the location has been already selected
        browser.sleep(1000)
        browser.wait(ec.visibilityOf(this.locationFilter), GLOBAL_TIMEOUT);
        browser.wait(ec.elementToBeClickable(this.countryOfLocation(country)), GLOBAL_TIMEOUT);
        this.countryOfLocation(country).click();

        browser.sleep(1000)
        browser.wait(ec.elementToBeClickable(this.cityOfLocation(city)), GLOBAL_TIMEOUT);
        return this.cityOfLocation(city).click();
    };
    
    async getSelectedCity() {
        return await this.selectedLocation.getText();
    };

    selectSkill(skill) {
        this.skillsSelection.click();
        browser.wait(ec.visibilityOf(this.skillsFilter), 5000);
        return this.getSkillsCheckbox(skill).click();
    }

    async getSelectedSkill() {
        return await this.skillsCounter.getText();
    }

    submitSearch(country, city, skill) {
        this.selectCityInCountry(country, city);
        this.selectSkill(skill);
        return this.jobSearchButton.click();
    }

    async getLocationOfJob() {
        return await this.jobLocation.getText();
    }
    
}

module.exports = CareerPage;