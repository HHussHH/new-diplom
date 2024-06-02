import React from "react";
import Menu from "../components/Menu/Menu";
import Links from "../components/Links/Links";
const AllLinksPage = () => {
  return (
    <div className="Main">
      <Menu />
      <Links type="all" />
    </div>
  );
};

export default AllLinksPage;
