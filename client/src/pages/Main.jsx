import React from "react";
import Menu from "../components/Menu/Menu";
import Links from "../components/Links/Links";
import "./Main.scss";
const Home = () => {
  return (
    <div className="Main">
      <Menu />
      <Links />
    </div>
  );
};

export default Home;
