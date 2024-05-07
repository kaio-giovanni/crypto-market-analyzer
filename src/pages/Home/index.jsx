import React, { useEffect, useState } from "react";
import { Button, Tooltip } from "@material-tailwind/react";
import { v4 as uuid } from "uuid";
import { toast, ToastContainer } from "react-toastify";
import NavbarMenu from "../../components/NavbarMenu";
import Private from "../../components/Private";
import Loading from "../../components/Loading";
import DefaultCard from "../../components/Card";
import MultiSelect from "../../components/MultiSelect";
import Footer from "../../components/Footer";
import { binanceApi } from "../../services/http_client";
import { binanceApiWsBaseUrl } from "../../utils/dotenv";
import CoinIcon from "../../assets/bitcoin.jpg";

const Home = () => {
  const [exchanges] = useState(["BINANCE", "MERCADO BITCOIN"]);
  const [selectedExchanges, setSelectedExchanges] = useState(exchanges);
  const [selectedCrypto, setSelectedCrypto] = useState(["BRL", "USDT"]);
  const [binanceSymbols, setBinanceSymbols] = useState([]);
  const [binanceWsClient, setBinanceWsClient] = useState(null);
  const [reconnectBinanceWs, setReconnectBinanceWs] = useState(false);
  const [rateByExchanges, setRateByExchanges] = useState([]);
  const [loading, setLoading] = useState(false);
  const binanceWsId = uuid();

  const getBinancePairs = async () => {
    const response = await binanceApi.get("/api/v3/exchangeInfo");

    const bnbSymbols = response.data.symbols
      .filter((d) => d.status === "TRADING")
      .map(({ baseAsset, quoteAsset, symbol }) => {
        return { baseAsset, quoteAsset, symbol };
      });

    return bnbSymbols;
  };

  const getBinanceTickerPrices = async () => {
    const binanceAssets = await getBinancePairs();
    const response = await binanceApi.get("/api/v3/ticker/24hr");
    for (const {
      symbol,
      lastPrice,
      lastQty,
      bidPrice,
      bidQty,
      askPrice,
      askQty,
      volume,
      quoteVolume,
    } of response.data) {
      let index = binanceAssets.findIndex((item) => item.symbol === symbol);
      if (index !== -1) {
        const assetData = binanceAssets[index];
        binanceAssets[index] = {
          ...assetData,
          lastPrice,
          lastQty,
          bidPrice,
          bidQty,
          askPrice,
          askQty,
          volume,
          quoteVolume,
        };
      }
    }
    return binanceAssets;
  };

  useEffect(() => {
    console.log("Getting Binance pairs and prices");
    setLoading(true);
    getBinanceTickerPrices()
      .then((response) => {
        setBinanceSymbols(response);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    console.log("Setting binance websocket connection");
    setBinanceWsClient(new WebSocket(binanceApiWsBaseUrl));

    return () => {
      if (binanceWsClient && binanceWsClient.readyState == binanceWsClient.OPEN) {
        binanceWsClient.close();
        setBinanceWsClient(null);
      }
    };
  }, [reconnectBinanceWs]);

  useEffect(() => {
    console.log("Setting binanceWsClient callback functions");
    if (binanceWsClient) {
      binanceWsClient.onopen = () => {
        toast.success("The Binance WebSocket connection has been opened successfully", {
          position: "top-right",
          toastId: uuid(),
        });
        binanceWsClient.send(
          JSON.stringify({
            method: "SUBSCRIBE",
            params: ["!ticker@arr"],
            id: binanceWsId,
          }),
        );
      };

      binanceWsClient.onmessage = (message) => {
        console.log(`New Message Received: ${JSON.stringify(message)}`);
        const { s: symbol, b: bidPrice, B: bidQty, a: askPrice, A: askQty } = message;
        if (symbol && bidPrice && askPrice) {
          toast.info(`Updating price to Binance symbol ${symbol}`, {
            position: "top-left",
            toastId: uuid(),
          });
          const binanceAssets = binanceSymbols;
          const index = binanceAssets.findIndex((item) => item.symbol === symbol);
          const assetData = binanceAssets[index];
          binanceAssets[index] = { ...assetData, bidPrice, bidQty, askPrice, askQty };
          setBinanceSymbols(binanceAssets);
        }
      };

      binanceWsClient.onclose = (event) => {
        toast.error("Binance websocket connection closed!", {
          position: "top-right",
          toastId: uuid(),
        });
        setReconnectBinanceWs((previous) => !previous);
      };

      binanceWsClient.onerror = (error) => {
        toast.error("Binance Websocket connection error", {
          position: "top-right",
          toastId: uuid(),
        });
      };
    }
  }, [binanceWsClient]);

  useEffect(() => {
    console.log("Updating prices...");
  }, [rateByExchanges, selectedExchanges]);

  return (
    <Private>
      <NavbarMenu />
      {loading ? (
        <Loading type="green-400" />
      ) : (
        <div className="min-h-screen">
          <div className="w-full px-4 mt-2">
            <h1 className="text-indigo-800 font-sans font-bold">
              {selectedExchanges.length < 1 ? "Select Exchanges" : "Selected Exchanges"}
            </h1>
          </div>
          <div className="w-full px-2 mb-2">
            <MultiSelect
              options={exchanges}
              selectedItems={selectedExchanges}
              setSelectedItems={setSelectedExchanges}
              inputPlaceHolder="Exchange list"
            />
          </div>
          <div className="w-full h-14 p-2 flex flex-wrap">
            <div className="ml-auto">
              <Tooltip
                content="Button disabled at the moment"
                placement="left"
                animate={{
                  mount: { scale: 1, x: 0 },
                  unmount: { scale: 0, x: 25 },
                }}
              >
                <div>
                  <Button
                    disabled={true}
                    variant="outlined"
                    className="flex items-center justify-center bg-indigo-900 w-full hover:bg-midnight text-white"
                  >
                    Apply
                  </Button>
                </div>
              </Tooltip>
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
      <ToastContainer />
    </Private>
  );
};

export default Home;
