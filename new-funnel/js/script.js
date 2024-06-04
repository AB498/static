// ?debt=£10%2C000&property=Owned&creditors=Less+than+2
// Get the full URL of the current page
var currentURL = window.location.href;

// Parse the URL to extract query parameters
var urlParams = new URLSearchParams(window.location.search);

// Get the values of the "source" and "clickid" parameters
var sourceParam = urlParams.get("source");
var clickIdParam = urlParams.get("clickid");
var debtValue = urlParams.get("debt");
var propertyValue = urlParams.get("property");
var creditorsValue = urlParams.get("creditors");
var emailValue = urlParams.get("email");
var phoneValue = urlParams.get("phone");
var nameValue = urlParams.get("name");
// console.log('debtValue', debtValue)
// console.log('propertyValue', propertyValue)
// console.log('creditorsValue', creditorsValue);

// faq
$(document).ready(function () {
  //toggle the component with class accordion_body
  $(".accordion_head").click(function () {
    if ($(".accordion_head").css("background-color", "")) {
      $(".accordion_body").is(":visible");
      $(".accordion_body").slideUp(300);
      $(".plusminus").text("+");
    }
    if ($(this).next(".accordion_body").is(":visible")) {
      $(this).next(".accordion_body").slideUp(300);
      $(this).children(".plusminus").text("+");
    } else {
      $(".accordion_head").css("background-color", "");
      $(this).next(".accordion_body").slideDown(300);
      $(this).children(".plusminus").text("-");
    }
  });
});

// multistep form
let debtDescription = document.querySelector(".zeroth-step");
let debtForm = document.querySelector(".first-step");
let whichDebt = document.querySelector(".second-steps");
let debtConcern = document.querySelector(".second_third-step");
let propertyForm = document.querySelector(".third-steps");
let locationForm = document.querySelector(".four-steps");
let statusForm = document.querySelector(".five-steps");
let nameForm = document.querySelector(".six-steps");
let emailForm = document.querySelector(".seven-steps");
let phoneForm = document.querySelector(".eight-steps");
let finalForm = document.querySelector(".nine-steps");
let progressSteps = document.querySelectorAll(".progressbar .step");

let allSteps = [debtDescription, debtForm, whichDebt, debtConcern, propertyForm, locationForm, statusForm, nameForm, emailForm, phoneForm, finalForm];

allSteps.forEach((step) => {
  step && (step.style.display = "none");
});

debtForm && (debtForm.style.display = "block");

let currentStep = 0;
let prev0 = document.getElementById("stepone_prevbtn");
let prev1 = document.getElementById("steptwo_prevbtn");
let prev_2_3 = document.getElementById("step_second_third_prevbtn");
let prev2 = document.getElementById("step_threeprevbtn");
let prev3 = document.getElementById("stepfourprev");
let prev4 = document.getElementById("five_prev");
let prev5 = document.getElementById("six_prev");
let prev6 = document.getElementById("seven_prev");

updateProgressbar();

// next btn
let zero_next = document.getElementById("zero_next");
let next_phone = document.getElementById("next_phone");
let next = document.getElementById("next_question");
let next2 = document.getElementById("email_next_question");
// submit btn
let sumbitbtn = document.getElementById("submitbtn");

// progress bar
let progress = document.querySelector(".progressbar");
//debt question
let debtOpton = document.querySelectorAll('.first-step input[name="debt"]');

