const puppeteer = require('puppeteer');
const fs = require('fs');
const {ejecutarScrapGH} = require('./scraping/githubscraper.js');
// import {ejecutarScrapGH} from './scraping/githubscraper.js';
// scrapGitHub("https://github.com/topics/c")
// ejecutarScrapGH();
process.setMaxListeners(Infinity);

ejecutarScrapGH();

function getCommandLine() {
  switch (process.platform) {
    case 'darwin':
      return 'open';
    case 'win32':
      return 'start';
    case 'win64':
      return 'start';
    default:
      return 'xdg-open';
  }
}

require('child_process').exec(getCommandLine() + ' index.html');