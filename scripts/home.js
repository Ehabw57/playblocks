const userTitle = document.getElementById('currentUser');
const currentUser = getCurrentUser();
userTitle.innerText = currentUser.userName
updateCartCount()


    function generateTopRatedSection(games) {
      const root = document.getElementsByTagName('main')[0];

      const heading = document.createElement('h2');
      heading.textContent = 'Top Rated Games';

      const sectionDiv = document.createElement('section');
      sectionDiv.className = 'section';


      const sorted = [...games].sort((a, b) => b.rating - a.rating);

      const topTwo = sorted.slice(0, 2);

      topTwo.forEach(game => {
        const cover = createGameCover(game);
        sectionDiv.appendChild(cover);
      });

      root.appendChild(heading);
      root.appendChild(sectionDiv);
    }

    generateTopRatedSection(data);


    function generateSection(sectionKey, value, games) {
      const root = document.getElementsByTagName('main')[0]
      const title = sectionKey == 'platform' ? `Avaliable in ${value} `	:`Hot on ${value}`;

      const heading = document.createElement('h2');
      heading.textContent = title;

      const sectionDiv = document.createElement('section');
      sectionDiv.className = 'section';

      const filtered = games.filter(g => g[sectionKey].includes(value));
     const maxCards = Math.min(filtered.length, 4); 
     const randomGames = getRandomItems(filtered, maxCards);

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







// function generateSection(sectionKey, value, games) {
//   const root = document.getElementsByTagName('main')[0];
//   const title = sectionKey == 'platform' 
//     ? `Available on ${value}` 
//     : `Hot in ${value}`;

//   const heading = document.createElement('h2');
//   heading.textContent = title;

//   const sectionDiv = document.createElement('section');
//   sectionDiv.className = 'section';

//   const filtered = games.filter(g => g[sectionKey].includes(value));
//   

//   randomGames.forEach(game => {
//     const card = createGameCard(game);
//     sectionDiv.appendChild(card);
//   });

//   root.appendChild(heading);
//   root.appendChild(sectionDiv);
// }

// let randomCategory = allCategories[Math.floor(Math.random() * allCategories.length)];
// const randomPlatform = allPlatforms[Math.floor(Math.random() * allPlatforms.length)];

// generateSection('platform', randomPlatform, data);
// generateSection('category', randomCategory, data);


