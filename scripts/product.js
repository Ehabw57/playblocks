
const PLATFORMICONS = {
	"Mobile": 'fa-solid fa-mobile-screen-button',
	"PC" : 'fa-solid fa-desktop',
	"xbox" : 'fa-brands fa-xbox',
	"PS3": 'fa-brands fa-playstation',
	"PS4": 'fa-brands fa-playstation',
	"PS5": 'fa-brands fa-playstation',
	"Nintendo": 'fa-brands fa-steam'
}


const params = new URLSearchParams(window.location.search);
const gameId = params.get("id");

const game = data.find((g) => g.id == gameId);
const image = document.getElementById("cover")
const gameTitle = document.getElementById("title")
const rating = document.getElementById("rate")
const description = document.getElementById('desc')
const price = document.getElementById('price')
const meataData = document.getElementById('metaData')
const relatedProducts = document.getElementById('relatedProducts')

renderGameDetails(game)




function renderGameDetails(game) {
	gameTitle.innerText = game.title
	if ( game.price < 1) {
		price.innerText = 'FREE'
		price.style.color = 'red'
	} else {
		price.innerText = '$' + game.price
	}

	description.innerText = game.description
	rating.innerText  = game.rating
	image.setAttribute('src', game.cover)

	const tagsContainer = document.createElement('div')
	tagsContainer.className = 'tags'

	const categoryBtns = game.category.map(cat => {
		const color = CATEGORY_COLORS[cat].color || 'gray';
		const bgColor = CATEGORY_COLORS[cat].background || 'black';
		return `<button class="catogory" style="color: ${color}; background-color: ${bgColor};">${cat}</button>`;
	}).join('');

	tagsContainer.innerHTML = categoryBtns;

	const paltformsContainer = document.createElement('div')
	paltformsContainer.className = 'platforms';

	game.platform.forEach(p => {
		const icon = document.createElement('i')
		icon.className = PLATFORMICONS[p]
		paltformsContainer.appendChild(icon);
	});

	let relatedGames = data.filter((g) => g.category.includes(game.category[0]))
	relatedGames = getRandomItems(relatedGames, 3)
	for(const g of relatedGames) {
		relatedProducts.appendChild(createGameCard(g))
	}

	meataData.appendChild(tagsContainer)
	meataData.appendChild(paltformsContainer)
}

