if (getCookie("token") == null) {
    window.location.href = "./login.html";
}

const title = document.getElementById("title");
const price = document.getElementById("price");
const image = document.getElementById("image");

const cate = document.getElementById("cate");
const cond = document.getElementById("cond");

let category = "";
let condition = "";

function choose(passin) {
    category = passin;
    cate.innerHTML = passin;
}

function chooseCond(passin) {
    condition = passin;
    cond.innerHTML = passin;
}

function sell() {
    let type = 0;
    if (cate.innerHTML == "CPU") {
        type = 1;
    } else if (cate.innerHTML == "GPU") {
        type = 2;
    } else if (cate.innerHTML == "RAM") {
        type = 3;
    } else if (cate.innerHTML == "Motherboard") {
        type = 4;
    } else if (cate.innerHTML == "Storage") {
        type = 5;
    } else if (cate.innerHTML == "PSU") {
        type = 6;
    }

    const strTitle = title.value;
    const strSeller = getCookie("username");
    const strImage = image.value;
    const intCond = cond.innerHTML;
    const strPrice = price.value;
    const token = getCookie("token");

    var xhr = new XMLHttpRequest();
    var url = "http://172.105.105.74:55555/api/Accounts/Register";
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(`
        {
            "id": 0,
            "type": ${type},
            "name": "${strTitle}",
            "seller": "${strSeller}",
            "image": "${strImage}",
            "condition": ${intCond},
            "price": ${strPrice},
            "token": "${token}"
          }
          `));
    const re = xhr.responseText;
    if (re = "200") {
        window.alert("Account creation successful");
        window.location.href = "./login.html";
    } else if (re == "404") {
        const statusMsg = document.getElementById("status");
        statusMsg.innerHTML = `Incorrect login or password`;
    } else if (re == "400") {
        const statusMsg = document.getElementById("status");
        statusMsg.innerHTML = `An error has occured please try again later`;
    }
}

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
function eraseCookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
