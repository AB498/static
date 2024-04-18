var currentURL = window.location.href;

var urlParams = new URLSearchParams(window.location.search);

var sourceParam = urlParams.get("source");
var clickIdParam = urlParams.get("clickid");

$(document).ready(function () {
    //toggle the component with class accordion_body
    $(".accordion_head").click(function () {
        // Check if any accordion body is visible
        if ($(".accordion_body").is(":visible")) {
            $(".accordion_body").slideUp(300);
            $(".plusminus").html('<i class="fa-solid fa-plus"></i>');
        }
        // Check if the next accordion body is visible
        if ($(this).next(".accordion_body").is(":visible")) {
            $(this).next(".accordion_body").slideUp(300);
            $(this).find(".plusminus").html('<i class="fa-solid fa-plus"></i>');
        } else {
            // Close all accordion bodies, then open the next one
            $(".accordion_head").css("background-color", "");
            $(".accordion_body").slideUp(300);
            $(this).next(".accordion_body").slideDown(300);
            $(this).find(".plusminus").html('<i class="fa-solid fa-minus"></i>');
        }
    });
});

$('button[type="submit"]').click(async function (e) {

    e.preventDefault();
    let errors = 0;

    let name = $('input[name="name"]');
    let email = $('input[name="email"]');
    let phone = $('input[name="phone"]');

    let injured = $('input[name="injured"]:checked');
    let fault = $('input[name="fault"]:checked');
    let secondInjured = $('input[name="secondInjured"]:checked');

    if (!name.val()) {
        name.parents('.name').find('.error-message')[0].style.display = 'block';
        name.parents('.name').find('.error-message')[0].textContent = 'This field is required';
        errors = 1;
    } else {
        name.parents('.name').find('.error-message')[0].style.display = 'none';
    }
    if (!email.val()) {
        email.parents('.email').find('.error-message')[0].style.display = 'block';
        email.parents('.email').find('.error-message')[0].textContent = 'This field is required';
        errors = 1;
    } else {
        email.parents('.email').find('.error-message')[0].style.display = 'none';
        if (!await isValidEmail(email.val())) {
            email.parents('.email').find('.error-message')[0].style.display = 'block';
            email.parents('.email').find('.error-message')[0].textContent = 'Invalid email address';
            errors = 1;
        } else {
            email.parents('.email').find('.error-message')[0].style.display = 'none';
        }
    }
    if (!phone.val()) {
        phone.parents('.phone').find('.error-message')[0].style.display = 'block';
        phone.parents('.phone').find('.error-message')[0].textContent = 'This field is required';
        errors = 1;
    } else {
        phone.parents('.phone').find('.error-message')[0].style.display = 'none';
        if (!await isValidPhone(phone.val())) {
            phone.parents('.phone').find('.error-message')[0].style.display = 'block';
            phone.parents('.phone').find('.error-message')[0].textContent = 'Invalid phone number';
            errors = 1;
        } else {
            phone.parents('.phone').find('.error-message')[0].style.display = 'none';
        }
    }



    if (!injured?.val()) {
        $('input[name="injured"]').parents('.question').find('.error-message')[0].style.display = 'block';
        $('input[name="injured"]').parents('.question').find('.error-message')[0].textContent = 'This field is required';
        errors = 1;
    } else {
        $('input[name="injured"]').parents('.question').find('.error-message')[0].style.display = 'none';
    }
    if (!fault?.val()) {
        $('input[name="fault"]').parents('.question').find('.error-message')[0].style.display = 'block';
        $('input[name="fault"]').parents('.question').find('.error-message')[0].textContent = 'This field is required';
        errors = 1;
    } else {
        $('input[name="fault"]').parents('.question').find('.error-message')[0].style.display = 'none';
    }
    if (!secondInjured?.val()) {
        $('input[name="secondInjured"]').parents('.question').find('.error-message')[0].style.display = 'block';
        $('input[name="secondInjured"]').parents('.question').find('.error-message')[0].textContent = 'This field is required';
        errors = 1;
    } else {
        $('input[name="secondInjured"]').parents('.question').find('.error-message')[0].style.display = 'none';
    }


    if (errors) {
        console.log('Errors');
        return;
    } else {
        console.log('Sending data');
        let result = await postData();
        if (result.status == "Error") {
            $('input[name="secondInjured"]').parents('.question').find('.error-message')[0].style.display = 'block';
            $('input[name="secondInjured"]').parents('.question').find('.error-message')[0].textContent = "Errors: " + result.errors.join(", ");
        } else {
            window.location.href = "thankyou.html";
        }
    }

});

async function postData() {
    let name = $('input[name="name"]');
    let email = $('input[name="email"]');
    let phone = $('input[name="phone"]');

    let injured = $('input[name="injured"]:checked');
    let fault = $('input[name="fault"]:checked');
    let secondInjured = $('input[name="secondInjured"]:checked');

    const requestData = {
        key: "42c4ea91c662a693e6479788c105bf6f",
        lead: {
            "campid": "PERSONAL-INJURY",
            "sid": sourceParam,
            "email": email.val(),
            "fullname": name.val(),
            "phone1": phone.val(),
            // "source": "https://cordellcopersonalinjury.co.uk",
            "source": sourceParam || "",
            "c1": clickIdParam || "",
            "q1": injured.val(),
            "q2": fault.val(),
            "q3": secondInjured.val(),
        },
    };

    console.log("requestData", requestData);
    let url = "https://monetise.leadbyte.co.uk/restapi/v1.2/leads";

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
    return log(await corsRequest(url))[0].status?.toLowerCase() == "valid";
}
const isValidEmail = (email) => {
    return email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
};
