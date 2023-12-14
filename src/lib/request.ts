import figlet from "figlet";

import { updateOutputBox } from "lib/screen";
import { getState } from "lib/state";
import { sparkApiRequestHeaders } from "utils/config";
import { formatStocks, generateSparkApiUrl } from "utils/helpers";
import { FetchStocksJsonResponse, FetchStocksResponse } from "utils/types";

export const fetchStocks = async (): Promise<FetchStocksResponse[] | null> => {
  const { symbols } = getState();
  const url = generateSparkApiUrl(symbols);
  try {
    const res = await fetch(url, {
      headers: sparkApiRequestHeaders,
      referrerPolicy: "strict-origin-when-cross-origin",
      body: null,
      method: "GET",
    });
    return ((await res.json()) as unknown as FetchStocksJsonResponse).spark.result;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const scheduleNextRequest = async () => {
  const title: string = figlet.textSync("Stock Ticker");
  const stocks = await fetchStocks();
  const formattedStocks = formatStocks(stocks ?? []);

  updateOutputBox(
    `${title}\n` +
      formattedStocks
        .map((stock) => {
          return `${stock.symbol}: ${stock.trend} ${stock.latestPrice} ${stock.change} ${stock.changePercent}`;
        })
        .join("\n") +
      "\n\n" +
      `Press Ctrl+C to exit...`,
  );

  // Calculate a random jitter value between -3 and 3 seconds (plus or minus 10%)
  const jitter = (Math.random() * 6 - 3) * 1000; // 1000 milliseconds = 1 second

  // Calculate the next request time (30 seconds +/- jitter)
  const nextRequestTime = 30000 + jitter; // 30,000 milliseconds = 30 seconds

  // Schedule the next API request
  setTimeout(() => {
    scheduleNextRequest(); // Schedule the next request after completing this one
  }, nextRequestTime);
};
