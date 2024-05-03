import axios from "axios";
import { coinApiBaseUrl, coinApiKey } from "../utils/dotenv";

export const coinApi = axios.create({
  baseURL: coinApiBaseUrl,
  headers: {
    "X-CoinAPI-Key": coinApiKey
  }
});

export const binanceApi = axios.create({});
