import { db } from "../db.js";
import axios from "axios";
import https from "https";
import { getInfoAboutGroup } from "../gigachat/index.js";

export const getLinks = (req, res) => {
  const q = req.query.cat
    ? "SELECT * FROM links WHERE cat=?"
    : "SELECT * FROM links";

  db.query(q, [req.query.cat], (err, data) => {
    if (err) return res.status(500).send(err);

    return res.status(200).json(data);
  });
};

export const getLinksCurrentUser = (req, res) => {
  const q = req.query.i
    ? "SELECT * FROM links WHERE cat=?"
    : "SELECT * FROM links";

  db.query(q, [req.query.cat], (err, data) => {
    if (err) return res.status(500).send(err);

    return res.status(200).json(data);
  });
};

export const addLink = async (req, res) => {
  const q =
    "INSERT INTO links (`title`, `desc`, `img`, `cat`,`original`, `uid`) VALUES (?)";
  const config = await getInfoAboutGroup(req);

  axios(config).then((response) => {
    const parts = JSON.stringify(
      response.data.choices[0].message.content
    ).split(/Суть:|Категория:/);

    // Очищаем от лишних пробелов и сохраняем каждую часть в отдельную переменную
    const firstPart = parts[1].trim(); // содержит текст после "Суть:"
    const secondPart = parts[2].trim().replace(/^[.,'"\s]+|[.,'"\s]+$/g, ""); // содержит текст после "Категория:"

    const values = [
      req.body.title,
      firstPart,
      req.body.img,
      secondPart,
      req.body.original,
      req.body.uid,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Link has been created.");
    });
  });
};
