import React, { useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import NavbarMenu from "../../components/NavbarMenu";
import Private from "../../components/Private";
import Loading from "../../components/Loading";
import DefaultCard from "../../components/Card";
import MultiSelect from "../../components/MultiSelect";
import Footer from "../../components/Footer";
import { coinApi } from "../../services/http_requests";
import { coinApiWsUrl, coinApiKey } from "../../utils/dotenv";
import CoinIcon from "../../assets/bitcoin.jpg";

const Home = () => {
  const [exchanges, setExchanges] = useState([]);
  const [selectedExchanges, setSelectedExchanges] = useState([]);
  const [selectedCrypto, setSelectedCrypto] = useState(["BRL", "USDT"]);
  const [rateByExchanges, setRateByExchanges] = useState([]);
  const [wsClient, setWsClient] = useState(null);
  const [reconnectWs, setReconnectWs] = useState(false);
  const [loading, setLoading] = useState(false);

  const initialWebSocketMessage = {
    type: "hello",
    apikey: coinApiKey,
    heartbeat: false,
    subscribe_data_type: ["trade", "quote"],
    subscribe_filter_exchange_id: selectedExchanges,
    subscribe_filter_asset_id: ["BTC"],
  };

  useEffect(() => {
    setWsClient((current) => {
      console.log(`Current WS connection: ${current}`);
      return new WebSocket(coinApiWsUrl);
    });

    console.log(`WS connection: ${wsClient}`);

    return () => {
      if (wsClient && wsClient.readyState == wsClient.OPEN) {
        wsClient.close();
        setWsClient(null);
      }
    };
  }, [reconnectWs]);

  useEffect(() => {
    console.log("Setting websocket events");
    if (wsClient) {
      wsClient.onopen = () => {
        console.log("WS On Open");
      };

      wsClient.onmessage = (message) => {
        console.log(`New Message Received: ${JSON.stringify(message)}`);
      };

      wsClient.onclose = (event) => {
        console.log(
          `WebSocket Connection Closed: Reason ${JSON.stringify(event)}`
        );
        setReconnectWs((previous) => !previous);
      };

      wsClient.onerror = (error) => {
        console.error(`WebSocket Error: ${error}`);
      };
    }
  }, [wsClient]);

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
  }, [rateByExchanges, selectedExchanges]);

  const sendWsMessage = (message) => {
    if (wsClient.readyState == wsClient.OPEN) {
      console.log(`Sending Subscribe Message: ${JSON.stringify(message)}`);
      wsClient.send(JSON.stringify(message));
    }
  };
  const subscribeCoinApiWs = () => {
    sendWsMessage(initialWebSocketMessage);
  };

  const getExchanges = async () => {
    setLoading(true);
    const response = await coinApi.get("/v1/exchanges");
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
        const response = await coinApi.get(
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
              {selectedExchanges.length < 1 ? "Selecionar Exchanges" : "Exchanges selecionadas"}
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
                disabled={true}
                onClick={() => subscribeCoinApiWs()}
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
