import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_COIN_API_BASE_URL,
  headers: {
    "X-CoinAPI-Key": import.meta.env.VITE_COIN_API_KEY
  }
});

export default api;
