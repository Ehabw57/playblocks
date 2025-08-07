const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("cPassword");
const termsCheckbox = document.getElementById("agree");
const registerBtn = document.getElementById("register-btn");

function showError(small, input, show) {
	document.getElementById(small).classList.toggle("visible", show);
	input.classList.toggle("not-valid", show);
}

function checkUsername() {
	const value = usernameInput.value.trim();
	const small = document.getElementById("userNameError");

	if (value === "") {
		small.innerText = "Please enter a username";
		small.classList.add("visible");
		username.classList.add("not-valid")
		return false;
	} else if (value.includes(" ")) {
		small.innerText = "No spaces allowed in username";
		small.classList.add("visible");
		username.classList.add("not-valid")
		return false;
	} else {
		small.classList.remove("visible");
		username.classList.remove("not-valid")
		return true;
	}
}

function checkEmail() {
	const email = emailInput.value.trim();
	const valid = email.includes("@") && email.includes(".");
	showError("emailError", emailInput, !valid);
	return valid;
}

function checkPassword() {
	const password = passwordInput.value;
	const valid = password.length >= 6;
	showError("passwordError", passwordInput, !valid);
	return valid;
}

function checkConfirmPassword() {
	const match = passwordInput.value === confirmPasswordInput.value;
	showError("confirmPasswordError", confirmPasswordInput, !match);
	return match;
}

function checkTerms() {
	const checked = termsCheckbox.checked;
	if(!validateAll()) {
		termsCheckbox.checked = false
		showError("termsError", termsCheckbox, !checked);
	}
	return checked;
}

function validateAll() {
	const valid = checkUsername() &&
		checkEmail() &&
		checkPassword() &&
		checkConfirmPassword();

	valid ? registerBtn.disabled = false : registerBtn.disabled = true 
	return valid
}

function registrationCheck(e) {
	e.preventDefault()
	const userName = usernameInput.value.trim();
	const email = emailInput.value.trim();

	const users = JSON.parse(localStorage.getItem("users") || "[]");

	const userExists = users.some(
		(user) => user.userName === userName || user.email === email
	);

	if (userExists) {
		alert(`Sorry, username: ${userName} or email ${email} is already registered.`);
		return;
	}

	users.push({
		userName: userName,
		email: email,
		password: passwordInput.value,
		cart: []
	});
	localStorage.setItem("users", JSON.stringify(users));
	alert('user has been registered successfully')

	window.location.href = './login.html'
};
