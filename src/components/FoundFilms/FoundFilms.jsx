import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import s from './FoundFilms.module.css';

export default function FoundFilms({ films, location }) {
  return (
    <ul className={s.filmsList}>
      {films &&
        films.map(({ id, name, original_title }) => (
          <li key={id} className={s.film}>
            <NavLink
              to={{
                pathname: `/movies/${id}`,
                state: { from: location },
              }}
              className={s.filmLink}
            >
              {name || original_title}
            </NavLink>
          </li>
        ))}
    </ul>
  );
}

FoundFilms.propTypes = {
  films: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string,
      original_title: PropTypes.string,
    }),
  ),
};
