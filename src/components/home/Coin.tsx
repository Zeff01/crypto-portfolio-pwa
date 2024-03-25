import { safeToFixed } from "@/lib/helpers";
import { TrendingToken } from "@/types"


interface CoinProps extends TrendingToken {}

export default function Coin({name, quote}:CoinProps) {
    // if  (!name || !quote || !quote?.USD) {
    //     return null
    // }

    const { price, percent_change_24h } = quote?.USD
    


    return (
        <div className="bg-custom-white dark:bg-custom-card min-w-[200px] rounded-md shadow-md px-5 py-4 border border-transparent dark:border-gray-700">
            <div className="flex  flex-row gap-x-4 items-center">
                <div className="w-[28px] h-[28px] bg-slate-400 shadow-sm rounded-full">
                </div>
                <div className="font-[500]">
                    <p>{name}</p>
                    <p>${safeToFixed(price)}</p>
                </div>
            </div>
            <div>
                <p className={`${percent_change_24h > 0 ? "text-custom-teal" : "text-custom-destructive"} font-semibold text-sm text-right`}>
                    {safeToFixed(percent_change_24h)}% (1d)
                </p>
            </div>
        </div>
    )
}