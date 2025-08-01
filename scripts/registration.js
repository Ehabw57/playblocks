let users = getUsersData() || []
const registerButton = document.querySelector("button[type='submit']");
const usrNameInpt = document.querySelector("input[id='username']");
const passInpt = document.querySelector("input[id=password]");
const confrmPasInp = document.querySelector("input[id=confirm-password]");
const emailInpt = document.querySelector("input[id='email']");

window.onload = function() {
  emailInpt.focus()
}



const ValidFormat =
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|net|org|edu|gov|info|io|me|tech|co|ai|[a-z]{2,})$/;

const TempEmail =
  /@(mailinator\.com|tempmail.*|10minutemail\.com|guerrillamail\.com|trashmail\.com|fakeinbox\.com|yopmail\.com)$/i;

emailInpt.addEventListener("blur", function () {
  if (
    ValidFormat.test(this.value.trim()) == false ||
    TempEmail.test(this.value.trim()) == true
  ) {
    this.focus()
    this.parentElement.classList.add("before");

    this.style.border = "1px solid red";
  } else {
    this.style.border = "1px solid #43033d";
    this.parentElement.classList.remove("after");
    // if (this.parentElement.classList.contains("before")) {
    //   this.parentElement.classList.add("after");
    // }
    this.parentElement.classList.remove("before");
  }
});

emailInpt.addEventListener("focus", function () {
  if (this.parentElement.classList.contains("before")) {
    this.parentElement.classList.add("after");
  }
  this.parentElement.classList.remove("before");
});

usrNameInpt.addEventListener("blur", function () {
  if (
    this.value.trim().length < 5 ||
    /[^a-zA-Z0-9]/.test(this.value) == true ||
    this.value.trim() !== this.value ||
    this.value.trim().split(" ").length > 1
  ) {
    
    this.focus();
    this.parentElement.classList.add("before");

    this.style.border = "1px solid red";
  } else {
    this.style.border = "1px solid #43033d";
    this.parentElement.classList.remove("after");
    // if (this.parentElement.classList.contains("before")) {
    //   this.parentElement.classList.add("after");
    // }
    registerButton.style.pointerEvents = "auto";
    registerButton.style.backgroundColor = "#ba59b6";
    this.parentElement.classList.remove("before");
  }
});

usrNameInpt.addEventListener("focus", function () {
  if (this.parentElement.classList.contains("before")) {
    this.parentElement.classList.add("after");
  }
  this.parentElement.classList.remove("before");
});

passInpt.addEventListener("click", function() {
  confrmPasInp.parentElement.classList.remove("before")
  confrmPasInp.classList.remove("after")
  this.focus( )
})

passInpt.addEventListener("blur", function () {
  if (
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])(?=.{8,})/.test(
      this.value.trim()
    ) == false ||
    this.value.trim().length < 8
  ) {
    this.focus();
    this.parentElement.classList.add("before");
    this.style.border = "1px solid red";
  } else {
    this.style.border = "1px solid #43033d";
    this.parentElement.classList.remove("after");
    confrmPasInp.focus()
    //  if (this.parentElement.classList.contains("before")) {
    //    this.parentElement.classList.add("after");
    //  }
     this.parentElement.classList.remove("before");
  }
});

passInpt.addEventListener("focus", function () {
  if (this.parentElement.classList.contains("before")) {
    this.parentElement.classList.add("after");
  
  }
  this.parentElement.classList.remove("before");
});

confrmPasInp.addEventListener("focus", function () {
  if (this.parentElement.classList.contains("before")) {
    this.parentElement.classList.add("after");
  }
  this.parentElement.classList.remove("before");
});

confrmPasInp.addEventListener("blur", function () {
  if (this.value.trim() != passInpt.value.trim()) {
    passInpt.focus();
    this.parentElement.classList.add("before");
    this.style.border = "1px solid red"; 
  } else {
    this.style.border = "1px solid #43033d";
    this.parentElement.classList.remove("after");
    // if (this.parentElement.classList.contains("before")) {
    //   this.parentElement.classList.add("after");
    // }
    this.parentElement.classList.remove("before");
  }
});

// const checkButtonsArray = [usrNameInpt, emailInpt, passInpt, confrmPasInp]
// registerButton.parentElement.addEventListener("click", function () {
  
  
// });

registerButton.addEventListener("click", function(e) {
  e.preventDefault()
  registrationCheck()
})
// mahmoud task  ############################

function registrationCheck() {
	let userName = usrNameInpt.value.trim();
	let email = emailInpt.value.trim();
	let password = passInpt.value.trim();

	const userExists = users.some((user) => user.username == userName);
	console.log(userExists)

	if (userExists) {
		alert("sorry, username is already registered .");
	} else {
		users.push({ userName, email, password, cart:[] });
		parseUsersData(users)
		window.open('../login.html', '_self');
	}
}
