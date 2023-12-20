import { Command } from "commander";

import { setState } from "lib/state";
import { figletTitle } from "utils/config";

export const initProgram = () => {
  const program = new Command();

  program
    .version("1.0.0")
    .description(figletTitle)
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

  setState({ program, symbols });
};
