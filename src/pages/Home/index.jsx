import React, { useEffect, useState } from "react";
import { Button, Tooltip } from "@material-tailwind/react";
import NavbarMenu from "../../components/NavbarMenu";
import Private from "../../components/Private";
import Loading from "../../components/Loading";
import DefaultCard from "../../components/Card";
import MultiSelect from "../../components/MultiSelect";
import Footer from "../../components/Footer";
import { coinApi } from "../../services/http_requests";
import CoinIcon from "../../assets/bitcoin.jpg";

const Home = () => {
  const [exchanges] = useState(["BINANCE", "MERCADO BITCOIN"]);
  const [selectedExchanges, setSelectedExchanges] = useState(exchanges);
  const [selectedCrypto, setSelectedCrypto] = useState(["BRL", "USDT"]);
  const [rateByExchanges, setRateByExchanges] = useState([]);
  const [loading, setLoading] = useState(false);

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
                  unmount: { scale: 0, x: 25 }
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
    </Private>
  );
};

export default Home;
