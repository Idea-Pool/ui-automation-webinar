'use strict';

const CareerPage = require('../careerPage');

describe('Search for a job - CareerPage', function () {
    this.timeout(GLOBAL_TIMEOUT);

    const careerPage = new CareerPage();

    beforeEach(() => {
        return careerPage.load();
    });

    describe('Page', () => {
        it('should be opened', () => {
            return expect(careerPage.$.logo.isDisplayed()).to.eventually.be.true;
        });
    });

    describe('Search form', () => {
        it('shold be displayed', () => {
            return expect(careerPage.$.searchForm.isDisplayed()).to.eventually.be.true;
        });
    });
});