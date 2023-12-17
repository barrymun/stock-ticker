import { initScreen } from "lib/screen";
import { initProgram } from "lib/program";
import { fetchStocks, scheduleNextRequest } from "lib/request";
import { refreshLayout } from "lib/layout";
import { setState } from "lib/state";

/**
 * Initialize the program state
 * Ensure that is is called at the beginning of the program
 * @returns {void}
 */
const initState = (): void => {
  setState({ useSavedDataMode: true });
  initProgram();
  initScreen();
};

const run = async () => {
  initState();

  const stocks = await fetchStocks();
  refreshLayout(stocks);
  scheduleNextRequest();
};

run();
