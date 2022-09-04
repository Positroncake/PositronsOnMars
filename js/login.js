const username = document.getElementById("user");
const password = document.getElementById("pass");

function login() {
    const user = username.value;
    const pass = password.value;
    if (user === "" || pass === "") {
        const statusMsg = document.getElementById("status");
        statusMsg.outerHTML = `<h5 class="error" id="status">Fill in all fields</h5>`;
    } else {

        var xhr = new XMLHttpRequest();
        var url = "https://172.105.105.74:55555/api/Accounts/Login";
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(`{"Username": "${username.value}", "Password": "${password.value}"}`));
        const re = xhr.responseText;
        if (re = "200") {
            setCookie("username", username.value);
            setCookie("token", blah);
            window.location.href = "./home.html";
        } else if (re = "404") {
            const statusMsg = document.getElementById("status");
            statusMsg.innerHTML = `Incorrect login or password`;
        } else if (re = "400") {
            const statusMsg = document.getElementById("status");
            statusMsg.innerHTML = `An error has occured please try again later`;
        }
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