let deb = Number(debtValue?.replace(/[£,\+]/g, "") || -1);
// if (10000 <= deb) {
//   console.log(debtOpton[3].value);
//   debtOpton[3].checked = true;
//   debtForm.style.display = "none";
//   whichDebt.style.display = "block";
//   currentStep = 2;
//   updateProgressbar();
// } else if (6000 <= deb && deb <= 10000) {
//   console.log(debtOpton[2].value);
//   debtOpton[2].checked = true;
//   debtForm.style.display = "none";
//   whichDebt.style.display = "block";
//   currentStep = 2;
//   updateProgressbar();
// } else if (2000 <= deb && deb <= 6000) {
//   console.log(debtOpton[1].value);
//   debtOpton[1].checked = true;
//   debtForm.style.display = "none";
//   whichDebt.style.display = "block";
//   currentStep = 2;
//   updateProgressbar();
// } else if (0 <= deb && deb <= 2000) {
//   console.log(debtOpton[0].value);
//   debtOpton[0].checked = true;
//   debtForm.style.display = "none";
//   whichDebt.style.display = "block";
//   currentStep = 2;
//   updateProgressbar();
// } else {
// }
//people question
let whichDebtOption = document.querySelectorAll('.second-steps input[name=whichdebt]');
// whichDebtOption.forEach((option) => {
//   if (option.value?.toLowerCase() == creditorsValue?.toLowerCase()) {
//     console.log(option.value);
//     option.checked = true;
//     whichDebt.style.display = "none";
//     debtConcern.style.display = "block";
//     currentStep = 3;
//     updateProgressbar();
//   }
// });
let debtConcernOption = document.querySelectorAll('.second_third-step input[name=debt_concern]');

// property question
let propertyOption = document.querySelectorAll('.third-steps input[name="property"]');
// propertyOption.forEach((option) => {
//   if (option.value?.toLowerCase() == propertyValue?.toLowerCase()) {
//     console.log(option.value);
//     option.checked = true;
//     propertyForm.style.display = "none";
//     locationForm.style.display = "block";
//     currentStep = 4;
//     updateProgressbar();
//   }
// });
// location question
let locationOption = document.querySelectorAll('.four-steps input[name="location"]');
// employstatus question
let employOption = document.querySelectorAll('.five-steps input[name="employment_status"]');
// full name
let nameField = document.getElementById("full_name");
if (nameValue) {
  nameField.value = nameValue;
}

//phone
let emailEl = document.querySelectorAll('.seven-steps input[name="email"]');
if (emailValue) {
  emailEl[0].value = emailValue;
}
let phone = document.querySelectorAll('.eight-steps input[name="phone"]');
if (phoneValue) {
  phone[0].value = phoneValue;
}

function cons(...args) {
  console.log(...args);
  return args[0];
}
debtOpton.forEach((option) => {
  option.addEventListener("click", () => {
    if (cons(isChecked(debtOpton), 'debtOpton')) {
      debtForm.style.display = "none";
      whichDebt.style.display = "block";
      currentStep = 1;
      updateProgressbar();
    }
  });
});


