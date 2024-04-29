import axios from "axios";
import { coinApiBaseUrl, coinApiKey } from "../utils/dotenv";

const api = axios.create({
  baseURL: coinApiBaseUrl,
  headers: {
    "X-CoinAPI-Key": coinApiKey,
  },
});

export default api;
