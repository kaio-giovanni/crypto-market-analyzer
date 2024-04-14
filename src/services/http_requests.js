import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_COIN_API_BASE_URL,
  headers: {
    "X-CoinAPI-Key": process.env.REACT_APP_COIN_API_KEY,
  },
});

export default api;
