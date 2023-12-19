import blessed from "blessed";
import { Command } from "commander";

export interface State {
  useSavedDataMode: boolean;
  program: Command;
  symbols: string[];
  screen: blessed.Widgets.Screen;
  outputBox: blessed.Widgets.BoxElement;
}

export interface FetchStocksJsonResponse {
  spark: {
    result: FetchStocksResponse[];
    error: unknown | null;
  };
}

export interface FetchStocksResponse {
  symbol: string;
  response: {
    meta: {
      currency: string;
      symbol: string;
      exchangeName: string;
      instrumentType: string;
      firstTradeDate: number;
      regularMarketTime: number;
      gmtoffset: number;
      timezone: string;
      exchangeTimezoneName: string;
      regularMarketPrice: number;
      chartPreviousClose: number;
      previousClose: number;
      scale: number;
      priceHint: number;
      currentTradingPeriod: {
        pre: {
          timezone: string;
          start: number;
          end: number;
          gmtoffset: number;
        };
        regular: {
          timezone: string;
          start: number;
          end: number;
          gmtoffset: number;
        };
        post: {
          timezone: string;
          start: number;
          end: number;
          gmtoffset: number;
        };
      };
      tradingPeriods: number[][];
      dataGranularity: string;
      range: string;
      validRanges: string[];
    };
    timestamp: number[];
    indicators: {
      quote: {
        close: number[];
      }[];
    };
  }[];
}

export interface FormattedStock {
  symbol: string;
  latestPrice: number;
  change: number;
  changePercent: number;
  trendDirection: "positive" | "negative";
  trendIcon: "▲" | "▼";
}
