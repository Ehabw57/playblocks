const username = document.getElementById("username");
const password = document.getElementById("password");
const loginBtn = document.getElementById("login-btn");
const togglePasswordIcon = document.getElementById("togglePassword");


function handelUserName(event) {
	loginBtn.disabled = event.target.value === '' ? true : false
}

function togglePassword() {
  const isPassword = password.type === "password";
  password.type = isPassword ? "text" : "password";

  togglePasswordIcon.classList.toggle("fa-eye");
  togglePasswordIcon.classList.toggle("fa-eye-slash");
}

togglePasswordIcon.addEventListener("click", togglePassword);

function loginCheck() {
  loginBtn.disabled = true;

  const users = getUsersData()
  const user = users ? users.find(user => user.userName === username.value) : ''

  if (user) {
    if (user.password === password.value) {
		if (!user.cart) user.cart = []; //
    sessionStorage.setItem('currentUser', JSON.stringify(user));
		window.open('../home.html', '_self');
     location.reload();
    } else {
      alert("Sorry, wrong password");
    }
  } else {
    alert(username.value + " user is not registered yet");
  }

  loginBtn.disabled = false;
}





