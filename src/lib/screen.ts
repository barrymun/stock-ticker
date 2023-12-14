import blessed from "blessed";

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

  return { screen, outputBox };
};

// Add an event listener to keep the program running
// process.stdin.resume(); // Keep the Node.js process running
// process.on("SIGINT", () => {
//   console.log("\nReceived Ctrl+C. Exiting...");
//   process.exit(0);
// });
