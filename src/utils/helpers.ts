import { sparkApiUrl } from "utils/config";

export function generateSparkApiUrl(symbols: string[]): string {
  // join the symbols array into a comma-separated string
  const symbolString = symbols.join(",");

  // construct the URL with the dynamic symbols
  const queryParams = new URLSearchParams({
    symbols: symbolString,
    range: "1d",
    interval: "5m",
    indicators: "close",
    includeTimestamps: "false",
    includePrePost: "false",
    corsDomain: "finance.yahoo.com",
    ".tsrc": "finance",
  });

  return `${sparkApiUrl}?${queryParams.toString()}`;
}
