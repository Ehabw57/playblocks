const title = document.title;

if (title == 'Playblocks — Login' || title == 'Playblocks — Register') {
	if(getCurrentUser()) {
		window.location.href = '/index.html'
	}
} else {
	if(!getCurrentUser()) {
		window.location.href = '/login.html'
	}
}
