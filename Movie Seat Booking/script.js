const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

populateUI();

let ticketPrice = +movieSelect.value;
// Update total and count
function updateSelectedCount(){
    const selectedseats = document.querySelectorAll('.row .seat.selected');
// Copy selected seats into arr
    const seatsIndex = [...selectedseats].map((seat)=>
        [...seats].indexOf(seat));

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

// Map through array
// Return new array of indexes

    const selectedseatscount = selectedseats.length;
    count.innerText = selectedseatscount;
    total.innerText = selectedseatscount * ticketPrice;
}

function selectMovieData(movieIndex,moviePrice){
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}
// Get data from localstorage and populate UI
function populateUI(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if(selectedSeats !== null && selectedSeats.length>0){
        seats.forEach((seat,index)=>{
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add('selected');
            }
        })
    }
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if(selectedMovieIndex !== null){
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}
// Event listeners
// Seat click event
container.addEventListener('click', (e)=>{
    
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected')
        updateSelectedCount();
    }
})
// Movie seelct event
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value;
    selectMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
})

// Initial count in total
updateSelectedCount();