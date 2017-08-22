'use strict';

exports.config = {
    specs: 'features/**/*.feature',
    capabilities: {
        browserName: 'chrome'
    },
    directConnect: true,
    cucumberOpts: {
        tags: ['~@wip'],
        format: ['pretty', 'json:cucumber.json']
    },
    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework')
};