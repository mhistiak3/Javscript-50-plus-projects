let global = {
  currentPage: window.location.pathname,
  search: {
    type: "",
    term: "",
    page: 1,
    totalPage: 1,
    totalResults: 0,
  },
  api: {
    apiKey: "fed551ace7fdeb2b0be7e81e8b873950",
    apiURL: "https://api.themoviedb.org/3/",
  },
};

// function: initial app
function init() {
  switch (global.currentPage) {
    case "/":
    case "/index.html":
      displayPopulerMovies();
      displaySlider();
      break;
    case "/shows.html":
      displayPopulerShows();
      break;
    case "/shows":
      displayPopulerShows();
      break;
    case "/movie-details.html":
      displayMovieDetails();
      break;
    case "/tv-details.html":
      displayShowDetails();
      break;
    case "/search.html":
      search();
      break;
  }
  highlightActiveLink();
}
document.addEventListener("DOMContentLoaded", init());

// function: Show spinner when fetching data
function showSpinner() {
  document.querySelector(".spinner").classList.add("show");
}

// function: hide spinner when data is available
function hideSpinner() {
  document.querySelector(".spinner").classList.remove("show");
}

// function: Highlight Active Link
function highlightActiveLink() {
  let navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    if (link.pathname === global.currentPage) link.classList.add("active");
  });
}

// function: fetch data from TMBD website
async function fetchAPIData(endpoint) {
  showSpinner();
  let response = await fetch(
    `${global.api.apiURL}${endpoint}?api_key=${global.api.apiKey}&language=en-US&include_adult=false`
  );
  let data = await response.json();
  hideSpinner();
  return data;
}

// function: display 20 populer movies
async function displayPopulerMovies() {
  let { results } = await fetchAPIData("movie/popular");

  results.forEach((movie) => {
    document.getElementById("popular-movies").innerHTML += ` <div class="card">
          <a href="movie-details.html?id=${movie.id}">
          ${
            movie.poster_path
              ? `  <img
              src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
              class="card-img-top"
              alt="${movie.original_title}"
            />`
              : `<img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="Movie Title"
            />`
          }
          </a>
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${movie.release_date}</small>
            </p>
          </div>
        </div>`;
  });
}

// function: Display Movie Details
async function displayMovieDetails() {
  let movieId = window.location.search.split("=")[1];
  let movie = await fetchAPIData(`movie/${movieId}`);
  // Ovaerlay Background Image
  displayBackgroundImg("movie", movie.backdrop_path);
  console.log(movie);
  let htmlContent = `<div class="details-top">
          <div>
            ${
              movie.poster_path
                ? `  <img
              src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
              class="card-img-top"
              alt="${movie.original_title}"
            />`
                : `<img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="Movie Title"
            />`
            }
          </div>
          <div>
            <h2>${movie.title}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${movie.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Release Date: ${movie.release_date}</p>
            <p>
              ${movie.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
            ${movie.genres.map((genre) => `<li>${genre.name}</li>`).join("")}
              
            </ul>
            <a href="${
              movie.homepage
            }" target="_blank" class="btn">Visit Movie Homepage</a>
          </div>
        </div>
        
        <div class="details-bottom">
          <h2>Movie Info</h2>
          <ul>
            <li><span class="text-secondary">Budget:</span> $${numberWithCommas(
              movie.budget
            )}</li>
            <li><span class="text-secondary">Revenue:</span> $${numberWithCommas(
              movie.revenue
            )}</li>
            <li><span class="text-secondary">Runtime:</span> ${
              movie.runtime
            } minutes</li>
            <li><span class="text-secondary">Status:</span> ${movie.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${movie.production_companies
            .map((company) => `<span>${company.name}</span>`)
            .join(", ")}</div>
        </div>
        `;
  document
    .getElementById("movie-details")
    .insertAdjacentHTML("afterbegin", htmlContent);
}

// function: display 20 populer TV shows
async function displayPopulerShows() {
  let { results } = await fetchAPIData("tv/popular");
  results.forEach((show) => {
    document.getElementById("popular-shows").innerHTML += ` <div class="card">
          <a href="tv-details.html?id=${show.id}">
          ${
            show.poster_path
              ? `  <img
              src="https://image.tmdb.org/t/p/w500${show.poster_path}"
              class="card-img-top"
              alt="${show.name}"
            />`
              : `<img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="Movie Title"
            />`
          }
          </a>
          <div class="card-body">
            <h5 class="card-title">${show.name}</h5>
            <p class="card-text">
              <small class="text-muted">Air Date: ${show.first_air_date}</small>
            </p>
          </div>
        </div>`;
  });
}

// function: Display Show Details
async function displayShowDetails() {
  let showId = window.location.search.split("=")[1];
  let show = await fetchAPIData(`tv/${showId}`);
  // Ovaerlay Background Image
  displayBackgroundImg("show", show.backdrop_path);
  console.log(show);
  let htmlContent = `  
   <div class="details-top">
          <div>
            ${
              show.poster_path
                ? `  <img
              src="https://image.tmdb.org/t/p/w500${show.poster_path}"
              class="card-img-top"
              alt="${show.name}"
            />`
                : `<img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="Movie Title"
            />`
            }
          </div>
          <div>
            <h2>${show.name}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
             ${show.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Release Date: ${show.first_air_date}</p>
            <p>
             ${show.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
              ${show.genres.map((genre) => `<li>${genre.name}</li>`).join("")}
            </ul>
            <a href="${
              show.homepage
            }" target="_blank" class="btn">Visit Show Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Show Info</h2>
          <ul>
            <li><span class="text-secondary">Number Of Episodes:</span> ${
              show.number_of_episodes
            }</li>
            <li>
              <span class="text-secondary">Last Episode To Air:</span> ${
                show.last_episode_to_air.name
              }
            </li>
            <li><span class="text-secondary">Status:</span> ${show.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${show.production_companies
            .map((company) => `<span>${company.name}</span>`)
            .join(", ")}</div>
        </div>
        `;
  document
    .getElementById("show-details")
    .insertAdjacentHTML("afterbegin", htmlContent);
}

