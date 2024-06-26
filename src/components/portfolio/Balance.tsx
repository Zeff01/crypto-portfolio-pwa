import { useExchangeRate } from "@/hooks/useExchangeRate";
import { FaRegEdit, FaCheckCircle } from "react-icons/fa";
import { Await, useLoaderData, useFetcher } from "react-router-dom";
import { safeToFixed } from "@/lib/helpers";
import { Suspense, useEffect, useState } from "react";
import { PortfolioItem } from "@/types";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import BalanceLoading from "./BalanceLoading";
import BalanceError from "./BalanceError";
import { usePrevData } from "@/hooks/usePrevData";

export default function Balance() {
    const {data} = useLoaderData() as {data: [Promise<any>, Promise<any>]}
    const exchangeRate = useExchangeRate(s => s.exchangeRate)

    const fetcher = useFetcher()
    const state = fetcher.state // checks when updating balance
    const changeBalance = fetcher.submit

    const [showBudgetInput, setShowBudgetInput] = useState(false)
    const  [currentBudget, setCurrentBudget] = useState(0) // for input onchange    
    const [isLoading, setIsLoading] = useState(false)

    const prevBudget = usePrevData(s => s.prevBudget)
    const setPrevBudget = usePrevData(s => s.setPrevBudget)
    const prevPortfolio = usePrevData(s => s.prevPortfolio)
    const setPrevPortfolio = usePrevData(s => s.setPrevPortfolio)

    function toggleBudgetInput() {
        setShowBudgetInput(b => !b)
        setIsLoading(false)
    }

    async function handleSubmit() {
        try {
            changeBalance({type: 'change_balance', newBudget: currentBudget}, {
                method: 'PATCH',
                action: ''
            })
        } catch (error) {
            console.error('error changing budget')
        }        
    }

    useEffect(() => {
        console.log('change budget loading useEffect')
        if (state === 'loading') {
            setIsLoading(true)
        }
    }, [state])

    useEffect(() => {
        console.log('isLoading useEffect')
        if (isLoading) {
            toggleBudgetInput()
        }
    }, [isLoading])


    return (
        <div className=" bg-custom-white dark:bg-custom-darkbackground shadow-lg w-full flex flex-col justify-between py-8 px-6 rounded-lg border border-transparent dark:border-gray-700">                            
        <Suspense fallback={<BalanceLoading prevBudget={prevBudget} prevPortfolio={prevPortfolio} exchangeRate={exchangeRate}  />}>
            <Await resolve={data} errorElement={<BalanceError exchangeRate={exchangeRate} />}>
                {(res) => {
                    const [budgeRes,  portfolioRes] = res as [any, any]
                    const data = portfolioRes.data.data as PortfolioItem[];
                    const total = data.reduce((acc,curr) => acc + curr.totalHoldings , 0)
                    const phpTotal = total * exchangeRate
                    const budget = budgeRes.data.budget
                    const phpBudget = budget * exchangeRate
                    const totalRoi = (data.reduce((acc,curr) =>  acc + curr.trueBudgetPerCoin,0)) * 70
                    const phpTotalRoi = totalRoi * exchangeRate
                    // budgetRef.current = budget

                    useEffect(() => {
                        console.log('prev budget effect')
                        setPrevBudget(budget)
                    }, [budget])

                    useEffect(() => {
                        console.log('prev portfolio effect')
                        setPrevPortfolio(data)
                    }, [data])
                    
                    return (
                        <>
                            <p className="text font-[500]">Balance</p>
                            <div>
                                <p>
                                    <span className="text-2xl font-[500]">{Number(safeToFixed(total)).toLocaleString()}</span>
                                    <span className="text-[10px] text-custom-text">&nbsp;USD</span>
                                </p>
                                <p>
                                    <span className="text-2xl font-[500]">{Number(safeToFixed(phpTotal)).toLocaleString()}</span>
                                    <span className="text-[10px] text-custom-text">&nbsp;PHP</span>
                                </p>
                            </div>
                            <div>
                                    <p className="text font-[500] pt-4 pb-1">Total ROI</p>
                                    <p>
                                        <span className="text-2xl font-[500]">{Number(safeToFixed(totalRoi)).toLocaleString()}</span>
                                        <span className="text-[10px] text-custom-text">USD</span>
                                    </p>
                                    <p>
                                        <span className="text-2xl font-[500]">{Number(safeToFixed(phpTotalRoi)).toLocaleString()}</span>
                                        <span className="text-[10px] text-custom-text">PHP</span>
                                    </p>
                                </div>
                            
                            <div className="flex flex-row items-center font-[500] pt-4">
                                <p className="me-2">Your Budget:</p>
                                <div className="flex flex-col">
                                        <p className="text-sm">$ {Number(safeToFixed(budget)).toLocaleString()} /</p>
                                        <p className="text-sm">₱ {Number(safeToFixed(phpBudget)).toLocaleString()}</p>                
                                </div>
                                <Button variant={"ghost"} size={"icon"} className="ms-auto border-none hover:bg-transparent active:bg-transparent" onClick={toggleBudgetInput}>
                                    <FaRegEdit className="text-xl" />
                                </Button>
                            </div>                            
                            </>
                    )
                }}
            </Await>        
        </Suspense>
        {
            showBudgetInput &&
            <div className="pt-4 flex flex-col gap-y-1">
                <p>Enter Budget in (USD)</p>
                <div className="flex flex-row gap-x-2">
                    <Input type="number" min={0} value={currentBudget} onChange={(e) => setCurrentBudget(Number(e.currentTarget.value))}
                    className="bg-transparent dark:bg-transparent w-[200px] border-custom-border"
                    />
                    <Button 
                    type="button"
                    variant={"ghost"} 
                    size={"icon"} 
                    className="border-none hover:bg-transparent active:bg-transparent disabled:opacity-50"
                    disabled={state === 'submitting'}
                    onClick={handleSubmit}
                    >
                        <FaCheckCircle className={`fill-green-600 text-3xl`} />
                    </Button>
                </div>                
            </div>
        }
        </div>
    )
}