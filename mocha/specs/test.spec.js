"use strict";

const { expect } = require("chai");
const { element, browser } = require("protractor");
const testData2 = {
  country: "Hungary",
  city: "Debrecen",
  department: "Software Test Engineering",
  positionName: "Test Automation Engineer",
};
const testData = {
  country: "Belarus",
  city: "Minsk",
  department: "Software Architecture",
  positionName: "DevOps Architect",
};
const jobFormat = testData.positionName.toLowerCase().split(" ").join("-");

describe("Search for job", function () {
  this.timeout(GLOBAL_TIMEOUT);

  beforeEach(async () => {
    await load();
  });

  describe("Careers page", () => {
    it("should be opened", () => {
      return expect(element(by.css(".header__logo")).isDisplayed()).to.eventually.be.true;
    });
  });

  describe("Search form", () => {
    it("should be displayed", () => {
      expect(element(by.css(".job-search__form")).isDisplayed()).to.eventually.be.true;
    });

    describe("Location Filter Box", () => {
      beforeEach(async () => {
        await selectLocation();
      });

      it("should be able to select city and country", async () => {
        expect(await element(by.css(".select2-selection__rendered")).getText()).to.equal(testData.city);
      });
    });

    describe("Department Filter Box", () => {
      beforeEach(async () => {
        await selectDepartment();
      });

      it("should be able to select department ", () => {
        expect(element(by.css(`li[data-value="${testData.department}"]`)).isEnabled()).to.eventually.be.true;
      });
    });

    describe("Searching", () => {
      beforeEach(async () => {
        await searchJob();
      });

      it("should have proper job found ", async () => {
        expect(await element(by.css(`a.search-result__item-name[href*='.${jobFormat}']`)).isDisplayed()).to.be.true;
      });

      it("should have job with proper location", async () => {
        const location = await element(by.css(".search-result__item"))
          .element(by.cssContainingText(".search-result__location", testData.country))
          .getText();
        expect(await location.includes(testData.country.toUpperCase())).to.be.true;
      });

      it("should have job with description", async () => {
        let desc = await element(by.css(".search-result__item")).element(by.css(".search-result__item-description"));
        expect(await desc.isDisplayed()).to.be.true;
      });

      it("should have apply button for job", async () => {
        expect(await element(by.css(`a.search-result__item-apply[href*='.${jobFormat}']`)).isDisplayed()).to.be.true;
      });
    });

    describe("Applying to position", () => {
      beforeEach(async () => {
        await applyForJob();
        browser.wait(ec.presenceOf(element(by.css(".form-component__description div"))), GLOBAL_TIMEOUT);
      });

      it("should have displayed the name of the position", async () => {
        const position = await element(by.css(".form-component__description div")).getText();
        expect(position).to.equal(testData.positionName);
      });

      it("should have displayed the city of the position", async () => {
        const location = await element(by.css(".form-component__location")).getText();
        expect(location.includes(testData.country.toUpperCase())).to.be.true;
      });
    });
  });
});

async function load() {
  await browser.get("https://www.epam.com/careers");
  browser.wait(ec.elementToBeClickable(element(by.css(".header__logo"))), GLOBAL_TIMEOUT);
  let isPresent = await browser.isElementPresent(by.css(".cookie-disclaimer__button"));
  if (isPresent) {
    await element(by.css(".cookie-disclaimer__button")).click();
  }
}

async function applyForJob() {
  await searchJob();
  browser.wait(
    ec.elementToBeClickable(element(by.cssContainingText(`a[href*='.${jobFormat}']`, "View and apply"))),
    GLOBAL_TIMEOUT
  );
  await element(by.cssContainingText(`a[href*='.${jobFormat}']`, "View and apply")).click();
}

async function searchJob() {
  await selectLocation();
  await selectDepartment();
  await element(by.css(".recruiting-search__submit")).click();
}

async function selectLocation() {
  if ((await element(by.css(".select2-selection__rendered")).getText()) !== testData.city) {
    await element(by.css(".select2-selection__arrow")).click();
    browser.sleep(1000);
    await element(by.css(`li[aria-label="${testData.country}"]`)).click();
    await element(by.css(`[id*="${testData.city}"]`)).click();
  }
}

async function selectDepartment() {
  await element(by.css(".selected-params")).click();
  browser.wait(ec.elementToBeClickable(element(by.css(".multi-select-dropdown-container"))), GLOBAL_TIMEOUT);
  await element(by.xpath(`//span[contains(text(),'${testData.department}')]`)).click();
}
