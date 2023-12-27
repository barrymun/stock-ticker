import { beforeAll } from "bun:test";

import { setState } from "lib/state";

const symbols: string[] = ["AAPL", "TSLA", "AMZN", "GOOG", "MSFT", "FB", "NVDA", "PYPL", "ADBE", "NFLX"];

export const setConfig = () => {
  // if there is no saved data, then we need to fetch it from the API
  // and save it to the file system
  // ensure to set the useSavedDataMode flag to true, and the symbols
  // as these are required for the fetchStocks function to work
  setState({ useSavedDataMode: true });
  setState({ symbols });
};

// global setup
beforeAll(() => {
  setConfig();
});
