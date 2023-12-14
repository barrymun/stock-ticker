import { initProgram, setTitle } from "lib/program";
import { initScreen } from "lib/screen";

const run = () => {
  initProgram();
  initScreen();
  setTitle();
};

run();

// Set the output box content
// outputBox.setContent(symbols.join(", "));

// test
// const symbols = ["AAPL", "GOOG"];
// const stocks = await fetchStocks({ symbols });
// console.log({ stocks });
