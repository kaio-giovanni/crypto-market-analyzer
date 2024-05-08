import axios from "axios";
import { coinApiBaseUrl, coinApiKey, binanceApiBaseUrl, mbApiBaseUrl } from "../utils/dotenv";

export const coinApi = axios.create({
  baseURL: coinApiBaseUrl,
  headers: {
    "X-CoinAPI-Key": coinApiKey,
    "Content-Type": "application/json",
  },
});

export const binanceApi = axios.create({
  baseURL: binanceApiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export const mbApi = axios.create({
  baseURL: mbApiBaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});
