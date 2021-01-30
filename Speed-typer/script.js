
const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

// List of 10.000 words is living in data.js as const words = [...];

// Init word
let randomWord

// Init score
let score = 0;

// Init time
let time = 10;

// Init difficulty
let dificulty = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

// Set difficulty select value
difficultySelect.value = localStorage.getItem('difficulty') !== null ? localStorage.getItem('difficulty') : 'medium';

// Focus on the text on the start
text.focus();

// Start counting down
const timeInterval = setInterval(updateTime, 1000);

function updateTime(){
    time--;
    timeEl.innerHTML = time + 's';
    if(time === 0){
        clearInterval(timeInterval);
        // end game
        gameOver();
    }
}

function gameOver(){
    endgameEl.innerHTML = `
        <h1>Time ran out</h1>
        <p>Your final score is ${score}</p>
        <button onclick="location.reload()">Reload</button>
    `;
    endgameEl.style.display = 'flex';
}


function getRandomWord(){
    return words[Math.floor(Math.random() * words.length)];
}

function addWordToDom(){
    randomWord = getRandomWord();
    word.innerHTML = randomWord;
}

function updateScore(){
    score++;
    scoreEl.innerHTML = score;
}

addWordToDom();


// Type in words
text.addEventListener('input', (e)=>{
    const insertedText = e.target.value;
    if(insertedText === randomWord){
        addWordToDom();
        // increment the score
        updateScore();
        // clear the input
        e.target.value = '';
        
        if(difficulty === 'hard'){
            time += 2;
        } else if (dificulty === 'medium'){
            time += 3;
        } else {
            time += 5;
        }

    }
});

// Setting button hides difficulty
settingsBtn.addEventListener('click', ()=> {
    settings.classList.toggle('hide');
});

settingsForm.addEventListener('change', (e)=> {
    difficulty = e.target.value;
    localStorage.setItem('difficulty', difficulty);
})