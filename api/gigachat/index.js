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
    RqUID: "76c3a5d5-0008-42ff-97e1-ddc4b5c47b07",
    Authorization:
      "Basic OGUxMmJhODgtN2JlYi00YzdkLTk4MTUtZDY1ZTRkOTJhOWY2OjgzZTlmMzFjLWRhYTYtNDFjMy1iNWJjLTM1YWYwMmU1MjU3ZQ==",
  },
  httpsAgent,
  data: data,
};

axios(config)
  .then((response) => {
    console.log(JSON.stringify(response.data.access_token));
  })
  .catch((error) => {
    console.log(error);
  });
