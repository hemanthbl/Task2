This repository contains JavaScript test framework using WebdriverIO, Mocha with Chai libraries and Allure reporting structure.  

Steps for execution

1. Installation
   - Node.js should be installed from "https://nodejs.org/en/download/"
  - To check node.js is installed or not type node -v command and run, you should see node.js version

2. Visual studio code has to be installed to import the project also make sure to Install dependencies
   - After project import just make sure all dependencies are imported under "/node_modules" by running command "npm install" on terminal

3. Run test cases
   - In terminal run "./node_modules/.bin/wdio wdio.conf.js" which will execute the browser test cases reside in /tests folder
   - Shortcut is F5 Key or use keyword "npm run browser_test" on terminal to initiate the execution

Alternatively

1. Install Node Version Manager
2. nvm use 12
3. npm install
4. npm run browser_test or shortcut  F5

After execution is completed html-reports can be viewed on “./reports” folder and timeline reports on TimeLineReport folder

Last run reports are available in the respective project reports folders for now, FYR