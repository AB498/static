var urlParams = new URLSearchParams(window.location.search);
var sourceParam = urlParams.get("source");
var clickIdParam = urlParams.get("clickid");

let email = document.querySelector('input[name="email"]');
let mobile_number = document.querySelector('input[name="mobile_number"]');

async function submitForm(event) {
  event.preventDefault();
  let resp = await postData();
  if (resp.code != 1) {
    var modal = new tingle.modal({});
    modal.setContent("<center><h1>Error</h1><br/><p>" + resp.response + "</p></center>");
    modal.open();
  } else {
    var modal = new tingle.modal({});
    modal.setContent("<center><h1>Thank You</h1><br/><p>We have received your unsubscription detail</p></center>");
    modal.open();
  }
}

async function postData() {
  const requestData = {
    key: "42c4ea91c662a693e6479788c105bf6f",
    lead: {
      campid: "TDOT-EMAIL-UNSUB",
      email: email.value,
      phone1: mobile_number.value,
      source: sourceParam || "",
      c1: clickIdParam,
      ssid: sourceParam || "",
    },
  };

  console.log("requestData", requestData);
  let url = "https://monetise.leadbyte.co.uk/api/submit.php?campid=TDOT-EMAIL-UNSUB&sid=1&returnjson=yes";

  let response = (
    await corsRequest(url, {
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
async function corsRequest(u, options) {
  const url = "https://corsproxy.io/?" + encodeURIComponent(u);
  let res = null;
  let error = null;
  try {
    res = await fetch(url, options);
    try {
      res = await res.json();
    } catch (error) {
      try {
        res = await res.text();
      } catch (error) {
        res = await res.arrayBuffer();
      }
    }
  } catch (e) {
    error = e;
  }
  return [res, error];
}

let phoneError = document.querySelector(".phone-error");
let emailError = document.querySelector(".email-error");
function validatePhone(event) {
  let phone = event.target.value;
  let regexUKPhone = /^(((\+44\s?\d{4}|\(?0\d{4}\)?)\s?\d{3}\s?\d{3})|((\+44\s?\d{3}|\(?0\d{3}\)?)\s?\d{3}\s?\d{4})|((\+44\s?\d{2}|\(?0\d{2}\)?)\s?\d{4}\s?\d{4}))(\s?\#(\d{4}|\d{3}))?$/;
  if (regexUKPhone.test(phone)) {
    phoneError.style.display = "none";
    return true;
  } else {
    phoneError.style.display = "block";
    phoneError.innerText = "Please enter a valid UK phone number";
  }
}

function validateEmail(event) {
  let email = event.target.value;
  let regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (regexEmail.test(email)) {
    emailError.style.display = "none";
    return true;
  } else {
    emailError.style.display = "block";
    emailError.innerText = "Please enter a valid email address";
  }
}