whichDebtOption.forEach((option) => {
  option.addEventListener("click", () => {
    if (cons(isChecked(whichDebtOption), 'whichDebtOption')) {
      whichDebt.style.display = "none";
      debtConcern.style.display = "block";
      currentStep = 2;
      updateProgressbar();
    }
  });
});
debtConcernOption.forEach((option) => {
  option.addEventListener("click", () => {
    if (cons(isChecked(debtConcernOption), 'debtConcernOption')) {
      debtConcern.style.display = "none";
      propertyForm.style.display = "block";
      currentStep = 3;
      updateProgressbar();
    }
  });
});
propertyOption.forEach((option) => {
  option.addEventListener("click", () => {
    if (cons(isChecked(propertyOption), 'propertyOption')) {
      propertyForm.style.display = "none";
      locationForm.style.display = "block";
      currentStep = 4;
      updateProgressbar();
    }
  });
});
locationOption.forEach((option) => {
  option.addEventListener("click", () => {
    if (cons(isChecked(locationOption), 'locationOption')) {
      locationForm.style.display = "none";
      statusForm.style.display = "block";
      currentStep = 5;
      updateProgressbar();
    }
  });
});
employOption.forEach((option) => {
  option.addEventListener("click", () => {
    if (cons(isChecked(employOption), 'employOption')) {
      statusForm.style.display = "none";
      nameForm.style.display = "block";
      currentStep = 6;
      updateProgressbar();
    }
  });
});
zero_next?.addEventListener("click", () => {
  // full name
  // let descValue = document.getElementById("debt_description_input").value;
  // window.descValue = descValue;
  // if (descValue == "") {
  //   alert("Please Complete Field");
  // } else {
  debtDescription.style.display = "none";
  debtForm.style.display = "block";
  currentStep = 1;
  updateProgressbar();
  // }
});
next?.addEventListener("click", () => {
  // full name
  let nameField = document.getElementById("full_name").value;
  window.nameValue = nameField;
  if (nameField == "") {
    alert("Please Enter Your Name");
  } else {
    nameForm.style.display = "none";
    emailForm.style.display = "block";
    currentStep++;
    updateProgressbar();
  }
});
next2?.addEventListener("click", (event) => {
  event.preventDefault();
  // email
  let email = document.getElementById("email").value;
  window.emailValue = email;
  // email error
  let emailError = document.querySelector(".emailError");
  if (validateEmail(email)) {
    emailError.innerText = "";
    emailForm.style.display = "none";
    phoneForm.style.display = "block";
    currentStep++;
    updateProgressbar();
  } else if (!validateEmail(email)) {
    emailError.innerText = "Please enter a valid email address";
  }
});
next_phone?.addEventListener("click", async (event) => {
  event.preventDefault();
  let phone = document.getElementById("phone").value;
  window.phoneValue = phone;
  let phoneError = document.querySelector(".phoneError");

  //phone validate code
  if (await isValidPhone(phone)) {
    // phoneError.innerText = "Phone is valid";
    phoneError.innerText = "";
    phoneForm.style.display = "none";
    finalForm.style.display = "block";

  } else {
    phoneError.innerText = "Please enter a valid UK phone number";
  }
});

async function submitForm() {
  let finalError = document.querySelector(".finalError");
  finalError.innerText = '';
  let response = await postData();
  console.log(response?.status.toLowerCase(), "response status");
  if (response && response?.status.toLowerCase() != "error") {
    currentStep++;
    updateProgressbar();
    console.log('success');
    window.location.href = "thankyou.html";
  } else {
    finalError.innerText = response?.errors?.[0] || "Something went wrong";
  }
}


let preffered_contact_method = document.getElementsByName("input[name=preffered_contact_method]");
preffered_contact_method.forEach((option) => {
  option.addEventListener("click", () => {
    if (cons(isChecked(preffered_contact_method)) == 'email') {
      document.getElementById("email-view").display = "block";
      document.getElementById("method-selection").display = "none";
    }
    if (cons(isChecked(preffered_contact_method)) == 'phone') {
      document.getElementById("email-view").display = "none";
      document.getElementById("method-selection").display = "block";
    }
  })


})

sumbitbtn?.addEventListener("click", async (event) => {
  event.preventDefault();
  submitForm();
});

prev0?.addEventListener("click", () => {
  currentStep = 0;
  debtForm.style.display = "none";
  debtDescription.style.display = "block";
  updateProgressbar();
});
prev1?.addEventListener("click", () => {
  currentStep = 1;
  debtForm.style.display = "block";
  whichDebt.style.display = "none";
  updateProgressbar();
});
prev_2_3?.addEventListener("click", () => {
  currentStep = 2;
  whichDebt.style.display = "block";
  debtConcern.style.display = "none";
  updateProgressbar();
});
prev2?.addEventListener("click", () => {
  currentStep = 3;
  debtConcern.style.display = "block";
  propertyForm.style.display = "none";
  updateProgressbar();
});
prev3?.addEventListener("click", () => {
  currentStep = 4;
  propertyForm.style.display = "block";
  locationForm.style.display = "none";
  updateProgressbar();
});
prev4?.addEventListener("click", () => {
  currentStep = 5;
  locationForm.style.display = "block";
  statusForm.style.display = "none";
  updateProgressbar();
});
prev5?.addEventListener("click", () => {
  currentStep = 6;
  statusForm.style.display = "block";
  nameForm.style.display = "none";
  updateProgressbar();
});
prev6?.addEventListener("click", () => {
  currentStep = 7;
  nameForm.style.display = "block";
  emailForm.style.display = "none";
  updateProgressbar();
});

