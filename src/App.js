import { Component, Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation';
import Loading from './components/Loader';

const HomePage = lazy(() =>
  import('./views/HomePage' /* webpackChunkName: "home-page" */),
);
const MoviesPage = lazy(() =>
  import('./views/MoviesPage' /* webpackChunkName: "movies-page" */),
);
const MoviesDetailsPage = lazy(() =>
  import(
    './views/MoviesDetailsPage' /* webpackChunkName: "movies-details-page" */
  ),
);
class App extends Component {
  render() {
    return (
      <>
        <Navigation />
        <Suspense
          fallback={
            <div>
              <Loading />
            </div>
          }
        >
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/movies" exact component={MoviesPage} />
            <Route path="/movies/:moviesId" component={MoviesDetailsPage} />
          </Switch>
        </Suspense>
      </>
    );
  }
}

export default App;
