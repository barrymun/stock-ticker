import { Command } from "commander";
import figlet from "figlet";

// import { fetchStocks } from "lib/request";

const program = new Command();

console.log(figlet.textSync("Stock Ticker"));

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

// Add an event listener to keep the program running
process.stdin.resume(); // Keep the Node.js process running
process.on("SIGINT", () => {
  console.log("\nReceived Ctrl+C. Exiting...");
  process.exit(0);
});

// test
// const symbols = ["AAPL", "GOOG"];
// const stocks = await fetchStocks({ symbols });
// console.log({ stocks });
