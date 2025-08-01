function logout() {
	sessionStorage.removeItem('currentUser')
	window.open('../login.html', '_self')
}

function getUsersData() {
	let users = localStorage.getItem('users')
	return users ? JSON.parse(users) : []
}

function parseUsersData(users) {
	localStorage.setItem('users', JSON.stringify(users))
}

function getCurrentUser() {
	let currentUser = JSON.parse(sessionStorage.getItem('currentUser'))
	return currentUser ? currentUser : null
}

function updateCartCount() {
	const currentUser = getCurrentUser()
	const cartCount = document.getElementById('cart-count');
	if(!cartCount) {
		console.log('updateCartCount: sorry counding get the cartCount elemnt')
		return
	}
	cartCount.innerText = currentUser.cart.length;
}

function addToUserCart(product) {
	const currentUser = getCurrentUser();
	currentUser.cart.push(product)
	updateUserCart(currentUser.cart);
}

function updateUserCart(newCart) {
	const currentUser = getCurrentUser();
	currentUser.cart = newCart;
	sessionStorage.setItem('currentUser', JSON.stringify(currentUser))
	const users = getUsersData()
	let index = users.findIndex(user => user.userName == currentUser.userName);
	users[index].cart = newCart
	parseUsersData(users)
	updateCartCount();
}

function isProductOnCart(id) {
	const currentUser = getCurrentUser()
	return currentUser.cart.some((p) => p.id == id)
}
