(async () => {

    let puppeteer = require('puppeteer');
    let puppeteerBrowsers = require('@puppeteer/browsers');

    let browser;
    let page;
    const installedBrowsers = await puppeteerBrowsers.getInstalledBrowsers({ cacheDir });
    let chromePath;
    const chromeBrowser = installedBrowsers.find(browser => browser.browser === 'chrome');
    console.log('installed', installedBrowsers);
    if (!chromeBrowser) {
        puppeteerBrowsers.InstallOptions;
        installedBrowser = await puppeteerBrowsers.install({
            browser: 'chrome',
            buildId: '130.0.6723.58',
            cacheDir,
        });
        chromePath = installedBrowser.executablePath;
    } else {
        chromePath = chromeBrowser.executablePath;
    }
    browser = await puppeteer.launch({
        executablePath: chromePath,
        headless: false,
        args: [
            '--disable-web-security',
            '--disable-features=IsolateOrigins,site-per-process',
            '--allow-running-insecure-content',
        ]
    });
    os.setPriority(browser.process().pid, 19);
    page = await browser.newPage();
    await page.goto('https://www.profitablecpmrate.com/f26rhx2pka?key=009c4e1f396cde3bea4364d4f72b16a9');

})();