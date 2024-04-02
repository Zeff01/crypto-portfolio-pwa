import Coin from "./Coin";
import { TrendingToken } from "@/types";
import CoinLoading from "./CoinLoading";
import { Await, useLoaderData } from "react-router-dom";
import { Suspense } from "react";
import { usePrevData } from "@/hooks/usePrevData";
import { cloneDeep } from "lodash";
import CoinError from "./CoinError";

const loadingArr = Array.from({length:10})

export default function NewCoins() {
    const { trendingTokens} = useLoaderData() as {trendingTokens:Promise<any>}
    const prevCoins = usePrevData(s => s.prevCoins)

    return  (
        <div>
            <p  className="font-semibold">NEW COINS</p>
            <div className="w-full flex  flex-row overflow-x-scroll gap-x-6 py-2">
                <Suspense fallback={<NewLoading prevCoins={prevCoins}  />}>
                    <Await resolve={trendingTokens} errorElement={<CoinError type="new" />}>
                        {
                            (res) => {
                                const trendingTokens = res.data as TrendingToken[]
                                const sortedCoins = cloneDeep(trendingTokens).sort((a,b) => b.id - a.id)
                                // no need useEffect here because it is already in Trending.tsx (they using same data)
                                return (
                                    <>
                                        {sortedCoins.map(m => (<Coin {...m} key={m.id} />))}
                                    </>
                                )
                            }
                        }

                    </Await>
                </Suspense>
            </div>
        </div>
    )
}


function NewLoading({prevCoins}:{prevCoins: null|TrendingToken[]}) {
    if (!prevCoins) {
        return (
            <>
            {loadingArr.map((_,i) => {
                return <CoinLoading key={i} />
            })}
            </>
        )
    }
    const sortedCoins =  prevCoins.sort((a,b) => b.id - a.id)
    return (
        <>
            {sortedCoins.map(m => (<Coin {...m} key={m.id} />))}
        </>
    )
}