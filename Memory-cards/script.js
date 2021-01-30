/* A card: 

<div class="card active">
<div class="inner-card">
    <div class="inner-card-front">
        <p>What is Java</p>
    </div>
    <div class="inner-card-back">
        <p>A programming Language</p>
    </div>
</div>
</div>
<div class="card">
<div class="inner-card">
<div class="inner-card-front">
<p>What is PHP</p>
</div>
<div class="inner-card-back">
<p>A programming Language</p>
</div>
</div>
</div>


*/

const cardsContainer = document.getElementById('cards-container');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const currentEl = document.getElementById('current');
const showBtn = document.getElementById('show');
const hideBtn = document.getElementById('hide');
const questionEl = document.getElementById('question');
const answerEl = document.getElementById('answer');
const addCardBtn = document.getElementById('add-card');
const clearBtn = document.getElementById('clear');
const addContainer = document.getElementById('add-container');
const deleteSingleCard = document.getElementById('deleteSingleCard');

// Keep track of current card
let currentActiveCard = 0;

// Store DOM cards
const cardsEl = [];

// Store card data
const cardsData = getCardsData();

// Create all cards
function createCards() {
    cardsData.forEach((data, index) => createCard(data, index));
}

// Create a single card in DOM
function createCard(data, index) {
    const card = document.createElement('div');
    card.classList.add('card');

    if (index === 0) {
        card.classList.add('active');
    }

    card.innerHTML = `
    <div class="inner-card">
        <div class="inner-card-front">
        <p>${data.question}</p>
        </div>
        <div class="inner-card-back">
        <p>${data.answer}</p>
        </div>
    </div>
    `;
    // Add event listener
    card.addEventListener('click', () => card.classList.toggle('show-answer'));
    // Add to DOM cards
    cardsEl.push(card);
    cardsContainer.appendChild(card);

    updateCurrentText();
}

// Show number of cards
function updateCurrentText() {
    currentEl.innerText = `${currentActiveCard + 1}/${cardsEl.length}`;
}

// Get cards from local storage
function getCardsData() {
    const cards = JSON.parse(localStorage.getItem('cards'));
    return cards === null ? [] : cards;
}

// Save to localstorage the Cards Data Arr
function setCardsData(data) {
    localStorage.setItem("cards", JSON.stringify(data));
    window.location.reload();
}

// Init game
function init(){
    createCards();
    if(cardsData.length == 0){
        deleteSingleCard.style.opacity = 0;
    }
}


// Event listeners 
nextBtn.addEventListener('click', () => {
    cardsEl[currentActiveCard].className = 'card left';

    currentActiveCard = currentActiveCard + 1;

    if (currentActiveCard > cardsEl.length - 1) {
        currentActiveCard = cardsEl.length - 1;
    }

    cardsEl[currentActiveCard].className = 'card active';
    updateCurrentText();
});

prevBtn.addEventListener('click', () => {
    cardsEl[currentActiveCard].className = 'card right';

    currentActiveCard = currentActiveCard - 1;

    if (currentActiveCard < 0) {
        currentActiveCard = 0;
    }

    cardsEl[currentActiveCard].className = 'card active';
    updateCurrentText();
});

showBtn.addEventListener('click', () => {
    addContainer.classList.add('show');
});


hideBtn.addEventListener('click', () => {
    addContainer.classList.remove('show');
});

// Add new card button -> Push a card into arr
addCardBtn.addEventListener('click', () => {
    const question = questionEl.value;
    const answer = answerEl.value;
    if (question.trim() && answer.trim()) {
        const newCard = { question, answer };

        createCard(newCard);

        // Clear the inputs
        questionEl.value = '';
        answerEl.value = '';

        addContainer.classList.remove('show');
        cardsData.push(newCard);
        setCardsData(cardsData);
    }
});

// Same but when press ENTER
addContainer.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        const question = questionEl.value;
        const answer = answerEl.value;
        if (question.trim() && answer.trim()) {
            const newCard = { question, answer };
    
            createCard(newCard);
    
            // Clear the inputs
            questionEl.value = '';
            answerEl.value = '';
    
            addContainer.classList.remove('show');
            cardsData.push(newCard);
            setCardsData(cardsData);
        }
    }
});

// Clear cards button
clearBtn.addEventListener('click', () => {
    localStorage.clear();
    cardsContainer.innerHTML = '';
    window.location.reload();
});

// Delete single card button
deleteSingleCard.addEventListener('click', () => {
    cardsData.splice(currentActiveCard ,1);
    setCardsData(cardsData);
})

// Init
init();