const CATEGORY_COLORS = {
  "Action":        { color: "#fff5f5", background: "#e74c3c", },
  "Adventure":     { color: "#eaf6ff", background: "#2980b9" },
  "RGP":           { color: "#f9f0fc", background: "#9b59b6" },
  "Simulation":    { color: "#ecfff9", background: "#1abc9c" },
  "Shooter":       { color: "#f2f4f4", background: "#2c3e50" },
  "Multiplayer":   { color: "#fff8e6", background: "#f39c12" },
  "Horror":        { color: "#f0f3f4", background: "#5d6d7e" },
  "Party":         { color: "#f0fff9", background: "#f7dc6f" },
  "Sports":        { color: "#f0fff9", background: "#27ae60" },
  "Survival":      { color: "#fff0e6", background: "#ca6f1e" },
  "Co-op":         { color: "#f5e9fc", background: "#884ea0" },
  "Puzzle":        { color: "#f8f9f9", background: "#566573" },
  "Open World":    { color: "#e6fcfa", background: "#138d75" },
  "Sci-Fi":        { color: "#eaf4ff", background: "#2471a3" },
  "Family":        { color: "#f0f3f4", background: "#2c3e50" },
  "Anime":         { color: "#fff0f0", background: "#c0392b" },
};    


function handelInput (e) {
	if(e.key == "Enter") {
		window.open(`./search.html?q=${e.target.value}`, '_self')
	}
}

const allCategories = Object.keys(CATEGORY_COLORS)

const allPlatforms = [
  'PC',
  'Switch',
  'PS',
  'Mobile',
  'Xbox',
  'Nintendo',
]

// need to handel the errors if this is fails
let data =  []
const xhr = new XMLHttpRequest();

// here by using false i block the code so that i can get the data first 
xhr.open("GET", "../games.json", false);

xhr.onreadystatechange = function () {
  if (xhr.readyState == 4 && xhr.status === 200) {
    data = JSON.parse(xhr.responseText);
	  ready = true
  }
};

xhr.send();




function getRandomItems(array, count) {
	const shuffeld = array.sort((e) => Math.random() - 0.5)
	return shuffeld.slice(0, count)
}

function logout() {
	sessionStorage.removeItem('currentUser')
	window.open('../login.html', '_self')
}

function search() {
  const searchInput = document.getElementById('searchInput')
  window.open(`./search.html?q=${searchInput.value}`, '_self')
}

function getUsersData() {
	let users = localStorage.getItem('users')
	return users.length > 0 ? JSON.parse(users) : []
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

function createGameCover(game) {
	const cover = document.createElement('div')
	cover.className = 'cover-container'
	cover.style.backgroundImage = `url(${game.cover})`

	cover.innerHTML = `<h2>${game.title}</h2>`
	return cover
}

function createGameCard(game) {
	const card = document.createElement('div');
	card.className = 'card-container';

	const categoryBtns = game.category.map(cat => {
		const color = CATEGORY_COLORS[cat].color || 'gray';
		const bgColor = CATEGORY_COLORS[cat].background || 'black';
		return `<button class="catogory" style="color: ${color}; background-color: ${bgColor};">${cat}</button>`;
	}).join('');

	const priceText = game.price === 0 ? 'FREE' : `$${game.price}`;
	const priceClass = game.price === 0 ? 'free-price' : '';
	const addToCartBtn = document.createElement('button')

	addToCartBtn.innerText = 'Add to Cart';
	addToCartBtn.className = 'add-to-cart';
	addToCartBtn.onclick = (e) => {
		e.target.disabled = true;
		addToUserCart(game)
	}
	addToCartBtn.disabled = isProductOnCart(game.id) 


	card.innerHTML = `
		<div onclick="window.open('product.html?id=${game.id}', '_self')"
		style="background-image: url(${game.image}); cursor: pointer;" class="image-container">
		<div class="rating">${game.rating}</div>
		</div>
		${categoryBtns}
		<h3 onclick="window.open('./product.html?id=${game.id}', '_self')" class="title">${game.title}</h3>
		<div class="card-footer">
		<p class="price ${priceClass}">${priceText}</p>
		</div> `;

	//i'm trying a push the add buton as the first child for the card footer
	card.children[card.children.length - 1].prepend(addToCartBtn)
	return card;
}


