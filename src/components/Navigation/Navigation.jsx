import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './Navigation.module.css';

export default function Navigation() {
  return (
    <ul className={s.navList}>
      <li className={s.navItem}>
        <NavLink to="/" className={s.navLink}>
          Home
        </NavLink>
      </li>
      <li className={s.navItem}>
        <NavLink to="/movies" className={s.navLink}>
          Movies
        </NavLink>
      </li>
    </ul>
  );
}
