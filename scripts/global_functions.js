const CATEGORY_COLORS = {
  "Action":        { color: "#fff5f5", background: "#e74c3c" },
  "Adventure":     { color: "#eaf6ff", background: "#2980b9" },
  "RGP":           { color: "#f9f0fc", background: "#9b59b6" },
  "Simulation":    { color: "#ecfff9", background: "#1abc9c" },
  "Shooter":       { color: "#f2f4f4", background: "#2c3e50" },
  "Multiplayer":   { color: "#fff8e6", background: "#f39c12" },
  "Horror":        { color: "#f0f3f4", background: "#5d6d7e" },
  "Party":         { color: "#af4d20", background: "#f7dc6f" },
  "Sports":        { color: "#f0fff9", background: "#27ae60" },
  "Survival":      { color: "#fff0e6", background: "#ca6f1e" },
  "Co-op":         { color: "#f5e9fc", background: "#884ea0" },
  "Puzzle":        { color: "#f8f9f9", background: "#566573" },
  "Open World":    { color: "#e6fcfa", background: "#138d75" },
  "Sci-Fi":        { color: "#eaf4ff", background: "#2471a3" },
  "Family":        { color: "#2c3e50", background: "#f0f3f4" },
  "Anime":         { color: "#fff0f0", background: "#c0392b" },
};

const allCategories = Object.keys(CATEGORY_COLORS)

const allPlatforms = [
  'PC',
  'PS5',
  'Switch',
  'PS4',
  'Mobile',
  'Xbox',
  'Nintendo',
  'PS3',
  'mobile'
]

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

