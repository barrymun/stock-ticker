import { initScreen } from "lib/screen";
import { initProgram } from "lib/program";
import { fetchStocks, scheduleNextRequest } from "lib/request";
import { refreshLayout } from "lib/layout";

const run = async () => {
  initProgram();
  initScreen();

  const stocks = await fetchStocks(true);
  refreshLayout(stocks);
  scheduleNextRequest();
};

run();
