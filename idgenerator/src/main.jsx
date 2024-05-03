function initiateDownload(url, filename) {
  const link = document.createElement("a");
  link.href = url;
  link.download = filename || "id";
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
    <div
      class={(ids_implemented.includes(data.slug) ? "" : "opacity-50") + " my-1 p-2 border rounded hover:bg-gray-200 full flex gap-2 px-2 items-center" + (open.current ? " bg-yellow-500" : "")}
      onClick={() => {
        state.current.currentId = data.id;
        // navigate(`/generator/${data.slug}`);
      }}
    >
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
  let flattenedData =
    data?.steps.reduce((acc, step) => {
      return [...acc, ...step.fields];
    }, []) || [];
  async function generateAndShow() {
    let uploaderEl = document.getElementById("uploader");
    let formData = new FormData();
    // await Promise.all(
    //   [1, 1].map(async (file) => {
    //     formData.append("file", await downImage("https://picsum.photos/200"));
    //   })
    // );
    let stringMap = { SURNAME: "John Doe", DOB: "01/01/1970" };
    let errors = false;

    let uploaderEls = [];
    function pushAtIndex(arr, index, value) {
      if (index >= arr.length) {
        arr.length = index + 1;
      }
      arr[index] = value;
    }

    flattenedData.forEach((item) => {
      let inputEl = document.querySelector(".form-input." + item.input_name);
      if (!inputEl.value) {
        inputEl.parentElement.querySelector(".error").classList.remove("hidden");
        errors = true;
      } else inputEl.parentElement.querySelector(".error").classList.add("hidden");

      if (item.type == "text") stringMap[item.input_name] = inputEl.value || item.input_placeholder;
      else if (item.type == "file") {
        pushAtIndex(uploaderEls, item.target_index, document.querySelector(".form-input." + item.input_name));
      }
    });

    cons(uploaderEls);
    uploaderEls.forEach((el) => {
      let file = el.files[0];
      formData.append("file", file);
    });

    if (errors) {
      return;
    }

    formData.append("bodyString", JSON.stringify({ template: `${data.slug}.docx`, stringMap, imageMap: { 0: 0, 1: 1 } }));

    console.log("formData", formData);

    let res = await await fetch("https://ab498.pythonanywhere.com/generateid", {
      method: "POST",
      body: formData,
    });

    const contentType = res.headers.get("Content-Type");

    if (contentType && contentType.includes("image/")) {
      const imageBlob = await res.blob();
      console.log("got results");
      state.current.resultUrl = URL.createObjectURL(imageBlob);
    } else {
      const responseText = await res.text();
      res = safeParse(responseText) || res;
      console.log(res);
    }
  }
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
                  <div className="flex flex-col gap-4">
                    {step.fields.map((field) => (
                      <div className="flex flex-col">
                        <label>* {field.input_label}</label>
                        <input
                          type={field.type}
                          value={field.input_value}
                          placeholder={field.input_placeholder}
                          class={"rounded border full p-2 form-input " + field.input_name}
                          onChange={(e) =>
                            !e.target.value ? e.target.parentElement.querySelector(".error").classList.remove("hidden") : e.target.parentElement.querySelector(".error").classList.add("hidden")
                          }
                          onBlur={(e) =>
                            !e.target.value ? e.target.parentElement.querySelector(".error").classList.remove("hidden") : e.target.parentElement.querySelector(".error").classList.add("hidden")
                          }
                        />
                        <div className="error hidden text-red-500 text-sm">This field is required</div>
                      </div>
                    ))}
                  </div>
                  <div className="grow"></div>
                  {currentStep.current == data.steps.length - 1 && (
                    <button class="special-btn" onClick={() => generateAndShow()}>
                      Generate
                    </button>
                  )}
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

window.ids_implemented = ["uk_dl"];
async function safe(fn) {
  try {
    return await fn();
  } catch (e) {
    console.log("errored", e);
    return null;
  }
}

let GeneratorPage = () => {
  let identity = getIndentityById(state.current.currentId); // || 6);
  let resUrl = reactive("");
  let detailedIdentity = reactive(null);
  let searchResults = reactive(null);
  useEffect(() => {
    (async () => {
      if (!identity) return;

      detailedIdentity.current = (await (await fetch("options/" + identity.slug + ".json", {})).json()) || {};
      cons("identity", detailedIdentity.current);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (!identity) return;
      detailedIdentity.current = (await (await fetch("options/" + identity.slug + ".json", {})).json()) || {};

      cons("available", ids_implemented.includes(identity.slug));
      cons("identity", detailedIdentity.current);
      state.current.resultUrl = -1;
      state.current.resultUrl = await safe(async () => {
        try {
          return URL.createObjectURL(
            (await downImage("https://corsproxy.io/?https://oldie.veriftools.ru/media/" + identity.preview)) ||
              (await downImage("https://corsproxy.io/?https://oldie.veriftools.ru/media/generators/previews/usa_passport_preview_new.jpg"))
          );
        } catch (error) {}
      });
      // cons("fetching image");
      // state.current.resultUrl = URL.createObjectURL(await downImage(`https://corsproxy.io/?https://oldie.veriftools.ru/media/${identity.preview}`));
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
              <div className="text-xl font-bold h-16 ">
                <img src="logo.jpg" className="aspect-video w-full h-full" alt="" />
              </div>
            </div>
            <div className="bg-white min-h-[100px] shadow rounded-xl border-2 id-type-select grow  p-6">
              <div className="text-xl text-yellow-600 center">All Generators</div>
              <input
                placeholder="Search..."
                class={"rounded border w-full p-2 my-2 form-input "}
                onChange={(e) => {
                  if (!e.target.value) {
                    searchResults.current = null;
                    return;
                  }
                  searchResults.current = flattenedGenerators.filter((item) => item.name.toLowerCase().includes(e.target.value.toLowerCase()));
                }}
              />
              <div className="max-h-[80vh] overflow-auto">
                {searchResults.current ? searchResults.current.map((item) => <CustomNestedOptions data={item} />) : allOptions.current.map((item) => <CustomNestedOptions data={item} />)}
              </div>
            </div>
          </div>
          {ids_implemented.includes(identity?.slug) ? (
            <div className="flex flex-col sm:flex-row basis-2/3 gap-6 ">
              <div className="sm:basis-1/2 flex flex-col gap-6">
                <div className="bg-white min-h-[100px] shadow rounded-xl border-2 id-title p-6">
                  <div className="text-lg font-bold center">{detailedIdentity.current?.name || "Title"}</div>
                  <div className="center text-sm">${detailedIdentity.current?.price || "---"}</div>
                </div>
                <div className=" min-h-[100px] id-form grow">
                  {(detailedIdentity?.current && <StepsForm data={detailedIdentity?.current || null} />) || (
                    <div className="full  gap-2 bg-white min-h-[100px] shadow rounded-xl border-2 result flex flex-col p-6">
                      <div class="w-full h-full rounded center text-xl">Loading...</div>
                    </div>
                  )}
                  {/* <LinearForm data={detailedIdentity.current} /> */}
                </div>
              </div>
              <div className="sm:basis-1/2">
                <div className="full  gap-2 bg-white min-h-[100px] shadow rounded-xl border-2 result flex flex-col p-6">
                  <div className="text-lg font-bold center">Result</div>
                  <div className="grow"></div>
                  <div class="w-full center">
                    {state.current.resultUrl == -1 ? (
                      <div class="w-full h-full rounded center text-xl">Loading...</div>
                    ) : !state.current.resultUrl ? (
                      <div class="w-full h-full rounded center text-xl">Failed!</div>
                    ) : (
                      <img src={state.current.resultUrl} alt="" className="full object-contain rounded overflow-hidden" />
                    )}
                  </div>
                  <div className="grow"></div>
                  <div className="special-btn" onClick={() => initiateDownload(state.current.resultUrl, detailedIdentity.current?.name)}>
                    Download
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="center grow bg-white min-h-[100px] shadow rounded-xl border-2 font-bold text-xl">Unavailable</div>
          )}
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
  if (!root) return null;
  for (let item of allOptions.current) {
    let res = findIdentityRecursive(id, item);
    if (res) return res;
  }
}

window.flatten = (arr, childKeys, fn) => {
  let res = [];
  for (let item of arr) {
    if (fn(item)) {
      res.push(item);
    } else {
      for (let childKey of childKeys) {
        let clFlat = item[childKey] ? flatten(item[childKey], childKeys, fn) : [];
        res = [...res, ...clFlat];
      }
    }
  }
  return res;
};
let App = () => {
  let history = useHistory();
  let state = reactive({ currentId: null });
  window.state = state;
  let flattenedGenerators = [];

  let allOptions = reactive([]);
  window.allOptions = allOptions;

  useEffect(() => {
    (async () => {
      allOptions.current = await (await fetch("allOptions.json")).json();
      flattenedGenerators = flatten(allOptions.current, ["child", "generator"], (item) => item.name);
      window.allOptions = allOptions;
      window.flattenedGenerators = flattenedGenerators;
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
