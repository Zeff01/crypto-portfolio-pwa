import Controls from "./Controls";
import CoinCard from "./CoinCard";
import { Suspense, useEffect, useMemo, useState } from "react";
import CoinAccordion from "./CoinAccordion";
import { Await, useLoaderData } from "react-router-dom";
import { PortfolioItem } from "@/types";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import CoinListError from "./CoinListError";
import { listTypeStore } from "@/hooks/useListType";
import { usePrevData } from "@/hooks/usePrevData";
import { cloneDeep } from "lodash";

export  default function CoinList() {
    const {data} = useLoaderData() as {data: [Promise<any>, Promise<any>],}
    const listType = listTypeStore(s => s.listType)
    const toggleListType = listTypeStore(s => s.toggleListType)
    const prevPortfolio = usePrevData(s => s.prevPortfolio)
    const setPrevPortfolio = usePrevData(s => s.setPrevPortfolio)
    const [sortBy, setSortBy] = useState<'asc'|'desc'>('desc')
    
    {/* NOTE: i need this because for some reason 
    when i click the <Select> element 
    on mobile view it also triggers the 
    onClick method of the card element */}
    const [isSorterOpen, setIsSorterOpen] = useState(false)

    function changeSort(value:'asc'|'desc') {
        setSortBy(value)
    }
    function setSorterStatus(v:boolean) {
        setIsSorterOpen(v)
    }

    return (
        <section className="py-4 flex flex-col gap-y-4">
            <Controls  
            listType={listType}  
            toggleListType={toggleListType} 
            sortBy={sortBy} 
            changeSort={changeSort} 
            setSorterStatus={setSorterStatus}
            />
            <div className={`${listType === "card" ? "flex flex-row flex-wrap" : "w-full"}`}>
                <Suspense fallback={
                    prevPortfolio ?
                    <SortedList sortBy={sortBy} data={prevPortfolio} isSorterOpen={isSorterOpen} type={listType} /> :
                    <div className="h-[100px] w-full flex items-center justify-center">
                        <div className="text-3xl">
                            <AiOutlineLoading3Quarters className="animate-spin" />
                        </div>  
                    </div>
                    
            }
                >
                    <Await resolve={data} errorElement={<CoinListError listType={listType} isSorterOpen={isSorterOpen} sortBy={sortBy} />}>                        
                        {(res) => {
                            const portfolioCoins : PortfolioItem[] = res[1].data.data

                            useEffect(() => {
                                console.log('coinlist prevportfolio effect')
                                setPrevPortfolio(portfolioCoins)
                            }, [portfolioCoins])

                            return (
                                <SortedList sortBy={sortBy} data={portfolioCoins} isSorterOpen={isSorterOpen} type={listType} />
                            )
                        }}
                    </Await>
                </Suspense>
            </div>
        </section>
    )
}


type SortedDataProps =  {
    sortBy:"asc"|"desc", 
    data:PortfolioItem[]; 
    isSorterOpen:boolean;
    type:"card"|"accordion"
}

function SortedList({sortBy, data, isSorterOpen, type}: SortedDataProps) {
    const sortedData = useMemo(() => {
        const clonedSortedData = cloneDeep(data)
        .sort((a,b) => (
            sortBy === 'asc' ? 
            a.priceChangePercentage - b.priceChangePercentage :
            b.priceChangePercentage - a.priceChangePercentage
        ))
        return clonedSortedData
        }, [sortBy, data])

    return (
        <>
        {
            type === "accordion" ?
            sortedData.map((p,i) => {
                return (
                    <CoinAccordion key={p.id} {...p} index={i} isSorterOpen={isSorterOpen} />
                    )
            }) :
            sortedData.map((p,i) => {
                return (
                    <CoinCard key={p.id} {...p} index={i} isSorterOpen={isSorterOpen} />    
                    )
            })
        }
        
        </>
    )
}

