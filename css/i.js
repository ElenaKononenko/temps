// // console.log('Hello from 1initialHomePage');
("use strict");
const list = document.querySelector(".gallery");
const posterUrl = "https://image.tmdb.org/t/p";
const sizePoster = "/w500";
const basicPosterUrl = posterUrl + sizePoster;

function createCardFunc(imgPath, filmTitle, genres, date, vote, movieId) {
  const listItem = document.createElement("li");
  listItem.classList.add("gallery__item");

  const temp = `
 
<img class="gallery__item__picture"
     src='${basicPosterUrl}${imgPath}'
     alt=${filmTitle}
 />
 <h2 class="gallery__item__title">${filmTitle}</h2>

 <p class="gallery__item__description">
      ${genres}
       <span class="gallery__item__description__decor">|</span>
       <span class="gallery__item__movie__description__year">
        ${date.substring(0, 4)}</span>
       <span class="gallery__item__description__rating">
       ${vote}</span>
 </p>
`;
  listItem.insertAdjacentHTML("afterbegin", temp);
  listItem.addEventListener("click", () => {
    activeDetailsPage(movieId, false);
  });
  return listItem;
}

const BASE_URL = "https://api.themoviedb.org/3/search/movie";
const API_KEY = "d407875648143dbc537f3d16fab2b882";
const MEDIA_TYPE = "movie";
const TIME_WINDOW = "week";
const pageNumber = 1;
const inputValue = "";
const a = "";

function fetchFilms() {
  let url = "";
  if (inputValue == "") {
    url = `https://api.themoviedb.org/3/trending/${MEDIA_TYPE}/${TIME_WINDOW}?api_key=${API_KEY}`;
  } else {
    url = `${BASE_URL}?api_key=${API_KEY}&query=${inputValue}&page=${pageNumber}`;
  }
  return fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.results);
      return data.results;
    })
    .then((arr) => {
      const cards = arr.map((el) => {
        return createCardFunc(
          el.poster_path,
          el.title,
          el.genre_ids,
          el.release_date,
          el.vote_average,
          el.id
        );
      });
      list.append(...cards);
    });
}

fetchFilms(inputValue);
function activeDetailsPage(movieId, itsLibraryFilm) {}

async function fetchGenres() {
  const response = await fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
  );
  const result = await response.json();
  console.log(result);
}
fetchGenres();

function createLibraryCardFunc(
  imgPath,
  filmTitle,
  genre,
  date,
  voteAverage,
  movieId
) {
  const listItem = document.createElement("li");
  listItem.classList.add("gallery__item");

  let genreString = genre
    .reduce((acc, el) => {
      return acc + genres[el] + ", ";
    }, "")
    .slice(0, -2);
  const temp = `<img class="gallery__item__picture"
                      src='${basicPosterUrl}${imgPath}'
                      alt=${filmTitle}
                      />
                  <h2 class="gallery__item__title">${filmTitle}</h2>
  
                  <p class="gallery__item__description">
                      ${genreString}
                      <span class="gallery__item__description__decor">|</span>
                      <span class="gallery__item__movie__description__year">
                          ${date.substring(0, 4)}</span>
                      <span class="gallery__item__description__rating">
                      ${voteAverage}</span>
                  </p>
                  `;
  listItem.insertAdjacentHTML("afterbegin", temp);
  listItem.addEventListener("click", () => {
    activeDetailsPage(movieId, true);
  });
  return listItem;
}
