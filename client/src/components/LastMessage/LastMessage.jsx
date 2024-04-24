import React, { useEffect, useState } from "react";
import "./LastMessage.scss";
import axios from "axios";

const LastMessage = ({ status, original, closeClick }) => {
  const [info, setInfo] = useState(null);

  useEffect(() => {
    const getInfo = async () => {
      try {
        const response = await axios.get(
          `https://api.telegram.org/bot6883424198:AAHZVYXnB-Y5ACF4jaBzYdqAcBrTjX7JFiY/getChat?chat_id=@${original}`
        );
        setInfo(response.data.result);
      } catch (error) {
        console.error("Error fetching chat info:", error);
      }
    };

    getInfo();
  }, [original]);

  const handleBodyClick = (event) => {
    // Предотвращаем всплытие события клика
    event.stopPropagation();
  };
  let styleClass = `LastMessage__body LastMessage__${status}`;

  return (
    <div className="LastMessage" onClick={closeClick}>
      <div className={styleClass} onClick={handleBodyClick}>
        {info && (
          <>
            <h1 className="LastMessage__title">{info.title}</h1>
            {info.pinned_message ? (
              <div className="LastMessage__text">
                {info.pinned_message.caption}
              </div>
            ) : (
              "Данные отсутствуют"
            )}
            <button className="LastMessage__button" onClick={closeClick}>
              Прочитал
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default LastMessage;
