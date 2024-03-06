import React, { useState } from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddLink.scss";

const AddLink = () => {
  const [value, setValue] = useState("");
  const [err, setErr] = useState("");

  const navigate = useNavigate();
  const userId = JSON.parse(localStorage.getItem("user") || "{}")?.id;

  const handleClick = async (e) => {
    e.preventDefault();

    if (value.length > 0) {
      const data = await axios.get(
        `https://api.telegram.org/bot6883424198:AAHZVYXnB-Y5ACF4jaBzYdqAcBrTjX7JFiY/getChat?chat_id=@${value}`
      );
      const photo_id = data.data.result.photo.big_file_id;
      const img = await axios.get(
        `https://api.telegram.org/bot6883424198:AAHZVYXnB-Y5ACF4jaBzYdqAcBrTjX7JFiY/getFile?file_id=${photo_id}`
      );
      await axios.post(`/links/add`, {
        title: data.data.result.title,
        desc: data.data.result.description,
        cat: data.data.result.type,
        img: `https://api.telegram.org/file/bot6883424198:AAHZVYXnB-Y5ACF4jaBzYdqAcBrTjX7JFiY/${img.data.result.file_path}`,
        original: value,
        uid: userId,
      });

      navigate("/");
    } else {
      setErr("Ошибка данных!");
    }
  };

  return (
    <div className="AddLink">
      <h1 className="AddLink__title">Введите группу в формае: название.</h1>
      <p className="AddLink__subtitle">Пример: psevdoITman</p>
      <div className="AddLink__content">
        <input
          onChange={(e) => setValue(e.target.value)}
          className="AddLink__input"
          type="text"
          placeholder="psevdoITman"
        />
        <button onClick={handleClick} className="AddLink__button">
          Добавить
        </button>
        <p>{err}</p>
      </div>
    </div>
  );
};

export default AddLink;
