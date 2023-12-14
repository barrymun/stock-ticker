import { initScreen } from "lib/screen";
import { initProgram } from "lib/program";
import { scheduleNextRequest } from "lib/request";

const run = async () => {
  initProgram();
  initScreen();

  scheduleNextRequest();
};

run();

// Set the output box content
// outputBox.setContent(symbols.join(", "));

// test
// const symbols = ["AAPL", "GOOG"];
//
// console.log({ stocks });
