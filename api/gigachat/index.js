import axios from "axios";
import qs from "qs";
import https from "https";

const httpsAgent = new https.Agent({ rejectUnauthorized: false });
let data = qs.stringify({
  scope: "GIGACHAT_API_PERS",
});
let config = {
  method: "post",
  maxBodyLength: Infinity,
  url: "https://ngw.devices.sberbank.ru:9443/api/v2/oauth",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
    Accept: "application/json",
    RqUID: "83e9f31c-daa6-41c3-b5bc-35af02e5257e", //Client Secret

    Authorization:
      "Basic OGUxMmJhODgtN2JlYi00YzdkLTk4MTUtZDY1ZTRkOTJhOWY2OmUzMzAwODQ5LWFhMmUtNDNjOS05YzM2LWJhMGU5YzExNDZiNQ==",
  }, //Авторизационные данные
  httpsAgent,
  data: data,
};

export const getClientKey = async () => {
  try {
    const res = await axios(config);
    return res.data.access_token;
  } catch (err) {
    return err;
  }
};

export const getInfoAboutGroup = async (req) => {
  const ClientKey = await getClientKey();
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
      Authorization: `Bearer ${ClientKey}`,
    },
    httpsAgent,
    data: data,
  };

  return config;
};
