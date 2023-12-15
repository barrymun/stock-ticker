import figlet from "figlet";

import { updateOutputBox } from "lib/screen";
import { formatStocks } from "utils/helpers";
import { FetchStocksResponse, FormattedStock } from "utils/types";

const title: string = figlet.textSync("Stock Ticker");
const exitMessage: string = "Press Ctrl+C to exit...";

export const refreshLayout = (stocks: FetchStocksResponse[] | null) => {
  const formattedStocks: FormattedStock[] = formatStocks(stocks ?? []);

  updateOutputBox(
    `${title}\n` +
      formattedStocks
        .map((stock) => {
          return `${stock.symbol}: ${stock.trend} ${stock.latestPrice} ${stock.change} ${stock.changePercent}`;
        })
        .join("\n") +
      "\n\n" +
      `${exitMessage}`,
  );
};
