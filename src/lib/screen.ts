import blessed from "blessed";

import { setState } from "lib/state";

export const initScreen = () => {
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
    tags: true,
    border: {
      type: "line",
    },
    style: {
      border: {
        fg: "white",
      },
    },
    scrollable: true,
    alwaysScroll: true,
    scrollbar: {
      ch: " ",
      // inverse: true,
    },
    keys: true,
    vi: true,
    mouse: true,
    content: "",
  });

  // Append the output box to the screen
  screen.append(outputBox);

  // Handle Ctrl+C to exit the program gracefully
  screen.key(["C-c"], () => {
    screen.destroy();
    process.exit(0);
  });

  // Render the screen
  screen.render();

  // Exit the program when the screen is destroyed
  screen.on("destroy", () => {
    process.exit(0);
  });

  setState({ screen, outputBox });
};

// export const updateOutputBox = (content: string) => {
//   const { screen, outputBox } = getState();
//   outputBox.setContent(content);
//   screen.render();
//   setState({ screen, outputBox });
// };

// Add an event listener to keep the program running
// process.stdin.resume(); // Keep the Node.js process running
// process.on("SIGINT", () => {
//   console.log("\nReceived Ctrl+C. Exiting...");
//   process.exit(0);
// });
