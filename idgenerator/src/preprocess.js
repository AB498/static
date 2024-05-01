const fs = require("fs");
const axios = require("axios");
const allOptions = require("./allOptions.json");

async function findIdentityRecursive(id, root = allOptions, cb) {
  // await new Promise((r) => setTimeout(r, 100));
  await cb(root);
  for (let item of [...(root.child || []), ...(root.generator || [])]) {
    let res = await findIdentityRecursive(id, item, cb);
  }
}
async function getIndentityById(id, root = allOptions, cb) {
  for (let item of allOptions) {
    let res = await findIdentityRecursive(id, item, cb);
  }
}
let poll = async (fn, t, breakTimeout) => {
  let canceller;
  let ended = false;
  if (breakTimeout) {
    canceller = setTimeout(() => {
      console.log("Timeout");
      ended = true;
      return;
    }, breakTimeout);
  }
  while (!ended) {
    let res = await fn();
    if (res) {
      canceller && clearTimeout(canceller);
      return res;
    }
    await new Promise((r) => setTimeout(r, t || 200));
  }
};
let safeParse = function (...args) {
  try {
    // Define a reviver function to handle parsing functions
    const reviver = (key, value) => {
      if (typeof value === "string" && value.startsWith("function")) {
        // If the value is a string starting with 'function', parse it back to a function
        const functionStr = `(${value})`;
        return eval(functionStr); // Using eval to convert string to function
      }
      return value;
    };

    return JSON.parse(args[0], reviver);
  } catch (e) {
    console.error(e);
    return null;
  }
};
concurrent = 0;
(async () => {
  // console.log(res);
  count = 0;
  getIndentityById(allOptions, null, async (item) => {
    if (item.name) {
      // if (concurrent > 20) await poll(() => concurrent < 10);
      concurrent++;
      // (async () => {
      await donwloadPNG(item);
      count++;
      // console.log(item.slug, count);
      concurrent--;
      // })();
    }
  });
})();

async function downloadJSON(item) {
  if (!fs.existsSync("./src/options")) fs.mkdirSync("./src/options");
  if (fs.existsSync("./src/options/" + item.slug + ".json")) {
    let json = safeParse(fs.readFileSync("./src/options/" + item.slug + ".json"));
    if (json?.message?.includes("Rate limit reached")) {
      fs.unlinkSync("./src/options/" + item.slug + ".json");
      return console.log("deleted fail", item.slug);
    }
    return console.log("exists", item.slug);
  }
  let resp = await (await fetch("https://corsproxy.io/?https://oldie.veriftools.ru/api/frontend/generator/" + encodeURIComponent(item.slug) + "/", {})).json();
  if (resp?.message?.includes("Rate limit reached")) {
    console.log("Rate limit reached. Please create an account at https://accounts.corsproxy.io");
    return;
  }
  fs.writeFileSync("./src/options/" + item.slug + ".json", JSON.stringify(resp, null, 2));
}

async function donwloadPNG(item) {
  if (!fs.existsSync("./src/media")) fs.mkdirSync("./src/media");
  if (!fs.existsSync("./src/media/" + item.slug + "-icon.png")) {
    let url = `https://corsproxy.io/?https://oldie.veriftools.ru/media/${item.icon}?__cf_chl_rt_tk=_6X0QB2ekQZi.pXGMPWxU53D36_VUFz6eLM_jSmrMmc-1714493249-0.0.1.1-1557/https://corsproxy.io/?https://oldie.veriftools.ru/media/${item.icon}?__cf_chl_rt_tk=_6X0QB2ekQZi.pXGMPWxU53D36_VUFz6eLM_jSmrMmc-1714493249-0.0.1.1-1557`+ "/";
    let resp = Buffer.from(await  (await (await fetch(url, {})).blob()).arrayBuffer());
    console.log(item.slug, item.icon);
    fs.writeFileSync("./src/media/" + item.slug + "-icon.png", resp);
  }else{
    console.log("exists", item.slug);
  }
}
