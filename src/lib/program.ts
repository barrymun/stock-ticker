import { Command } from "commander";
import figlet from "figlet";

import { updateOutputBox } from "lib/screen";
import { setState } from "lib/state";

export const initProgram = () => {
  const program = new Command();

  program
    .version("1.0.0")
    .description("Stock Ticker")
    .requiredOption("-s, --symbols <symbols...>", "A list of stock symbols separated by commas or spaces")
    .parse(process.argv);

  const inputSymbols = program.opts().symbols;

  let symbols: string[] = [];
  try {
    if (inputSymbols && inputSymbols[0].includes(",")) {
      symbols = inputSymbols?.[0].split(",");
    } else {
      symbols = inputSymbols;
    }
  } catch (e) {
    symbols = inputSymbols;
  }
  console.log({ symbols });

  setState({ program });
};

export const setTitle = () => {
  updateOutputBox(figlet.textSync("Stock Ticker"));
};
