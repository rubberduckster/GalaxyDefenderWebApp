const urlParams = new URLSearchParams(window.location.search);
const characterId = urlParams.get('id');

const characterUrl = '`https://localhost:7093/api/characters/${characterId}`';
const pathUrl = `https://localhost:7093/api/characters/${characterId}/path`;

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
                    <p class="characterName">${character.name}</p>
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
                    <div class="characterStats">
                    <p class="line1" style="margin-top: 0px">Type: ${character.unitType}</p>
                    <p class="line2">HP: ${character.hp}</p>
                    <p class="line1">DEF: ${character.def}</p>
                    <p class="line2">DMG: ${character.dmg}</p>
                    <p class="line1">Range: ${character.range}</p>
                    <p class="line2">Talent: ${character.talentName}</p>
                    <p class="line1">${character.talentDescription}</p>
                    <p class="line2">Galaxy: </p>
                    </div>
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
