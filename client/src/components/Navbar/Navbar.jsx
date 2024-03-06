import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./Navbar.scss";
const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="navbar__profile">
        <Link className="navbar__link" to="/">
          <h6>Привет, {currentUser?.username} !</h6>
        </Link>
      </div>

      <Link className="navbar__link" to="/AllLinks">
        <h6>Общий список</h6>
      </Link>
      <span className="write">
        <Link className="navbar__link" to="/AddLink">
          <h6>Добавить группу</h6>
        </Link>
      </span>

      <Link className="navbar__link" to="/login">
        <h6>Выйти</h6>
      </Link>
    </div>
  );
};

export default Navbar;
