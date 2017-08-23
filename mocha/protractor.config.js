'use strict';

const GLOBAL_TIMEOUT = 40e3;

exports.config = {
    specs: 'specs/**/*.spec.js',
    capabilities: {
        browserName: 'chrome'
    },
    directConnect: true,
    mochaOpts: {
        reporter: 'spec'
    },
    framework: 'mocha',
    getPageTimeout: GLOBAL_TIMEOUT,
    onPrepare: function () {
        global.GLOBAL_TIMEOUT = GLOBAL_TIMEOUT;
        global.ec = protractor.ExpectedConditions;

        const chai = require('chai');
        chai.use(require('chai-as-promised'));
        global.expect = chai.expect;

        browser.waitForAngularEnabled(false);
        return browser.manage().window().maximize();
    }
};