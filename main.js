const puppeteer = require('puppeteer');
const fs = require('fs');
const { ejecutarScrapGH } = require ('./scraping/githubscraper.js');
//import {ejecutarScrapGH} from './scraping/githubscraper.js';
//scrapGitHub("https://github.com/topics/c")
//ejecutarScrapGH();
process.setMaxListeners(Infinity);

ejecutarScrapGH();