import { useNavigate } from "react-router-dom"
import { Button } from "../ui/button"
import { usePrevData } from "@/hooks/usePrevData"
import { safeToFixed } from "@/lib/helpers"
import { FaRegEdit } from "react-icons/fa";


export default function BalanceError({exchangeRate}:{exchangeRate:number}) {    
    const navigate =  useNavigate()
    const prevBudget = usePrevData(s => s.prevBudget)
    const prevPortfolio = usePrevData(s => s.prevPortfolio)


    if (prevBudget === null || !prevPortfolio || !exchangeRate) {
        return (
            <>
                <p>something went wrong...</p>
                <Button 
                className="px-0 w-fit text-lg bg-transparent hover:bg-transparent dark:bg-transparent underline" variant={"link"}
                onClick={() => {
                    navigate('/')
                    window.location.reload()
                }}>
                    reload page
                </Button>
            </>
        )
    }

    const total = prevPortfolio.reduce((acc,curr) => acc + curr.totalHoldings , 0)
    const phpTotal = total * exchangeRate
    const budget = prevBudget
    const phpBudget = budget * exchangeRate
    const totalRoi = (prevPortfolio.reduce((acc,curr) =>  acc + curr.trueBudgetPerCoin,0)) * 70
    const phpTotalRoi = totalRoi * exchangeRate

    return (
        <>
            <p className="text font-[500]">Balance</p>
            <div>
                <p>
                    <span className="text-2xl font-[500]">{safeToFixed(total)}</span>
                    <span className="text-[10px] text-custom-text">&nbsp;USD</span>
                </p>
                <p>
                    <span className="text-2xl font-[500]">{safeToFixed(phpTotal)}</span>
                    <span className="text-[10px] text-custom-text">&nbsp;PHP</span>
                </p>
            </div>
            <div>
                    <p className="text font-[500] pt-4 pb-1">Total ROI</p>
                    <p>
                        <span className="text-2xl font-[500]">{safeToFixed(totalRoi)}</span>
                        <span className="text-[10px] text-custom-text">USD</span>
                    </p>
                    <p>
                        <span className="text-2xl font-[500]">{safeToFixed(phpTotalRoi)}</span>
                        <span className="text-[10px] text-custom-text">PHP</span>
                    </p>
                </div>
            
            <div className="flex flex-row items-center font-[500] pt-4">
                <p className="me-4">Your Budget:</p>
                <div className="flex flex-col">
                        <p className="text-sm">$ {safeToFixed(budget)} /</p>
                        <p className="text-sm">₱ {safeToFixed(phpBudget)}</p>                
                </div>
                <Button 
                variant={"ghost"} 
                size={"icon"} 
                className="ms-auto border-none hover:bg-transparent active:bg-transparent" 
                onClick={() => {}}
                disabled={true}
                >
                    <FaRegEdit className="text-xl" />
                </Button>
            </div>                            
            </>
    )
    
}