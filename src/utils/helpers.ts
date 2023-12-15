import fs from "fs";
import { round } from "lodash";

import { sparkApiUrl } from "utils/config";
import { FetchStocksResponse, FormattedStock } from "utils/types";

const filePath: string = "test-data/output.json";

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

export const saveDataToFile = (data: FetchStocksResponse[]) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (error) {
    // no-op
  }
};

export const readDataFromFile = (): FetchStocksResponse[] | null => {
  try {
    const data = fs.readFileSync(filePath, "utf-8");
    const parsedData = JSON.parse(data);
    return parsedData as FetchStocksResponse[];
  } catch (error) {
    return null;
  }
};