function createGameCover(game) {
	const cover = document.createElement('div')
	cover.className = 'cover-container'
	cover.style.backgroundImage = 'url("./assets/notfound.png")'

	const categoryBtns = game.category.map(cat => {
		const color = CATEGORY_COLORS[cat].color || 'gray';
		const bgColor = CATEGORY_COLORS[cat].background || 'black';
		return `<button class="catogory" style="color: ${color}; background-color: ${bgColor};">${cat}</button>`;
	}).join('');

	cover.innerHTML = `${categoryBtns} <h2>${game.title}</h2>`
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
		<div style="background-image: url(${game.image});" class="image-container">
		<div class="rating">${game.rating}</div>
		</div>
		${categoryBtns}
		<h3 class="title">${game.title}</h3>
		<div class="card-footer">
		<p class="price ${priceClass}">${priceText}</p>
		</div> `;

	//i'm trying a push the add buton as the first child for the card footer
	card.children[card.children.length - 1].prepend(addToCartBtn)
	return card;
}


data = [
  {
    "id": 1,
    "title": "Elden Ring",
    "image": "assets/EldenRing.jpg",
    "description": "An open-world action RPG set in a fantasy realm created by Hidetaka Miyazaki and George R.R. Martin.",
    "category": ["Action", "Adventure"],
    "developer": "FromSoftware",
    "platform": ["PC", "PS5", "xbox"],
    "release_date": "2022-02-25",
    "rating": 9.5,
    "price": 59.99
  },
  {
    "id": 2,
    "title": "Genshin Impact",
    "image": "assets/GenshinImpact.jpg",
    "description": "",
    "category": ["RGP", "Adventure"],
    "developer": "miHoYo",
    "platform": ["PC", "PS5"],
    "release_date": "2020-09-27",
    "rating": 7.4,
    "price": 30.60
  },
  {
    "id": 3,
    "title": "Hollow Knight",
    "image": "assets/HollowKnight.png",
    "description": "Explore a vast ruined kingdom of insects and heroes in this challenging Metroidvania.",
    "category": ["Action"],
    "developer": "Team Cherry",
    "platform": ["PC", "Switch", "PS4", "xbox"],
    "release_date": "2017-02-24",
    "rating": 7.9,
    "price": 14.99
  },
  {
    "id": 4,
    "title": "Persona 5",
    "image": "assets/Person5.png",
    "description": "Inside a casino, during one of their heists, the group known as Phantom Thieves of Hearts is cornered by the police...",
    "category": ["Puzzle", "Horror"],
    "developer": "Atlus",
    "platform": ["PC", "PS4"],
    "release_date": "2016-09-15",
    "rating": 6.3,
    "price": 39.99
  },
  {
    "id": 5,
    "title": "The Witcher 3: Wild Hunt",
    "image": "assets/TheWitcherWildHunt.jpg",
    "description": "A story-driven RPG with deep narrative and expansive world.",
    "category": ["Adventure", "Survival"],
    "developer": "CD Projekt Red",
    "platform": ["PC", "PS4", "xbox", "Switch"],
    "release_date": "2015-05-18",
    "rating": 8.7,
    "price": 39.99
  },
  {
    "id": 6,
    "title": "Stardew Valley",
    "image": "assets/StardewValley.png",
    "description": "A relaxing farming simulation game with charming characters and endless activities.",
    "category": ["Simulation", "Adventure"],
    "developer": "ConcernedApe",
    "platform": ["PC", "Switch", "PS4", "xbox", "Mobile"],
    "release_date": "2016-02-26",
    "rating": 8.9,
    "price": 14.99
  },
  {
    "id": 7,
    "title": "Cyberpunk 2077",
    "image": "assets/Cyperpunk.jpeg",
    "description": "An open-world sci-fi RPG set in a dystopian future city.",
    "category": ["Action", "Open World"],
    "developer": "CD Projekt Red",
    "platform": ["PC", "PS4", "PS5", "xbox"],
    "release_date": "2020-12-10",
    "rating": 6.9,
    "price": 49.99
  },
  {
    "id": 8,
    "title": "Overwatch 2",
    "image": "assets/OverWatch.png",
    "description": "A team-based multiplayer shooter with unique heroes and fast-paced gameplay.",
    "category": ["Shooter", "Multiplayer"],
    "developer": "Blizzard Entertainment",
    "platform": ["PC", "PS5", "xbox", "Switch"],
    "release_date": "2022-10-04",
    "rating": 7.8,
    "price": 0
  },
  {
    "id": 9,
    "title": "Resident Evil 4 Remake",
    "image": "assets/ResidentEvil4.png",
    "description": "A modern reimagining of the classic survival horror masterpiece.",
    "category": ["Horror", "Action"],
    "developer": "Capcom",
    "platform": ["PC", "PS5", "xbox"],
    "release_date": "2023-03-24",
    "rating": 9.3,
    "price": 59.99
  },
  {
    "id": 10,
    "title": "Fortnite",
    "image": "assets/Fortnite.jpg",
    "description": "A battle royale game with building mechanics and regular seasonal updates.",
    "category": ["Shooter", "Multiplayer"],
    "developer": "Epic Games",
    "platform": ["PC", "PS4", "PS5", "xbox", "Switch", "Mobile"],
    "release_date": "2017-07-21",
    "rating": 8.4,
    "price": 0
  },
  {
    "id": 11,
    "title": "Fall Guys",
    "image": "assets/FallGuys.jpg",
    "description": "Multiplayer party game where players compete in obstacle courses until one remains.",
    "category": ["Party", "Family"],
    "developer": "Mediatonic",
    "platform": ["PC", "PS5", "Xbox", "Nintendo"],
    "release_date": "2020-08-04",
    "rating": 4.2,
    "price": 0
  },
  {
    "id": 12,
    "title": "FIFA 20",
    "image": "assets/Fifa20.jpg",
    "description": "Realistic football simulation with updated teams and leagues.",
    "category": ["Sports", "Simulation"],
    "developer": "EA Sports",
    "platform": ["PC", "PS5", "Xbox"],
    "release_date": "2020-09-29",
    "rating": 4.5,
    "price": 69.99
  },
  {
    "id": 13,
    "title": "Call of Duty: Warzone",
    "image": "assets/CallOfDuty.jpg",
    "description": "Free-to-play battle royale experience in the Call of Duty universe.",
    "category": ["Shooter", "Action"],
    "developer": "Infinity Ward",
    "platform": ["PC", "PS5", "Xbox"],
    "release_date": "2020-03-10",
    "rating": 4.4,
    "price": 0
  },
  {
    "id": 14,
    "title": "Minecraft",
    "image": "assets/Minecraft.jpg",
    "description": "Open-world sandbox game focused on building and survival.",
    "category": ["Survival", "Party", "Simulation"],
    "developer": "Mojang",
    "platform": ["PC", "PS5", "Xbox", "Nintendo", "Mobile"],
    "release_date": "2011-11-18",
    "rating": 4.8,
    "price": 26.95
  },
  {
    "id": 15,
    "title": "Among Us",
    "image": "assets/AmongUs.jpg",
    "description": "Social deduction game where crewmates try to identify impostors.",
    "category": ["Party", "Family"],
    "developer": "Innersloth",
    "platform": ["PC", "Mobile", "Nintendo Switch"],
    "release_date": "2018-06-15",
    "rating": 4.1,
    "price": 5.70
  },
  {
    "id": 16,
    "title": "Apex Legends",
    "image": "assets/ApexLegends.jpg",
    "description": "Hero-based battle royale shooter with unique abilities.",
    "category": ["Shooter", "Multiplayer"],
    "developer": "Respawn Entertainment",
    "platform": ["PC", "PS5", "Xbox", "Nintendo"],
    "release_date": "2019-02-04",
    "rating": 4.3,
    "price": 0
  },
  {
    "id": 17,
    "title": "Rocket League",
    "image": "assets/RocketLeague.jpg",
    "description": "High-powered soccer with rocket-powered cars.",
    "category": ["Sports", "Action", "Multiplayer"],
    "developer": "Psyonix",
    "platform": ["PC", "PS5", "Xbox", "Nintendo"],
    "release_date": "2015-07-07",
    "rating": 4.6,
    "price": 0
  },
  {
    "id": 18,
    "title": "Cuphead",
    "image": "assets/CupHead.jpg",
    "description": "A classic run and gun action game heavily focused on boss battles, with a hand-drawn 1930s cartoon style.",
    "category": ["Action", "Co-op", "Adventure"],
    "developer": "Studio MDHR",
    "platform": ["PC", "Xbox", "Nintendo", "PS4"],
    "release_date": "2017-09-29",
    "rating": 8.7,
    "price": 19.99
  },
  {
    "id": 19,
    "title": "It Takes Two",
    "image": "assets/ItTakesTwo.jpg",
    "description": "A cooperative action-adventure game where two players must work together to mend a broken relationship.",
    "category": ["Co-op", "Puzzle", "Adventure"],
    "developer": "Hazelight Studios",
    "platform": ["PC", "PS4", "PS5", "xbox"],
    "release_date": "2021-03-26",
    "rating": 9.3,
    "price": 39.99
  },
  {
    "id": 20,
    "title": "Ghostrunner",
    "image": "assets/GhostRunner.jpg",
    "description": "A fast-paced first-person slasher set in a dystopian cyberpunk world with one-hit kills and parkour mechanics.",
    "category": ["Action", "Horror"],
    "developer": "One More Level",
    "platform": ["PC", "PS4", "PS5", "xbox", "Nintendo Switch"],
    "release_date": "2020-10-27",
    "rating": 8.3,
    "price": 29.99
  },
  {
    "id": 21,
    "title": "The Legend of Zelda",
    "image": "assets/LegendOfZelda.jpg",
    "description": "Explore a vast open world as Link in this critically acclaimed action-adventure set in the kingdom of Hyrule.",
    "category": ["Adventure", "Open World", "Action"],
    "developer": "Nintendo",
    "platform": ["Nintendo", "PC"],
    "release_date": "2017-03-03",
    "rating": 9.9,
    "price": 59.99
  },
  {
    "id": 22,
    "title": "Red Dead Redemption 2",
    "image": "assets/RedDeadRedmption2.jpeg",
    "description": "An open-world Western action-adventure game following John Marston’s journey to track down his former gang members.",
    "category": ["Action", "Adventure"],
    "developer": "Rockstar Games",
    "platform": ["PS3", "xbox", "Nintendo", "PS4"],
    "release_date": "2010-05-18",
    "rating": 9.5,
    "price": 29.99
  },
  {
    "id": 23,
    "title": "Portal 2",
    "image": "assets/Portal2.jpg",
    "description": "Solve mind-bending physics puzzles in a hilarious and thrilling story-driven first-person puzzle game.",
    "category": ["Puzzle", "Sci-Fi", "Co-op"],
    "developer": "Valve",
    "platform": ["PC", "PS3", "xbox"],
    "release_date": "2011-04-19",
    "rating": 9.4,
    "price": 9.99
  },
  {
    "id": 24,
    "title": "Super Mario Odyssey",
    "image": "assets/SuperMarioOdyssey.jpg",
    "description": "Join Mario on a globe-trotting 3D platform adventure with his new companion, Cappy.",
    "category": ["Adventure", "Family"],
    "developer": "Nintendo",
    "platform": ["Nintendo"],
    "release_date": "2017-10-27",
    "rating": 9.7,
    "price": 59.99
  },
  {
    "id": 25,
    "title": "Solo Leveling: ARISE",
    "image": "assets/SoloLeveling.webp",
    "description": "Based on the hit webtoon, play as Sung Jin-Woo and rise as the strongest hunter in this stylish action RPG.",
    "category": ["Action", "Anime"],
    "developer": "Netmarble",
    "platform": ["PC", "mobile"],
    "release_date": "2024-05-08",
    "rating": 8.1,
    "price": 0
  },
  {
    "id": 26,
    "title": "Smash Legends",
    "image": "assets/SmashLegends.jpeg",
    "description": "A fast-paced 3D brawler with fairytale-themed characters and chaotic multiplayer combat.",
    "category": ["Family", "RGP", "Multiplayer"],
    "developer": "5minlab",
    "platform": ["PC", "mobile"],
    "release_date": "2021-04-13",
    "rating": 7.9,
    "price": 0
  },
  {
    "id": 27,
    "title": "The Last of Us",
    "image": "assets/TheLastOfUs.jpg",
    "description": "A post-apocalyptic action-adventure game centered on the bond between Joel and Ellie as they fight to survive.",
    "category": ["Action", "Adventure"],
    "developer": "Naughty Dog",
    "platform": ["PS3", "PS4", "PS5", "PC"],
    "release_date": "2013-06-14",
    "rating": 9.8,
    "price": 39.99
  },
  {
    "id": 28,
    "title": "Mass Effect 2",
    "image": "assets/MassEffect2.jpg",
    "description": "A sci-fi RPG where you play Commander Shepard in a galaxy-spanning war against a powerful ancient race.",
    "category": ["Sci-Fi", "Action"],
    "developer": "BioWare",
    "platform": ["PC", "xbox", "PS3"],
    "release_date": "2007-11-20",
    "rating": 6.2,
    "price": 19.99
  },
  {
    "id": 29,
    "title": "Ghost of Tsushima",
    "image": "assets/GhostOfTsushima.jpg",
    "description": "Fight as a lone samurai defending Tsushima Island during the Mongol invasion in this open-world action epic.",
    "category": ["Action", "Adventure", "Open World"],
    "developer": "Sucker Punch Productions",
    "platform": ["PS4", "PS3", "PC"],
    "release_date": "2020-07-17",
    "rating": 9.3,
    "price": 49.99
  },
  {
    "id": 30,
    "title": "Control",
    "image": "assets/Control.jpg",
    "description": "A supernatural third-person shooter where you explore a shifting government building filled with mystery.",
    "category": ["Action", "Shooter", "Sci-Fi"],
    "developer": "Remedy Entertainment",
    "platform": ["PC", "PS4", "PS5", "xbox"],
    "release_date": "2019-08-27",
    "rating": 8.6,
    "price": 29.99
  }
]
