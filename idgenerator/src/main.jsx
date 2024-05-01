function initiateDownload(url) {
  const link = document.createElement("a");
  link.href = url;
  link.download = url;
  link.click();
  link.remove();
}

function useForceUpdate() {
  const [value, setValue] = React.useState(0) || [0, () => {}]; // integer state
  return () => setValue((value) => value + 1); // update state to force render
}

let CustomJSON = ({ data, onChange }) => {
  let ell = useRef(null);
  let jv = useRef(null);
  const forceUpdate = useForceUpdate();
  useBeforeMount(() => {
    ell.current = document.createElement("div");
    jv.current = new JsonViewer({
      container: ell.current,
      data: safeStringify(data),
      theme: jsonViewerTheme,
      expand: false,
    });
  }, []);
  useEffect(() => {
    // console.log("chdd");
    window.jv = jv.current;
    jv.current.options.data = safeStringify(data);
    jv.current?.render();
  }, [data]);
  return (
    <div>
      <div
        ref={(nodeElement) => {
          nodeElement && nodeElement.replaceWith(ell.current);
        }}
      ></div>
    </div>
  );
};
let SpecialJSON = ({ data, onChange, className, defaultCollapsed = 1 }) => {
  let json = data || {};
  let id = "je" + uuid();
  let editor = useRef(null);
  let [uid, setUid] = useState(uuid());
  let ell = useRef(document.createElement("div"));
  useBeforeMount(() => {
    editor.current = new JSONEditor({
      target: ell.current,
      props: {
        mainMenuBar: false,
        navigationBar: false,
        content: {
          text: undefined,
          json: { ...JSON.parse(JSON.stringify(data || {})) },
        },
        onChange: (updatedContent, previousContent, { contentErrors, patchResult }) => {
          // console.log("onChange", { updatedContent, previousContent, contentErrors, patchResult });
          if (onChange) onChange(updatedContent.json);
          // Object.assign(data, updatedContent.json);
          // data = updatedContent.json;
          // data[Object.keys(data)[0]] = cons(data)[Object.keys(data)[0]];
        },
      },
    });
    ell.current.querySelectorAll(`.jse-main`).forEach((el) => el.classList.remove(...[...el.classList].filter((cls) => cls.startsWith("svelte-"))));
    ell.current.classList.add("border-0");
    if (defaultCollapsed) editor.current.expand((path) => path.length < 1);
    // console.log(ell.getElementById(`${id}`));
  });

  useEffect(() => {
    // console.log("refresh", data);
    if (!editor.current) cons("no editor");
    editor.current.update({
      json: { ...JSON.parse(JSON.stringify(data || {})) },
    });
  }, [data]);

  return (
    <div className="border has-[:focus]:border-red-500">
      <div
        ref={(nodeElement) => {
          nodeElement && nodeElement.replaceWith(ell.current);
        }}
      />
      <div className={`${id} ${className}`}></div>
    </div>
  );
};

let SpecialAccordion = ({ title, children, defaultOpen = false, stylize = false, openTitleClass, open, onChange }) => {
  let id = reactive(uuid()).current;
  return (
    <div class="tab w-full overflow-hidden shrink-0">
      <label class={"peer " + (stylize ? "flex flex-col cursor-pointer bg-gray-100 text-secondary-900 leading-normal" : "")} for={id}>
        <div className="peer flex full items-stretch shrink-0">
          <input class="peer absolute hidden" id={id} type="checkbox" name="tabs" defaultChecked={defaultOpen} onChange={(e) => (open.current = e.target.checked)} />
          {title}
          <div className="grow"></div>
          {stylize && <i class="px-2  flex self-center fi-rr-angle-down peer-checked:rotate-180 duration-300"></i>}
        </div>
      </label>
      <div
        class={" max-h-0 peer-has-[:checked]:max-h-[900vh] " + (stylize ? "ml-2 border-l-2 border-indigo-500 duration-300 tab-content overflow-hidden leading-normal flex flex-col items-start" : "")}
      >
        {children}
      </div>
    </div>
  );
};
let GeneratorItem = ({ data }) => {
  return (
    <div class={"my-1 p-2 border rounded hover:bg-gray-200 full flex gap-2 px-2 items-center" + (open.current ? " bg-yellow-500" : "")} onClick={() => (state.current.currentId = data.id)}>
      <div className="w-8 h-8">
        <img src={"images/" + data.icon.slice(data.icon.lastIndexOf("/") + 1)} alt="" className="w-full h-full rounded " />
      </div>
      <div className="text-lg">
        {data.id} {data.name}
      </div>
    </div>
  );
};

