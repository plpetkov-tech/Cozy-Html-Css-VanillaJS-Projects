const main = document.getElementById("main")
const adduserBtn = document.getElementById("add-user")
const double = document.getElementById("double")
const showMillionaires = document.getElementById("show-millionaires")
const sortBtn = document.getElementById("sort")
const calculateWealth = document.getElementById("calculate-wealth")

let data = [];
getRandomUser();
getRandomUser();
getRandomUser();
getRandomUser();
getRandomUser();

// Fetch random user and add money values

async function getRandomUser(){
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();
    const user = data.results[0];

    const newUser = {
        name:`${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    }
    addData(newUser);
}

function addData(obj){
    data.push(obj);
    updateDOM();
}

// Update DOM 
function updateDOM(providedData = data){
    // Clear main div
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';

    providedData.forEach(x=>{
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${x.name}</strong> ${formatMoney(x.money)}`;
        main.appendChild(element);
    })
}

// Format number as money
function formatMoney(number){
    return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')+ ' €'; 
}

// Double money function
function doubleTheMoney(){
    data = data.map(user=> {
        return {...user, money: user.money * 2}
    })
    updateDOM();
}

// Sorts users by richest
function sortByRichest(){
    data = data.sort((a,b)=> b.money - a.money);
    updateDOM();
}

// Filter only millonaires
function showOnlyMillionaires(){
    data = data.filter(user => user.money>1000000);
    updateDOM();
}

// Calculate all the money from users
function calculateTotalWealth(){
    const wealth = data.reduce((acc,user)=>(acc+= user.money),0);
    const wealthElement = document.createElement('div');
    wealthElement.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;
    main.appendChild(wealthElement);
}

// Event listener

adduserBtn.addEventListener('click', getRandomUser);
double.addEventListener('click', doubleTheMoney);
sortBtn.addEventListener('click', sortByRichest);
showMillionaires.addEventListener('click', showOnlyMillionaires);
calculateWealth.addEventListener('click', calculateTotalWealth);