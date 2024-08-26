let urlParams = new URLSearchParams(window.location.search);
let source = urlParams.get("source") || "defaultSource";
let c1 = urlParams.get("c1") || "defaultC1";
let optinurl = urlParams.get("optinurl") || null;

let navdiv = document.querySelector(".navbardiv");
let logo = document.querySelector(".logo");
var bars = document.querySelector(".fa-bars");

//navigation
document.addEventListener("DOMContentLoaded", function () {
  var navbarToggler = document.querySelector(".navbar-toggler");
  var navbarTogglerIcon = document.querySelector(".navbar-icon");
  var closeIcon = document.querySelector(".close-icon");

  navbarToggler.addEventListener("click", function () {
    navbarTogglerIcon.style.display =
      navbarTogglerIcon.style.display === "none" ? "block" : "none";
    closeIcon.style.display =
      closeIcon.style.display === "none" ? "block" : "none";

    if (navdiv.style.background === "white") {
      navdiv.style.background = "none";
      logo.classList.remove("blackcolor");
    } else {
      navdiv.style.background = "white";
      logo.classList.add("blackcolor");
    }
  });
});
window.onscroll = function () {
  if (document.body.scrollTop >= 1 || document.documentElement.scrollTop >= 1) {
    logo.classList.add("blackcolor");
    bars.style.color = "#344054";
    navdiv.classList.add("stickyNav");
  } else {
    navdiv.classList.remove("stickyNav");
    logo.classList.remove("blackcolor");
    bars.style.color = "#fff";
  }
};

