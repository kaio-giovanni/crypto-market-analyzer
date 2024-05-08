import { mbApi } from "./http_client";
export const getMBSymbols = async () => {
  try {
    const { data: response } = await mbApi.get("/api/v4/symbols");
    const symbols = response.symbol;
    const baseAssets = response["base-currency"];
    const quoteAssets = response.currency;
    const validIndexes = response["exchange-traded"]
      .map((item, index) => (item ? `${index}` : false))
      .filter((item) => item);
    return validIndexes.map((value) => {
      return {
        symbol: symbols[parseInt(value)],
        baseAsset: baseAssets[parseInt(value)],
        quoteAsset: quoteAssets[parseInt(value)],
      };
    });
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getMBTickerPrice = async () => {
  const mbSymbols = await getMBSymbols();
  const mbTickerPrices = [];
  for (let item of mbSymbols) {
    let { symbol } = item;
    mbApi
      .get(`/api/v4/${symbol}/orderbook`)
      .then((response) => {
        let { asks, bids } = response.data;
        let askPrice = null,
          askVolume = null;
        let bidPrice = null,
          bidVolume = null;

        if (asks && asks[0]) {
          askPrice = asks[0][0];
          askVolume = asks[0][1];
        }

        if (bids && bids[0]) {
          bidPrice = bids[0][0];
          bidVolume = bids[0][1];
        }
        mbTickerPrices.push({ ...item, askPrice, askVolume, bidPrice, bidVolume });
      })
      .catch((err) => {
        console.error(err);
      });
  }
  return mbTickerPrices;
};
