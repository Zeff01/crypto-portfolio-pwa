import { useExchangeRate } from "@/hooks/useExchangeRate";
import { FaRegEdit } from "react-icons/fa";
import { Await, useLoaderData } from "react-router-dom";
import { safeToFixed } from "@/lib/helpers";
import { Suspense } from "react";
import { PortfolioItem } from "@/types";

export default function Balance() {
    const {budgetPromise, portfolioPromise} = useLoaderData() as {budgetPromise:Promise<number>; portfolioPromise:Promise<any>}
    const exchangeRate = useExchangeRate(s => s.exchangeRate)




    return (
        <div className=" bg-custom-white dark:bg-custom-darkbackground shadow-lg w-full flex flex-col justify-between py-8 px-6 rounded-lg border border-transparent dark:border-gray-700">
            <p className="text font-[500]">Balance</p>
            <Suspense fallback={
                <div>
                    <p>
                        <span className="text-2xl font-[500]">----.--</span><span className="text-[10px] text-custom-text">USD</span>
                    </p>
                    <p>
                        <span className="text-2xl font-[500]">-----.--</span><span className="text-[10px] text-custom-text">PHP</span>
                    </p>
                </div>
            }>
            <Await resolve={portfolioPromise}>
                {(res) => { 
                    const data : PortfolioItem[] = res.data.data
                    console.log(data, 'portfolio')

                    const total = data.reduce((acc,curr) => acc + curr.totalHoldings , 0)
                    const phpTotal = total * exchangeRate

                    return ( 
                        <div>
                            <p>
                                <span className="text-2xl font-[500]">{safeToFixed(total)}</span><span className="text-[10px] text-custom-text">&nbsp;USD</span>
                            </p>
                            <p>
                                <span className="text-2xl font-[500]"></span>{safeToFixed(phpTotal)}<span className="text-[10px] text-custom-text">&nbsp;PHP</span>
                            </p>
                        </div>
                )}}
            </Await>
            </Suspense>
            <Suspense fallback={
                <div>
                    <p className="text font-[500] pt-4 pb-1">Total ROI</p>
                    <p>
                        <span className="text-2xl font-[500]">----.--</span><span className="text-[10px] text-custom-text">USD</span>
                    </p>
                    <p>
                        <span className="text-2xl font-[500]">---,---.--</span><span className="text-[10px] text-custom-text">PHP</span>
                    </p>
                </div>
            }>
                <Await resolve={portfolioPromise}>
                    {
                        (res) => {
                            const data = res.data.data as PortfolioItem[]
                            const total = (data.reduce((acc,curr) =>  acc + curr.trueBudgetPerCoin,0)) * 70
                            const phpTotal = total * exchangeRate
                            return (
                                <div>
                                    <p className="text font-[500] pt-4 pb-1">Total ROI</p>
                                    <p>
                                        <span className="text-2xl font-[500]">{safeToFixed(total)}</span><span className="text-[10px] text-custom-text">USD</span>
                                    </p>
                                    <p>
                                        <span className="text-2xl font-[500]">{safeToFixed(phpTotal)}</span><span className="text-[10px] text-custom-text">PHP</span>
                                    </p>
                                </div>
                            )
                        }
                        
                    }
                    
                </Await>
            </Suspense>
            <div className="flex flex-row items-center font-[500] pt-4">
                <p className="me-4">Your Budget:</p>
                <Suspense 
                fallback={
                    <div className="flex flex-col">
                        <p className="text-sm">$ --.-- /</p>
                        <p className="text-sm">₱ --.--</p>                
                    </div>
                }
                >
                    <Await resolve={budgetPromise}>
                        {
                            (res) => {
                                const budget = res.data.budget
                                const phpBudget = budget * exchangeRate
                                return (
                                    <div className="flex flex-col">
                                        <p className="text-sm">$ {safeToFixed(budget)} /</p>
                                        <p className="text-sm">₱ {safeToFixed(phpBudget)}</p>                
                                    </div>
                                )
                            }
                        }
                   
                    </Await>
                </Suspense>
                <div className="ms-auto">
                    <FaRegEdit />
                </div>
            </div>
        </div>
    )
}