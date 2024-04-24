import React from "react";
import "./Links.scss";
import { ReactComponent as ReadMore } from "../../images/ReadMore.svg";

const ReadMoreBtn = ({ onClick }) => {
  return (
    <>
      <button onClick={onClick}>
        <ReadMore width="50px" height="50px" />
      </button>
    </>
  );
};

export default ReadMoreBtn;
