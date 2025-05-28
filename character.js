const urlParams = new URLSearchParams(window.location.search);
const characterId = urlParams.get('id');

fetch(`https://localhost:7093/api/characters/${characterId}`)
    .then(response => response.json())
    .then(character => {
        const container = document.querySelector('.wikiNavs');
        container.innerHTML = '';

        const box = document.createElement('div');

        box.innerHTML = `
                <div class="characterBox">
                <div class="flexMenu">
                    <div class="pathSelector">
                    gay
                    </div>
                <div class="toggleBox">
                    <label class="switch">
                    <input type="checkbox" id="toggleImage"/>
                    <span class="slider"></span>
                    </label>
                </div>
                </div>
                    <div class="charImageContainer">
                        <img id="characterImage" src="${character.femIMG}" alt="${character.name}" style="width: 100%; height: 100%; object-fit: cover;">
                    </div>
                    <p class="characterName">${character.name}</p>
                </div>
            `;

        container.appendChild(box);

        const title = document.querySelector('.wikiTitle');
        title.innerText = `■ ${character.name}`;

        const toggleImage = document.getElementById('toggleImage');
        const characterImage = document.getElementById('characterImage');

        if (toggleImage && characterImage) {
            toggleImage.addEventListener('change', (event) => {
                if (event.target.checked) {
                    characterImage.src = character.mascIMG;
                } else {
                    characterImage.src = character.femIMG;
                }
            });
        }

    })
    .catch(error => console.error('Error fetching character by ID:', error));
