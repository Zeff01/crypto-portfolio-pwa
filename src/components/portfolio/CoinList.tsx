import Controls from "./Controls";
import CoinCard from "./CoinCard";
import { Suspense, useEffect } from "react";
import CoinAccordion from "./CoinAccordion";
import { Await, useLoaderData } from "react-router-dom";
import { PortfolioItem } from "@/types";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import CoinListError from "./CoinListError";
import { listTypeStore } from "@/hooks/useListType";
import { usePrevData } from "@/hooks/usePrevData";

export  default function CoinList() {
    const {data} = useLoaderData() as {data: [Promise<any>, Promise<any>],}
    const listType = listTypeStore(s => s.listType)
    const toggleListType = listTypeStore(s => s.toggleListType)
    const prevPortfolio = usePrevData(s => s.prevPortfolio)
    const setPrevPortfolio = usePrevData(s => s.setPrevPortfolio)


    return (
        <section className="py-4 flex flex-col gap-y-4">
            <Controls  listType={listType}  toggleListType={toggleListType} />
            { 
            listType === 'card' ? 
            <div className="flex flex-row flex-wrap">
                <Suspense fallback={
                    prevPortfolio ?
                    <>
                    {prevPortfolio.map((p,i) => {
                        return (
                            <CoinCard key={p.id} {...p} index={i} />    
                        )
                    })}
                    </> :
                    <div className="h-[100px] w-full flex items-center justify-center">
                        <div className="text-3xl">
                            <AiOutlineLoading3Quarters className="animate-spin" />
                        </div>  
                    </div>
                    
            }
                >
                    <Await resolve={data} errorElement={<CoinListError />}>
                        
                        {(res) => {
                            const portfolioCoins : PortfolioItem[] = res[1].data.data

                            useEffect(() => {
                                console.log('coinlist prevportfolio effect')
                                setPrevPortfolio(portfolioCoins)
                            }, [portfolioCoins])

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
                    prevPortfolio ?
                    <>
                    {prevPortfolio.map((p,i) => {
                        return (
                            <CoinAccordion key={p.id} {...p} index={i} />    
                        )
                    })}
                    </> :
                    <div className="h-[100px] w-full flex items-center justify-center">
                        <div className="text-3xl">
                            <AiOutlineLoading3Quarters className="animate-spin" />
                        </div>  
                    </div>
                }>
                    <Await resolve={data} errorElement={<CoinListError />}>
                    {(res) => {
                            const portfolioCoins : PortfolioItem[] = res[1].data.data
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

