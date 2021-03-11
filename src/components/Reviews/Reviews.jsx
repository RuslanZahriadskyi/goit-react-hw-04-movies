import { Component } from 'react';
import moviesAPI from '../../api/api';
import s from './Reviews.module.css';

class Reviews extends Component {
  state = {
    error: '',
    reviews: null,
  };

  componentDidMount() {
    const { moviesId } = this.props.match.params;
    moviesAPI
      .getMovieReviews(moviesId)
      .then(reviews => {
        this.setState({ reviews });
      })
      .catch(error => {
        this.setState({ error });
      });
  }

  render() {
    const { reviews, error } = this.state;
    return (
      <div className={s.reviews_container}>
        <ul>
          {reviews ? (
            reviews.map(({ author, content, created_at, id }) => {
              return (
                <li key={id}>
                  <h4>{author}</h4>
                  <p>{created_at}</p>
                  <p>{content}</p>
                </li>
              );
            })
          ) : (
            <h2 className="error-message">{error}</h2>
          )}
        </ul>
      </div>
    );
  }
}

export default Reviews;
