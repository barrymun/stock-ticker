import figlet from "figlet";

import { initScreen, updateOutputBox } from "lib/screen";
import { initProgram } from "lib/program";
import { fetchStocks } from "lib/request";
import { getState } from "lib/state";

const run = async () => {
  initProgram();
  initScreen();

  const { symbols } = getState();
  const title: string = figlet.textSync("Stock Ticker");
  const stocks = await fetchStocks({ symbols });

  updateOutputBox(`
  ${title}\n
  ${stocks?.map((stock) => `${stock.symbol}: ${stock.response[0]?.meta.regularMarketPrice}`).join("\n")}\n
  Press Ctrl+C to exit...
  `);
};

run();

// Set the output box content
// outputBox.setContent(symbols.join(", "));

// test
// const symbols = ["AAPL", "GOOG"];
//
// console.log({ stocks });
