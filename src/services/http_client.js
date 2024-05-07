import axios from "axios";
import { coinApiBaseUrl, coinApiKey, binanceApiBaseUrl, binanceApiKey } from "../utils/dotenv";

export const coinApi = axios.create({
  baseURL: coinApiBaseUrl,
  headers: {
    "X-CoinAPI-Key": coinApiKey,
  },
});

export const binanceApi = axios.create({
  baseURL: binanceApiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});
