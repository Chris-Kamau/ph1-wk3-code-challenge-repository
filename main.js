const grabCard = document.getElementById("movie-playing");

function displayMovies() {
  fetch("http://localhost:3000/films")
    .then((resp) => resp.json())
    .then(function (data) {
      const movies = data;
      let moviesHTML = movies.map(movie => {
        return `
          <li>
            <div class="card" style="width: 18rem;">
              <img src="${movie.poster}" class="card-img-top" alt="${movie.title}">
              <div class="card-body">
                <h5 class="card-title">${movie.title}</h5>
                <p class="card-text">${movie.description}</p>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">Runtime: ${movie.runtime} minutes</li>
                  <li class="list-group-item">Showtime: ${movie.showtime}</li>
                  <li class="list-group-item">Tickets sold: <span id="tickets-sold-${movie.id}">${movie.tickets_sold}</span> / ${movie.capacity}</li>
                </ul>
                <button class="btn btn-primary buy-ticket" data-id="${movie.id}">Buy tickets</button>
              </div>
            </div>
          </li>
        `;
      }).join('');
      
      grabCard.innerHTML = moviesHTML;
      
      // Add event listener to Buy Ticket button
      const buyTicketButtons = document.querySelectorAll('.buy-ticket');
      buyTicketButtons.forEach(button => {
        button.addEventListener('click', () => {
          const movieId = button.dataset.id;
          const ticketsSoldSpan = document.getElementById(`tickets-sold-${movieId}`);
          let ticketsSold = parseInt(ticketsSoldSpan.innerText);
          if (ticketsSold >= movies.find(movie => movie.id === parseInt(movieId)).capacity) {
            alert('Sorry, this showing is sold out.');
          } else {
            ticketsSold++;
            ticketsSoldSpan.innerText = ticketsSold;
          }
        });
      });
    });
}


displayMovies();
