import React, { Component } from 'react';
import FoundFilms from '../components/FoundFilms';
import movieApi from '../api/api';

class HomePage extends Component {
  state = {
    results: null,
  };

  componentDidMount() {
    movieApi.getTrendingMovie().then(results => {
      this.setState({ results });
    });
  }

  render() {
    const { results } = this.state;
    return (
      <div>
        <FoundFilms films={results} {...this.props} />
      </div>
    );
  }
}

export default HomePage;
