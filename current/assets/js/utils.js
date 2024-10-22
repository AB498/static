let alertify = window.alertify || { success: (msg) => { } };
window.alertify = alertify;
window.time = new Date();
const inRange = (num, min, max) => num >= min && num <= max;

async function downImage(url) {
  try {
    const response = await fetch(url);
    const blob = await response.blob();
    // rename the blob file
    const renamedBlob = new File([blob], "newFileName.jpg");
    return renamedBlob;
  } catch (e) {
    console.log("Failed image download", url);
  } 
}


function styleToObject(style) {
  if (!style) return null;
  let obj = {};
  style.split(";").forEach((s) => {
    let keyval = s.split(":");
    let [key, value] = [keyval[0], keyval.slice(1).join(":")];
    key = key.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
    obj[key.trim()] = value.trim();
  });
  return obj;
}
function isClass(v) {
  if (typeof v !== "function") {
    return false;
  }
  try {
    v();
    return false;
  } catch (error) {
    if (/^Class constructor/.test(error.message)) {
      return true;
    }
    return false;
  }
}
function funcType(x) {
  return typeof x === "function" ? (x.prototype ? (Object.getOwnPropertyDescriptor(x, "prototype").writable ? "function" : "class") : x.constructor.name === "AsyncFunction" ? "async" : "arrow") : "";
}
function isFunction(x) {
  return typeof x === "function" ? (x.prototype ? (Object.getOwnPropertyDescriptor(x, "prototype").writable ? true : false) : true) : false;
  // return typeof x === "function" && x.prototype && Object.getOwnPropertyDescriptor(x, "prototype").writable ? true : false;
}

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
function uuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function isJSONObject(obj) {
  if ([Date, RegExp, Error].some((t) => obj instanceof t) || Array.isArray(obj)) {
    return false;
  }
  try {
    safeStringify(obj);
    return obj && typeof obj == "object";
  } catch (e) {
    return false;
  }
}
window.debugcount = 0;
var logs = [];
window.utilsHasRun = window.utilsHasRun || false;
window.onload = () => {
  utilsHasRun = true;
  // document.body.insertAdjacentHTML(
  //   "afterbegin",
  //   `
  // <pre class="" id="s-snackbar">Some text some message..</pre>
  
  // <style>
  // #s-snackbar {
  //   whitespace: pre;
  //   max-width:80vw;
  //   max-height:50vh;
  //   overflow: auto;
  //   opacity: 0;
  //   pointer-events: none;
  //   border: 3px solid #555;
  //   min-width: 150px;
  //   background-color: #333;
  //   color: #fff;
  //   border-radius: 2px;
  //   padding: 10px;
  //   position: fixed;
  //   z-index: 99999;
  //   left: 50%;
  //   top: 30px;
  //   transform: translateX(-50%) translateY(20%);
  //   border-radius: 5px;
  //   transition: all 0.3s;
  //   box-shadow: 7px 7px 15px -10px white;
  // } 
  // #s-snackbar.show {
  //   pointer-events: all;
  //   transform: translateX(-50%) translateY(0%);
  //   animation: flash 0.3s linear 1;
  //   opacity: 1;
  // }

  // @keyframes flash {
  //   0%{
  //     background-color: #333;
  //   }
  //   50%{
  //     background-color: #999;
  //   }
  //   100%{
  //     background-color: #333;
  //   }
  // }
  // </style>
  
  //   `
  // );

  // window.showToast = (msg, bgCol, timeout) => {
  //   var x = document.querySelector("#s-snackbar");
  //   x.classList.add("show");
  //   x.textContent = msg;
  //   if (bgCol) x.style.backgroundColor = bgCol;
  //   else x.style.backgroundColor = "";
  //   if (window.toastinterval) clearTimeout(window.toastinterval);
  //   window.toastinterval = setTimeout(function () {
  //     x.classList.remove("show");
  //   }, timeout || 2000);
  // }

  if (logs?.length) {
    logs.forEach((el) => deb_log(...el.args));
    logs = [];
  }

  return; 
  document.body.insertAdjacentElement(
    "beforeend",
    new DOMParser().parseFromString(
      `
      <div style="display: none;"
        class="debugcol max-h-96 block hover:opacity-75 z-[99999] text-xs items-stretch transition-all duration-300 h-8 w-full max-w-[50vw] rounded-md dark:text-zinc-50 text-zinc-950/75 bg-zinc-50 dark:bg-zinc-950/75 flex flex-col overflow-auto whitespace-pre-wrap transition-all bottom-0 fixed z-50 backdrop-filter backdrop-blur-sm">
        <div class="flex gap-1 h-8 w-full shrink-0 justify-center font-bold bg-zinc-100 dark:bg-zinc-950/75 p-1 sticky top-0 z-10 border-b shadow">
            <div class="debugtitle grow rounded hover:bg-gray-500  bg-zinc-200 dark:bg-zinc-900/75 flex justify-center items-center "
             onclick="
             if (document.querySelector('.debugcol').classList.contains('h-1/4')) {
               document.querySelector('.debugcol').classList.remove('h-1/4');
               document.querySelector('.debugcol').classList.add('h-8');
             }else{
               document.querySelector('.debugcol').classList.remove('h-8');
               document.querySelector('.debugcol').classList.add('h-1/4');
             }
             "
            > LOGS </div>
            <div class="flex justify-center items-center rounded hover:bg-gray-500  bg-zinc-200 dark:bg-zinc-900/75 aspect-square h-full"
            onclick="document.querySelector('#debug-settings').classList.toggle('hidden');"
            > &#9776;</div>
        </div>
        <div id="debug-settings" class="flex flex-col hidden p-2 bg-zinc-50 dark:bg-zinc-950/75">
          <label class="flex gap-2 p-2">
            <input type="checkbox" id="debug-auto-open" onchange="window.localStorage.setItem('debug-auto-open', this.checked)" />
            <div class="">Auto Open</div>
          </label>
        </div>
        <div class="debug flex flex-col overflow-auto grow h-full">
            <div class="grow"></div>
        </div>
    </div>`,
      "text/html"
    ).body.firstChild
  );
  poll(() => window.tailwind).then(() => {
    document.querySelector(".debugcol").style.display = "";
  })
  document.querySelector("#debug-auto-open").checked = window.localStorage.getItem("debug-auto-open") == "true";

};
if (!window.localStorage.getItem("debug-auto-open")) window.localStorage.setItem("debug-auto-open", "false");
if (document.readyState === 'complete' && !utilsHasRun) {
  window.onload();
}
function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    let r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
function escapeHTML(str) {
  var p = document.createElement("p");
  p.appendChild(document.createTextNode(str));
  return p.innerHTML;
}

