import axios from "axios";

import https from "https";

const httpsAgent = new https.Agent({ rejectUnauthorized: false });

let data = JSON.stringify({
  model: "GigaChat",
  messages: [
    {
      role: "user",
      content:
        "Привет, сделай краткую сводку информации о данном тексте: Авторский поток сознания @glebmikheev Больше про меня: bit.ly/WHOISGLEB Ютуб канал с выступлениями и подкастами: https://www.youtube.com/@tired_glebmikheev Реклама: @vlad_0045 Бусти для респектов: https://boosty.to/tired_glebmikheev ",
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
      "Bearer eyJjdHkiOiJqd3QiLCJlbmMiOiJBMjU2Q0JDLUhTNTEyIiwiYWxnIjoiUlNBLU9BRVAtMjU2In0.dJAGbPN-nxA41fYULgbQB9lVM_-wT4Ovr-rLSfQ6tv3CE82FhfKGaSHOIo0NiiXL4UzV8bUdhFlyqzqJacqmkJb5qKth0nbifRdbvB-uisDQjgLnJud0YxB0kKNw1qY8aP_oW1zYKDHts-UWABSYyV2MMhyyo_0jMjt2dT4PZSaUHsYYs5oQeVghsDLbtteyHEFOmremm1daZgr0NmfBmOxAHstAHUtM5ghZLv46fPdPSyKxXd4dFSRGWInLqe68pI97BtuV_8wY88FleFlZNWl-fFBMfMOAdOsDuDn5k9o5w2u_THJVbZB8twshciGLoIBlSWhEyg6LRos_u-Okaw.7lebfUbSroke31Pq0svmSg.gGz9w3wty2rNDz3LhXsuDHczJe7_7uhEfttApTHZqAx8h227WmxyaJ0yIO85KwSwuWjYeEsmbg7Q2bBXS_W1BFQjl4ia2_FDZBdl8_XILUVUGSsOpr-UHe5LlIWM0H2osByn5AQ3HAopLkMom_ozkP0yTXaepYhV8oMQ85PjIrT_EInUnLeAI7N1ZN6Wqwi8m8sNiCdykhZxMCY5Br1XaZhq2kJ8iHA9yM4CM-lkNl-w8bhy9LIvblbregtzOUrRQ24aPSxAWmLujwZMm6_8paXCw2R6sO_3lXI_o0FvWYokfAJ7gIfw-yoOtl5Jsk1iFKf0tCLdXRznZKimD3RIMMPuSFQmzdRX5nGMhnObPOhbNO6RSrP7xHqcY9spu_3O-xHEhwgVsYB-iwXWZgPBsxFENfMId-XonpTJ5G4DZR_zcqBfsftYGIJpsinNXIgCfKNWMwWvvTWrZf_o82XJgV5MuEM7NFpVlJacQ5CMZzA4VNiT5ZIP5m2xkqU0FQADUKAG3NA5mw3h3iedwJfIhEFVaisnUfotMJbfZYprDdq-Ond29HJfqYD5HcD9Cj7k0Y0N4EoxuBuefhxKUVmnEwC9PdgKP3J8rupVT6prAQHRf1ZTy7xUMZTYJbaVvUU9srx95JaghPiHjcYc40UIboTySnK2LNYGZHfAXY3QnbmI51_k2yIbxMC88dqjLAI7fRAvEBDlEoTb9HQny8fo-f1UH3CvmudPcxujRvQkzZE.4HkdiRZ1W7a_QYiBPOAplbgrQS33Vw_zsve8u3MOmAA",
  },
  httpsAgent,
  data: data,
};

axios(config)
  .then((response) => {
    console.log(JSON.stringify(response.data.choices[0].message.content));
  })
  .catch((error) => {
    console.log(error);
  });
