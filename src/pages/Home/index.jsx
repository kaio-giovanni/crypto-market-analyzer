import React, { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import NavbarMenu from "../../components/NavbarMenu";
import Private from "../../components/Private";
import Loading from "../../components/Loading";
import DefaultCard from "../../components/Card";
import MultiSelect from "../../components/MultiSelect";
import Footer from "../../components/Footer";
import api from "../../services/http_requests";
import CoinIcon from "../../assets/bitcoin.jpg";

const Home = () => {
  const [exchanges, setExchanges] = useState([]);
  const [selectedExchanges, setSelectedExchanges] = useState([]);
  const [selectedCrypto, setSelectedCrypto] = useState(["BRL", "USDT"]);
  const [rateByExchanges, setRateByExchanges] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("Setting data...");

    getExchanges()
      .then((response) => {
        setExchanges(response);
      })
      .catch((err) => {
        console.error(err);
      });

    // getCryptoPrices()
    //   .then((response) => {
    //     console.log(response);
    //     setRateByExchanges(response);
    //   })
    //   .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    console.log("Updating prices...");
    console.log({ selectedExchanges });
  }, [rateByExchanges, selectedExchanges]);

  const getExchanges = async () => {
    setLoading(true);
    const response = await api.get("/v1/exchanges");
    setLoading(false);
    return response.data;
  };

  const getCryptoPrices = async () => {
    try {
      setLoading(true);
      const data = [];
      data.push(await getCryptoPricesByExchanges("BRL"));
      data.push(await getCryptoPricesByExchanges("USDT"));
      return data;
    } catch (error) {
      console.error(error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const getCryptoPricesByExchanges = async (symbol) => {
    const prices = {};

    setLoading(true);
    for (const exchange of selectedExchanges) {
      try {
        const response = await api.get(
          `/v1/exchangerate/${symbol}?&exchange=${exchange}`
        );
        prices[exchange] = response.data.rate;
      } catch (error) {
        console.error(`Error fetching data from ${exchange}`);
      }
    }
    setLoading(false);
    return prices;
  };

  return (
    <Private>
      <NavbarMenu />
      {loading ? (
        <Loading type="green-400" />
      ) : (
        <div className="min-h-screen">
          <div className="w-full px-4 mt-2">
            <h1 className="text-indigo-800 font-sans font-bold">
              {selectedExchanges.length < 1
                ? "Selecionar Exchanges"
                : "Exchanges selecionadas"}
            </h1>
          </div>
          <div className="w-full px-2 mb-2">
            <MultiSelect
              options={exchanges.map(({ exchange_id }) => exchange_id)}
              selectedItems={selectedExchanges}
              setSelectedItems={setSelectedExchanges}
            />
          </div>
          <div className="w-full h-14 p-2 flex flex-wrap">
            <div className="ml-auto">
              <Button
                variant="outlined"
                className="flex items-center justify-center bg-indigo-900 w-full hover:bg-midnight text-white"
              >
                Aplicar
              </Button>
            </div>
          </div>
          <div className="w-full h-full grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-4 gap-x-4 py-2 px-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
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
      )}
      <Footer />
    </Private>
  );
};

export default Home;
