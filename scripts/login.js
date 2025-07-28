const username = document.getElementById("username");
const password = document.getElementById("password");
const loginBtn = document.getElementById("login-btn")

function handelUserName(event) {
	loginBtn.disabled = event.target.value === '' ? true : false
}

function togglePassword() {
	password.type = password.type === 'password' ? 'text' : 'password'
}

function loginCheck() {
    loginBtn.disabled = true;

    const usersData = localStorage.getItem("users");
    const users = usersData ? JSON.parse(usersData) : [];

    const user = users.find( function matchUser(user) { return user.username === username.value; });

	if (user) {
		if (user.password === password.value) {
			sessionStorage.setItem("userSession", JSON.stringify(user));
			alert("Login successful!");
			console.log(sessionStorage.getItem('userSession'))
		} else 
			alert("Sorry, wrong password");
	} else
		alert(username.value + " user is not registered yet");

	loginBtn.disabled = false;
}
