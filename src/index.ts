import figlet from "figlet";

import { initScreen, updateOutputBox } from "lib/screen";
import { initProgram } from "lib/program";
import { fetchStocks } from "lib/request";
import { getState } from "lib/state";
import { formatStocks } from "utils/helpers";

const run = async () => {
  initProgram();
  initScreen();

  const { symbols } = getState();
  const title: string = figlet.textSync("Stock Ticker");
  const stocks = await fetchStocks({ symbols });
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
};

run();

// Set the output box content
// outputBox.setContent(symbols.join(", "));

// test
// const symbols = ["AAPL", "GOOG"];
//
// console.log({ stocks });
