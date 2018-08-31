const data = {
    "Country": "Hungary",
    "City": "Debrecen",
    "Department": "Software Test Engineering",
    "PositionName": "Test Automation Engineer"
};


describe('Search for a job: ' + data.PositionName, function () {
    beforeEach(() => {
        cy.viewport(1280, 800);
        cy.visit("https://www.epam.com/careers");
    });

    describe('Page', () => {
        it('should be opened', () => {
            cy.get('a.header__logo-container').should('be.visible');
        });
    });

    describe('Search form', () => {
        it('should be displayed', () => {
            cy.get('form.job-search__form').should('be.visible');
        });

        describe('Location Filter Box', () => {
            beforeEach(() => {
                //return careerPage.selectCityInCountry(data.Country, data.City);
            });

            it(`should be able to select city (${data.City}) and country (${data.Country})`, () => {
                //return expect(careerPage.getSelectedCity()).to.eventually.equal(data.City);
                expect(true).to.be.false;
            });
        });

        describe('Department Filter Box', () => {
            beforeEach(() => {
                //return careerPage.toggleDepartment(data.Department);
            });

            it(`should be able to select department (${data.Department})`, () => {
                //return expect(careerPage.selectedDepartments.getText()).to.eventually.contain(data.Department);
                expect(true).to.be.false;
            });
        });

        describe('Searching', () => {
            let position;

            beforeEach(() => {
                //careerPage.selectCityInCountry(data.Country, data.City);
                //careerPage.toggleDepartment(data.Department);
                //return careerPage.search().then(() => {
                    //position = careerPage.getResultByPosition(data.PositionName);
                //});
            });

            it(`should have proper job found (${data.PositionName})`, () => {
                //return expect(position.isDisplayed()).to.eventually.be.true;
                expect(true).to.be.false;
            });

            it(`should have job with proper department (${data.Department})`, () => {
                //return expect(careerPage.departmentOfPosition(position).getText()).to.eventually.equal(data.Department);
                expect(true).to.be.false;
            });

            it(`should have job with proper country (${data.Country}) and city (${data.City})`, () => {
                //return expect(careerPage.locationOfPosition(position).getText().then(text => text.replace(/\s/g, ' '))).to.eventually.equal(`${data.City}, ${data.Country}`);
                expect(true).to.be.false;
            });

            it(`should have apply button for job`, () => {
                //return expect(careerPage.applyLinkOfPosition(position).isDisplayed()).to.eventually.be.true;
                expect(true).to.be.false;
            });

            describe('Applying to position', () => {
                beforeEach(() => {
                    //return careerPage.applyForPosition(position);
                });

                it(`should have displayed the name (${data.PositionName}) of the position`, () => {
                    //return expect(careerPage.jobDescription.getText()).to.eventually.contain(data.PositionName);
                    expect(true).to.be.false;
                });

                it(`should have displayed the city (${data.City}) of the position`, () => {
                    //return expect(careerPage.jobDescription.getText()).to.eventually.contain(data.City);
                    expect(true).to.be.false;
                });
            });
        });
    });
});
