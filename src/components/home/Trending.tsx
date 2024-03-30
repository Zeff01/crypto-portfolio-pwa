import { TrendingToken } from "@/types";
import Coin from "./Coin";
import { Await, useLoaderData } from "react-router-dom";
import CoinLoading from "./CoinLoading";
import { Suspense } from "react";
import HomeErrorElement from "./HomeErrorElement";


const loadingArr = Array.from({length:10})

export default function Trending() {    
    const {trendingTokens} = useLoaderData() as {trendingTokens:Promise<any>}

    
    return  (
        <div>
            <p  className="font-semibold">TRENDING COINS</p>
            <div className="w-full flex  flex-row overflow-x-scroll gap-x-6 py-2">
                <Suspense fallback={
                    <>
                    {loadingArr.map((_,i) => {
                        return <CoinLoading key={i} />
                    })}
                    </>
                }>
                    <Await resolve={trendingTokens} errorElement={<HomeErrorElement type="trending" />}>
                        {
                            (res) => {
                                const trendingTokens = res.data as TrendingToken[]
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
