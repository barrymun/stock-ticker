import figlet from "figlet";

/* eslint-disable max-len */
export const sparkApiUrl: string = "https://query1.finance.yahoo.com/v7/finance/spark";
export const sparkApiRequestHeaders: Record<string, string> = {
  accept:
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
  "accept-language": "en-GB,en-US;q=0.9,en;q=0.8",
  "cache-control": "max-age=0",
  "sec-ch-ua": '"Google Chrome";v="119", "Chromium";v="119", "Not?A_Brand";v="24"',
  "sec-ch-ua-mobile": "?0",
  "sec-ch-ua-platform": '"macOS"',
  "sec-fetch-dest": "document",
  "sec-fetch-mode": "navigate",
  "sec-fetch-site": "none",
  "sec-fetch-user": "?1",
  "upgrade-insecure-requests": "1",
  cookie:
    "A3=d=AQABBMEh2mQCEF-Bdf-pEVYarsyKHX-P0ZUFEgEBAQFz22TkZAAAAAAA_eMAAA&S=AQAAAh07HnJ95bBRdTbLrayts9U; A1=d=AQABBMEh2mQCEF-Bdf-pEVYarsyKHX-P0ZUFEgEBAQFz22TkZAAAAAAA_eMAAA&S=AQAAAh07HnJ95bBRdTbLrayts9U; A1S=d=AQABBMEh2mQCEF-Bdf-pEVYarsyKHX-P0ZUFEgEBAQFz22TkZAAAAAAA_eMAAA&S=AQAAAh07HnJ95bBRdTbLrayts9U",
};
export const figletTitle: string = figlet.textSync("Stock Ticker");
