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


data =  [
  {
    "id": 1,
    "title": "Elden Ring",
    "image": "assets/EldenRing.jpg",
    "cover": "assets/EldenRingCover.jpg",
    "description": "An open-world action RPG set in a fantasy realm created by Hidetaka Miyazaki and George R.R. Martin.",
    "category": [
      "Action",
      "Adventure"
    ],
    "developer": "FromSoftware",
    "platform": [
      "PC",
      "PS",
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
  "cover": "assets/GenshinImpactCover.jpg",
  "description": "An expansive open-world action RPG where players explore the magical realm of Teyvat.",
  "category": [
    "RGP",
    "Adventure"
  ],
  "developer": "miHoYo",
  "platform": [
    "PC",
    "PS"
  ],
  "release_date": "2020-09-27",
  "rating": 7.4,
  "price": 30.99
},
  {
    "id": 3,
    "title": "Hollow Knight",
    "image": "assets/HollowKnight.png",
    "cover": "assets/HollowKnightCover.jpg",
    "description": "Explore a vast ruined kingdom of insects and heroes in this challenging Metroidvania.",
    "category": [
      "Action",
      "Adventure"
    ],
    "developer": "Team Cherry",
    "platform": [
      "PC",
      "Switch",
      "PS",
      "Xbox"
    ],
    "release_date": "2017-02-24",
    "rating": 9.1,
    "price": 14.99
  },
  {
    "id": 4,
    "title": "Persona 5",
    "image": "assets/Person5.png",
    "cover": "https://media.rawg.io/media/games/3ea/3ea0e57ede873970c0f1130e30d88749.jpg",
    "description": "Inside a casino, during one of their heists, the group known as Phantom Thieves of Hearts is cornered by the police...",
    "category": [
      "RGP",
      "Adventure"
    ],
    "developer": "Atlus",
    "platform": [
      "PC",
      "PS"
    ],
    "release_date": "2016-09-15",
    "rating": 6.3,
    "price": 39.99
  },
  {
    "id": 5,
    "title": "The Witcher 3: Wild Hunt",
    "image": "assets/TheWitcherWildHunt.jpg",
    "cover": "assets/TheWitcherWildHuntCover.webp",
    "description": "A story-driven RPG with deep narrative and expansive world.",
    "category": [
      "Adventure",
      "Open World"
      
    ],
    "developer": "CD Projekt Red",
    "platform": [
      "PC",
      "PS",
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
      "Simulation",
      "Adventure"
    ],
    "developer": "ConcernedApe",
    "platform": [
      "PC",
      "Switch",
      "PS",
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
      "Action",
      "Shooter",
      "Multiplayer"

    ],
    "developer": "CD Projekt Red",
    "platform": [
      "PC",
      "PS",
      "Xbox"
    ],
    "release_date": "2020-12-10",
    "rating": 8.5,
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
      "PS",
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
      "PS",
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
    "cover": "assets/FortniteCover.jpg",
    "description": "A battle royale game with building mechanics and regular seasonal updates.",
    "category": [
      "Shooter",
      "Multiplayer"
    ],
    "developer": "Epic Games",
    "platform": [
      "PC",
      "PS",
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
      "Party",
      "Simulation"
    ],
    "developer": "Mediatonic",
    "platform": [
      "PC",
      "PS",
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
      "Sports",
      "Simulation"
    ],
    "developer": "EA Sports",
    "platform": [
      "PC",
      "PS",
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
      "Shooter",
      "Multiplayer"
    ],
    "developer": "Infinity Ward",
    "platform": [
      "PC",
      "PS",
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
      "Survival",
      "Simulation"
    ],
    "developer": "Mojang",
    "platform": [
      "PC",
      "PS",
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
      "Party",
      "Puzzle"
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
      "Shooter",
      "Adventure"
    ],
    "developer": "Respawn Entertainment",
    "platform": [
      "PC",
      "PS",
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
      "PS",
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
      "Action",
     "Adventure"
    ],
    "developer": "Studio MDHR",
    "platform": [
      "PC",
      "Xbox",
      "Nintendo",
      "PS"
    ],
    "release_date": "2017-09-29",
    "rating": 9.2,
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
      "PS",
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
      "Action",
      "Adventure"
    ],
    "developer": "One More Level",
    "platform": [
      "PC",
      "PS",
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
    "cover": "assets/TheLegendofZeldaCover.jpg",
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
      "PS",
      "Xbox",
      "Nintendo",
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
      "PS",
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
    "cover": "assets/SoloLevelingARISECover.jpg",
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
    "cover": "assets/SmashLegendsCover.jpg",
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
      "PS",
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
      "Sci-Fi",
       "Co-op"
    ],
    "developer": "BioWare",
    "platform": [
      "PC",
      "Xbox",
      "PS"
    ],
    "release_date": "2007-11-20",
    "rating": 9.3,
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
      "PS",
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
      "PS",
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
    "cover": "assets/TarislandCover.webp",
    "description": "A cross-platform MMORPG developed by Level Infinite and Published by Tencent.",
    "platform": [
      "PC",
      "Xbox"
    ],
    "category": [
      "Action"
    ],
    "price": 5.66,
    "rating": 6.3
  },
  {
    "id": 32,
    "title": "Predecessor",
    "image": "assets/Predecessor.jpg",
    "cover": "assets/PredecessorCover.jpg",
    "description": "A free-to-play MOBA shooter developed and published by Omeda Studios.",
    "platform": [
      "PC",
      "Xbox"
    ],
    "category": [
      "Action",
     "Shooter"
    ],
    "price": 58.70,
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
      "Shooter",
      "Adventure"
    ],
    "price": 27.94,
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
      "Shooter",
      "Action"
    ],
    "price": 38.60,
    "rating": 7.3
  },
  {
    "id": 35,
    "title": "Sky: Children of the Light",
    "image": "assets/Sky.webp",
    "cover": "https://media.rawg.io/media/games/cb1/cb14d42b58bdb6cf5948d0eed778c2f0.jpg",
    "description": "A cozy free-to-play MMORPG from thatgamecompany.",
    "platform": [
      "PC",
      "Xbox"
    ],
    "category": [
      "Simulation",
      "Puzzle"
    ],
    "price": 28.80,
    "rating": 7.3
  },
  {
    "id": 36,
    "title": "FragPunk",
    "image": "assets/FragPunk.jpg",
    "cover": "https://xboxwire.thesourcemediaassets.com/sites/2/2025/01/key-art-f92e3d5597e9bc0e0a34.jpg",
    "description": "A free-to-play 5v5 hero shooter that uses cards to modify matches.",
    "platform": [
      "PC",
      "Xbox"
    ],
    "category": [
      "Shooter",
      "Adventure"
    ],
    "price": 13.23,
    "rating": 8.3
  },
  {
    "id": 37,
    "title": "Throne And Liberty",
    "image": "assets/ThroneAndLiberty.webp",
    "cover": "https://media.rawg.io/media/screenshots/f5a/f5a47c651a93a57b6b0341b2af53e966.jpg",
    "description": "A free-to-play multi-platorm MMORPG from NCSoft and Amazon Games.",
    "platform": [
      "PC",
      "Xbox"
    ],
    "category": [
      "Action",
      "Open World"
    ],
    "price": 17.33,
    "rating": 4.3
  },
  {
    "id": 38,
    "title": "Stormgate",
    "image": "assets/Stormgate.webp",
    "cover": "https://media.rawg.io/media/games/4d3/4d37e250f89323a59bd83243ca271305.jpg",
    "description": "A free-to-play science fantasy real-time strategy game in which humans and robots defend Earth from alien forces.",
    "platform": [
      "PC",
      "Xbox"
    ],
    "category": [
      "Action",
      "Open World"
    ],
    "price": 20.07,
    "rating": 6.4
  },
  {
    "id": 39,
    "title": "Once Human",
    "image": "assets/OnceHuman.webp",
    "cover": "https://gaming-cdn.com/images/products/15599/orig/once-human-pc-game-steam-cover.jpg?v=1720602609",
    "description": "A post-apocalyptic open-world survival game from Starry Studio.",
    "platform": [
      "PC",
      "Xbox"
    ],
    "category": [
      "Shooter",
      "Sci-Fi"
    ],
    "price": 30.60,
    "rating": 8.7
  },
  {
    "id": 40,
    "title": "Vigor",
    "image": "assets/Vigor.jpg",
    "cover": "https://media.rawg.io/media/games/bbe/bbec05fb0c57c24c92dbe09699d4968d.jpg",
    "description": "A free-to-play looter shooter from the developers of Operation Flashpoint and the Arma series.",
    "platform": [
      "PC",
      "Xbox"
    ],
    "category": [
      "Shooter",
      "Multiplayer"
    ],
    "price": 11.97,
    "rating": 6.1
  },
  {
    "id": 41,
    "title": "Neverwinter",
    "image": "assets/Neverwinter.webp",
    "cover": "assets/NeverwinterCover.jpg",
    "description": "A free-to-play 3D action MMORPG based on the acclaimed Dungeons & Dragons fantasy roleplaying game. ",
    "platform": [
      "PC",
      "Xbox"
    ],
    "category": [
      "Action",
      "Open World",
      "Adventure"
    ],
    "price": 36.59,
    "rating": 4.4
  },
  {
    "id": 42,
    "title": "Spectre Divide",
    "image": "assets/SpectreDivide.jpg",
    "cover": "https://gaming-cdn.com/images/products/17371/orig/spectre-divide-pc-game-steam-cover.jpg?v=1725354212",
    "description": "A 3v3 tactical shooter developed and published by Mountaintop Studios in partnership with former pro gamer shroud,",
    "platform": [
      "PC",
      "Xbox"
    ],
    "category": [
      "Shooter",
      "Multiplayer"
    ],
    "price": 33.58,
    "rating": 5.6
  },
  {
    "id": 43,
    "title": "Lost Ark",
    "image": "assets/LostArk.webp",
    "cover": "https://d1lss44hh2trtw.cloudfront.net/assets/article/2022/03/04/lost-ark-servers_feature.jpg",
    "description": "Smilegate’s free-to-play multiplayer ARPG is a massive adventure filled with lands waiting to be explored, people waiting to be met, and an ancient evil waiting to be destroyed.",
    "platform": [
      "PC",
      "Xbox"
    ],
    "category": [
      "Action",
      "Open World",
      "Adventure"
    ],
    "price": 21.19,
    "rating": 7.7
  },
  {
    "id": 44,
    "title": "War Robots: Frontiers",
    "image": "assets/WarRobotsFrontiers.webp",
    "cover": "https://media.rawg.io/media/games/2f9/2f97639927991fd06fc16ceae74b3495.jpg",
    "description": "A multiplayer mech game set in a planetary system light years from Earth.",
    "platform": [
      "PC",
      "Xbox"
    ],
    "category": [
      "Shooter",
      "Multiplayer"
    ],
    "price": 13.41,
    "rating": 5.8
  },
  {
    "id": 45,
    "title": "Splitgate 2",
    "image": "assets/Splitgate2.jpg",
    "cover": "https://www.restart.run/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2Fwii1y9hm%2Fproduction%2F6852fef73f568f064537307e15aa0b32ce506837-1920x1080.png%3Ffm%3Dwebp%26fit%3Dmax&w=2120&q=35",
    "description": "A free-to-play shooter using portals.",
    "platform": [
      "PC",
      "Xbox"
    ],
    "category": [
      "Shooter",
      "Multiplayer"
    ],
    "price": 8.50,
    "rating": 8.4
  },
  {
    "id": 46,
    "title": "Diablo Immortal",
    "image": "assets/DiabloImmortal.jpg",
    "cover": "https://media.rawg.io/media/games/7fd/7fd73ef44936f8eec7732cfc299dff09.jpg",
    "description": "Built for mobile and also released on PC, Diablo Immortal fills in the gaps between Diablo II and III in an MMOARPG environment.",
    "platform": [
      "PC",
      "Xbox"
    ],
    "category": [
      "Adventure"
    ],
    "price": 9.15,
    "rating": 9.7
  },
  {
    "id": 47,
    "title": "RuneScape",
    "image": "assets/RuneScape.webp",
    "cover": "https://media.rawg.io/media/games/007/0073b6418763a47eb023fba88cb22e7c.jpg",
    "description": "A popular 3D browser MMORPG boasting a huge player base and 15 years of content.",
    "platform": [
      "PC",
      "Xbox"
    ],
    "category": [
      "Open World",
      "Adventure"
    ],
    "price": 36.68,
    "rating": 6.5
  },
  {
    "id": 48,
    "title": "Phantasy Star Online 2",
    "image": "assets/PhantasyStar.jpg",
    "cover": "https://media.rawg.io/media/games/b39/b39b6aa7295720440cdeef058d8c39d3.jpg",
    "description": "The legacy of Phantasy Star Online 2 continues a thousand years later!",
    "platform": [
      "PC",
      "Xbox"
    ],
    "category": [
      "Adventure",
      "Sci-Fi"
    ],
    "price": 18.59,
    "rating": 7.1
  },
  {
    "id": 49,
    "title": "Warframe",
    "image": "assets/Warframe.webp",
    "cover": "https://media.rawg.io/media/games/f87/f87457e8347484033cb34cde6101d08d.jpg",
    "description": "A cooperative free-to-play third person online action shooter set in an stunning sci-fi world. ",
    "platform": [
      "PC",
      "Xbox"
    ],
    "category": [
      "Shooter",
     "Action"
    ],
    "price": 56.69,
    "rating": 8.5
  },
  {
    "id": 50,
    "title": "Crossout",
    "image": "assets/Crossout.webp",
    "cover": "https://media.rawg.io/media/games/7a6/7a6f90e85a2e264c3b440bb4787cf378.jpg",
    "description": "A post-apocalyptic MMO vehicle combat game! ",
    "platform": [
      "PC",
      "Xbox"
    ],
    "category": [
      "Adventure",
       "Co-op"
    ],
    "price": 55.88,
    "rating": 6.8
  },
  {
    "id": 51,
    "title": "Brawlhalla",
    "image": "assets/Brawlhalla.jpg",
    "cover": "https://media.rawg.io/media/games/35b/35b47c4d85cd6e08f3e2ca43ea5ce7bb.jpg",
    "description": "A free-to-play 2D platform fighter inspired by the Smash Bros.",
    "platform": [
      "PC",
      "Xbox"
    ],
    "category": [
      "Adventure",
      "Multiplayer"
      
    ],
    "price": 35.37,
    "rating": 4.2
  },
  {
    "id": 52,
    "title": "War Thunder",
    "image": "assets/WarThunder.webp",
    "cover": "https://cdna.artstation.com/p/assets/images/images/034/197/040/large/maxim-timofeev-art-battle-of-britain.jpg?1611667332",
    "description": "A MMO shooter that puts you in command of hundreds of the finest combat vehicles of World War II.",
    "platform": [
      "PC",
      "Xbox"
    ],
    "category": [
      "Shooter",
      "Multiplayer"
    ],
    "price": 55.66,
    "rating": 4.4
  },
  {
    "id": 53,
    "title": "World of Tanks",
    "image": "assets/WorldofTanks.jpeg",
    "cover": "https://media.rawg.io/media/games/c3b/c3be1d5f55cb9324c97ccb7aaaf42ad4.jpg",
    "description": "If you like blowing up tanks, with a quick and intense game style you will love this game!",
    "platform": [
      "PC",
      "Xbox"
    ],
    "category": [
      "Shooter",
      "Multiplayer"
    ],
    "price": 53.49,
    "rating": 7.7
  },
  {
  "id":54,
  "title":"Robocraft",
  "image":"https://e.snmc.io/lk/l/x/a3d8714339c982cfbe4aac9ce6bc931d/9458470",
  "cover":"https://cdn.wallpapersafari.com/43/7/HRBxPo.jpg",
  "description":"A free-to-play MMO sandbox building game! ",
  "platform":[
    "PC",
    "Xbox"
  ],
  "category":[
   "Shooter",
   "Multiplayer",
    "Sci-Fi"
  ],
 "price": 32.20,
 "rating": 8.7,
  },
  {
    "id": 55,
    "title": "Palia",
    "image": "assets/Palia.jpg",
    "cover": "https://images.ctfassets.net/qyr5bjm559gz/4CMpEBA6B9deGNmeuk7MHV/8a8b168328b5055f41d931c275550f17/meta-image-december.jpg",
    "description": "A cozy MMO with homebuilding and some adventure.",
    "platform": [
      "PC",
      "Xbox"
    ],
    "category": [
      "Adventure",
      "Open World"
    ],
    "price": 48.56,
    "rating": 6.3
  },
  {
    "id": 56,
    "title": "Valorant",
    "image": "assets/Valorant.png",
    "cover": "https://media.rawg.io/media/games/b11/b11127b9ee3c3701bd15b9af3286d20e.jpg",
    "description": "Test your mettle in Riot Games’ character-based FPS shooter Valorant.",
    "platform": [
      "PC",
      "Xbox"
    ],
    "category": [
      "Shooter",
      "Co-op",
      "Adventure"
    ],
    "price": 11.99,
    "rating": 6.4
  },
  {
    "id": 57,
    "title": "Delta Force",
    "image": "https://cdn-bgp.bluestacks.com/BGP/us/gametiles_DeltaForceHawkOps.jpg",
    "cover": "https://cdn2.unrealengine.com/delta-force-header-1920x1080-4a97a8b7d3b2.png",
    "description": "A free-to-play team-based tactical shooter.",
    "platform": [
      "PC",
      "Xbox"
    ],
    "category": [
      "Shooter",
      "Action"
    ],
    "price": 36.69,
    "rating": 8.6
  },
  {
    "id": 58,
    "title": "Tower of Fantasy",
    "image": "assets/TowerofFantasy.jpeg",
    "cover": "https://media.rawg.io/media/games/e35/e35b2e3c8e62e27152cc56cd56307497.jpg",
    "description": "Tower of Fantasy is a 3D open-world RPG, anime-style sci-fi MMO RPG game with unique characters and beautiful open vistas!",
    "platform": [
      "PC",
      "Xbox"
    ],
    "category": [
      "Action",
      "Open World",
      "Adventure"
    ],
    "price": 58.23,
    "rating": 7.5
  },
  {
    "id": 60,
    "title": "Halo Infinite",
    "image": "assets/HaloInfinite.webp",
    "cover": "https://media.rawg.io/media/games/e1f/e1ffbeb1bac25b19749ad285ca29e158.jpg",
    "description": "For the first time ever, a free-to-play Halo experience is available in the form of Halo Infinite’s multiplayer.",
    "platform": [
      "PC",
      "Xbox"
    ],
    "category": [
      "Co-op",
      "Shooter",
      "Multiplayer"
    ],
    "price": 45.32,
    "rating": 5.5
  }
]
