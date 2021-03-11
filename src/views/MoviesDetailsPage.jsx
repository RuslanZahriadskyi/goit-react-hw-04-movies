import React, { Component, Suspense, lazy } from 'react';
import { NavLink, Route, Switch } from 'react-router-dom';
import Loading from '../components/Loader';
import moviesAPI from '../api/api';

import noMoviePoster from '../img/no-movie.jpg';

const Cast = lazy(() =>
  import(
    '../components/Cast' /* webpackChunkName: "movie-details-page-cast" */
  ),
);

const Reviews = lazy(() =>
  import(
    '../components/Reviews' /* webpackChunkName: "movie-details-page-reviews" */
  ),
);

class MoviesDetailsPage extends Component {
  state = {
    getDate: false,
    filmDetails: {},
  };

  componentDidMount() {
    const { moviesId } = this.props.match.params;
    moviesAPI.getMovie(moviesId).then(filmDetails => {
      this.setState({ filmDetails, getDate: true });
    });
  }

  onGoBackBtnClick = () => {
    const { history, location } = this.props;

    if (location.state && location.state.from) {
      return history.push(location.state.from);
    }

    history.push('/');
  };

  render() {
    const {
      original_title,
      poster_path,
      title,
      vote_average,
      overview,
      genres,
    } = this.state.filmDetails;

    const { getDate } = this.state;
    const { match, location } = this.props;

    return (
      getDate && (
        <div className="information-container">
          <div className="main-information">
            <button
              type="buttton"
              onClick={this.onGoBackBtnClick}
              className="button-go-back"
            >
              Go back
            </button>
            <img
              alt={original_title}
              src={
                poster_path
                  ? `https://image.tmdb.org/t/p/w500${poster_path}`
                  : noMoviePoster
              }
              width="300"
            />
            <div className="film-info">
              <h2>{title}</h2>
              <p>Popularity: {vote_average}</p>
              <h3>Overview</h3>
              <p>{overview} </p>
              <h3>Genres</h3>
              <ul className="genres">
                {genres &&
                  genres.map((genre, id) => {
                    return (
                      <li key={id} className="genres-item">
                        {genre.name}
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
          <div className="additional-info">
            <h3 className="info-title">Additional information</h3>
            <ul className="links">
              <li>
                <NavLink
                  to={{
                    pathname: `${match.url}/cast`,
                    state: { ...location.state },
                  }}
                  className="link"
                >
                  Casts
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={{
                    pathname: `${match.url}/reviews`,
                    state: { ...location.state },
                  }}
                  className="link"
                >
                  Reviews
                </NavLink>
              </li>
            </ul>
          </div>
          <Suspense
            fallback={
              <div className="loader-container">
                <Loading />
              </div>
            }
          >
            <Switch>
              <Route
                path={`${match.path}/cast`}
                render={props => <Cast {...props} />}
              />
              <Route
                path={`${match.path}/reviews`}
                render={props => <Reviews {...props} />}
              />
            </Switch>
          </Suspense>
        </div>
      )
    );
  }
}

export default MoviesDetailsPage;
