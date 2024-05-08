import { binanceApi } from "./http_client";

export const getBinanceSymbols = async () => {
  const { data: response } = await binanceApi.get("/api/v3/exchangeInfo");

  const bnbSymbols = response.symbols
    .filter((d) => d.status === "TRADING")
    .map(({ baseAsset, quoteAsset, symbol }) => {
      return { baseAsset, quoteAsset, symbol };
    });

  return bnbSymbols;
};

export const getBinanceTickerPrices = async () => {
  const binanceAssets = await getBinanceSymbols();
  const { data: response } = await binanceApi.get("/api/v3/ticker/24hr");
  for (const { symbol, bidPrice, bidQty, askPrice, askQty, volume, quoteVolume } of response) {
    let index = binanceAssets.findIndex((item) => item.symbol === symbol);
    if (index !== -1) {
      const assetData = binanceAssets[index];
      binanceAssets[index] = {
        ...assetData,
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
