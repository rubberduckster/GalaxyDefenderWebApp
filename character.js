const urlParams = new URLSearchParams(window.location.search);
const characterId = urlParams.get('id');

fetch(`https://localhost:7093/api/characters/${characterId}`)
    .then(response => response.json())
    .then(character => {
        console.log(character);

        const container = document.querySelector('.wikiNavs');
        container.innerHTML = '';

        const box = document.createElement('a');

        box.innerHTML = `
                <div class="characterBox">
                    <div class="charImageContainer">
                        <img src="${character.characterIMG}" alt="${character.name}" style="width: 100%; height: 100%; object-fit: cover;">
                    </div>
                    <p class="characterName">${character.name}</p>
                </div>
            `;

            container.appendChild(box);
    })
    .catch(error => console.error('Error fetching character by ID:', error));