function updateProgressbar() {
  progressSteps.forEach((step) => {
    step?.classList?.remove("active");
    step?.classList?.remove("current");
  });
  for (let i = 0; i < currentStep; i++) {
    progressSteps[i]?.classList?.add("active");
  }
  progressSteps[currentStep]?.classList?.add("current");
}

function isChecked(option) {
  for (var i = 0; i < option.length; i++) {
    if (option[i].checked) {
      return option[i].value;
    }
  }
  return false;
}

const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

function log(data) {
  console.log(data);
  return data;
}
async function isValidPhone(phoneNumber) {
  if (phoneNumber.slice(0, 3) == "+44") {
    phoneNumber = phoneNumber.replace("+44", "0");
  }

  let api_key = "e85a586bb27e1330b8e7467a73ce2b2e";

  let url = "https://monetise.leadbyte.co.uk/restapi/v1.2/validate/mobile?key=" + api_key + "&value=" + phoneNumber;
  return log(await corsGET(url))[0]?.status?.toLowerCase() == "valid";
}
async function postData() {

  const requestData = {
    key: "42c4ea91c662a693e6479788c105bf6f",
    lead: {
      campid: "CREDITFIX-DEBT",
      fullname: nameValue,
      email: emailValue,
      phone1: phoneValue,
      preferred_communication: isChecked(document.querySelectorAll('input[name="preffered_contact_method"')),
      contactemail: document.querySelector('input[name="preffered_contact_method_email"').checked,
      contactphone: document.querySelector('input[name="preffered_contact_method_phone"').checked,
      contactsms: document.querySelector('input[name="preffered_contact_method_sms"').checked,
      country: [...locationOption].reduce((a, b) => (b.checked ? b.value : a), null),
      debt_amount: [...debtOpton].reduce((a, b) => (b.checked ? b.value : a), null),
      types_of_debt: [...whichDebtOption].reduce((a, b) => (b.checked ? b.value : a), null),
      debt_concerns: [...debtConcernOption].reduce((a, b) => (b.checked ? b.value : a), null),
      property_type: [...propertyOption].reduce((a, b) => (b.checked ? b.value : a), null),
      employment_status: [...employOption].reduce((a, b) => (b.checked ? b.value : a), null),
      source: sourceParam || "",
      c1: clickIdParam,
      ssid: sourceParam || "",
      ipaddress: (await (await fetch("https://api.ipify.org/?format=json")).json()).ip,
      useragent: navigator.userAgent,
      optinurl: "https://your-debtexpert.co.uk", // 'https://ukdebtexpert.co.uk'
    },
  };

  console.log("requestData", requestData);
  let url = "https://monetise.leadbyte.co.uk/restapi/v1.2/leads";
  let response = (
    await corsGET(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })
  )[0];
  console.log(response);
  return response;
}
async function corsGET(u, options) {
  const url = "/proxy.php/?" + encodeURIComponent(u);
  let res = null;
  let error = null;
  try {
    res = await fetch(url, options);
    let responseText = await res.text();
    try {
      res = JSON.parse(responseText);
    } catch (error) {
      console.log(error, responseText);
      res = responseText;
    }
  } catch (e) {
    error = e;
  }
  return [res, error];
}
function check(e) {
  e.preventDefault();
  let debt_amount = document.querySelector('input[name="debt"]').value;
  let number_creditors = document.querySelector('select[name="creditors"]').value;
  let property_type = document.querySelector('select[name="property"]').value;
  console.log(`calculator.html?debt=${debt_amount}&property=${property_type}&creditors=${number_creditors}`);
  window.location.href = `calculator.html?debt=${debt_amount}&property=${property_type}&creditors=${number_creditors}`;
}
