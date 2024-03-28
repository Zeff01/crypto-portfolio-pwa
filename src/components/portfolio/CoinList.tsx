import Controls from "./Controls";
import CoinCard from "./CoinCard";
import { Suspense } from "react";
import CoinAccordion from "./CoinAccordion";
import { Await, useLoaderData } from "react-router-dom";
import { PortfolioItem } from "@/types";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { listTypeStore } from "@/hooks/useListType";

export  default function CoinList() {
    const {portfolioPromise} = useLoaderData() as {portfolioPromise: Promise<any>}
    const listType = listTypeStore(s => s.listType)
    const toggleListType = listTypeStore(s => s.toggleListType)



    return (
        <section className="py-4 flex flex-col gap-y-4">
            <Controls  listType={listType}  toggleListType={toggleListType} />
            { 
            listType === 'card' ? 
            <div className="flex flex-row flex-wrap">
                <Suspense fallback={
                    <div className="h-[100px] w-full flex items-center justify-center">
                        <div className="text-3xl">
                            <AiOutlineLoading3Quarters className="animate-spin" />
                        </div>  
                    </div>
            }
                >
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
                    </Await>
                </Suspense>
            </div> :            
            <div className="w-full">
                <Suspense fallback={
                    <div className="h-[100px] w-full flex items-center justify-center">
                        <div className="text-3xl">
                            <AiOutlineLoading3Quarters className="animate-spin" />
                        </div>  
                    </div>
                }>
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

