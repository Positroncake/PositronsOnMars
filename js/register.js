const username = document.getElementById("user");
const password = document.getElementById("pass");
const passwordveri = document.getElementById("passveri");

function register() {
    const user = username.value;
    const pass = password.value;
    const passv = passwordveri.value;
    console.log(user + ":" + pass + ":" + passv);
    if (user === "" || pass === "" || passv === "") {
        const statusMsg = document.getElementById("status");
        statusMsg.outerHTML = `<h5 class="error" id="status">Fill in all fields</h5>`;
    } else if (pass != passv) {
        const statusMsg = document.getElementById("status");
        statusMsg.outerHTML = `<h5 class="warning" id="status">Passwords do not match</h5>`;
    } else if (pass.length < 15) {
        const statusMsg = document.getElementById("status");
        statusMsg.outerHTML = `<h5 class="error" id="status">Password must have at least 15 characters</h5>`;
    } else {
        var xhr = new XMLHttpRequest();
        var url = "http://172.105.105.74:55555/api/Accounts/Register";
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(`{"username": "${username.value}", "hash": "${password.value}", "salt": "", "iterations": 0}`));
        const re = xhr.responseText;
        setCookie("token", re);

        

        window.alert("Account creation successful");
        window.location.href = "./login.html";

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