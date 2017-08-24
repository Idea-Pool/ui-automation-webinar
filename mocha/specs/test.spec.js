'use strict';

const CareerPage = require('../../pageObjects/careerPage');
const careerPage = new CareerPage();

const testData = require('../data.json');

testData.forEach(data => {
    describe('Search for a job: ' + data.PositionName, function () {
        this.timeout(GLOBAL_TIMEOUT);

        beforeEach(() => {
            return careerPage.load();
        });

        describe('Page', () => {
            it('should be opened', () => {
                return expect(careerPage.logo.isDisplayed()).to.eventually.be.true;
            });
        });

        describe('Search form', () => {
            it('should be displayed', () => {
                return expect(careerPage.searchForm.isDisplayed()).to.eventually.be.true;
            });

            describe('Location Filter Box', () => {
                beforeEach(() => {
                    return careerPage.selectCityInCountry(data.Country, data.City);
                });

                it(`should be able to select city (${data.City}) and country (${data.Country})`, () => {
                    return expect(careerPage.getSelectedCity()).to.eventually.equal(data.City);
                });
            });

            describe('Department Filter Box', () => {
                beforeEach(() => {
                    return careerPage.toggleDepartment(data.Department);
                });

                it(`should be able to select department (${data.Department})`, () => {
                    return expect(careerPage.selectedDepartments.getText()).to.eventually.contain(data.Department);
                });
            });

            describe('Searching', () => {
                let position;

                beforeEach(() => {
                    careerPage.selectCityInCountry(data.Country, data.City);
                    careerPage.toggleDepartment(data.Department);
                    return careerPage.search().then(() => {
                        position = careerPage.getResultByPosition(data.PositionName);
                    });
                });

                it(`should have proper job found (${data.PositionName})`, () => {
                    return expect(position.isDisplayed()).to.eventually.be.true;
                });

                it(`should have job with proper department (${data.Department})`, () => {
                    return expect(careerPage.departmentOfPosition(position).getText()).to.eventually.equal(data.Department);
                });

                it(`should have job with proper country (${data.Country}) and city (${data.City})`, () => {
                    return expect(careerPage.locationOfPosition(position).getText().then(text => text.replace(/\s/g, ' '))).to.eventually.equal(`${data.City}, ${data.Country}`);
                });

                it(`should have apply button for job`, () => {
                    return expect(careerPage.applyLinkOfPosition(position).isDisplayed()).to.eventually.be.true;
                });

                describe('Applying to position', () => {
                    beforeEach(() => {
                        return careerPage.applyForPosition(position);
                    });

                    it(`should have displayed the name (${data.PositionName}) of the position`, () => {
                        return expect(careerPage.jobDescription.getText()).to.eventually.contain(data.PositionName);
                    });

                    it(`should have displayed the city (${data.City}) of the position`, () => {
                        return expect(careerPage.jobDescription.getText()).to.eventually.contain(data.City);
                    });
                });
            });
        });
    });
});