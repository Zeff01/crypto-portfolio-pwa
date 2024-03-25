import { TrendingToken } from "@/types";
import Coin from "./Coin";

type TrendingProps = {
    trendingTokens: TrendingToken[]
}

export default function Trending({trendingTokens}:TrendingProps) {    

    
    return  (
        <div>
            <p  className="font-semibold">TRENDING COINS</p>
            <div className="w-full flex  flex-row overflow-x-scroll gap-x-6 py-2">
                {trendingTokens.map(m =>  (
                    <Coin {...m} key={m.id} />
                ))}
            </div>
        </div>
    )
}
