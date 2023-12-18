import blessed from "blessed";
import figlet from "figlet";

import { getState, setState } from "lib/state";
import { formatStocks } from "utils/helpers";
import { FetchStocksResponse, FormattedStock } from "utils/types";

const title: string = figlet.textSync("Stock Ticker");
const exitMessage: string = "Press Ctrl+C to exit...";
const width: string = "100%-2";

let topOffset: number = 0;

// Function to create a table-like border around a stock entry
const createStockBorder = (stock: FormattedStock) => {
  const box = blessed.box({
    width,
    height: 3,
    top: topOffset,
    border: "line",
    content: `${stock.symbol}: ${stock.trend} ${stock.latestPrice} ${stock.change} ${stock.changePercent}`,
    tags: true,
    style: {
      border: {
        fg: "white",
      },
    },
  });
  topOffset += 3;
  return box;
};

const clearOutputBox = () => {
  const { screen, outputBox } = getState();
  outputBox.children.forEach((child) => {
    outputBox.remove(child);
  });
  screen.render();
  setState({ screen, outputBox });
};

export const refreshLayout = (stocks: FetchStocksResponse[] | null) => {
  clearOutputBox();

  const { screen, outputBox } = getState();

  // reset the top offset
  topOffset = 0;

  outputBox.append(
    blessed.box({
      width,
      height: 8,
      top: topOffset,
      border: "line",
      content: title,
      tags: true,
      style: {
        border: {
          fg: "white",
        },
      },
    }),
  );

  topOffset += 8;

  const formattedStocks: FormattedStock[] = formatStocks(stocks ?? []);
  formattedStocks.forEach((stock) => {
    const stockBorder = createStockBorder(stock);
    outputBox.append(stockBorder);
  });

  // add a spacer box to the bottom of the output box (so that the last element is visible when scrolling)
  outputBox.append(
    blessed.box({
      height: 3,
      top: topOffset,
    }),
  );

  // add a box for the exit message
  // attach it to the bottom of the screen as opposed to the outputBox element
  screen.append(
    blessed.box({
      width,
      height: 3,
      bottom: 1,
      left: 1,
      border: "line",
      content: exitMessage,
      tags: true,
      style: {
        border: {
          fg: "white",
        },
      },
    }),
  );

  screen.render();

  setState({ screen, outputBox });
};
