const userTitle = document.getElementById('currentUser');
const currentUser = getCurrentUser();
userTitle.innerText = currentUser.userName
updateCartCount()

    function getRandomItems(array, count) {
      const shuffled = [...array].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    }

    function generateSection(sectionKey, value, games) {
      const root = document.getElementsByTagName('main')[0]
      const title = sectionKey == 'platform' 
		? `Avaliable in ${value}` 
		: `Hot on ${value}`;

      const heading = document.createElement('h2');
      heading.textContent = title;

      const sectionDiv = document.createElement('section');
      sectionDiv.className = 'section';

      const filtered = games.filter(g => g[sectionKey].includes(value));
      const randomGames = getRandomItems(filtered, Math.floor(Math.random() * 5) + 4);

      randomGames.forEach(game => {
        const card = createGameCard(game);
        sectionDiv.appendChild(card);
      });

      root.appendChild(heading);
      root.appendChild(sectionDiv);
    }



let randomCategory = allCategories[Math.floor(Math.random() * allCategories.length)];
const randomPlatform = allPlatforms[Math.floor(Math.random() * allPlatforms.length)];

generateSection('platform', randomPlatform, data);
generateSection('category', randomCategory, data);
randomCategory = allCategories[Math.floor(Math.random() * allCategories.length)];
generateSection('category', randomCategory, data);
