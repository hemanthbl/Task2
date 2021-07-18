const { ReportAggregator, HtmlReporter } = require("@rpii/wdio-html-reporter");
const { TimelineService } = require("wdio-timeline-reporter/timeline-service");
const configuration = require("./libraries/configuration.util");

//modHeader method in configuration.util.js will process the arguments and return the headers
const modHeaders = configuration.modHeader;
// global.environment = configuration.environment;

exports.config = {
	//
	// ====================
	// Runner Configuration
	// ====================
	//
	// WebdriverIO allows it to run your tests in arbitrary locations (e.g. locally or
	// on a remote machine).
	runner: "local",
	//
	//Selenium Grid Settings
	// hostname:'172.17.0.2',
	// port:4445,
	//
	// Override default path ('/wd/hub') for chromedriver service.
	path: "/",
	//
	// ==================
	// Specify Test Files
	// ==================
	// Define which test specs should run. The pattern is relative to the directory
	// from which `wdio` was called. Notice that, if you are calling `wdio` from an
	// NPM script (see https://docs.npmjs.com/cli/run-script) then the current working
	// directory is where your package.json resides, so `wdio` will be called from there.
	//
	specs: ["./tests/Wishlist_Delete.js"],
	// Patterns to exclude.
	exclude: [
		// 'path/to/excluded/files'
	],
	//
	// ============
	// Capabilities
	// ============
	// Define your capabilities here. WebdriverIO can run multiple capabilities at the same
	// time. Depending on the number of capabilities, WebdriverIO launches several test
	// sessions. Within your capabilities you can overwrite the spec and exclude options in
	// order to group specific specs to a specific capability.
	//
	// First, you can define how many instances should be started at the same time. Let's
	// say you have 3 different capabilities (Chrome, Firefox, and Safari) and you have
	// set maxInstances to 1; wdio will spawn 3 processes. Therefore, if you have 10 spec
	// files and you set maxInstances to 10, all spec files will get tested at the same time
	// and 30 processes will get spawned. The property handles how many capabilities
	// from the same test should run tests.
	//
	maxInstances: 10,
	//
	// If you have trouble getting all important capabilities together, check out the
	// Sauce Labs platform configurator - a great tool to configure your capabilities:
	// https://docs.saucelabs.com/reference/platforms-configurator
	//
	capabilities: [
		{
			// maxInstances can get overwritten per capability. So if you have an in-house Selenium
			// grid with only 5 firefox instances available you can make sure that not more than
			// 5 instances get started at a time.
			maxInstances: 5,
			//
			browserName: "chrome",
			"goog:chromeOptions": {
				extensions: [
					(function () {
						try {
							const webExt = require("fs")
								.readFileSync("./extension_2_5_4_0.crx")
								.toString("base64");
							return webExt;
						} catch (e) {
							console.log(
								e,
								"An error occurred while to parse extension zip file!"
							);
						}
					})(),
				],
				args: ["−−lang=es",'--disable-backgrounding-occluded-windows'],
				
			},

			// If outputDir is provided WebdriverIO can capture driver session logs
			// it is possible to configure which logTypes to include/exclude.
			// excludeDriverLogs: ['*'], // pass '*' to exclude all driver session logs
			// excludeDriverLogs: ['bugreport', 'server'],
		},
	],

	//
	// ===================
	// Test Configurations
	// ===================
	// Define all options that are relevant for the WebdriverIO instance here
	//
	// Level of logging verbosity: trace | debug | info | warn | error | silent
	logLevel: "info",
	//
	// Set specific log levels per logger
	// loggers:
	// - webdriver, webdriverio
	// - @wdio/applitools-service, @wdio/browserstack-service, @wdio/devtools-service, @wdio/sauce-service
	// - @wdio/mocha-framework, @wdio/jasmine-framework
	// - @wdio/local-runner, @wdio/lambda-runner
	// - @wdio/sumologic-reporter
	// - @wdio/cli, @wdio/config, @wdio/sync, @wdio/utils
	// Level of logging verbosity: trace | debug | info | warn | error | silent
	// logLevels: {
	//     webdriver: 'info',
	//     '@wdio/applitools-service': 'info'
	// },
	//
	// If you only want to run your tests until a specific amount of tests have failed use
	// bail (default is 0 - don't bail, run all tests).
	bail: 0,
	//
	// Set a base URL in order to shorten url command calls. If your `url` parameter starts
	// with `/`, the base url gets prepended, not including the path portion of your baseUrl.
	// If your `url` parameter starts without a scheme or `/` (like `some/path`), the base url
	// gets prepended directly.
	 baseUrl: 'https://www.westwingnow.de',
	// Default timeout for all waitFor* commands.
	waitforTimeout: 60000,
	//
	// Default timeout in milliseconds for request
	// if browser driver or grid doesn't send response
	connectionRetryTimeout: 90000,
	//
	// Default request retries count
	connectionRetryCount: 3,
	//
	// Test runner services
	// Services take over a specific job you don't want to take care of. They enhance
	// your test setup with almost no effort. Unlike plugins, they don't add new
	// commands. Instead, they hook themselves up into the test process.
	services: ["chromedriver", [TimelineService]],

	// Framework you want to run your specs with.
	// The following are supported: Mocha, Jasmine, and Cucumber
	// see also: https://webdriver.io/docs/frameworks.html
	//
	// Make sure you have the wdio adapter package for the specific framework installed
	// before running any tests.
	framework: "mocha",
	//
	// The number of times to retry the entire specfile when it fails as a whole
	// specFileRetries: 1,
	//
	// Test reporter for stdout.
	// The only one supported by default is 'dot'
	// see also: https://webdriver.io/docs/dot-reporter.html
	reporters: [
		"spec",
		"concise",
		[
			"allure",
			{
				outputDir: "allure-results",
				disableWebdriverStepsReporting: true,
				disableWebdriverScreenshotsReporting: true,
				disableMochaHooks: false,
			},
		],
		"dot",
		[
			HtmlReporter,
			{
				debug: true,
				outputDir: "./reports/html-reports/",
				filename: "report.html",
				reportTitle: "Test Report Title",

				//to show the report in a browser when done
				showInBrowser: true,

				//to turn on screenshots after every test
				useOnAfterCommandForScreenshot: true,

				// to use the template override option, can point to your own file in the test project:
				// templateFilename: path.resolve(__dirname, '../template/wdio-html-reporter-alt-template.hbs'),

				// to add custom template functions for your custom template:
				// templateFuncs: {
				//     addOne: (v) => {
				//         return v+1;
				//     },
				// },

				//to initialize the logger
				//  LOG: log4j.getLogger("default")
			},
		],
		["timeline", { outputDir: "./TimeLineReport" }],
	],

	//reporters: ['spec',['mochawesome',{outputDir: './Results',outputFileFormat: function(opts) {
	//  return `results-${opts.cid}.${opts.capabilities}.json`
	//}}]],

	//
	// Options to be passed to Mocha.
	// See the full list at http://mochajs.org/
	mochaOpts: {
		ui: "bdd",
		timeout: 900000,
	},
	//
	// =====
	// Hooks
	// =====
	// WebdriverIO provides several hooks you can use to interfere with the test process in order to enhance
	// it and to build services around it. You can either apply a single function or an array of
	// methods to it. If one of them returns with a promise, WebdriverIO will wait until that promise got
	// resolved to continue.
	/**
	 * Gets executed once before all workers get launched.
	 * @param {Object} config wdio configuration object
	 * @param {Array.<Object>} capabilities list of capabilities details
	 */
	// onPrepare: function (config, capabilities) {
	// },
	/**
	 * Gets executed just before initialising the webdriver session and test framework. It allows you
	 * to manipulate configurations depending on the capability or spec.
	 * @param {Object} config wdio configuration object
	 * @param {Array.<Object>} capabilities list of capabilities details
	 * @param {Array.<String>} specs List of spec file paths that are to be run
	 */
	// beforeSession: function (config, capabilities, specs) {
	// },
	/**
	 * Gets executed before test execution begins. At this point you can access to all global
	 * variables like `browser`. It is the perfect place to define custom commands.
	 * @param {Array.<Object>} capabilities list of capabilities details
	 * @param {Array.<String>} specs List of spec file paths that are to be run
	 */

	//  before: function () {
	//     browser.maximizeWindow()
	// },

	//Block of code to pass headers
	/*
     before: function () {
        browser.url('chrome-extension://idgpnmonknjnojddfkpgkljpfnnfcklj/icon.png')

        browser.execute(function () {
            this.localStorage.setItem('profiles', JSON.stringify([{title: 'Selenium', hideComment: true, appendMode: '',headers: [{enabled: true, name: 'DR_TEST', value: 'GCP', comment:''}, {enabled: true, name: 'x-presentation-version', value: 'helix', comment:''}],respHeaders: [],filters: []}]));
            
            const x = this.localStorage.getItem('profiles');
            console.log("x: ", x);
            })

        browser.url("/")
    //   browser.setLocalStorage('profiles', JSON.stringify([{title: 'Selenium', hideComment: true, appendMode: '',headers: [{enabled: true, name: 'DR_TEST', value: 'GCP', comment:''},],respHeaders: [],filters: []}]));
     //browser.localStorage('POST', {key: 'DR_TEST', value: 'GCP'}); 
     //client.execute(() =>
     //localStorage.setItem('profiles', JSON.stringify([{title: 'Selenium', hideComment: true, appendMode: '',headers: [{enabled: true, name: 'DR_TEST', value: 'GCP', comment:''},],respHeaders: [],filters: []}]);

      browser.maximizeWindow()
    },
    */
	/**
	 * Runs before a WebdriverIO command gets executed.
	 * @param {String} commandName hook command name
	 * @param {Array} args arguments that command would receive
	 */
	// beforeCommand: function (commandName, args) {
	// },
	/**
	 * Hook that gets executed before the suite starts
	 * @param {Object} suite suite details
	 */
	before: function () {
		browser.maximizeWindow();
		// using arguments to pass headers
		if (modHeaders[0].headers.length != 0) {
			browser.url(
				"chrome-extension://idgpnmonknjnojddfkpgkljpfnnfcklj/icon.png"
			);
			let headers = browser.execute((arg) => {
				this.localStorage.setItem("profiles", JSON.stringify(arg));
				return this.localStorage.getItem("profiles");
			}, modHeaders);
			console.log(headers);
		}
	},
	/**
	 * Function to be executed before a test (in Mocha/Jasmine) starts.
	 */
	beforeTest: function () {
		const chai = require("chai");
		const chaiWebdriver = require("chai-webdriverio").default;
		chai.use(chaiWebdriver(browser));
		global.assert = chai.assert;
		global.should = chai.should;
		global.expect = chai.expect;
		browser.url("/");
		//   browser.setLocalStorage('profiles', JSON.stringify([{title: 'Selenium', hideComment: true, appendMode: '',headers: [{enabled: true, name: 'DR_TEST', value: 'GCP', comment:''},],respHeaders: [],filters: []}]));
		//browser.localStorage('POST', {key: 'DR_TEST', value: 'GCP'});
		//client.execute(() =>
		//localStorage.setItem('profiles', JSON.stringify([{title: 'Selenium', hideComment: true, appendMode: '',headers: [{enabled: true, name: 'DR_TEST', value: 'GCP', comment:''},],respHeaders: [],filters: []}]);
	},
	/**
	 * Hook that gets executed _before_ a hook within the suite starts (e.g. runs before calling
	 * beforeEach in Mocha)
	 */
	// beforeHook: function (test, context) {
	// },
	/**
	 * Hook that gets executed _after_ a hook within the suite starts (e.g. runs after calling
	 * afterEach in Mocha)
	 */
	// afterHook: function (test, context, { error, result, duration, passed, retries }) {
	// },
	/**
	 * Function to be executed after a test (in Mocha/Jasmine).
	 */
	// afterTest: function(test, context, { error, result, duration, passed, retries}) {

	//     {
	//         if(test.passed)
	//         {
	//             return;
	//         }
	//         var filename = encodeURIComponent(test.title.replace(/\s+/g, '-'));
	//         var filePath = './reports/screenshots/' + filename + '.png';
	//         browser.saveScreenshot(filePath);
	//     }
	// },
	afterTest: function (
		test,
		context,
		{ error, result, duration, passed, retries }
	) {
		//     const path = require('path');
		//     const moment = require('moment');
		const fs = require("fs");
		if (!fs.existsSync("./screenshots")) fs.mkdirSync("./screenshots");
		// if test passed, ignore, else take and save screenshot.
		if (passed) return;
		var filename = encodeURIComponent(test.title.replace(/\s+/g, "-"));
		var filePath = "./screenshots/" + filename + ".png";
		browser.saveScreenshot(filePath);
	},

	/**
	 * Hook that gets executed after the suite has ended
	 * @param {Object} suite suite details
	 */
	// afterSuite: function (suite) {
	// },
	/**
	 * Runs after a WebdriverIO command gets executed
	 * @param {String} commandName hook command name
	 * @param {Array} args arguments that command would receive
	 * @param {Number} result 0 - command success, 1 - command error
	 * @param {Object} error error object if any
	 */
	// afterCommand: function (commandName, args, result, error) {
	// },
	/**
	 * Gets executed after all tests are done. You still have access to all global variables from
	 * the test.
	 * @param {Number} result 0 - test pass, 1 - test fail
	 * @param {Array.<Object>} capabilities list of capabilities details
	 * @param {Array.<String>} specs List of spec file paths that ran
	 */
	// after: function (result, capabilities, specs) {
	// },
	/**
	 * Gets executed right after terminating the webdriver session.
	 * @param {Object} config wdio configuration object
	 * @param {Array.<Object>} capabilities list of capabilities details
	 * @param {Array.<String>} specs List of spec file paths that ran
	 */
	// afterSession: function (config, capabilities, specs) {
	// },
	/**
	 * Gets executed after all workers got shut down and the process is about to exit. An error
	 * thrown in the onComplete hook will result in the test run failing.
	 * @param {Object} exitCode 0 - success, 1 - fail
	 * @param {Object} config wdio configuration object
	 * @param {Array.<Object>} capabilities list of capabilities details
	 * @param {<Object>} results object containing test results
	 */
	// onComplete: function(exitCode, config, capabilities, results) {
	// },

	// onComplete: function (exitCode, config, capabilities, results) {
	//  //   const mergeResults = require('wdio-mochawesome-reporter/mergeResults')
	//  //   mergeResults('./Results', "results-*")

	//   }

	/**
	 * Gets executed when a refresh happens.
	 * @param {String} oldSessionId session ID of the old session
	 * @param {String} newSessionId session ID of the new session
	 */
	//onReload: function(oldSessionId, newSessionId) {
	//}

	onPrepare: function () {
		let reportAggregator = new ReportAggregator({
			outputDir: "./reports/html-reports/",
			filename: "master-report.html",
			reportTitle: "Master Report",
			// browserName : browser.capabilities.browserName,
			// to use the template override option, can point to your own file in the test project:
			// templateFilename: path.resolve(__dirname, '../template/wdio-html-reporter-alt-template.hbs')
		});
		reportAggregator.clean();

		global.reportAggregator = reportAggregator;

		try {
			const fs = require("fs");
			if (fs.existsSync("./screenshots"))
				fs.rmdirSync("./screenshots", { recursive: true });
			fs.mkdirSync("./screenshots");
			const createStream = fs.createWriteStream(
				"./screenshots/test.json"
			);
			createStream.write("{}");
			createStream.end();
		} catch (err) {
			console.log(err);
		}
	},

	onComplete: function (exitCode, config, capabilities, results) {
		(async () => {
			await global.reportAggregator.createReport();
		})();
	},
};
