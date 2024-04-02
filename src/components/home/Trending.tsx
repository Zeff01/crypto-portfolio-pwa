import { TrendingToken } from "@/types";
import Coin from "./Coin";
import { Await, useLoaderData } from "react-router-dom";
import CoinLoading from "./CoinLoading";
import { Suspense, useEffect } from "react";
import { usePrevData } from "@/hooks/usePrevData";
import CoinError from "./CoinError";



const loadingArr = Array.from({length:10})

export default function Trending() {    
    const {trendingTokens} = useLoaderData() as {trendingTokens:Promise<any>}
    const prevCoins = usePrevData(s => s.prevCoins)
    const setPrevCoins = usePrevData(s => s.setPrevCoins)
    
    return  (
        <div>
            <p  className="font-semibold">TRENDING COINS</p>
            <div className="w-full flex  flex-row overflow-x-scroll gap-x-6 py-2">
                <Suspense fallback={<TrendingLoading prevCoins={prevCoins} />}>
                    <Await resolve={trendingTokens} errorElement={<CoinError type="trending" />}>
                        {
                            (res) => {
                                const trendingTokens = res.data as TrendingToken[]

                                useEffect(() => {
                                    setPrevCoins(trendingTokens)
                                },[trendingTokens])

                                return (
                                    <>
                                        {trendingTokens.map(m => (<Coin {...m} key={m.id} />))}
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

function TrendingLoading({prevCoins}:{prevCoins: null|TrendingToken[]}) {
    if (!prevCoins) {
        return (
            <>
            {loadingArr.map((_,i) => {
                return <CoinLoading key={i} />
            })}
            </>
        )
    }
    return (
        <>
            {prevCoins.map(m => (<Coin {...m} key={m.id} />))}
        </>
    )
}
