async function loadCharacters() {
    try {
        const response = await fetch('https://localhost:7093/api/characters');
        const characters = await response.json();

        const container = document.querySelector('.wikiNavs');

        characters.forEach(character => {
            const box = document.createElement('a');
            box.href = box.href = `character.html?id=${character.id}`;

            box.innerHTML = `
                <div class="characterBox">
                    <div class="charImageContainer">
                        <img src="${character.characterIMG}" alt="${character.name}" style="width: 100%; height: 100%; object-fit: cover;">
                    </div>
                    <p class="characterName">${character.name}</p>
                </div>
            `;

            container.appendChild(box);
        });
    } catch (error) {
        console.error('Failed to fetch character:', error);
    }
}

window.addEventListener('DOMContentLoaded', loadCharacters);