import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import "./Links.scss";
import ReadMoreBtn from "./ReadMoreBtn";
import LastMessage from "../LastMessage/LastMessage";
import { ReactComponent as Completed } from "../../images/completed.svg";

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

  const handleToggleLastMessage = (linkId) => {
    setOpenCards((prevState) => ({
      ...prevState,
      [linkId]: prevState[linkId] === "open" ? "close" : "open",
    }));
  };

  return (
    <>
      <h1 className="Links__title">== Личный список сообществ ==</h1>
      <div className="Links">
        {links.map((link) => {
          return (
            <>
              <div className="Links__card" key={link.id}>
                <img className="Links__img" src={link.img} alt="" />
                <div className="Links__content">
                  <Link
                    className="Links__link"
                    href={`https://t.me/${link.original}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <a
                      href={`https://t.me/${link.original}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <h1>{link.title}</h1>
                    </a>
                  </Link>
                  {link.desc.length >= 300
                    ? link.desc.slice(0, 300) + "..."
                    : link.desc}
                  <div className="Links__buttons">
                    <ReadMoreBtn
                      onClick={() => handleToggleLastMessage(link.id)}
                      isOpen={openCards[link.id] === "open"}
                    />
                    <p>Жанр: {link.cat}</p>
                    <button>
                      <Completed width="50px" height="50px" />
                    </button>
                  </div>
                </div>
              </div>
              {/* Отображение LastMessage только если состояние open равно "open" */}
              {openCards[link.id] === "open" && (
                <LastMessage
                  status={openCards[link.id]}
                  original={link.original}
                  closeClick={() => handleToggleLastMessage(link.id)}
                />
              )}
            </>
          );
        })}
      </div>
    </>
  );
};

export default Links;
