import React from "react";
import { Link } from "react-router-dom";
import "./Menu.scss";
const Menu = () => {
  return (
    <div className="sidebar">
      <h2>Категории:</h2>
      <ul>
        <Link className="sidebar__link" to="/">
          <h6>Все</h6>
        </Link>
        <Link className="sidebar__link" to="/?cat=news">
          <h6>Новости</h6>
        </Link>
        <Link className="sidebar__link" to="/?cat=bisnes">
          <h6>Бизнес</h6>
        </Link>
        <Link className="sidebar__link" to="/?cat=films">
          <h6>Фильмы/Сериалы</h6>
        </Link>
        <Link className="sidebar__link" to="/?cat=books">
          <h6>Книги</h6>
        </Link>
        <Link className="sidebar__link" to="/?cat=podcasts">
          <h6>Подкасты</h6>
        </Link>
        <Link className="sidebar__link" to="/?cat=itbisnes">
          <h6>IT Бизнес</h6>
        </Link>
        <Link className="sidebar__link" to="/?cat=mems">
          <h6>Мемы</h6>
        </Link>
        <Link className="sidebar__link" to="/?cat=another">
          <h6>Другое</h6>
        </Link>
        <Link className="sidebar__link" to="/FAQ">
          <h6>FAQ</h6>
        </Link>
      </ul>
    </div>
  );
};

export default Menu;
