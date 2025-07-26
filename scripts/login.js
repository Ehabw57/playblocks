function loginCheck() {
    var loginBtn = document.getElementById("login-btn");
    loginBtn.disabled = true;

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    var usersData = localStorage.getItem("users");
    var users = usersData ? JSON.parse(usersData) : [];

    var user = users.find( function matchUser(user) { return user.username === username; });

    if (!user) {
        alert(username + " user is not registered yet");
        loginBtn.disabled = false;
        return;
    }

    if (user.password !== password) {
        alert("Sorry, wrong password");
        loginBtn.disabled = false;
        return;
    }

    sessionStorage.setItem("sessionID", user.userID);

    alert("Login successful!");
    loginBtn.disabled = false;
}

if (!localStorage.getItem("users")) {
    var findUsers = [
        { username: "rehab", userID: "u1", password: "1234" },
        { username: "ahmed", userID: "u2", password: "abcd" },
        { username: "ali", userID: "u3", password: "abc1" },
        { username: "sara", userID: "u4", password: "ab12" }
    ];
    localStorage.setItem("users", JSON.stringify(findUsers));
}