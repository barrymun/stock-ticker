import { sparkApiRequestHeaders } from "utils/config";
import { generateSparkApiUrl } from "utils/helpers";
import { FetchStocksJsonResponse, FetchStocksResponse } from "utils/types";

export const fetchStocks = async ({ symbols }: { symbols: string[] }): Promise<FetchStocksResponse[] | null> => {
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
