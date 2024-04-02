import { useNavigate } from "react-router-dom"
import { Button } from "../ui/button"
import { usePrevData } from "@/hooks/usePrevData"
import CoinCard from "./CoinCard"
import CoinAccordion from "./CoinAccordion"

export default function CoinListError({type}:{type:'card'|'accordion'}) {
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

    if (type === 'card') {
        return (
            <>
                {prevPortfolio.map((p,i) => {
                    return (
                        <CoinCard key={p.id} {...p} index={i} />    
                    )
                })}
            </>
        )
    }

    return (
        <>
            {prevPortfolio.map((p,i) => {
                return (
                    <CoinAccordion key={p.id} {...p} index={i} />    
                )
            })}
        </>
    )
    
}