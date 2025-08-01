const userTitle = document.getElementById('currentUser');
let currentUser = getCurrentUser();
userTitle.innerText = currentUser.userName
updateCartCount()
