const puppeteer = require('puppeteer');

(async() => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    // page.setViewport({ width: 1280, height: 2560 });
    await page.goto('https://www.youtube.com/');
    await page.screenshot({ path: 'example.jpeg', type: 'jpeg', fullPage: true });

    await browser.close();
})();