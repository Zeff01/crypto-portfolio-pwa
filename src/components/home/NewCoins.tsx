import Coin from "./Coin";
import { TrendingToken } from "@/types";
import CoinLoading from "./CoinLoading";
import { Await, useLoaderData } from "react-router-dom";
import { Suspense } from "react";

const loadingArr = Array.from({length:10})

export default function NewCoins() {
    const { trendingTokens} = useLoaderData() as {trendingTokens:Promise<any>}

    return  (
        <div>
            <p  className="font-semibold">NEW COINS</p>
            <div className="w-full flex  flex-row overflow-x-scroll gap-x-6 py-2">
                <Suspense fallback={
                    <>
                    {loadingArr.map((_,i) => {
                        return <CoinLoading key={i} />
                    })}
                    </>
                }>
                    <Await resolve={trendingTokens}>
                        {
                            (res) => {
                                const trendingTokens = res.data as TrendingToken[]
                                const sortedCoins =  trendingTokens.sort((a,b) => b.id - a.id)
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
