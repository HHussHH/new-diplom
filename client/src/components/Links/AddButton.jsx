import React from "react";
import { ReactComponent as AddToMe } from "../../images/Plus.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddButton = ({ original }) => {
  const navigate = useNavigate();

  const userId = JSON.parse(localStorage.getItem("user") || "{}")?.id;

  const handleClick = async (e) => {
    e.preventDefault();

    const data = await axios.get(
      `https://api.telegram.org/bot6883424198:AAHZVYXnB-Y5ACF4jaBzYdqAcBrTjX7JFiY/getChat?chat_id=@${original}`
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
      original,
      uid: userId,
    });

    navigate("/");
  };

  return (
    <button onClick={handleClick}>
      <AddToMe width="50px" height="50px" />
    </button>
  );
};

export default AddButton;
