'use strict';

exports.config = {
    specs: 'specs/**/*.spec.js',
    capabilities: {
        browserName: 'chrome'
    },
    directConnect: true,
    mochaOpts: {
        reporter: 'spec'
    },
    framework: 'mocha'
};