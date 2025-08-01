 const CATEGORY_COLORS = {
      "Action": "red",
      "RPG": "blue",
      "RGP": "blue",
      "Adventure": "green",
      "Puzzle": "gray"
    };

    function getRandomItems(array, count) {
      const shuffled = [...array].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    }

    function generateCategory(categoryName, games) {
      const root = document.body;
      const title = `Time for ${categoryName}`;

      const heading = document.createElement('h2');
      heading.textContent = title;

      const sectionDiv = document.createElement('div');
      sectionDiv.className = 'section';

      const filtered = games.filter(g => g.category.includes(categoryName));
      const randomGames = getRandomItems(filtered, Math.floor(Math.random() * 5) + 4);

      randomGames.forEach(game => {
        const card = createGameCard(game);
        sectionDiv.appendChild(card);
      });

      root.appendChild(heading);
      root.appendChild(sectionDiv);
    }

    function generatePlatform(platformName, games) {
      const root = document.body;
      const title = `Available on ${platformName}`;

      const heading = document.createElement('h2');
      heading.textContent = title;

      const sectionDiv = document.createElement('div');
      sectionDiv.className = 'section';

      const filtered = games.filter(g => g.platform.includes(platformName));
      const randomGames = getRandomItems(filtered, Math.floor(Math.random() * 5) + 4);

      randomGames.forEach(game => {
        const card = createGameCard(game);
        sectionDiv.appendChild(card);
      });

      root.appendChild(heading);
      root.appendChild(sectionDiv);
    }

    function createGameCard(game) {
      const card = document.createElement('div');
      card.className = 'card-container';

      const categoryBtns = game.category.map(cat => {
        const color = CATEGORY_COLORS[cat] || 'gray';
        return `<button class="catogory ${color}">${cat}</button>`;
      }).join('');

      const priceText = game.price === 0 ? 'Free' : `$${game.price}`;
      const priceClass = game.price === 0 ? 'free-price' : '';

      card.innerHTML = `
        <div class="image-container">
          <img src="${game.image}" alt="${game.title}">
          <div class="rating">${game.rating}</div>
        </div>
        ${categoryBtns}
        <h3 class="title">${game.title}</h3>
        <div class="card-footer">
          <button class="add-to-cart">Add to Cart</button>
          <p class="price ${priceClass}">${priceText}</p>
        </div>
      `;
      return card;
    }
   fetch('games.json')
  .then(res => res.json())
  .then(data => {
    const categorySet = {};
    const platformSet = {};

    data.forEach(game => {
    game.category.forEach(cat => categorySet[cat] = true);
    game.platform.forEach(plat => platformSet[plat] = true);
    });

    const allCategories = Object.keys(categorySet);
    const allPlatforms = Object.keys(platformSet);


    const randomCategory = allCategories[Math.floor(Math.random() * allCategories.length)];
    const randomPlatform = allPlatforms[Math.floor(Math.random() * allPlatforms.length)];

    generatePlatform(randomPlatform, data);
    generateCategory(randomCategory, data);
  })