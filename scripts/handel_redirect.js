const title = document.title;

if (title == 'Login' || title == 'Register'){
	if(getCurrentUser()) {
		window.open('../home.html', '_self')
	}
} else {
	if(!getCurrentUser()) {
		window.open('../login.html', '_self')
	}
}
