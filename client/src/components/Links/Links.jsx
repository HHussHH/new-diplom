import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import "./Links.scss";
import ReactDOM from "react-dom";
import LastMessage from "../LastMessage/LastMessage";
import ReadMoreBtn from "./ReadMoreBtn";

const userId = JSON.parse(localStorage.getItem("user") || "{}")?.id;

const PortalComponent = ({ children }) => {
  const portalRoot = document.getElementById("window");
  return ReactDOM.createPortal(children, portalRoot);
};

const Links = ({ type = "own" }) => {
  const [links, setLinks] = useState([]);
  const [openCards, setOpenCards] = useState({});

  const cat = useLocation().search;

  useEffect(() => {
    const fetchData = async () => {
      if (type === "own") {
        try {
          const res = await axios.get(`/links${cat}`);
          setLinks(
            res.data.filter((link, index, array) => {
              // Проверяем, что userID === uid и индекс текущего элемента равен индексу первого вхождения элемента с таким же значением поля "original"
              return (
                userId === link.uid &&
                array.findIndex((obj) => obj.original === link.original) ===
                  index
              );
            })
          );
          // Инициализируем состояние для каждой карточки в начальном состоянии "close"
          const initialOpenState = res.data.reduce((acc, link) => {
            return { ...acc, [link.id]: "close" };
          }, {});
          setOpenCards(initialOpenState);
        } catch (err) {
          console.log(err);
        }
      } else if (type === "all") {
        try {
          const res = await axios.get(`/links${cat}`);
          setLinks(
            res.data.filter((link, index, array) => {
              // Проверяем, что userID === uid и индекс текущего элемента равен индексу первого вхождения элемента с таким же значением поля "original"
              return (
                userId !== link.uid &&
                array.findIndex((obj) => obj.original === link.original) ===
                  index
              );
            })
          );
          // Инициализируем состояние для каждой карточки в начальном состоянии "close"
          const initialOpenState = res.data.reduce((acc, link) => {
            return { ...acc, [link.id]: "close" };
          }, {});
          setOpenCards(initialOpenState);
        } catch (err) {
          console.log(err);
        }
      }
    };
    fetchData();
  }, [cat]);

  const handleToggleLastMessage = (linkId) => {
    setOpenCards((prevState) => ({
      ...prevState,
      [linkId]: prevState[linkId] === "open" ? "close" : "open",
    }));
  };

  return (
    <div className="Link">
      <div className="Link__cards">
        {links.map((link) => {
          return (
            <>
              <div className="Link__card" key={link.id}>
                <div className="Link__upline">
                  <h2 className="Link__title">{link.title}</h2>
                  <p className="Link__subscribe">
                    {link.uid === userId ? "Отписаться" : "Подписаться"}
                  </p>
                </div>
                <p className="Link__desc">
                  {link.desc.length >= 300
                    ? link.desc.slice(0, 300) + "..."
                    : link.desc}
                </p>
                <div className="Link__img">
                  <img src={link.img} alt={link.title} />
                </div>
                <div className="Link__interactions">
                  <ReadMoreBtn
                    onClick={() => handleToggleLastMessage(link.id)}
                    isOpen={openCards[link.id] === "open"}
                  />
                  <p className="Link__genre">
                    <b>Жанр:</b> {link.cat}
                  </p>
                </div>
              </div>
              {/* Отображение LastMessage только если состояние open равно "open" */}
              {openCards[link.id] === "open" && (
                <PortalComponent>
                  <LastMessage
                    status={openCards[link.id]}
                    original={link.original}
                    closeClick={() => handleToggleLastMessage(link.id)}
                  />
                </PortalComponent>
              )}
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Links;
