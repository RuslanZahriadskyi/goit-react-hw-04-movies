import { NavLink } from 'react-router-dom';
import s from './FoundFilms.module.css';

export default function FoundFilms({ films, location }) {
  return (
    <ul className={s.filmsList}>
      {films &&
        films.map(film => (
          <li key={film.id} className={s.film}>
            <NavLink
              to={{
                pathname: `/movies/${film.id}`,
                state: { from: location },
              }}
              className={s.filmLink}
            >
              {film.name || film.original_title}
            </NavLink>
          </li>
        ))}
    </ul>
  );
}
