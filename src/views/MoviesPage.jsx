import React, { Component, Suspense, lazy } from 'react';
import { Route } from 'react-router-dom';
import Loading from '../components/Loader';
import moviesAPI from '../api/api';
import Form from '../components/Form';

const FoundFilms = lazy(() =>
  import('../components/FoundFilms' /* webpackChunkName: "found-films-page" */),
);

class MoviesPage extends Component {
  state = {
    query: null,
    searchFilms: null,
    error: '',
  };

  componentDidMount() {
    const { pathname, search } = this.props.location;

    if (pathname && search) {
      this.setState({ query: search.slice(7) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { query: prevQuery } = prevState;
    const { query: currentQuery } = this.state;

    if (prevQuery !== currentQuery) {
      this.getSearchFilms(currentQuery);
    }
  }

  getSearchFilms(searchQuery) {
    moviesAPI
      .getMoviesBySearch(searchQuery)
      .then(results => {
        this.setState({ searchFilms: results });
      })
      .catch(error => {
        this.setState({ error });
      });
  }

  onSubmitForm = currentQuery => {
    const { history, location } = this.props;

    this.setState({ query: currentQuery.toLowerCase() });

    history.push({ ...location, search: `query=${currentQuery.trim()}` });
  };

  render() {
    const { query, searchFilms, error } = this.state;
    return (
      <div>
        <Form onSubmit={this.onSubmitForm} />
        <div>
          {searchFilms && (
            <Suspense
              fallback={
                <div>
                  <Loading />
                </div>
              }
            >
              <Route
                to={`/movies/query=${query}`}
                render={props => <FoundFilms films={searchFilms} {...props} />}
              />
            </Suspense>
          )}

          {error && <h2 className="error-message">{error}</h2>}
        </div>
      </div>
    );
  }
}

export default MoviesPage;
