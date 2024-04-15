import React, { useEffect, useState } from "react";
import NavbarMenu from "../../components/NavbarMenu";
import Private from "../../components/Private";
import api from "../../services/http_requests";

const Home = () => {
  const exchanges = ["BITSTAMP", "COINBASE", "KRAKEN"];
  const [prices, setPrices] = useState({});

  useEffect(() => {
    console.log("Setting data...");
    setData();
  });

  useEffect(() => {
    console.log("Updating prices...");
    console.table(prices);
  }, [prices]);

  const setData = () => {
    getCryptoPrices("BTCUSD")
      .then((response) => {
        setPrices(response);
      })
      .catch((err) => console.error(err));
  };

  async function getCryptoPrices(symbol) {
    const prices = {};

    for (const exchange of exchanges) {
      try {
        const response = await api.get(
          `/v1/exchangerate/${symbol}?&exchange=${exchange}`
        );
        prices[exchange] = response.data.rate;
      } catch (error) {
        console.error(`Error fetching data from ${exchange}, error.message`);
      }
    }
    return prices;
  }

  return (
    <Private>
      <NavbarMenu />
    </Private>
  );
};

export default Home;
