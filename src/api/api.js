const baseUrl = 'https://api.themoviedb.org/3/';
const apiKey = '507be643ea20df937acafa47be25902e';

const getTrendingMovie = () => {
  return fetch(`${baseUrl}trending/movie/week?api_key=${apiKey}`)
    .then(res => {
      return res.json();
    })
    .then(({ results }) => {
      return results;
    });
};

const getMovie = movieID => {
  return fetch(`${baseUrl}movie/${movieID}?api_key=${apiKey}`).then(res => {
    return res.json();
  });
};

const getMovieCast = movieID => {
  return fetch(`${baseUrl}movie/${movieID}/credits?api_key=${apiKey}`)
    .then(res => {
      return res.json();
    })
    .then(({ cast }) => {
      return cast;
    });
};

const getMovieReviews = movieID => {
  return fetch(`${baseUrl}movie/${movieID}/reviews?api_key=${apiKey}`)
    .then(res => {
      return res.json();
    })
    .then(({ results }) => {
      if (results.length === 0) {
        return Promise.reject('No reviews for this film');
      }
      return results;
    });
};

const getMoviesBySearch = search => {
  return fetch(`${baseUrl}search/movie?query=${search}&api_key=${apiKey}`)
    .then(res => {
      return res.json();
    })
    .then(({ results }) => {
      if (results.length === 0) {
        return Promise.reject(`Nothing found for your request: ${search}`);
      }
      return results;
    });
};

const api = {
  getTrendingMovie,
  getMovie,
  getMovieCast,
  getMovieReviews,
  getMoviesBySearch,
};

export default api;