// function: Display background overlay in movie details page
function displayBackgroundImg(type, backgroundPath) {
  let overlayDiv = document.createElement("div");
  overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backgroundPath})`;
  overlayDiv.style.backgroundSize = "cover";
  overlayDiv.style.backgroundPosition = "center";
  overlayDiv.style.backgroundRepeat = "no-repet";
  overlayDiv.style.height = "100vh";
  overlayDiv.style.width = "100vw";
  overlayDiv.style.position = "absolute";
  overlayDiv.style.top = "10vh";
  overlayDiv.style.left = "0";
  overlayDiv.style.zIndex = "-1";
  overlayDiv.style.opacity = "0.1";
  if (type === "movie") {
    document.getElementById("movie-details").appendChild(overlayDiv);
  } else {
    document.getElementById("show-details").appendChild(overlayDiv);
  }
}

// function: fetch search data from TMBD website
async function fetchSearchData() {
  showSpinner();
  let response = await fetch(
    `${global.api.apiURL}search/${global.search.type}?api_key=${global.api.apiKey}&include_adult=false&query=${global.search.term}&page=${global.search.page}`
  );
  let data = await response.json();
  hideSpinner();
  return data;
}
// function: search movie and show
async function search() {
  let queryStr = window.location.search;
  let URLParams = new URLSearchParams(queryStr);
  global.search.type = URLParams.get("type");
  global.search.term = URLParams.get("search-term");

  if (global.search.term !== "" && global.search.term !== null) {
    // TODO: display search result
    let { results, total_pages, page, total_results } = await fetchSearchData();
    global.search.page = page;
    global.search.totalPage = total_pages;
    global.search.totalResults = total_results;
    if (results.length === 0) {
      showAlert("Movies not found");
      return;
    }
    displaySearchData(results);
    document.getElementById("search-term").value = "";
  } else {
    showAlert("Please enter a search term");
  }
}

// function: Display Search movies or shows in search page
function displaySearchData(results) {
  document.getElementById("search-results-heading").innerHTML = `
  <h2>${results.length} of ${global.search.totalResults} Results for ${global.search.term}</h2>`;
  results.forEach((result) => {
    document.getElementById("search-results").innerHTML += ` <div class="card">
          <a href="${global.search.type}-details.html?id=${result.id}">
          ${
            result.poster_path
              ? `  <img
              src="https://image.tmdb.org/t/p/w500${result.poster_path}"
              class="card-img-top"
              alt="${result.title ? result.title : result.name}"
            />`
              : `<img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="Movie Title"
            />`
          }
          </a>
          <div class="card-body">
            <h5 class="card-title">${
              result.title ? result.title : result.name
            }</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${
                result.release_date
                  ? result.release_date
                  : result.first_air_date
              }</small>
            </p>
          </div>
        </div>`;
  });

  displayPagination();
}

// function: Display Pagination
function displayPagination() {
  document.getElementById("pagination").innerHTML = `
  <div class="pagination">
          <button class="btn btn-primary" id="prev">Prev</button>
          <button class="btn btn-primary" id="next">Next</button>
          <div class="page-counter">Page ${global.search.page} of ${global.search.totalPage}</div>
        </div>
  `;
  // disbled prev button if page is one
  if (global.search.page === 1) {
    document.getElementById("prev").disabled = true;
  }
  // disbled next button if page is last
  if (global.search.page === global.search.totalPage) {
    document.getElementById("next").disabled = true;
  }

  // next page
  document.getElementById("next").addEventListener("click", async function () {
    global.search.page++;
    let { results } = await fetchSearchData();
    displaySearchData(results);
  });
  // prev page
  document.getElementById("prev").addEventListener("click", async function () {
    global.search.page--;
    let { results } = await fetchSearchData();
    displaySearchData(results);
  });
}

// function: Show custom Alert when search term is empty
function showAlert(message, className = "error") {
  let alertEl = document.createElement("div");
  alertEl.classList.add("alert", className);
  console.log(alertEl);
  alertEl.appendChild(document.createTextNode(message));
  document.getElementById("alert").appendChild(alertEl);
  setTimeout(() => alertEl.remove(), 3000);
}

// HACK: All Library function
// function: Display Slider in home page
async function displaySlider() {
  let { results } = await fetchAPIData("movie/now_playing");
  results.forEach((movie) => {
    document.querySelector(
      ".swiper-wrapper"
    ).innerHTML += ` <div class="swiper-slide">
            <a href="movie-details.html?id=${movie.id}">
              <img src="https://image.tmdb.org/t/p/w500${
                movie.poster_path
              }" alt="${movie.title}" />
            </a>
            <h4 class="swiper-rating">
              <i class="fas fa-star text-secondary"></i> ${movie.vote_average.toFixed(
                1
              )} / 10
            </h4>
          </div>`;
    initialSwiper();
  });
}

// function: Initial Swipper library
function initialSwiper() {
  let swiper = new Swiper(".swiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    freeMode: true,
    lop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    breakpoints: {
      600: {
        slidesPerView: 2,
      },
      800: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
    },
  });
}

// function: convert number to number with comma
function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