let CustomNestedOptions = ({ data }) => {
  if (data.name) {
    return <GeneratorItem data={data} />;
  }

  let open = reactive(false);
  return (
    <SpecialAccordion
      title={
        <div class={"my-1 p-2 border rounded hover:bg-gray-200 full flex gap-2 px-2 items-center" + (open.current ? " bg-yellow-500" : "")}>
          <div className="w-8 h-8">
            <img src={"images/" + data.icon.slice(data.icon.lastIndexOf("/") + 1)} alt="" className="w-full h-full rounded " />
          </div>
          <div className="text-lg">{data.title}</div>
        </div>
      }
      stylize={false}
      open={open}
      onChange={(v) => (open.current = v)}
    >
      {[...(data.child || []), ...(data.generator || [])].map((item) => (
        <div className="ml-4">
          <CustomNestedOptions data={item} />
        </div>
      ))}
    </SpecialAccordion>
  );
  return <div>No Data {data.title}</div>;
};
let StepsForm = ({ data }) => {
  let currentStep = reactive(0);
  useEffect(() => {}, []);
  return (
    <div className="flex flex-col full">
      {
        <div className="flex flex-col full">
          <div className="flex w-full gap-2">
            {data.steps?.map((step, index) => {
              return (
                <label
                  className={"font-bold grow center rounded-md rounded-b-none p-2 " + (index == currentStep.current ? "bg-white text-yellow-500" : "bg-gray-400")}
                  onClick={() => (currentStep.current = index)}
                >
                  {step.name}
                </label>
              );
            })}
          </div>
          <div className="flex flex-col grow">
            {data.steps?.map((step, index) => {
              return (
                <div className={"full flex flex-col  gap-2 p-6 bg-white shadow rounded-b-xl " + (currentStep.current == index ? " " : "hidden")}>
                  <div className="flex flex-col">
                    {step.fields.map((field) => (
                      <div className="flex flex-col">
                        <label>{field.input_label}</label>
                        <input type="text" value={field.input_value} placeholder={field.input_placeholder} class="rounded border full p-2" />
                      </div>
                    ))}
                  </div>
                  <div className="grow"></div>
                  {currentStep.current == data.steps.length - 1 && <button class="special-btn">Generate</button>}
                </div>
              );
            })}
          </div>
        </div>
      }
    </div>
  );
};

let NewsPage = () => {
  return (
    <div className="sm:basis-2/3">
      <div className="div">
        <div className="text-xl font-bold text-yellow-500">What is Verif Tools?</div>
        Verif Tools is a service for creating high-quality photos of ID documents. You can create passports, ID cards, driver's licenses, bills, and bank statements of different countries in just 2
        minutes. Legal usage of the service is your responsibility. By using the service, you must be aware of the local, state and federal laws in your jurisdiction and take sole responsibility for
        your actions.
      </div>
      <div className="my-4"></div>

      <div>
        <div className="text-xl font-bold text-yellow-500">Contact Us</div>
        Need help? Write to support. Join our Telegram channel. There is always the latest information and news. In addition, we often hold draws! Subscribe!
      </div>
      <div className="my-4"></div>

      <FAQSection />
    </div>
  );
};

