import Controls from "./Controls";
import CoinCard from "./CoinCard";
import { Suspense, useState } from "react";
import CoinAccordion from "./CoinAccordion";
import { Await, useLoaderData } from "react-router-dom";
import { PortfolioItem } from "@/types";

export  default function CoinList() {
    const [listType, setListType] = useState<'card'|'accordion'>('card')
    const {portfolioPromise} = useLoaderData() as {portfolioPromise: Promise<any>}

    function toggleListType() {
        setListType(t => t === 'card' ? 'accordion' :  'card')
    }

    return (
        <section className="py-4 flex flex-col gap-y-4">
            <Controls  listType={listType}  toggleListType={toggleListType} />
            { 
            listType === 'card' ? 
            <div className="flex flex-row flex-wrap">
                <Suspense fallback={<p>loading...</p>}>
                    <Await resolve={portfolioPromise}>
                        {(res) => {
                            const portfolioCoins : PortfolioItem[] = res.data.data
                            return (
                                <>
                                {portfolioCoins.map((p,i) => {
                                    return (
                                        <CoinCard key={p.id} {...p} index={i} />    
                                    )
                                })}
                                </>
                            )
                        }}
                {/* {portfolioCoins.map((p,i) => {
                    return (
                        // NOTE: index is used here for padding
                        <CoinCard key={p.imageURL} {...p} index={i} />
                        )
                    })}             */}
                    </Await>
                </Suspense>
            </div> :            
            <div className="w-full">
                <Suspense fallback={<p>loading...</p>}>
                    <Await resolve={portfolioPromise}>
                    {(res) => {
                            const portfolioCoins : PortfolioItem[] = res.data.data
                            return (
                                <>
                                {portfolioCoins.map((p,i) => {
                                    return (
                                        <CoinAccordion key={p.id} {...p} index={i} />    
                                    )
                                })}
                                </>
                            )
                        }}
                    </Await>
                </Suspense>
            </div>
            }
        </section>
    )
}

