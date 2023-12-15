import fs from "fs";
import { round } from "lodash";

import { sparkApiUrl } from "utils/config";
import { FetchStocksResponse, FormattedStock } from "utils/types";

const filePath: string = "output.json";

export const generateSparkApiUrl = (symbols: string[]): string => {
  // join the symbols array into a comma-separated string
  const symbolString = symbols.join(",");

  // construct the URL with the dynamic symbols
  const queryParams = new URLSearchParams({
    symbols: symbolString,
    range: "1d",
    interval: "5m",
    indicators: "close",
    includeTimestamps: "false",
    includePrePost: "false",
    corsDomain: "finance.yahoo.com",
    ".tsrc": "finance",
  });

  return `${sparkApiUrl}?${queryParams.toString()}`;
};

export const formatStocks = (stocks: FetchStocksResponse[]): FormattedStock[] => {
  return stocks.map((stock) => {
    const { symbol, response } = stock;

    // get the latest price
    const latestPrice = response[0].meta.regularMarketPrice;

    // get the previous close
    const previousClose = response[0].meta.chartPreviousClose;

    // get the change in price
    const change = round(latestPrice - previousClose, 2);

    // get the change percentage
    const changePercent = round((change / previousClose) * 100, 4);

    // get the price trend
    const trend = change > 0 ? "▲" : "▼";

    return {
      symbol,
      latestPrice,
      change,
      changePercent,
      trend,
    };
  });
};

export const saveDataToFile = (data: FetchStocksResponse) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log("Data saved to", filePath);
  } catch (error) {
    console.error("Error writing to file:", error);
  }
};

export const readDataFromFile = () => {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    const parsedData = JSON.parse(data);
    console.log(parsedData);
  } catch (error) {
    console.error("Error reading from file:", error);
  }
};
