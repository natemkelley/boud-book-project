import puppeteer from "puppeteer";
import HtmlTableToJson from "html-table-to-json";
import HTMLParser from "node-html-parser";
const AR_URL = "https://www.arbookfind.com/";

const QUERY_PARAMETERS = {
  points: "#ctl00_ContentPlaceHolder1_ucBookDetail_lblPoints",
  level: "#ctl00_ContentPlaceHolder1_ucBookDetail_lblBookLevel",
  interest: "#ctl00_ContentPlaceHolder1_ucBookDetail_lblInterestLevel",
  title: "#ctl00_ContentPlaceHolder1_ucBookDetail_lblBookTitle",
  isbn: "#ctl00_ContentPlaceHolder1_ucBookDetail_tblPublisherTable tr",
  author: "#ctl00_ContentPlaceHolder1_ucBookDetail_lblAuthor",
  wordCount: "#ctl00_ContentPlaceHolder1_ucBookDetail_lblWordCount",
};

async function _goToSearchPage(page) {
  await page.goto(AR_URL, {
    waitUntil: "networkidle0",
  });
  await page.evaluate(() => {
    document.getElementById("radTeacher").checked = true;
  });
  await page.click("#btnSubmitUserType", {
    waitUntil: "networkidle0",
  });
  return page;
}

async function _performSearch(page, search) {
  const id = "ctl00_ContentPlaceHolder1_txtKeyWords";
  const btnid = "ctl00_ContentPlaceHolder1_btnDoIt";
  await page.type(`#${id}`, search);
  await page.click(`#${btnid}`, {
    waitUntil: "networkidle0",
  });
  await page.waitForNavigation({ waitUntil: "networkidle0" });

  return page;
}

async function _clickOnResult(page) {
  await page.click(".book-result a", {
    waitUntil: "networkidle0",
  });
  await page.waitForNavigation({ waitUntil: "networkidle0" });
  return page;
}

function _parseISBNTable(page) {
  return new Promise(async (resolve, reject) => {
    const nodeList = await page.$$eval(QUERY_PARAMETERS.isbn, rowArray =>
      rowArray.map(row => row.outerHTML)
    );

    let returnArray = [];

    //ignore header
    for (let index = 1; index < nodeList.length; index++) {
      const element = nodeList[index];
      const HTMLElement = HTMLParser.parse(element);
      const TDArray = HTMLElement.querySelectorAll("td");
      const data = {
        publisher: TDArray[0].innerText,
        isbn: TDArray[2].innerText,
        yearPublished: TDArray[3].innerText,
        pageCount: TDArray[4].innerText,
      };
      returnArray.push(data);
    }

    resolve(returnArray);
  });
}

async function _parseResults(page, QUERY_PARAMETERS) {
  return new Promise(async (resolve, reject) => {
    const getInnerText = el => el.innerText;
    const points = await page.$eval(QUERY_PARAMETERS.points, getInnerText);
    const level = await page.$eval(QUERY_PARAMETERS.level, getInnerText);
    const interestLevel = await page.$eval(
      QUERY_PARAMETERS.interest,
      getInnerText
    );
    const title = await page.$eval(QUERY_PARAMETERS.title, getInnerText);
    const isbn = await _parseISBNTable(page);

    resolve({
      points: points || false,
      level: level || false,
      interestLevel: interestLevel || false,
      title: title || false,
      isbn: isbn || [],
    });
  });
}

export const getARscore = async search => {
  const browser = await puppeteer.launch();
  let page = await browser.newPage();
  page = await _goToSearchPage(page);
  page = await _performSearch(page, search);
  page = await _clickOnResult(page);
  const results = await _parseResults(page, QUERY_PARAMETERS);
  console.log("results", results);

  await browser.close();
};

getARscore("East of Eden");
