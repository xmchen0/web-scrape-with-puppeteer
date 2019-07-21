const puppeteer = require("puppeteer");

void (async () => {
  try {
    const browser = await puppeteer.launch();
    //  The headless option will ccause a oioout window to open
    //  const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    //  await page.goto("https://news.ycombinator.com/");
    await page.goto("https://futurism.com/the-byte");

    await page.screenshot({
      path: "./screenshots/page1.png"
    });
    await page.pdf({
      path: "./pdfs/page1.pdf"
    });

    let news = await page.evaluate(() => {
      let titleNodeList = document.querySelectorAll("a.sc-iwsKbI");
      let listTitle = document.querySelectorAll("div.HedRow");
      let data = [];
      for (let i = 0; i < titleNodeList.length; i++) {
        data[i] = {
          title: listTitle[i].innerText,
          link: `https://futurism.com${titleNodeList[i].getAttribute("href")}`
        };
      }
      return data;
    });
    await browser.close();
    //  Here is where you can add a request to send the information to the backend db
    console.log(news);
    console.log("Successfully closed the browser");
  } catch (error) {
    //  Error handling for the async process
    console.error(error);
  }
})();