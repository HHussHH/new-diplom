import React from "react";
import "./NotFound.scss";
import logo from "../images/404gif.gif";

const PageNotFound = () => {
  return (
    <div className="NotFound">
      <h1 className="NotFound__title">
        Увы, ты попал на не существующую страницу {`=(`}
      </h1>
      <h2 className="NotFound__404">404</h2>
      <img className="NotFound__img" src={logo} alt="" />
      <button className="NotFound__btn">Вернуться назад</button>
    </div>
  );
};

export default PageNotFound;