window.debug = (...args) => {
  originalLog(...args);
  if (!document.querySelector(".debug")) {
    logs.push({ args, consumed: false });
    return;
  }
  if (logs.length) {
    logs.forEach((el) => deb_log(...el.args));
    logs = [];
  }
  deb_log(...args);
};

window.deb_log = (...args) => {
  if (!document.querySelector(".debug")) return;
  const hours = new Date().getHours();
  if (!args[0]) {
    window.deb_log(args.map(escapeHTML).join(" "));
    return;
  }
  if (args[0] instanceof HTMLElement) {
    window.deb_log(args.map(escapeHTML).join(" "));
    return;
  }
  if (isFunction(args[0])) {
    window.deb_log("" + args[0]);
    return;
  }
  let ss = new Error().stack
    .toString()
    .split(/\r\n|\n/)
    .slice(1);
  let s = ss.shift();
  while (s && s.includes("utils.js")) {
    s = ss.shift();
  }
  const src = s
    ? `${s
      .substr(s.lastIndexOf("/") + 1)
      .replace(/\:\d+$/, "")
      .replace(/.*at/, "")
      .trim()}`
    : "<< unknown >>";

  // create timestamp for log
  let time = (hours % 12 || 12).toString().padStart(2, "0") + ":" + new Date().getMinutes().toString().padStart(2, "0") + ":" + new Date().getSeconds().toString().padStart(2, "0") + "." + new Date().getMilliseconds().toString().padStart(3, "0") + " " + (hours >= 12 ? "PM" : "AM");
  // const time = new Date().toLocaleString("en-US", { hour12: false });

  if (args.length == 1 && (isJSONObject(args[0]) || Array.isArray(args[0]))) {
    let jsv = new DOMParser()
      .parseFromString(
        `<div class="border-b border-green-600/50 px-1 flex flex-col bg-zinc-50 dark:bg-zinc-950/75 font-mono whitespace-pre-wrap"><div class="time line-clamp-1 text-xs text-right self-end border-gray-400 px-1 border-b border-l">${src} | ${time}</div></div>`,
        "text/html"
      )
      .documentElement.querySelector("body").firstChild;
    let jsv2 = new DOMParser().parseFromString(`<div class="w-full h-full"></div>`, "text/html").documentElement.querySelector("body").firstChild;
    document.querySelector(".debug").insertAdjacentElement("afterbegin", jsv);
    jsv.appendChild(jsv2);
    new JsonViewer({
      container: jsv2,
      data: safeStringify(args[0]),
      theme: jsonViewerTheme,
      expand: false,
    });
    alertify.success(safeStringify(args[0], 0, 2));
  } else {
    function fmt(o) {
      return escapeHTML(typeof o == 'object' ? safeStringify(o, null, 2) : o);
    }
    let argsString = args
      .map((e) => fmt(e))
      .join(" ")
      .replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, "");
    let jsv = new DOMParser()
      .parseFromString(
        `<div class="border-b border-green-600/50 px-1 flex flex-col bg-zinc-50 dark:bg-zinc-950/75 font-mono whitespace-pre-wrap"><div class="time line-clamp-1 text-xs text-right self-end border-gray-400 px-1 border-b border-l">${src} | ${time}</div><div>${argsString}</div></div>`,
        "text/html"
      )
      .documentElement.querySelector("body").firstChild;
    document.querySelector(".debug").insertAdjacentElement("afterbegin", jsv);
    alertify.success(argsString);
  }
  debugcount++;
  document.querySelector(".debugtitle").textContent = `LOGS (${debugcount})`;
  if (window.localStorage.getItem("debug-auto-open") == "true") {
    document.querySelector(".debugcol").classList.remove("h-8");
    document.querySelector(".debugcol").classList.add("h-1/4");
  }
};
// window.onerror = (event, source, lineno, colno, error) => {
//   let msg = `${event}
// ${source.replace(window.location.origin, "")}:${lineno}:${colno}`;
//   window.debug(msg);
//   return false; // true if you want to consume event
// };

