import { db } from "../db.js";
import axios from "axios";
import https from "https";
const httpsAgent = new https.Agent({ rejectUnauthorized: false });

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

export const addLink = (req, res) => {
  const q =
    "INSERT INTO links (`title`, `desc`, `img`, `cat`,`original`, `uid`) VALUES (?)";

  let data = JSON.stringify({
    model: "GigaChat",
    messages: [
      {
        role: "user",
        content: `Есть канал ${req.body.title}, вот описание этого канала ${req.body.desc}. Сделай краткий вывод о сути канала и потом выдай ему одну из следующих категорий: Новости | Бизнес | Фильмы | Книги | Подкасты | ИТ_Бизнес | Развлечения | Другое. В твоем ответе не должно быть ничего лишнего. Просто текст следующего формата: Суть: тут будет твой текст. Категория: категорию пиши с точкой в конце предложения. ВАЖНО:категория может быть только одна их тех, что я указал выше, от себя ты ничего не добавляешь!`,
      },
    ],
    temperature: 1,
    top_p: 0.1,
    n: 1,
    stream: false,
    max_tokens: 512,
    repetition_penalty: 1,
    update_interval: 0,
  });

  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://gigachat.devices.sberbank.ru/api/v1/chat/completions",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization:
        "Bearer eyJjdHkiOiJqd3QiLCJlbmMiOiJBMjU2Q0JDLUhTNTEyIiwiYWxnIjoiUlNBLU9BRVAtMjU2In0.BZJtQBYMsAzECUvJvvIDofP7faA_T4yy8uq2KM1CY5P2O7uIfDDfiApY7GTLeKCGq8u2wBJpZWBcN2QHYIlKOW5cThtv2nvUi-ZJ7or898d-Cw9WMaADiXfGetGbk-s3H-Na9EyF6MIsbn0SEILA95Vbg3QbR-c8oxED-jPWWfaJFmNiPau8TdDh_-1BSP4mcHtePihbpHHmwHxsxGpvMORGxpyIm4faPxMJPwpVG8lkY7Y9DXL1DJju3R9FncXz4oDOz3Sxz6l1_KrhPRp-C_75wOqLd5xlPON2PF4EE2VAJVdB5G7DuBk4Us5QkpXtSZNKRRfr6qpVpeHIjlytAA.wwyenmV8fU1KLTs_QoWudA.nUIJHBEgZoZ6pSZ_nPniFw8YIV6KGq1GWp-nQosa-NhnVfpItC3vJu-mdXEcfzJY4t1RTdyPTUGv2AYEpGuw9DN-n_zTW9F_0LuNuSAshO4mk0hbqTna5tGtlrVlglWCK4R9NH-0Z24Aw8W_mX-0kPkdMJ2BEvuU64BMOMp-RyrC5phMs4H0nFxrkAqjrJTixg5cu42VdpHLCFrFqD_0lDl1MhEUNlAELOs96w4mphHZi6v87oQy69LfidgPgWV6NzC4WMk4eVzYfxgOvRfIcTlkJgsDOfTT2gnQoZNQdFOys34a4C7EJDVrykKpjts9W2p1oDCDsvL1sWvJmu9_WqArLqc4EwYgfcRqcfSVkcczU2r3ToBE40k9j53lo-750-UoCrFfWc15TqlHYA1j_rUvLu3RpzZEsL8JyWDESoIe-YVABaUzwllmMvmVVSMTSqAeaWurM0TEO3RoqG-eqwSS4-n0iXi2eF_i0BwMQ_wVLrZFSfzaBp8_h19RbgAwUbpYAHhMbGUd-SDndO0gNu7jt54p8zwbO8nLo0RsyxxA9SAFt-T_nul1kTb5A3eck1Fa58dbRLjuhzDUtSdqtQC5dbr7ffrhhLRHUZSIQaqG-ePZPVFfu7tkCwmtZs9wSF3EcVmqOlT7oj-_Y7mmwSLI-VWefIG_goLUl7VFmAylVAFj-_Sw_hPtZfAu8E5k6A5tgxyGhNP-eb6kp7wyoKC1RGmyzu1sLDRb566IzMA.4Rc_NaTEHqtFnNeKWHK1jlJmh_zKGdOzIonWq6SNjyI",
    },
    httpsAgent,
    data: data,
  };

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
