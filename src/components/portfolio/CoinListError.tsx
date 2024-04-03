import { useNavigate } from "react-router-dom"
import { Button } from "../ui/button"
import { usePrevData } from "@/hooks/usePrevData"
import { useMemo } from "react"
import { cloneDeep } from "lodash"
import CoinCard from "./CoinCard"
import CoinAccordion from "./CoinAccordion"


type CoinListErrorProps = {
    listType: 'card'|'accordion';
    isSorterOpen: boolean;
    sortBy: 'asc'|'desc'

}
export default function CoinListError({listType, isSorterOpen, sortBy}:CoinListErrorProps) {
    const navigate =  useNavigate()
    const prevPortfolio = usePrevData(s => s.prevPortfolio)

    if (!prevPortfolio) {
        return (
            <div className="flex flex-col gap-y-4 px-4 py-6">
                <p>something went wrong...</p>
                <Button 
                className="px-0 w-fit text-lg bg-transparent hover:bg-transparent dark:bg-transparent underline" variant={"link"}
                onClick={() => {
                    navigate('/portfolio')
                    window.location.reload()
                }}>
                    reload
                </Button>
            </div>
        )
    }

    const sortedData = useMemo(() => {
        const clonedSortedData = cloneDeep(prevPortfolio)
        .sort((a,b) => (
            sortBy === 'asc' ? 
            a.priceChangePercentage - b.priceChangePercentage :
            b.priceChangePercentage - a.priceChangePercentage
        ))
        return clonedSortedData
        }, [sortBy, prevPortfolio])

    if (listType === 'card') {
        return (
            <>
                {sortedData.map((p,i) => {
                    return (
                        <CoinCard key={p.id} {...p} index={i} isSorterOpen={isSorterOpen}/> 
                    )
                })}
            </>
        )
    }

    return (
        <>
            {sortedData.map((p,i) => {
                return (
                    <CoinAccordion key={p.id} {...p} index={i} isSorterOpen={isSorterOpen} />    
                )
            })}
        </>
    )
    
}