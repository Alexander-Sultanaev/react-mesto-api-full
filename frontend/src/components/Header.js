import React from "react";
import { Link, useLocation } from "react-router-dom";

const Header = ({ loggedIn, userEmail, onSignOut }) => {
  const location = useLocation()
  return (
      <header className="header">
        <div className="header__container">
          <div className="header__logo"></div>
          {location.pathname ==='/sign-up' && (
            <Link to='/sign-in' className="header__link">Войти</Link>
          )}
          {location.pathname === '/sign-in' && (
            <Link to='/sign-up' className="header__link">Регистрация</Link>
          )}
          {loggedIn && (
            //меню бургер в процессе)
            <div className="header__nav">
              <p className="header__email">{userEmail}</p>
              <button className="header__button" onClick={() => onSignOut()}>Выйти</button>
            </div>
            )}
        </div>
      </header>
  )
}
export default Header;