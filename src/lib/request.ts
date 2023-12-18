import { refreshLayout } from "lib/layout";
import { getState } from "lib/state";
import { sparkApiRequestHeaders } from "utils/config";
import { generateSparkApiUrl, readDataFromFile, saveDataToFile } from "utils/helpers";
import { FetchStocksJsonResponse, FetchStocksResponse } from "utils/types";

export const fetchStocks = async (): Promise<FetchStocksResponse[] | null> => {
  const { useSavedDataMode } = getState();
  if (useSavedDataMode) {
    const data = readDataFromFile();
    if (data) {
      return data;
    }
  }

  const { symbols } = getState();
  const url = generateSparkApiUrl(symbols);
  try {
    const res = await fetch(url, {
      headers: sparkApiRequestHeaders,
      referrerPolicy: "strict-origin-when-cross-origin",
      body: null,
      method: "GET",
      cache: "no-cache",
    });
    const data = ((await res.json()) as unknown as FetchStocksJsonResponse).spark.result;
    if (useSavedDataMode) {
      saveDataToFile(data);
    }
    return data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const scheduleNextRequest = async () => {
  // Calculate a random jitter value between -3 and 3 seconds (plus or minus 10%)
  const jitter = (Math.random() * 6 - 3) * 1000; // 1000 milliseconds = 1 second

  // Calculate the next request time (30 seconds +/- jitter)
  const nextRequestTime = 30000 + jitter; // 30,000 milliseconds = 30 seconds

  // Schedule the next API request
  setTimeout(async () => {
    // Fetch the stocks
    const stocks = await fetchStocks();
    refreshLayout(stocks);

    scheduleNextRequest(); // Schedule the next request after completing this one
  }, nextRequestTime);
};
