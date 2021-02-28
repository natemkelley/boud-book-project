const puppeteer = require("puppeteer");
const AR_URL = "https://www.arbookfind.com/";

async function _goToSearchPage(page) {
  await page.goto(AR_URL, {
    waitUntil: "networkidle0",
  });
  await page.screenshot({ path: "example1.png" });
  await page.evaluate(() => {
    document.getElementById("radTeacher").checked = true;
  });
  console.log(page.url());
  await page.screenshot({ path: "example2.png" });
  await page.click("#btnSubmitUserType", {
    waitUntil: "networkidle0",
  });
  await page.screenshot({ path: "example3.png" });
  return page;
}

async function _performSearch(page, search = "East of Eden") {
  const id = "ctl00_ContentPlaceHolder1_txtKeyWords";
  const btnid = "ctl00_ContentPlaceHolder1_btnDoIt";
  await page.type(`#${id}`, search);
  await page.screenshot({ path: "example4.png" });
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
  await page.screenshot({ path: "example6.png" });
  return page;
}

async function _parseResults(page) {
  //TODO
  return page;
}

(async () => {
  const browser = await puppeteer.launch();
  let page = await browser.newPage();
  page = await _goToSearchPage(page);
  console.log(page.url());
  page = await _performSearch(page);
  await page.screenshot({ path: "example5.png" });
  page = await _clickOnResult(page);
  console.log(page.url());
  _parseResults(page);

  await browser.close();
})();
