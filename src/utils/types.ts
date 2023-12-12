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
