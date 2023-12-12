// import { program } from "commander";
import figlet from "figlet";
import { fetchStocks } from "lib/request";

console.log(figlet.textSync("Stock Ticker"));

const symbols = ["AAPL", "GOOG"];

const stocks = await fetchStocks({ symbols });
console.log({ stocks });
