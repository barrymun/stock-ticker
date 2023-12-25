import { describe, it, expect } from "bun:test";
import { fetchStocks } from "lib/request";

import { setState } from "lib/state";
import { readDataFromFile } from "utils/helpers";

const symbols: string[] = ["AAPL", "TSLA", "AMZN", "GOOG", "MSFT", "FB", "NVDA", "PYPL", "ADBE", "NFLX"];

describe("FetchStocksResponse Interface", () => {
  it("should have the correct keys and data types", async () => {
    let jsonData = readDataFromFile();
    if (!jsonData) {
      // if there is no saved data, then we need to fetch it from the API
      // and save it to the file system
      // ensure to set the useSavedDataMode flag to true, and the symbols
      // as these are required for the fetchStocks function to work
      setState({ useSavedDataMode: true });
      setState({ symbols });
      jsonData = await fetchStocks();
      if (!jsonData) {
        throw new Error("Failed to fetch data from the API");
      }
    }

    const [data] = jsonData;
    expect(data).toHaveProperty("symbol");
    expect(data).toHaveProperty("response");

    // assert data types for specific properties within each item
    expect(typeof data.symbol).toBe("string");
    expect(Array.isArray(data.response)).toBe(true);

    data.response.forEach((response) => {
      expect(response).toHaveProperty("meta");
      expect(response).toHaveProperty("timestamp");
      expect(response).toHaveProperty("indicators");

      expect(Array.isArray(response.timestamp)).toBe(true);
      expect(Array.isArray(response.indicators.quote)).toBe(true);

      expect(response.meta).toHaveProperty("currency");
      expect(response.meta).toHaveProperty("symbol");
      expect(response.meta).toHaveProperty("exchangeName");
      expect(response.meta).toHaveProperty("instrumentType");
      expect(response.meta).toHaveProperty("firstTradeDate");
      expect(response.meta).toHaveProperty("regularMarketTime");
      expect(response.meta).toHaveProperty("gmtoffset");
      expect(response.meta).toHaveProperty("timezone");
      expect(response.meta).toHaveProperty("exchangeTimezoneName");
      expect(response.meta).toHaveProperty("regularMarketPrice");
      expect(response.meta).toHaveProperty("chartPreviousClose");
      expect(response.meta).toHaveProperty("previousClose");
      expect(response.meta).toHaveProperty("scale");
      expect(response.meta).toHaveProperty("priceHint");
      expect(response.meta).toHaveProperty("currentTradingPeriod");
      expect(response.meta).toHaveProperty("tradingPeriods");
      expect(response.meta).toHaveProperty("dataGranularity");
      expect(response.meta).toHaveProperty("range");
      expect(response.meta).toHaveProperty("validRanges");
      expect(response.meta.currentTradingPeriod).toHaveProperty("pre");
      expect(response.meta.currentTradingPeriod).toHaveProperty("regular");
      expect(response.meta.currentTradingPeriod).toHaveProperty("post");
      expect(response.meta.currentTradingPeriod.pre).toHaveProperty("timezone");
      expect(response.meta.currentTradingPeriod.pre).toHaveProperty("start");
      expect(response.meta.currentTradingPeriod.pre).toHaveProperty("end");
      expect(response.meta.currentTradingPeriod.regular).toHaveProperty("timezone");
      expect(response.meta.currentTradingPeriod.regular).toHaveProperty("start");
      expect(response.meta.currentTradingPeriod.regular).toHaveProperty("end");
      expect(response.meta.currentTradingPeriod.post).toHaveProperty("timezone");
      expect(response.meta.currentTradingPeriod.post).toHaveProperty("start");
      expect(response.meta.currentTradingPeriod.post).toHaveProperty("end");

      expect(Array.isArray(response.meta.tradingPeriods)).toBe(true);
      expect(Array.isArray(response.meta.validRanges)).toBe(true);

      expect(typeof response.meta.currency).toBe("string");
      expect(typeof response.meta.symbol).toBe("string");
      expect(typeof response.meta.exchangeName).toBe("string");
      expect(typeof response.meta.instrumentType).toBe("string");
      expect(typeof response.meta.firstTradeDate).toBe("number");
      expect(typeof response.meta.regularMarketTime).toBe("number");
      expect(typeof response.meta.gmtoffset).toBe("number");
      expect(typeof response.meta.timezone).toBe("string");
      expect(typeof response.meta.exchangeTimezoneName).toBe("string");
      expect(typeof response.meta.regularMarketPrice).toBe("number");
      expect(typeof response.meta.chartPreviousClose).toBe("number");
      expect(typeof response.meta.previousClose).toBe("number");
      expect(typeof response.meta.scale).toBe("number");
      expect(typeof response.meta.priceHint).toBe("number");
      expect(typeof response.meta.dataGranularity).toBe("string");
      expect(typeof response.meta.range).toBe("string");
      expect(typeof response.meta.currentTradingPeriod).toBe("object");
      expect(typeof response.meta.tradingPeriods).toBe("object");
      expect(typeof response.meta.validRanges).toBe("object");
      expect(typeof response.meta.currentTradingPeriod.pre).toBe("object");
      expect(typeof response.meta.currentTradingPeriod.regular).toBe("object");
      expect(typeof response.meta.currentTradingPeriod.post).toBe("object");
      expect(typeof response.meta.currentTradingPeriod.pre.timezone).toBe("string");
      expect(typeof response.meta.currentTradingPeriod.pre.start).toBe("number");
      expect(typeof response.meta.currentTradingPeriod.pre.end).toBe("number");
      expect(typeof response.meta.currentTradingPeriod.regular.timezone).toBe("string");
      expect(typeof response.meta.currentTradingPeriod.regular.start).toBe("number");
      expect(typeof response.meta.currentTradingPeriod.regular.end).toBe("number");
      expect(typeof response.meta.currentTradingPeriod.post.timezone).toBe("string");
      expect(typeof response.meta.currentTradingPeriod.post.start).toBe("number");
      expect(typeof response.meta.currentTradingPeriod.post.end).toBe("number");
    });
  });
});
