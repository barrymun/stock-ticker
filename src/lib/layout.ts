import blessed from "blessed";
import figlet from "figlet";

import { getState, setState } from "lib/state";
import { formatStocks } from "utils/helpers";
import { FetchStocksResponse, FormattedStock } from "utils/types";

const title: string = figlet.textSync("Stock Ticker");
const exitMessage: string = "Press Ctrl+C to exit...";

let topOffset: number = 0;

// Function to create a table-like border around a stock entry
const createStockBorder = (stock: FormattedStock) => {
  const box = blessed.box({
    width: "100%-4",
    height: 5, // Adjust the height as needed
    top: topOffset,
    border: "line",
    // content: `
    //   Symbol: ${stock.symbol}
    //   Trend: ${stock.trend}
    //   Latest Price: ${stock.latestPrice}
    //   Change: ${stock.change}
    //   Change Percent: ${stock.changePercent}
    // `,
    content: `${stock.symbol}: ${stock.trend} ${stock.latestPrice} ${stock.change} ${stock.changePercent}`,
    tags: true,
    style: {
      border: {
        fg: "white",
      },
    },
  });
  topOffset += 6;
  return box;
};

export const refreshLayout = (stocks: FetchStocksResponse[] | null) => {
  const { screen, outputBox } = getState();

  // reset the top offset
  topOffset = 0;

  outputBox.append(
    blessed.box({
      width: "100%-4",
      height: 20, // Adjust the height as needed
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

  topOffset += 22;

  const formattedStocks: FormattedStock[] = formatStocks(stocks ?? []);
  formattedStocks.forEach((stock) => {
    const stockBorder = createStockBorder(stock);
    outputBox.append(stockBorder);
  });

  topOffset += 6;

  outputBox.append(
    blessed.box({
      width: "100%-4",
      height: 5, // Adjust the height as needed
      top: topOffset,
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
