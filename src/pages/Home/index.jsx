import React, { useEffect, useState } from "react";
import NavbarMenu from "../../components/NavbarMenu";
import Private from "../../components/Private";
import DefaultCard from "../../components/Card";
import Footer from "../../components/Footer";
import api from "../../services/http_requests";
import CoinIcon from "../../assets/bitcoin.jpg";

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
        console.error(`Error fetching data from ${exchange}`);
      }
    }
    return prices;
  }

  return (
    <Private>
      <NavbarMenu />
      <div className="min-h-screen">
        <h1 className="m-3 p-2 font-bold">Resultados</h1>
        <div className="w-full h-full grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-4 gap-x-4 py-2 px-4">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <DefaultCard
              key={item}
              coinIcon={CoinIcon}
              coinName={`Brand ${item}`}
              fromExchange={"Binance"}
              toExchange={"KRAKEN"}
              fromExPrice={"10,67"}
              toExPrice={"15,89"}
              spread={"10"}
              tax={"4"}
            />
          ))}
        </div>
      </div>
      <Footer />
    </Private>
  );
};

export default Home;
