import React, { Children } from "react";
import { Link } from "react-router-dom";
import "./Menu.scss";
import { ReactComponent as All } from "../../images/cat-all.svg";
import { ReactComponent as News } from "../../images/cat-news.svg";
import { ReactComponent as Bisness } from "../../images/cat-bisness.svg";
import { ReactComponent as Film } from "../../images/cat-film.svg";
import { ReactComponent as Books } from "../../images/cat-books.svg";
import { ReactComponent as Podcasts } from "../../images/cat-podcasts.svg";
import { ReactComponent as It } from "../../images/cat-it.svg";
import { ReactComponent as Fun } from "../../images/cat-fun.svg";
import { ReactComponent as Other } from "../../images/cat-other.svg";
import { ReactComponent as FAQ } from "../../images/cat-other.svg";

const Menu = () => {
  return (
    <div className="sidebar">
      <div>
        <ul>
          <Link className="sidebar__link" to={`${window.location.pathname}`}>
            <All width="30px" height="30px" />
            <h6>Все</h6>
          </Link>
          <Link
            className="sidebar__link"
            to={`${window.location.pathname}?cat=Новости`}
          >
            <News width="30px" height="30px" />
            <h6>Новости</h6>
          </Link>
          <Link
            className="sidebar__link"
            to={`${window.location.pathname}?cat=Бизнес`}
          >
            <Bisness width="30px" height="30px" />
            <h6>Бизнес</h6>
          </Link>
          <Link
            className="sidebar__link"
            to={`${window.location.pathname}?cat=Фильмы`}
          >
            <Film width="30px" height="30px" />
            <h6>Фильмы/Сериалы</h6>
          </Link>
          <Link
            className="sidebar__link"
            to={`${window.location.pathname}?cat=Книги`}
          >
            <Books width="30px" height="30px" />
            <h6>Книги</h6>
          </Link>
          <Link
            className="sidebar__link"
            to={`${window.location.pathname}?cat=Подкасты`}
          >
            <Podcasts width="30px" height="30px" />
            <h6>Подкасты</h6>
          </Link>
          <Link
            className="sidebar__link"
            to={`${window.location.pathname}?cat=ИТ_Бизнес`}
          >
            <It width="30px" height="30px" />
            <h6>IT Бизнес</h6>
          </Link>
          <Link
            className="sidebar__link"
            to={`${window.location.pathname}?cat=Развлечения`}
          >
            <Fun width="30px" height="30px" />
            <h6>Развлечения</h6>
          </Link>
          <Link
            className="sidebar__link"
            to={`${window.location.pathname}?cat=Другое`}
          >
            <Other width="30px" height="30px" />
            <h6>Другое</h6>
          </Link>
          <Link className="sidebar__link" to="/FAQ">
            <FAQ width="30px" height="30px" />
            <h6>FAQ</h6>
          </Link>
        </ul>
      </div>
      <footer>
        <span>
          Made with ♥️ by <b>M.N.I</b>.
        </span>
      </footer>
    </div>
  );
};

export default Menu;