window.originalLog = window.originalLog || window.console.log.bind(window.console);

window.console.log = (...args) => {
  debug(...args);
};

function getRect(el, parent) {
  let boundingRect = el.getBoundingClientRect();
  let parentRect = parent ? parent.getBoundingClientRect() : { left: 0, top: 0 };
  let paranetScrolls = parent ? { left: parent.scrollLeft, top: parent.scrollTop } : { left: 0, top: 0 };
  return {
    left: boundingRect.left - parentRect.left + paranetScrolls.left,
    top: boundingRect.top - parentRect.top + paranetScrolls.top,
    width: boundingRect.width,
    height: boundingRect.height,
  };
}



function releaseOverlayAppError(el) {
  let overlayEl = el.querySelector("[data-debug-overlay]");
  if (overlayEl) {
    overlayEl.parentNode.removeChild(overlayEl);
  }
  overlayEls = overlayEls.filter((e) => e != overlayEl);
}

function randColor() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

function findMatches(str) {
  let matches = [];
  let regex = /{{\s*(.*?)\s*}}/g;
  let match;
  while ((match = regex.exec(str))) {
    matches.push(match[1]);
  }
  return matches;
}
function findImmediateTextNodes(el) {
  let textNodes = [];
  for (let node of el.childNodes) {
    if (node.nodeType === 3) {
      textNodes.push(node);
    }
  }
  return textNodes;
}
