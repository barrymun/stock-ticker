import { describe, it, expect } from "bun:test";

import { fetchStocks } from "lib/request";

describe("Fetch stocks", () => {
  it("should fetch stocks", async () => {
    // TODO: need to handle case when useSavedDataMode is false
    // should be set before executing fetchStocks()
    const stocks = await fetchStocks();
    // then should be unset after executing fetchStocks()
    expect(stocks).not.toBe(null);
  });
});
