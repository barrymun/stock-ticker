import { describe, it, expect } from "bun:test";

import { fetchStocks } from "lib/request";

describe("Fetch stocks", () => {
  it("should fetch stocks", async () => {
    const stocks = await fetchStocks();
    expect(stocks).not.toBe(null);
  });
});
