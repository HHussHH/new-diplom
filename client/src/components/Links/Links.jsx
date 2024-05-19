import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import "./Links.scss";
import { ReactComponent as ReadMore } from "../../images/ReadMore.svg";
import LastMessage from "../LastMessage/LastMessage";

const userId = JSON.parse(localStorage.getItem("user") || "{}")?.id;

const Links = () => {
  const [links, setLinks] = useState([]);
  const [openCards, setOpenCards] = useState({});

  const cat = useLocation().search;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/links${cat}`);
        setLinks(
          res.data.filter((link, index, array) => {
            // Проверяем, что userID === uid и индекс текущего элемента равен индексу первого вхождения элемента с таким же значением поля "original"
            return (
              userId === link.uid &&
              array.findIndex((obj) => obj.original === link.original) === index
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
    };
    fetchData();
  }, [cat]);

  return (
    <div className="Link">
      <div className="Link__cards">
        {links.map((link) => {
          return (
            <div className="Link__card" key={link.id}>
              <div className="Link__upline">
                <h2 className="Link__title">{link.title}</h2>
                <p className="Link__subscribe">Подписаться</p>
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
                <button
                  className="Link__button"
                  onClick={() => LastMessage(link.original)}
                >
                  <ReadMore width="50px" height="50px" />
                </button>
                <p className="Link__genre">
                  <b>Жанр:</b> {link.cat}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Links;
