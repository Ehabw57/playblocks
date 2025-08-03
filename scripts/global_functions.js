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
	cover.style.backgroundImage = `url(${game.cover})`

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
		<h3 onclick="window.open('./product.html?id=${game.id}', '_self')" class="title">${game.title}</h3>
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
    "cover": "https://media.rawg.io/media/games/b29/b294fdd866dcdb643e7bab370a552855.jpg",
    "description": "An open-world action RPG set in a fantasy realm created by Hidetaka Miyazaki and George R.R. Martin.",
    "category": [
      "Action",
      "Adventure"
    ],
    "developer": "FromSoftware",
    "platform": [
      "PC",
      "PS5",
      "Xbox"
    ],
    "release_date": "2022-02-25",
    "rating": 9.5,
    "price": 59.99
  },
  {
    "id": 2,
    "title": "Genshin Impact",
    "image": "assets/GenshinImpact.jpg",
    "cover": "https://media.rawg.io/media/games/c38/c38bdb5da139005777176d33c463d70f.jpg",
    "description": "",
    "category": [
      "RGP",
      "Adventure"
    ],
    "developer": "miHoYo",
    "platform": [
      "PC",
      "PS5"
    ],
    "release_date": "2020-09-27",
    "rating": 7.4,
    "price": 30
  },
  {
    "id": 3,
    "title": "Hollow Knight",
    "image": "assets/HollowKnight.png",
    "cover": "https://media.rawg.io/media/games/4cf/4cfc6b7f1850590a4634b08bfab308ab.jpg",
    "description": "Explore a vast ruined kingdom of insects and heroes in this challenging Metroidvania.",
    "category": [
      "Action"
    ],
    "developer": "Team Cherry",
    "platform": [
      "PC",
      "Switch",
      "PS4",
      "Xbox"
    ],
    "release_date": "2017-02-24",
    "rating": 9,
    "price": 14.99
  },
  {
    "id": 4,
    "title": "Persona 5",
    "image": "assets/Person5.png",
    "cover": "https://media.rawg.io/media/games/3ea/3ea0e57ede873970c0f1130e30d88749.jpg",
    "description": "Inside a casino, during one of their heists, the group known as Phantom Thieves of Hearts is cornered by the police...",
    "category": [
      "RGP"
    ],
    "developer": "Atlus",
    "platform": [
      "PC",
      "PS4"
    ],
    "release_date": "2016-09-15",
    "rating": 6.3,
    "price": 39.99
  },
  {
    "id": 5,
    "title": "The Witcher 3: Wild Hunt",
    "image": "assets/TheWitcherWildHunt.jpg",
    "cover": "https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg",
    "description": "A story-driven RPG with deep narrative and expansive world.",
    "category": [
      "Adventure"
    ],
    "developer": "CD Projekt Red",
    "platform": [
      "PC",
      "PS4",
      "Xbox",
      "Switch"
    ],
    "release_date": "2015-05-18",
    "rating": 9.7,
    "price": 39.99
  },
  {
    "id": 6,
    "title": "Stardew Valley",
    "image": "assets/StardewValley.png",
    "cover": "https://media.rawg.io/media/games/713/713269608dc8f2f40f5a670a14b2de94.jpg",
    "description": "A relaxing farming simulation game with charming characters and endless activities.",
    "category": [
      "Simulation"
    ],
    "developer": "ConcernedApe",
    "platform": [
      "PC",
      "Switch",
      "PS4",
      "Xbox",
      "Mobile"
    ],
    "release_date": "2016-02-26",
    "rating": 8.9,
    "price": 14.99
  },
  {
    "id": 7,
    "title": "Cyberpunk 2077",
    "image": "assets/Cyperpunk.jpeg",
    "cover": "https://media.rawg.io/media/games/26d/26d4437715bee60138dab4a7c8c59c92.jpg",
    "description": "An open-world sci-fi RPG set in a dystopian future city.",
    "category": [
      "Action"
    ],
    "developer": "CD Projekt Red",
    "platform": [
      "PC",
      "PS4",
      "PS5",
      "Xbox"
    ],
    "release_date": "2020-12-10",
    "rating": 8,
    "price": 49.99
  },
  {
    "id": 8,
    "title": "Overwatch 2",
    "image": "assets/OverWatch.png",
    "cover": "https://media.rawg.io/media/games/95a/95a10817d1fc648cff1153f3fa8ef6c5.jpg",
    "description": "A team-based multiplayer shooter with unique heroes and fast-paced gameplay.",
    "category": [
      "Shooter",
      "Multiplayer"
    ],
    "developer": "Blizzard Entertainment",
    "platform": [
      "PC",
      "PS5",
      "Xbox",
      "Switch"
    ],
    "release_date": "2022-10-04",
    "rating": 7.8,
    "price": 0
  },
  {
    "id": 9,
    "title": "Resident Evil 4 Remake",
    "image": "assets/ResidentEvil4.png",
    "cover": "https://media.rawg.io/media/games/51a/51a404b9918a0b19fc704a3ca248c69f.jpg",
    "description": "A modern reimagining of the classic survival horror masterpiece.",
    "category": [
      "Horror",
      "Action"
    ],
    "developer": "Capcom",
    "platform": [
      "PC",
      "PS5",
      "xbox"
    ],
    "release_date": "2023-03-24",
    "rating": 9.3,
    "price": 59.99
  },
  {
    "id": 10,
    "title": "Fortnite",
    "image": "assets/Fortnite.jpg",
    "cover": "https://media.rawg.io/media/games/34b/34b1f1850a1c06fd971bc6ab3ac0ce0e.jpg",
    "description": "A battle royale game with building mechanics and regular seasonal updates.",
    "category": [
      "Shooter",
      "Multiplayer"
    ],
    "developer": "Epic Games",
    "platform": [
      "PC",
      "PS4",
      "PS5",
      "Xbox",
      "Switch",
      "Mobile"
    ],
    "release_date": "2017-07-21",
    "rating": 8.4,
    "price": 0
  },
  {
    "id": 11,
    "title": "Fall Guys",
    "image": "assets/FallGuys.jpg",
    "cover": "https://media.rawg.io/media/games/5eb/5eb49eb2fa0738fdb5bacea557b1bc57.jpg",
    "description": "Multiplayer party game where players compete in obstacle courses until one remains.",
    "category": [
      "Party"
    ],
    "developer": "Mediatonic",
    "platform": [
      "PC",
      "PS5",
      "Xbox",
      "Nintendo"
    ],
    "release_date": "2020-08-04",
    "rating": 4.2,
    "price": 0
  },
  {
    "id": 12,
    "title": "FIFA 20",
    "image": "assets/Fifa20.jpg",
    "cover": "https://media.rawg.io/media/games/031/031af38e6a558d4cd4bf91ee80904cdf.jpg",
    "description": "Realistic football simulation with updated teams and leagues.",
    "category": [
      "Sports"
    ],
    "developer": "EA Sports",
    "platform": [
      "PC",
      "PS5",
      "Xbox"
    ],
    "release_date": "2020-09-29",
    "rating": 4.5,
    "price": 69.99
  },
  {
    "id": 13,
    "title": "Call of Duty: Warzone",
    "image": "assets/CallOfDuty.jpg",
    "cover": "https://media.rawg.io/media/games/7e3/7e327a055bedb9b6d1be86593bef473d.jpg",
    "description": "Free-to-play battle royale experience in the Call of Duty universe.",
    "category": [
      "Shooter"
    ],
    "developer": "Infinity Ward",
    "platform": [
      "PC",
      "PS5",
      "Xbox"
    ],
    "release_date": "2020-03-10",
    "rating": 4.4,
    "price": 0
  },
  {
    "id": 14,
    "title": "Minecraft",
    "image": "assets/Minecraft.jpg",
    "cover": "https://media.rawg.io/media/games/b4e/b4e4c73d5aa4ec66bbf75375c4847a2b.jpg",
    "description": "Open-world sandbox game focused on building and survival.",
    "category": [
      "Survival"
    ],
    "developer": "Mojang",
    "platform": [
      "PC",
      "PS5",
      "Xbox",
      "Nintendo",
      "Mobile"
    ],
    "release_date": "2011-11-18",
    "rating": 4.8,
    "price": 26.95
  },
  {
    "id": 15,
    "title": "Among Us",
    "image": "assets/AmongUs.jpg",
    "cover": "https://media.rawg.io/media/games/e74/e74458058b35e01c1ae3feeb39a3f724.jpg",
    "description": "Social deduction game where crewmates try to identify impostors.",
    "category": [
      "Party"
    ],
    "developer": "Innersloth",
    "platform": [
      "PC",
      "Mobile"
    ],
    "release_date": "2018-06-15",
    "rating": 4.1,
    "price": 5.99
  },
  {
    "id": 16,
    "title": "Apex Legends",
    "image": "assets/ApexLegends.jpg",
    "description": "Hero-based battle royale shooter with unique abilities.",
    "cover": "https://media.rawg.io/media/games/737/737ea5662211d2e0bbd6f5989189e4f1.jpg",
    "category": [
      "Shooter"
    ],
    "developer": "Respawn Entertainment",
    "platform": [
      "PC",
      "PS5",
      "Xbox",
      "Nintendo"
    ],
    "release_date": "2019-02-04",
    "rating": 4.3,
    "price": 0
  },
  {
    "id": 17,
    "title": "Rocket League",
    "image": "assets/RocketLeague.jpg",
    "cover": "https://media.rawg.io/media/games/8cc/8cce7c0e99dcc43d66c8efd42f9d03e3.jpg",
    "description": "High-powered soccer with rocket-powered cars.",
    "category": [
      "Sports",
      "Action"
    ],
    "developer": "Psyonix",
    "platform": [
      "PC",
      "PS5",
      "Xbox",
      "Nintendo"
    ],
    "release_date": "2015-07-07",
    "rating": 4.6,
    "price": 0
  },
  {
    "id": 18,
    "title": "Cuphead",
    "image": "assets/CupHead.jpg",
    "cover": "https://media.rawg.io/media/games/226/2262cea0b385db6cf399f4be831603b0.jpg",
    "description": "A classic run and gun action game heavily focused on boss battles, with a hand-drawn 1930s cartoon style.",
    "category": [
      "Action"
    ],
    "developer": "Studio MDHR",
    "platform": [
      "PC",
      "Xbox",
      "Nintendo",
      "PS4"
    ],
    "release_date": "2017-09-29",
    "rating": 9,
    "price": 19.99
  },
  {
    "id": 19,
    "title": "It Takes Two",
    "image": "assets/ItTakesTwo.jpg",
    "cover": "https://media.rawg.io/media/games/d47/d479582ed0a46496ad34f65c7099d7e5.jpg",
    "description": "A cooperative action-adventure game where two players must work together to mend a broken relationship.",
    "category": [
      "Co-op",
      "Puzzle",
      "Adventure"
    ],
    "developer": "Hazelight Studios",
    "platform": [
      "PC",
      "PS4",
      "PS5",
      "Xbox"
    ],
    "release_date": "2021-03-26",
    "rating": 9.3,
    "price": 39.99
  },
  {
    "id": 20,
    "title": "Ghostrunner",
    "image": "assets/GhostRunner.jpg",
    "cover": "https://media.rawg.io/media/games/957/957154d665ae676b00c0859551c733b1.jpg",
    "description": "A fast-paced first-person slasher set in a dystopian cyberpunk world with one-hit kills and parkour mechanics.",
    "category": [
      "Action"
    ],
    "developer": "One More Level",
    "platform": [
      "PC",
      "PS4",
      "PS5",
      "Xbox"
    ],
    "release_date": "2020-10-27",
    "rating": 8.3,
    "price": 29.99
  },
  {
    "id": 21,
    "title": "The Legend of Zelda",
    "image": "assets/LegendOfZelda.jpg",
    "cover": "https://media.rawg.io/media/games/f87/f87de0e93f02007fd044e4bf04d453d8.jpg",
    "description": "Explore a vast open world as Link in this critically acclaimed action-adventure set in the kingdom of Hyrule.",
    "category": [
      "Adventure",
      "Open World",
      "Action"
    ],
    "developer": "Nintendo",
    "platform": [
      "Nintendo",
      "PC"
    ],
    "release_date": "2017-03-03",
    "rating": 9.2,
    "price": 59.99
  },
  {
    "id": 22,
    "title": "Red Dead Redemption 2",
    "image": "assets/RedDeadRedmption2.jpeg",
    "cover": "https://media.rawg.io/media/games/511/5118aff5091cb3efec399c808f8c598f.jpg",
    "description": "An open-world Western action-adventure game following John Marston’s journey to track down his former gang members.",
    "category": [
      "Action",
      "Adventure"
    ],
    "developer": "Rockstar Games",
    "platform": [
      "PS3",
      "Xbox",
      "Nintendo",
      "PS4"
    ],
    "release_date": "2010-05-18",
    "rating": 9.9,
    "price": 29.99
  },
  {
    "id": 23,
    "title": "Portal 2",
    "image": "assets/Portal2.jpg",
    "cover": "https://media.rawg.io/media/games/2ba/2bac0e87cf45e5b508f227d281c9252a.jpg",
    "description": "Solve mind-bending physics puzzles in a hilarious and thrilling story-driven first-person puzzle game.",
    "category": [
      "Puzzle",
      "Sci-Fi",
      "Co-op"
    ],
    "developer": "Valve",
    "platform": [
      "PC",
      "PS3",
      "Xbox"
    ],
    "release_date": "2011-04-19",
    "rating": 9.4,
    "price": 9.99
  },
  {
    "id": 24,
    "title": "Super Mario Odyssey",
    "image": "assets/SuperMarioOdyssey.jpg",
    "cover": "https://media.rawg.io/media/games/267/267bd0dbc496f52692487d07d014c061.jpg",
    "description": "Join Mario on a globe-trotting 3D platform adventure with his new companion, Cappy.",
    "category": [
      "Adventure",
      "Family"
    ],
    "developer": "Nintendo",
    "platform": [
      "Nintendo"
    ],
    "release_date": "2017-10-27",
    "rating": 9.7,
    "price": 59.99
  },
  {
    "id": 25,
    "title": "Solo Leveling: ARISE",
    "image": "assets/SoloLeveling.webp",
    "cover": "https://cdn.nivoli.com/rpggamers/images/games/12865/solo-levelingarise-header.jpg",
    "description": "Based on the hit webtoon, play as Sung Jin-Woo and rise as the strongest hunter in this stylish action RPG.",
    "category": [
      "Action",
      "Anime"
    ],
    "developer": "Netmarble",
    "platform": [
      "PC",
      "mobile"
    ],
    "release_date": "2024-05-08",
    "rating": 8.1,
    "price": 0
  },
  {
    "id": 26,
    "title": "Smash Legends",
    "image": "assets/SmashLegends.jpeg",
    "cover": "https://media.rawg.io/media/screenshots/049/0493da9807a136fc5aae29be91d686fc.jpg",
    "description": "A fast-paced 3D brawler with fairytale-themed characters and chaotic multiplayer combat.",
    "category": [
      "Action",
      "Multiplayer"
    ],
    "developer": "5minlab",
    "platform": [
      "PC",
      "mobile"
    ],
    "release_date": "2021-04-13",
    "rating": 7.9,
    "price": 0
  },
  {
    "id": 27,
    "title": "The Last of Us",
    "image": "assets/TheLastOfUs.jpg",
    "cover": "https://media.rawg.io/media/games/a5a/a5a7fb8d9cb8063a8b42ee002b410db6.jpg",
    "description": "A post-apocalyptic action-adventure game centered on the bond between Joel and Ellie as they fight to survive.",
    "category": [
      "Action",
      "Adventure"
    ],
    "developer": "Naughty Dog",
    "platform": [
      "PS3",
      "PS4",
      "PS5",
      "PC"
    ],
    "release_date": "2013-06-14",
    "rating": 9.8,
    "price": 39.99
  },
  {
    "id": 28,
    "title": "Mass Effect 2",
    "image": "assets/MassEffect2.jpg",
    "cover": "https://media.rawg.io/media/games/3cf/3cff89996570cf29a10eb9cd967dcf73.jpg",
    "description": "A sci-fi RPG where you play Commander Shepard in a galaxy-spanning war against a powerful ancient race.",
    "category": [
      "Sci-Fi"
    ],
    "developer": "BioWare",
    "platform": [
      "PC",
      "Xbox",
      "PS3"
    ],
    "release_date": "2007-11-20",
    "rating": 9,
    "price": 19.99
  },
  {
    "id": 29,
    "title": "Ghost of Tsushima",
    "image": "assets/GhostOfTsushima.jpg",
    "cover": "https://media.rawg.io/media/games/f24/f2493ea338fe7bd3c7d73750a85a0959.jpeg",
    "description": "Fight as a lone samurai defending Tsushima Island during the Mongol invasion in this open-world action epic.",
    "category": [
      "Action",
      "Adventure",
      "Open World"
    ],
    "developer": "Sucker Punch Productions",
    "platform": [
      "PS4",
      "PS3",
      "PC"
    ],
    "release_date": "2020-07-17",
    "rating": 9.9,
    "price": 49.99
  },
  {
    "id": 30,
    "title": "Control",
    "image": "assets/Control.jpg",
    "cover": "https://media.rawg.io/media/games/253/2534a46f3da7fa7c315f1387515ca393.jpg",
    "description": "A supernatural third-person shooter where you explore a shifting government building filled with mystery.",
    "category": [
      "Action",
      "Shooter",
      "Sci-Fi"
    ],
    "developer": "Remedy Entertainment",
    "platform": [
      "PC",
      "PS4",
      "PS5",
      "Xbox"
    ],
    "release_date": "2019-08-27",
    "rating": 8.6,
    "price": 29.99
  },
    {
    "id": 31,
    "title": "Tarisland",
    "image": "assets/Tarisland.jpg",
    "cover": "https://media.rawg.io/media/screenshots/961/961c11b296449593202e601951f80d2b.jpg",
    "description": "A cross-platform MMORPG developed by Level Infinite and Published by Tencent.",
    "platform": [
      "PC",
      "Xbox"
    ],
    "category": [
      "Action"
    ],
    "price": "5.66",
    "rating": 6.3
  },
  {
    "id": 32,
    "title": "Predecessor",
    "image": "assets/Predecessor.jpg",
    "cover": "https://media.rawg.io/media/screenshots/6a0/6a0117d2dba5284ff13d0d08bf57beed.jpg",
    "description": "A free-to-play MOBA shooter developed and published by Omeda Studios.",
    "platform": [
      "PC",
      "Xbox"
    ],
    "category": [
      "Action"
    ],
    "price": "58.70",
    "rating": 7.8
  },
  {
    "id": 33,
    "title": "PUBG: BATTLEGROUNDS",
    "image": "assets/Pubg.jpg",
    "cover": "https://media.rawg.io/media/games/1bd/1bd2657b81eb0c99338120ad444b24ff.jpg",
    "description": "Get into the action in one of the longest running battle royale games PUBG Battlegrounds.",
    "platform": [
      "PC",
      "Xbox"
    ],
    "category": [
      "Shooter"
    ],
    "price": "27.94",
    "rating": 8.1
  },
  {
    "id": 34,
    "title": "Enlisted",
    "image": "assets/Enlisted.jpg",
    "cover": "https://media.rawg.io/media/games/9da/9dad0e1b6406a4685f244c58854a0ea2.jpg",
    "description": "Get ready to command your own World War II military squad in Gaijin and Darkflow Software’s MMO squad-based shooter Enlisted. ",
    "platform": [
      "PC",
      "Xbox"
    ],
    "category": [
      "Shooter"
    ],
    "price": "38.60",
    "rating": 7.3
  }
]
