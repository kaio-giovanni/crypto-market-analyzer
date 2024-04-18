import React, { useEffect, useState } from "react";
import NavbarMenu from "../../components/NavbarMenu";
import Private from "../../components/Private";
import DefaultCard from "../../components/Card";
import api from "../../services/http_requests";

const Home = () => {
  const exchanges = ["BITSTAMP", "COINBASE", "KRAKEN"];
  const [prices, setPrices] = useState({});

  //   useEffect(() => {
  //     console.log("Setting data...");
  //     setData();
  //   }, []);
  //
  //   useEffect(() => {
  //     console.log("Updating prices...");
  //     console.table(prices);
  //   }, [prices]);

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
      <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 justify-items-center">
        {[1, 2, 3, 4, 5].map((item) => (
          <DefaultCard key={item} />
        ))}
      </div>
    </Private>
  );
};

export default Home;
