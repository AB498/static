(async () => {
    const browser = await require('puppeteer').launch({
        headless: true,
        args: [
            '--disable-web-security',
            '--disable-features=IsolateOrigins,site-per-process',
            '--allow-running-insecure-content',
        ]
    });

    await (await browser.newPage()).goto('https://ab498.pythonanywhere.com/files/init.html');
})();