import React from "react";
import "./Links.scss";
import { ReactComponent as ReadMore } from "../../images/ReadMore.svg";

const ReadMoreBtn = ({ onClick }) => {
  return (
    <>
      <button className="Link__button" onClick={onClick}>
        <ReadMore width="50px" height="50px" />
      </button>
    </>
  );
};

export default ReadMoreBtn;