// testimonial
var swiper = new Swiper(".slider-content", {
  slidesPerView: 1,
  spaceBetween: 350,
  loop: true,
  centeredSlides: true,
  grabCursor: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

function isChecked(options) {
  return Array.from(options).some((option) => option.checked);
}

// ip address
let ipaddress = "";

fetch("https://api.ipify.org?format=json")
  .then((response) => response.json())
  .then((data) => {
    ipaddress = data.ip;
    console.log(ipaddress);
  })
  .catch((error) => {
    console.log("Error:", error);
  });

// form

$(document).ready(function () {
  let $form1 = $(".form1");
  let $form2 = $(".form2");
  let $form3 = $(".form3");
  let $evaluate_data = $(".evaluate_data");
  let $thank_you = $(".thank_you");

  let $preloaders = $(".preloader");
  let $progressBar = $(".progressBar");
  let $progressDiv = $(".progressDiv");
  let $closeBtn = $(".closeBtn");

  function isChecked(options) {
    return Array.from(options).some((option) => option.checked);
  }

  $('.form1 input[name="age"]').on("click", function () {
    if (isChecked($('.form1 input[name="age"]'))) {
      $form1.fadeOut(400, function () {
        $form2.fadeIn(400);
        $progressBar.animate({ width: "40%" }, 400);
      });
    }
  });

  $('.form2 input[name="purchased-a-whisky-cask"]').on("click", function () {
    $form2.fadeOut(400, function () {
      $progressBar.animate({ width: "80%" }, 400);
      $evaluate_data.fadeIn(400);
      $progressDiv.fadeOut(400);
      $closeBtn.fadeOut(400);

      // Show the check mark
      setTimeout(function () {
        $preloaders.each(function () {
          $(this).addClass("show-check");
        });

        setTimeout(function () {
          $evaluate_data.fadeOut(400, function () {
            $form3.fadeIn(400);
            $progressDiv.fadeIn(400);
            $closeBtn.fadeIn(400);
          });
        }, 1000); // 1 second delay
      }, 3000); // 3 seconds delay
    });
  });

  $("#nextBtn").on("click", function (e) {
    e.preventDefault();

    $form2.fadeOut(400, function () {
      $progressBar.animate({ width: "80%" }, 400);
      $evaluate_data.fadeIn(400);
      $progressDiv.fadeOut(400);
      $closeBtn.fadeOut(400);

      // Show the check mark
      setTimeout(function () {
        $preloaders.each(function () {
          $(this).addClass("show-check");
        });

        setTimeout(function () {
          $evaluate_data.fadeOut(400, function () {
            $form3.fadeIn(400);
            $progressDiv.fadeIn(400);
            $closeBtn.fadeIn(400);
          });
        }, 1000); // 1 second delay
      }, 3000); // 3 seconds delay
    });
  });

  $("#submitBtn").on("click", async function (e) {
    e.preventDefault();

    function clearError(field, errorElement, inputSelector) {
      errorElement.hide();
      $(inputSelector).removeClass("errorBorder");
    }

    // Function to handle input events
    function handleInputEvent(inputSelector, errorElement, field) {
      $(inputSelector).on("input", function () {
        let value = $(this).val().trim();
        if (value) {
          clearError(field, errorElement, inputSelector);
        }
      });
    }

    handleInputEvent("#first_name", $(".first_name_error"), "#first_name");
    handleInputEvent("#last_name", $(".last_name_error"), "#last_name");
    handleInputEvent("#email", $(".email_error"), "#email");
    handleInputEvent("#phoneNumber", $(".phone_error"), "#phoneNumber");

    // Asynchronous phone validation function
    async function isValidPhone(phoneNumber) {
      if (phoneNumber.slice(0, 3) === "+44") {
        phoneNumber = phoneNumber.replace("+44", "0");
      }

      let api_key = "e85a586bb27e1330b8e7467a73ce2b2e";
      let url = `https://monetise.leadbyte.co.uk/restapi/v1.2/validate/mobile?key=${api_key}&value=${phoneNumber}`;

      let [response, error] = await corsRequest(url, { method: "GET" });
      if (error) {
        console.error("Error validating phone number:", error);
        return false;
      }
      return response?.status?.toLowerCase() === "valid";
    }

    // Fields
    let $first_name = $("#first_name").val().trim() || "";
    let $last_name = $("#last_name").val().trim() || "";
    let $email = $("#email").val().trim() || "";
    let $phone = $("#phoneNumber").val().trim() || "";

    // Error message and border elements
    let $first_name_error = $(".first_name_error");
    let $last_name_error = $(".last_name_error");
    let $email_error = $(".email_error");
    let $phone_error = $(".phone_error");

    let hasError = false;

    // Validation checks
    if ($first_name === "") {
      $first_name_error.show();
      $(".namediv input").addClass("errorBorder");
      hasError = true;
    } else {
      clearError("#first_name", $first_name_error, ".namediv input");
    }
    if ($last_name === "") {
      $last_name_error.show();
      $(".lastName input").addClass("errorBorder");
      hasError = true;
    } else {
      clearError("#last_name", $last_name_error, ".namediv input");
    }
    if ($email === "") {
      $email_error.show();
      $(".formfloat input").addClass("errorBorder");
      hasError = true;
    } else {
      clearError("#email", $email_error, ".formfloat input");
    }

    if (!(await isValidPhone($phone))) {
      $phone_error.show();
      $(".formfloat input").addClass("errorBorder");
      $("#basic-addon1").addClass("errorBorder");
      hasError = true;
    } else {
      clearError("#phoneNumber", $phone_error, ".formfloat input");
      $("#basic-addon1").removeClass("errorBorder");
    }

    if (hasError) {
      return;
    }

    // Data
    const requestData = {
      key: "42c4ea91c662a693e6479788c105bf6f",
      lead: {
        campid: "WHISKY-PARTNERS",
        email: $email,
        firstname: $first_name,
        lastname: $last_name,
        phone1: $phone,
        ipaddress: ipaddress,
        source: source,
        c1: c1,
        optinurl: optinurl
      }
    }

    console.log("requestData", requestData);

    // Submit data
    let [response, error] = await corsRequest(`https://monetise.leadbyte.co.uk/api/submit.php?returnjson=yes&campid=WHISKY-PARTNERS&sid=1&email=${$email}&firstname=${$first_name}&lastname=${$last_name}&phone1=${$phone}&ipaddress=${ipaddress}&source=${source}&c1=${c1}${optinurl ? '&optinurl=' + optinurl : ''}`, {
      method: "GET",
    });

    if (error) {
      console.log("Error submitting form: ", error);
      return;
    }

    if (response?.code != 1) return console.log("Error submitting form: ", response);

    console.log("Form Submitted Successfully", response);
    $form3.fadeOut(400, function () {
      $thank_you.fadeIn(400);
      $progressBar.animate({ width: "100%" }, 400);
      $closeBtn.fadeOut(400);
      $progressDiv.fadeOut(400);
    });
  });

  // Proxy function for handling CORS
  async function corsRequest(u, options) {
    // const url = "https://corsproxy.io/?" + encodeURIComponent(u);
    const url = window.location.origin + "/proxy.php?" + encodeURIComponent(u);
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
});
