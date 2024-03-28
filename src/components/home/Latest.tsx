import { GlobalMetrics } from "@/types"
import { safeToFixed } from "@/lib/helpers";
import { Await, useLoaderData } from "react-router-dom";
import { Suspense } from "react";
import LatestLoading from "./LatestLoading";



export default function Latest() {
    const {globalMetrics} = useLoaderData() as {globalMetrics: Promise<any>}


    

    const formatNumber = (num:number) => {
        if (num > 1e12) {
            return `${safeToFixed(num / 1e12)}T`;
        } else if (num > 1e9) {
            return `${safeToFixed(num / 1e9)}B`;
        } else if (num > 1e6) {
            return `${safeToFixed(num / 1e6)}M`;
        } else {
            return safeToFixed(num);
        }
    };

    return (
        <Suspense fallback={<LatestLoading />}>
            <Await resolve={globalMetrics}>
                {(res) => {
                    const globalMetrics = res.data.data as GlobalMetrics

                    const { total_market_cap, total_volume_24h, total_market_cap_yesterday, total_volume_24h_yesterday } = globalMetrics.quote.USD
                    const {btc_dominance,  btc_dominance_yesterday } = globalMetrics

                    const calculatePercentageChange = (current:number|unknown, previous:number|unknown) => {
                        if (typeof current !== 'number' || typeof previous !== 'number' || previous === 0) {
                            return 'N/A'; // Return 'N/A' or some other placeholder if the calculation cannot be performed
                        }
                        return safeToFixed(((current - previous) / previous) * 100);
                    };

                    // Calculating the percentage changes
                    const marketCapChange = safeToFixed(((total_market_cap - total_market_cap_yesterday) / total_market_cap_yesterday) * 100);
                    const volumeChange = safeToFixed(((total_volume_24h - total_volume_24h_yesterday) / total_volume_24h_yesterday) * 100);
                    const btcDominanceChange = calculatePercentageChange(btc_dominance, btc_dominance_yesterday);

                    return (
                        <div className="w-full flex flex-row flex-wrap py-3">
                            <div className="basis-1/2  pe-3 pb-3">
                                <div className="bg-custom-white dark:bg-custom-darkbackground h-[123px] rounded-lg shadow-md p-4 flex flex-col justify-between border border-transparent dark:border-gray-700">
                                    <div className="flex flex-col gap-y-2">
                                        <p className="text-custom-text  font-[500] text-sm">Market Cap</p>
                                        <p>
                                            <span className="font-semibold text-2xl">{formatNumber(total_market_cap)}&nbsp;</span>
                                            <span className="text-custom-text  font-[500] text-[10px]">USD</span>
                                        </p>
                                    </div>
                                    <div>
                                        <p className={`font-semibold text-right text-sm ${Number(marketCapChange) > 0 ? "text-custom-teal" : "text-custom-destructive"}`}>{marketCapChange}%</p>
                                    </div>
                                </div>
                            </div>
                            <div className="basis-1/2  pb-3">
                                <div className="bg-custom-white dark:bg-custom-darkbackground h-[123px] rounded-lg shadow-md p-4 flex flex-col justify-between border border-transparent dark:border-gray-700">
                                    <div className="flex flex-col gap-y-2">
                                        <p className="text-custom-text  font-[500] text-sm">BTC Dominance</p>
                                        <p className="font-semibold text-2xl">{safeToFixed(btc_dominance)}%</p>
                                    </div>
                                    <div>
                                        <p className={`font-semibold text-right text-sm ${Number(btcDominanceChange) > 0 ? "text-custom-teal" : "text-custom-destructive"}`}>{btcDominanceChange}%</p>
                                    </div>
                                </div>
                            </div>
                            <div className="basis-1/2  pe-3 pb-3">
                                <div className="bg-custom-white dark:bg-custom-darkbackground h-[123px] rounded-lg shadow-md p-4 flex flex-col justify-between border border-transparent dark:border-gray-700">
                                    <div className="flex flex-col gap-y-2">
                                        <p className="text-custom-text  font-[500] text-sm">Volume</p>
                                        <p>
                                            <span className="font-semibold text-2xl">{formatNumber(total_volume_24h)}&nbsp;</span>
                                            <span className="text-custom-text  font-[500] text-[10px]">USD</span>
                                        </p>
                                    </div>
                                    <div>
                                        <p className={`font-semibold text-right text-sm  ${Number(volumeChange) > 0 ? "text-custom-teal" : "text-custom-destructive"}`}>
                                            {volumeChange}%
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="basis-1/2 pb-3">
                                <div className="bg-custom-white dark:bg-custom-darkbackground h-[123px] rounded-lg shadow-md p-4 flex flex-col justify-between border border-transparent dark:border-gray-700">
                                    <div className="flex flex-col gap-y-2">
                                        <p className="text-custom-text  font-[500] text-sm">Fear % Greed</p>
                                        <p className="font-semibold text-2xl">{safeToFixed(btc_dominance)}%</p>
                                    </div>
                                </div>
                            </div>               
                        </div>
                    )
                }}
            </Await>
            
        </Suspense>
        
    )
}