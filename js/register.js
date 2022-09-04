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
        var url = "url/api/Accounts/Register";
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(`{"Username": "${username.value}", "Hash": "${password.value}", "salt": "", "Iterations": 0}`));
        const re = xhr.responseText;
        if (re = "200") {
            window.alert("Account creation successful");
            window.location.href = "./login.html";
        } else if (re = "404") {
            const statusMsg = document.getElementById("status");
            statusMsg.innerHTML = `Incorrect login or password`;
        }  else if (re = "400") {
            const statusMsg = document.getElementById("status");
            statusMsg.innerHTML = `An error please try again later`;
        }
    }
}