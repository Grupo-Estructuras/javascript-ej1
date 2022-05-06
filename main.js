const puppeteer = require('puppeteer');
const fs = require('fs');
const {ejecutarScrapGH} = require('./scraping/githubscraper.js');
const execfunc= require('child_process');
// import {ejecutarScrapGH} from './scraping/githubscraper.js';
// scrapGitHub("https://github.com/topics/c")
// ejecutarScrapGH();
process.setMaxListeners(Infinity);



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

async function iniciarProc(){
  await ejecutarScrapGH();
  execfunc.exec(getCommandLine() + ' index.html');
}
iniciarProc();
