import React, { useContext, useEffect, useState } from "react";
import "./LastMessage.scss";
import { MessageContext } from "./ModalWindow";
import axios from "axios";

const LastMessage = ({ original }) => {
  // const contextProps = useContext(MessageContext);
  // const toggleWindowOpen = () => contextProps.setIsOpen((open) => !open);
  // // const handleBodyClick = (event) => {
  // //   // Предотвращаем всплытие события клика
  // //   event.stopPropagation();
  // // };

  const [info, setInfo] = useState({});
  useEffect(() => {
    const getInfo = async () => {
      try {
        const response = await axios.get(
          `https://api.telegram.org/bot6883424198:AAHZVYXnB-Y5ACF4jaBzYdqAcBrTjX7JFiY/getChat?chat_id=@${original}`
        );
        const result = await response.data.result;
        setInfo(result);
        return result;
      } catch (error) {
        console.log(error);
      }
    };

    getInfo();
  }, [original]);

  return (
    <div>
      <p>123 - {info.name}</p>
      <button onClick={() => {}}>Close</button>
    </div>
  );
};

export default LastMessage;
