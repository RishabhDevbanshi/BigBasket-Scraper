/* 
  IMPORTANT : make a file named cient_secret.json in root with your credentials before running this script.
*/



const puppeteer = require("puppeteer");
require("dotenv").config();
const fetchData = require("./fetchData");
const writeSheets = require("./addToSheets");

const links = [];
const infoArray = [];
links.push("https://www.bigbasket.com/cl/baby-care/?nc=nb");
links.push("https://www.bigbasket.com/cl/bakery-cakes-dairy/?nc=nb");
links.push("https://www.bigbasket.com/cl/fruits-vegetables/?nc=nb");
links.push("https://www.bigbasket.com/cl/snacks-branded-foods/?nc=nb");
links.push("https://www.bigbasket.com/cl/beauty-hygiene/?nc=nb");

const writeInSpreadSheet = async (productInfo) => {
  try {
    await writeSheets(productInfo);
  } catch (err) {
    console.log(err.message);
  }
};

(async () => {
  try {
    const browser = await puppeteer.launch({
      headless: false,
      args: ["--start-maximized"],
      defaultViewport: null,
    });

    const page = await browser.newPage();
    for (let i = 0; i < links.length; i++) {
      const res = await fetchData(page, links[i]);
      infoArray.push(res);
    }
    // console.log(infoArray);
    browser.close();

    // console.log(infoArray[0][0]);

    //make new sheet

    // const array = Object.values(infoArray[0][0]);
    // writeInSpreadSheet(array);

    for (let i = 0; i < infoArray.length; i++) {
      for (let j = 0; j < infoArray[i].length; j++) {
        const array = Object.values(infoArray[i][j]);
        await writeInSpreadSheet(array);
      }
    }
  } catch (error) {
    console.log(error);
  }
})();
