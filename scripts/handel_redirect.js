const title = document.title;

if (title == 'Login' || title == 'Register'){
	if(getCurrentUser()) {
		window.location.href = '../home.html'
	}
} else {
	if(!getCurrentUser()) {
		window.location.href = '../login.html'
	}
}
