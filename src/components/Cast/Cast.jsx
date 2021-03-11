import { Component } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import moviesAPI from '../../api/api';
import noActorImg from '../../img/no-actor.jpg';
import s from './Cast.module.css';

class Cast extends Component {
  state = {
    casts: [],
  };

  componentDidMount() {
    const { moviesId } = this.props.match.params;
    moviesAPI.getMovieCast(moviesId).then(cast => {
      this.setState({ casts: cast });
    });
  }

  render() {
    const { casts } = this.state;
    return (
      <div className={s.cast_container}>
        <ul className={s.cast}>
          {casts.map(({ name, character, profile_path }) => {
            return (
              <li key={uuidv4()} className={s.cast_card}>
                <img
                  alt={name}
                  src={
                    profile_path
                      ? `https://image.tmdb.org/t/p/w500${profile_path}`
                      : noActorImg
                  }
                  width="100"
                  className={s.cast_img}
                />
                <h4 className={s.actor_name}>{name}</h4>
                <p className={s.actor_role}>{character}</p>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Cast;

Cast.propTypes = {
  moviesId: PropTypes.string,
};
