const getTrendingMovie = () => {
  return fetch(
    'https://api.themoviedb.org/3/trending/movie/week?api_key=507be643ea20df937acafa47be25902e',
  )
    .then(res => {
      return res.json();
    })
    .then(({ results }) => {
      return results;
    });
};

const getMovie = movieID => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${movieID}?api_key=507be643ea20df937acafa47be25902e`,
  ).then(res => {
    return res.json();
  });
};

const getMovieCast = movieID => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${movieID}/credits?api_key=507be643ea20df937acafa47be25902e`,
  )
    .then(res => {
      return res.json();
    })
    .then(({ cast }) => {
      console.log(cast);
      return cast;
    });
};

const getMovieReviews = movieID => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${movieID}/reviews?api_key=507be643ea20df937acafa47be25902e`,
  )
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
  return fetch(
    `https://api.themoviedb.org/3/search/movie?query=${search}&api_key=507be643ea20df937acafa47be25902e`,
  )
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
