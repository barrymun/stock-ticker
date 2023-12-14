import blessed from "blessed";
import { Command } from "commander";

export interface FetchStocksJsonResponse {
  spark: {
    result: FetchStocksResponse[];
    error: unknown | null;
  };
}

export interface FetchStocksResponse {
  symbol: string;
  response: unknown[];
}

export interface State {
  program: Command;
  screen: blessed.Widgets.Screen;
  outputBox: blessed.Widgets.BoxElement;
}
