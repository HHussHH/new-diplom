import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import "./Links.scss";
import AddButton from "./AddButton";
import gifCat from "../../images/Q8Yu.gif";
import ReadMoreBtn from "./ReadMoreBtn";
import LastMessage from "../LastMessage/LastMessage";
const userId = JSON.parse(localStorage.getItem("user") || "{}")?.id;

const AllLinks = () => {
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
              userId !== link.uid &&
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
      <h1 className="Links__title">== Общий список сообществ ==</h1>
      <div className="Links">
        {links.length > 0 ? (
          links.map((link) => {
            console.log(link.length);

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
                      <AddButton original={link.original} />
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
          })
        ) : (
          <>
            <h2>Извините, но в данный момент список пуст.</h2>
            <img src="../../images/Q8Yu.gif" alt="" />
          </>
        )}
      </div>
    </>
  );
};

export default AllLinks;
