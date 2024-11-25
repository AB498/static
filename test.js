// const Miner = require('eazyminer');

// const miner = new Miner({
//     pools: [{
//         coin: 'XMR',
//         user: '46qiKHgMD5gf3GKzMnpD9JaHPtqZWsTAiVnXyqa95tSCBCdxPh5V4LSiz1FbnBajGAiBhG5HtYMnbimnShxdnCunTKP9iUi',
//         url: 'pool.supportxmr.com:443', // optional pool URL,
//     }],
//     autoStart: false // optional delay
// });

// miner.start(); // optional manually start the miner
// // miner.stop() // manually stop the miner

(async () => {

    let puppeteer = require('puppeteer-core');
    // Or import puppeteer from 'puppeteer-core';

    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch({
        channel: 'chrome',
        headless: false
    });
    const page = await browser.newPage();

    // Navigate the page to a URL.
    await page.goto('https://developer.chrome.com/');

    // Set screen size.
    await page.setViewport({ width: 1080, height: 1024 });

    // Type into search box.
    await page.locator('.devsite-search-field').fill('automate beyond recorder');

    // Wait and click on first result.
    await page.locator('.devsite-result-item-link').click();

    // Locate the full title with a unique string.
    const textSelector = await page
        .locator('text/Customize and automate')
        .waitHandle();
    const fullTitle = await textSelector?.evaluate(el => el.textContent);

    // Print the full title.
    console.log('The title of this blog post is "%s".', fullTitle);

    await browser.close();

})()