//Create you project here from scratch
const moviesList = [
  { movieName: "Flash", price: 7 },
  { movieName: "Spiderman", price: 5 },
  { movieName: "Batman", price: 4 },
];

//Global variables
let currentMoviePrice = 7;
let numOfSeatsSelected = 0;

// Use moviesList array for displaing the Name in the dropdown menu
const movieSelectList = document.querySelector('#selectMovie');
moviesList.forEach((movie) => {
  const option = document.createElement('option');
  option.value = movie.movieName;
  option.textContent = movie.movieName;
  movieSelectList.appendChild(option);
})

//Add Event Listener to chnage prices
movieSelectList.addEventListener('change', () => {
  const selectedMovieName = movieSelectList.value;
  const selectedMovie = moviesList.find(movie => movie.movieName === selectedMovieName);

  if (selectedMovie) {
    const moviePrice = document.querySelector('#moviePrice');
    moviePrice.textContent = '$ ' + selectedMovie.price;
    currentMoviePrice = selectedMovie.price;
  }
});

//Add eventLister to each unoccupied seat
document.addEventListener('DOMContentLoaded', () => {
  const unoccupiedSeats = document.querySelectorAll('.seat:not(.occupied)');
  const totalPriceElement = document.getElementById('totalPrice');
  const selectedSeatsHolder = document.getElementById('numberOfSeat');


  selectedSeats = [];
  totalPrice = 0;
  
  unoccupiedSeats.forEach(seat => {
      seat.addEventListener('click', () => {
          // Add your event handling logic here
          if(seat.classList.contains('selected')) {
            seat.classList.remove('selected');
            selectedSeats = selectedSeats.filter(selectedSeat => selectedSeat !== seat);
            totalPrice -= currentMoviePrice;
          }
          else {
            seat.classList.add('selected');
            selectedSeats.push(seat);
            totalPrice += currentMoviePrice;
          }

          // Update selected seats holder
          selectedSeatsHolder.textContent = selectedSeats.length > 0 ? selectedSeats.length + ' Seat(s) Selected' : 'No Seat Selected';

          // Update total price
          totalPriceElement.textContent = '$ ' + totalPrice;

          numOfSeatsSelected = selectedSeats.length;
      });
  });
});

//Add eventLsiter to continue Button
const continueBtn = document.querySelector('#proceedBtn');
continueBtn.addEventListener('click', ()=>{
  if(numOfSeatsSelected == 0) {
    alert(`Oops no seat Selected`);
  }
  else {
    alert(`Yayy! Your Seats have been booked`);
  }
});


//Add eventListerner to Cancel Button