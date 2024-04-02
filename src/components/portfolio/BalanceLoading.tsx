import { FaRegEdit } from "react-icons/fa";
import { Button } from "../ui/button";
import { PortfolioItem } from "@/types";
import { safeToFixed } from "@/lib/helpers";

type BalanceLoadingProps = {
    prevBudget:null|number;
    prevPortfolio:null|PortfolioItem[];
    exchangeRate: null|number;
}

export default function BalanceLoading({prevBudget, prevPortfolio, exchangeRate}:BalanceLoadingProps) {
    if (prevBudget === null || prevPortfolio === null || exchangeRate === null) {
        console.log({prevBudget, prevPortfolio, exchangeRate})
        return (
            <>
                <p className="text font-[500]">Balance</p>            
                <div>
                    <p>
                        <span className="text-2xl font-[500]">----.--</span>
                        <span className="text-[10px] text-custom-text">USD</span>
                    </p>
                    <p>
                        <span className="text-2xl font-[500]">-----.--</span>
                        <span className="text-[10px] text-custom-text">PHP</span>
                    </p>
                </div>
                <div>
                    <p className="text font-[500] pt-4 pb-1">Total ROI</p>
                    <p>
                        <span className="text-2xl font-[500]">----.--</span>
                        <span className="text-[10px] text-custom-text">USD</span>
                    </p>
                    <p>
                        <span className="text-2xl font-[500]">---,---.--</span>
                        <span className="text-[10px] text-custom-text">PHP</span>
                    </p>
                </div>
                <div className="flex flex-row items-center font-[500] pt-4">
                    <div className="flex flex-col">
                        <p className="text-sm">$ --.-- /</p>
                        <p className="text-sm">₱ --.--</p>                
                    </div>
                </div>
                <Button disabled={true} variant={"ghost"} size={"icon"} className="ms-auto border-none hover:bg-transparent active:bg-transparent">
                        <FaRegEdit className="text-xl" />
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