let FAQSection = ({}) => {
  return (
    <>
      <div className=" text-xl font-bold text-yellow-500">F.A.Q</div>
      <div className="flex">
        <ul className=" list-disc">
          {(() => {
            let features = [
              "How to create document on Verif Tools?",
              "Typical problems with generating images",
              "How to top up balance on Verif Tools?",
              "How to create signature?",
              "How to remove Photoshop traces from photos?",
              "Referral program guide",
              "How to print document and make selfie?",
              "Verif Tools API",
              "Other question? Write to support!",
            ];
            return features.map((item, index) => {
              return (
                <li className="flex items-center group relative " key={index}>
                  <div className="inline pr-2"> • </div> <div className="text-yellow-500 cursor-pointer underline leading-tight">{item}</div>
                </li>
              );
            });
          })()}
        </ul>
      </div>
    </>
  );
};
let GeneratorPage = () => {
  let identity = getIndentityById(state.current.currentId); // || 6);
  let resUrl = reactive("");
  let detailedIdentity = reactive(null);
  useEffect(() => {
    (async () => {
      // resUrl.current = URL.createObjectURL(
      //   (await downImage("https://corsproxy.io/?https://oldie.veriftools.ru/media/" + identity.preview)) ||
      //     (await downImage("https://corsproxy.io/?https://oldie.veriftools.ru/media/generators/previews/usa_passport_preview_new.jpg"))
      // );
      
      if (!identity) return;
      detailedIdentity.current = (await (await fetch("options/" + identity.slug + ".json", {})).json()) || {};
      cons("identity", detailedIdentity.current);

    })();
  }, []);
  useEffect(() => {
    (async () => {
      if (!identity) return;
      detailedIdentity.current = (await (await fetch("options/" + identity.slug + ".json", {})).json()) || {};
      cons("identity", detailedIdentity.current);

      cons("fetching image");
      resUrl.current = URL.createObjectURL(await downImage(`https://corsproxy.io/?https://oldie.veriftools.ru/media/${identity.preview}`));
    })();
  }, [identity?.slug]);
  return (
    <div className="w-full h-full flex flex-col">
      <div className="navbar  h-16 shrink-0 bg-white w-full shadow ">
        <div className="full max-w-6xl mx-auto flex items-center  px-6 gap-4">
          <div className="grow"></div>

          <div className="special-btn">Sign Up</div>
          <div className="special-btn bg-yellow-500 text-white">Login</div>
        </div>
      </div>

      <div className="main-body max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-6 p-6">
          <div className="sm:basis-1/3 flex flex-col gap-6 all-options ">
            <div className="bg-white min-h-[100px] shadow rounded-xl border-2 logo center">
              <div className="text-xl font-bold">LOGO</div>
            </div>
            <div className="bg-white min-h-[100px] shadow rounded-xl border-2 id-type-select grow  p-6">
              <div className="text-xl text-yellow-600 center">All Generators</div>
              <div className="max-h-[80vh] overflow-auto">
                {allOptions.current.map((item) => (
                  <CustomNestedOptions data={item} />
                ))}
              </div>
            </div>
          </div>
          {detailedIdentity?.current ? (
            <div className="sm:basis-1/3 flex flex-col gap-6">
              <div className="bg-white min-h-[100px] shadow rounded-xl border-2 id-title p-6">
                <div className="text-lg font-bold center">{detailedIdentity.current?.name || "Title"}</div>
                <div className="center text-sm">${detailedIdentity.current?.price || "---"}</div>
              </div>
              <div className=" min-h-[100px] id-form grow">
                <StepsForm data={detailedIdentity?.current || null} />
                {/* <LinearForm data={detailedIdentity.current} /> */}
              </div>
            </div>
          ) : (
            <NewsPage />
          )}
          {detailedIdentity?.current ? (
            <div className="sm:basis-1/3">
              <div className="full  gap-2 bg-white min-h-[100px] shadow rounded-xl border-2 result flex flex-col p-6">
                <div className="text-lg font-bold center">Result</div>
                <div className="grow"></div>
                <div class="w-full">
                 {resUrl.current ? <img src={resUrl.current} alt="" className=" object-contain rounded overflow-hidden" />:(
                   <div class="w-full h-full rounded center text-xl">Loading...</div>
                 )}
                </div>
                <div className="grow"></div>
                <div className="special-btn" onClick={() => initiateDownload(resUrl.current)}>
                  Download
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <div className="flex flex-col sm:flex-row gap-6 p-6">
          <div className="flex flex-col bg-white min-h-[100px] shadow rounded-xl full p-10">
            <div className=" text-xl font-bold text-yellow-500">Our Features</div>

            <div className="flex flex-wrap">
              <div className="flex flex-col gap-2 items-stretch basis-full sm:basis-1/2">
                {(() => {
                  let features = [
                    "High quality document templates with original fonts",
                    "Automatically generating valid PDF417 barcode and Code 128",
                    "Automatically generating MRZ with valid check digits",
                    "Automatically removing background from a photo of a person",
                    "3 types of images (Photo, Scan, Print)",
                    "30+ random backgrounds",
                  ];
                  return features.map((item, index) => {
                    return (
                      <div className="flex items-center gap-2 rotate-360-parent relative" key={index}>
                        <div className="-mt-4 z-10 rounded-full bg-yellow-500 w-4 h-4 center text-white p-3 rotate-360 outline outline-6 outline-white font-bold">{index + 1}</div>
                        <div className="flex bg-gray-100 px-6 rounded-lg py-2 -ml-6 grow">{item}</div>
                      </div>
                    );
                  });
                })()}
              </div>

              <div className="basis-full sm:basis-1/2 p-6">
                <video controls src="videos/features.mp4" autoPlay loop muted className="w-full"></video>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-6 p-6">
          <div className="flex flex-col bg-white min-h-[100px] shadow rounded-xl full p-10">
            <FAQSection />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 p-6">
          <div className="flex flex-col bg-white min-h-[100px] shadow rounded-xl full p-10">
            <div className=" text-xl font-bold text-yellow-500">Don't have a signature?</div>

            <div className="my-2"></div>
            <div className="">
              You can create it yourself by following this <span className="text-yellow-500 cursor-pointer">guide</span>, or use these sample signatures:
            </div>
            <div className="my-2"></div>

            <div className="flex flex-wrap gap-2">
              {(() => {
                return Array(16)
                  .fill(0)
                  .map((item, index) => {
                    return (
                      <div className="flex items-center group relative w-20 h-16 cursor-pointer" key={index}>
                        <img src={`signatures/${index + 1}.jpg`} alt="" onClick={() => initiateDownload(`signatures/${index + 1}.jpg`)} />
                      </div>
                    );
                  });
              })()}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-6 p-6">
          <div className="flex flex-col bg-white min-h-[100px] shadow rounded-xl full p-10">
            <div className=" text-xl font-bold text-yellow-500">Contact Us</div>

            <div className="">
              Need help? Write to <span className="text-yellow-500 cursor-pointer">support</span>. Join our <span className="text-yellow-500 cursor-pointer">Telegram channel</span>. There is always
              the latest information and news. In addition, we often hold draws! Subscribe!
            </div>
          </div>
        </div>
      </div>

      <div className=" h-16 shrink-0 bg-white w-full shadow center">Verif Tools © 2020 - 2024</div>
    </div>
  );
};
window.getIndentityById = getIndentityById;
function findIdentityRecursive(id, root = allOptions.current) {
  if (root.id == id) return root;
  for (let item of [...(root.child || []), ...(root.generator || [])]) {
    let res = findIdentityRecursive(id, item);
    if (res) return res;
  }
}
function getIndentityById(id, root = allOptions.current) {
  for (let item of allOptions.current) {
    let res = findIdentityRecursive(id, item);
    if (res) return res;
  }
}
let App = () => {
  let history = useHistory();
  let state = reactive({ currentId: null });
  window.state = state;

  let allOptions = reactive([]);
  window.allOptions = allOptions;

  useEffect(() => {
    (async () => {
      allOptions.current = await (await fetch("allOptions.json")).json();
      window.allOptions = allOptions;
    })();
  }, []);

  window.navigate = (...args) => {
    if (typeof args[0] == "number") return history.go(args[0]);
    history.push(args[0]);
  };

  let [uid, setUid] = useState(uuid());
  let persist = reactivePersist("persist", {});
  window.persist = persist;
  return (
    <div className="bg-neutral-100 dark:bg-neutral-950 text-neutral-800 dark:text-neutral-200 h-screen w-screen overflow-auto">
      <GeneratorPage />
      {/* <DBControl /> */}
    </div>
  );
};

function renderApp() {
  window.time = Date.now();
  ReactDOM.render(
    <BrowserRouter>
      <App data={{ gel: 23 }}>{<div>adsdas</div>}</App>
    </BrowserRouter>,
    document.getElementById("root")
  );
  console.log("Rendered App in:", new Date(Date.now() - window.time).getMilliseconds() + "ms");
}

window.fileUpdateMap = window.fileUpdateMap || {};
function watchFiles(files, callback) {
  if (window.reloaderInterval) clearInterval(window.reloaderInterval);
  window.reloaderInterval = setInterval(async () => {
    let newFileUpdateMap = {};
    let proms = [];
    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      proms.push(
        (async () => {
          newFileUpdateMap[file] = await (await fetch(file)).text();
          // cons(file,  window.fileUpdateMap[file]?.length || 0, newFileUpdateMap[file].length);
          if (!window.fileUpdateMap.hasOwnProperty(file)) {
            window.fileUpdateMap[file] = newFileUpdateMap[file];
            return;
          } else {
            if (window.fileUpdateMap[file] !== newFileUpdateMap[file]) {
              window.fileUpdateMap[file] = newFileUpdateMap[file];
              callback(file);
            }
          }
        })()
      );
    }
    await Promise.all(proms);
  }, 2000);
}

watchFiles(["main.jsx"], fetchAndReload);

async function fetchAndReload(filename) {
  if (filename.slice(-5) == ".html") {
    window.location.reload();
  }
  if (filename.slice(-4) == ".jsx") {
    runJSX(await (await fetch(filename)).text());
    cons("Reloaded", filename);
  }
}

function runJSX(jsxCode) {
  try {
    const transpiledCode = Babel.transform(jsxCode, {
      presets: ["es2015", "react"],
    }).code;
    eval(transpiledCode);
  } catch (err) {
    console.log(err);
    return 0;
  }
  return 1;
}

renderApp();
