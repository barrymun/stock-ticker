import { initProgram } from "lib/program";
import { initScreen } from "lib/screen";
import { setState } from "lib/state";

const run = () => {
  const program = initProgram();
  const { screen, outputBox } = initScreen();
  setState({ program, screen, outputBox });
};

run();

// Set the output box content
// outputBox.setContent(symbols.join(", "));

// test
// const symbols = ["AAPL", "GOOG"];
// const stocks = await fetchStocks({ symbols });
// console.log({ stocks });
