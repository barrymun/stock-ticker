import blessed from "blessed";
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

const screen = blessed.screen({
  smartCSR: true,
  title: "Stock Ticker",
});

// Create a Blessed box for displaying output
const outputBox = blessed.box({
  top: "center",
  left: "center",
  width: "100%",
  height: "100%",
  content: "Press Ctrl+C to exit...",
  tags: true,
  border: {
    type: "line",
  },
  style: {
    border: {
      fg: "white",
    },
  },
});

// Set the output box content
outputBox.setContent(symbols.join(", "));

// Append the output box to the screen
screen.append(outputBox);

// Handle Ctrl+C to exit the program gracefully
screen.key(["C-c"], () => {
  screen.destroy();
  process.exit(0);
});

// Render the screen
screen.render();

// Add your program logic here
// For example, you can listen to events, update the outputBox, etc.
// outputBox.setContent('Hello, World!');

// Exit the program when the screen is destroyed
screen.on("destroy", () => {
  process.exit(0);
});

// ===== END =====

// Add an event listener to keep the program running
// process.stdin.resume(); // Keep the Node.js process running
// process.on("SIGINT", () => {
//   console.log("\nReceived Ctrl+C. Exiting...");
//   process.exit(0);
// });

// test
// const symbols = ["AAPL", "GOOG"];
// const stocks = await fetchStocks({ symbols });
// console.log({ stocks });
