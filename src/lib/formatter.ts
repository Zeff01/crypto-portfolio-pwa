import { PortfolioItem } from "@/types";
import { safeToFixed } from "./helpers";

export const DataToParse : Record<string,string> = {
  currentPrice: "Current Price",
  allTimeHigh: "All Time High",
  allTimeLow: "All Time Low",
  athRoi: "X increase from ATL",
  increaseFromATL: "% Increase from ATL",
  totalHoldings: "Total Holdings",
  trueBudgetPerCoin: "True Budget on this Coin",
  additionalBudget: "Additional Budget Catch Up Bottom",
  mustOwnShares: "Must Own Shares",
  sharesMissing: "Shares Missing",
  projectedRoi: "Projected ROI (70x)",
  marketCap: "Market Cap",
  totalSupply: "Total Supply",
  circulatingSupply: "Circulating Supply",
  maxSupply: "Max Supply",
  tradingVolume: "24h Trading Volume",
};
const formats = {
  isMoneyWithConversion: [
    "allTimeHigh",
    "allTimeLow",
    "totalHoldings",
    "trueBudgetPerCoin",
    "additionalBudget",
    "projectedRoi",
  ],
  isMoney: ["marketCap", "tradingVolume"],
  isBigNums: [
    "totalSupply",
    "circulatingSupply",
    "maxSupply",
    "mustOwnShares",
    "sharesMissing",
  ],
};
export function generateTableData(data: PortfolioItem, dataToParse: typeof DataToParse, exchangeRate: number) {
  const result = [
    // ['', ''],
    // ['Coin Name', data.coinName ?? 'N/A'],
    // ['Coin Description', truncateDescription(data.coinDescription, 15) ?? 'N/A'],
    ["Shares", data.shares],
  ];

  for (const k in dataToParse) {
    if (k === "maxSupply" && data[k] === 0) {
      result.push([dataToParse[k], "Unlimited"]);
      continue;
    } else if (k === "currentPrice") {
      const price = Number(data[k]);
      const item =
        price < 1
          ? price.toFixed(10)
          : Number(price.toFixed(2)).toLocaleString();
      result.push([dataToParse[k], item]);
      continue;
    }

    //@ts-ignore
    const value = data[k] ?? "N/A";
    let item = typeof value === "number" ? safeToFixed(value) : value;

    if (k === "athRoi" && typeof value === "number") {
      item = `${safeToFixed(value)}x`;
    } else if (formats.isMoneyWithConversion.includes(k)) {
      item = `$${Number(item).toLocaleString()}|₱${Number(
        safeToFixed(Number(item) * exchangeRate)
      ).toLocaleString()}`;
    } else if (formats.isMoney.includes(k)) {
      item = `$${Number(item).toLocaleString()}`;
    } else if (formats.isBigNums.includes(k)) {
      item = Number(item).toLocaleString();
    }

    if (isNaN(value)) {
      item = "0";
    }

    result.push([dataToParse[k], item]);
  }
  return result;
}
