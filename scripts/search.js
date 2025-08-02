const platformFilter = document.getElementById('platformFilter')
const categoryFilter = document.getElementById('categoryFilter')
const searchInput = document.getElementById('search')
const priceFrom = document.getElementById('priceFrom')
const priceTo = document.getElementById('priceTo')
const root = document.getElementById('searchRoot')

createFitlers(platformFilter, 'platform')
createFitlers(categoryFilter, 'category')
const filters = document.querySelectorAll('input[type="checkbox"]');

searchInput.value = location.search.split('=')[1] || '';

let filterdGames = []
filterBySearch()

function  rewriteContent(games) {
	root.innerHTML = '';
	const coverContainer = document.createElement('section');

	if(!games) {
		coverContainer.id = 'NotFound';
		root.appendChild(coverContainer)
		return
	}
	coverContainer.id = 'coverContainer';
	const cardsContainer = document.createElement('section');
	cardsContainer.id = 'cardsContainer';
	for (let i = 1; i < games.length; i++) {
		cardsContainer.appendChild(createGameCard(games[i]));
	}
	coverContainer.appendChild(createGameCover(games[0]))
	console.log(coverContainer)
	root.appendChild(coverContainer)
	root.appendChild(cardsContainer)
}


function clearFilters() {
	filters.forEach((f) => {f.checked = false})
	priceTo.value = '$'
	priceFrom.value = '$'
	applyFilters()

}

function filterBySearch() {
	const games = data.filter((game) => game.title.toLowerCase().includes(searchInput.value.toLowerCase()))
	filterdGames = games;
	applyFilters();
}

function applyFilters() {
	const activeFilters = Array.from(filters).filter((f) => f.checked)
	let startPrice = parseFloat(priceFrom.value)
	let endPrice = parseFloat(priceTo.value)

	let games = filterdGames;

	if (activeFilters) {
		games =  filterdGames.filter((game) => {
			return activeFilters.every((filter) => {
				const key = filter.parentElement.name;
				const value = filter.parentElement.innerText;
				if (game[key].includes(value)) 
					return true 
			})
		})
	}

	if(!isNaN(startPrice) && !isNaN(endPrice)) {
		[startPrice, endPrice] = startPrice < endPrice 
			? [startPrice, endPrice] 
			: [endPrice, startPrice]
		games = games.filter((game) => game.price >= startPrice && game.price <= endPrice)
	}

	rewriteContent(games)
}

function createFitlers(parent, filterName) {
	const set = filterName == 'platform' ? allPlatforms : Object.keys(CATEGORY_COLORS)
	set.forEach((i) => {
		const input = document.createElement('input')
		input.type = 'checkbox'

		const label = document.createElement('label')
		label.innerText = i
		label.name = filterName;
		label.style.display = 'inline-block';

		label.appendChild(input)
		parent.appendChild(label)
	})
}

