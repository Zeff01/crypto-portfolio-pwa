import Coin from "./Coin";
import { TrendingToken } from "@/types";

type NewCoinProps = {
    trendingTokens: TrendingToken[]
}

export default function NewCoins({trendingTokens}:NewCoinProps) {

    const sortedCoins =  trendingTokens.sort((a,b) => b.id - a.id)

    return  (
        <div className="flex flex-col gap-y-6 py-4">
            <p  className="font-semibold">NEW COINS</p>
            <div className="w-full flex  flex-row overflow-x-scroll gap-x-6 py-2">
                {sortedCoins.map(m =>  (
                    <Coin key={m.id} {...m} />
                ))}
            </div>
        </div>
    )
}
