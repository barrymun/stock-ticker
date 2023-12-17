import { initScreen } from "lib/screen";
import { initProgram } from "lib/program";
import { fetchStocks, scheduleNextRequest } from "lib/request";
import { refreshLayout } from "lib/layout";
import { setState } from "lib/state";

const init = () => {
  setState({ useSavedDataMode: true });
};

const run = async () => {
  init();
  initProgram();
  initScreen();

  const stocks = await fetchStocks();
  refreshLayout(stocks);
  scheduleNextRequest();
};

run();
