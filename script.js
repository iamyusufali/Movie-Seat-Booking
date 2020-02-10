const movieList = document.getElementById('movie');
const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied');
const count = document.getElementById('count');
const total = document.getElementById('total');

// Initialize UI with saved data
updateUI();

let ticketPrice = +movieList.value;

// Update UI from local storage data
function updateUI() {
  const savedSeatIndex = JSON.parse(localStorage.getItem('indexOfSeats'));

  if (savedSeatIndex !== null) {
    seats.forEach((seat, index) => {
      if (savedSeatIndex.indexOf(index) > -1) {
        seat.classList.add('selected');
      }
    });
  }

  const savedMovieIndex = localStorage.getItem('indexOfMovie');
  movieList.selectedIndex = savedMovieIndex;
}

// Update movie data in local storage
function updateMovieData(movieIndex, moviePrice) {
  localStorage.setItem('indexOfMovie', movieIndex);
  localStorage.setItem('priceOfMovie', moviePrice);
}

// Update count and total
function updateCountAndTotal() {
  const selectedSeats = container.querySelectorAll('.seat.selected');

  const seatIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

  localStorage.setItem('indexOfSeats', JSON.stringify(seatIndex));

  count.innerText = selectedSeats.length;
  total.innerText = selectedSeats.length * ticketPrice;
}

// Adding event listner to seat container and movie list
container.addEventListener('click', e => {
  e.target.classList.toggle('selected');

  updateCountAndTotal();
});

movieList.addEventListener('change', e => {
  ticketPrice = e.target.value;

  updateMovieData(e.target.selectedIndex, e.target.value);
  updateCountAndTotal();
});

// Initialize seat count and total
updateCountAndTotal();
