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
        var url = "url/api/Accounts/Login";
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(`{"Username": "${username.value}", "Password": "${password.value}"}`));
        const re = xhr.responseText;
        if (re = "200") {
            window.location.href = "./home.html";
        } else if (re = "404") {
            const statusMsg = document.getElementById("status");
            statusMsg.innerHTML = `Incorrect login or password`;
        }  else if (re = "400") {
        const statusMsg = document.getElementById("status");
        statusMsg.innerHTML = `An error has occured please try again later`;
    }
    }
}