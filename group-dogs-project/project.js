const dogGrid = document.getElementById("dog-grid");
const searchInput = document.getElementById('search');
const searchButton = document.getElementById('search-button');

async function fetchDogs(count = 9) {
    const response = await fetch("https://dog.ceo/api/breeds/image/random/${count}");
    const data = await response.json();
    return data.message;
}

function createDogCard(imageUrl) {
    const card = document.createElement('div');  
    card.className = 'dog-card';
    card.innerHTML = `
        <img src="${imageUrl}" alt="Dog" class="dog-image">
        <div class="dog-actions">
            <button class="like-button">♡</button>
            <input type="text" class="comment-input" placeholder="Add a comment.....">

        </div>
    `;

    const likeButton = card.querySelector('.like-button');
    likeButton.addEventListener('click', () => {
        likeButton.classList.toggle('active');
        likeButton.textContent = likeButton.classList.contains('active') ? '♥' : '♡';
    });

    return card;
}

async function displayDogs(count = 9, prepend = false) {
    const dogs = await fetchDogs(count);
    const fragment = document.createDocumentFragment();

    dogs.forEach(dog => {
        const card = createDogCard(dog);
        fragment.appendChild(card);
    });

    if (prepend) {
        dogGrid.prepend(fragment);
    } else {
        dogGrid.appendChild(fragment);
    }
}

    searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            displayDogs(9, true);
            searchInput.value = '';
        }
    });

displayDogs();