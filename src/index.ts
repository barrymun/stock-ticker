import { Command } from "commander";
import figlet from "figlet";

// import { fetchStocks } from "lib/request";

const program = new Command();

console.log(figlet.textSync("Stock Ticker"));

program
  .version("1.0.0")
  .description("description")
  .requiredOption("-s, --symbols <symbols...>", "Space-separated list of stock symbols")
  // .requiredOption('-s, --symbols <symbols>', 'Comma-separated list of stock symbols')
  .parse(process.argv);

const inputSymbols = program.opts().symbols;
console.log(inputSymbols);

// Add an event listener to keep the program running
process.stdin.resume(); // Keep the Node.js process running
process.on("SIGINT", () => {
  console.log("\nReceived Ctrl+C. Exiting...");
  process.exit(0);
});

// if using comma-separated list of symbols
// const symbols: string[] = inputSymbols.split(/[, ]+/).filter(Boolean);
// console.log({ symbols });

// test
// const symbols = ["AAPL", "GOOG"];
// const stocks = await fetchStocks({ symbols });
// console.log({ stocks });
