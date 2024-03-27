import { Await, useNavigate } from "react-router-dom"
import { useLoaderData } from "react-router-dom"
import { Suspense, useState } from "react"
import { PortfolioItem } from "@/types"
import { generateTableData } from "@/lib/formatter" 
import { DataToParse } from "@/lib/formatter"
import { useExchangeRate } from "@/hooks/useExchangeRate"
import { Button } from "@/components/ui/button"
import { TbArrowBack } from "react-icons/tb";

export default function CoinScreen() {
    const  {portfolioPromise} = useLoaderData() as {portfolioPromise: Promise<any>}
    const exchangeRate = useExchangeRate(s => s.exchangeRate)
    const [descExpanded, setDescExpanded] = useState(false)
    
    const navigate = useNavigate()

    function toggleDescription() {
        setDescExpanded(d => !d)
    }

    return (
        
        <Suspense fallback={
            <div className="px-4 py-6">
                <p>loading...</p>
            </div>
        }>
            <Await resolve={portfolioPromise}>
                {(res) => {
                    const coinData = res.data.data as PortfolioItem

                    const tableData = generateTableData(coinData, DataToParse, exchangeRate)
                    return (
                        <div className="px-4 py-6">
                            <div className="relative flex flex-col items-center gap-y-3">
                                <img src={coinData.coinImage} width={70} height={70} className="rounded-full shadow-lg" />
                                <p className="text-center font-bold text-2xl drop-shadow-sm">{coinData.coinName}</p>
                                <p className="px-4 text-center">
                                    {
                                    descExpanded ?
                                    coinData.coinDescription :
                                    coinData.coinDescription.substring(0, 100) + '...'
                                    }
                                </p>
                                <Button 
                                variant="ghost" 
                                className="text-blue-600 dark:text-blue-300 hover:bg-transparent"
                                onClick={toggleDescription}
                                >                                    
                                    Show More
                                </Button>
                                <Button variant={"ghost"} size={"icon"} className="absolute top-0 left-4  hover:bg-transparent shadow-md rounded-full"
                                onClick={() => navigate('..')}
                                >
                                    <TbArrowBack className="text-3xl stroke-custom-black dark:stroke-custom-teal" />
                                </Button>
                            </div>
                            <div className="flex flex-col w-full  py-4 gap-y-4 font-[500]">
                                {tableData.map((r, index) => {
                                    const key =  r[0];
                                    const value = r[1];

                                    if (key === 'Shares') {
                                        return (
                                            <div className="py-2 px-2 flex flex-row justify-between bg-custom-white dark:bg-custom-card rounded-md shadow-md" key={key}>
                                                <p>{key}</p>
                                                <p>{value}</p>
                                            </div>
                                        )
                                    }
                                    return (
                                        <div key={key} className="py-2 px-2 flex flex-row items-center justify-between bg-custom-white dark:bg-custom-card rounded-md shadow-md">
                                            <p className="basis-[40%]">{key}</p>
                                            {
                                                typeof value === 'string' && value.includes('|') ?
                                                <p className="flex flex-col">
                                                    {value.split('|').map((item,idx) => {
                                                        return (
                                                            <span key={idx} className="text-right">{item}</span>
                                                        )
                                                    })}
                                                </p> :
                                                <p>{value}</p>
                                            }

                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                }}
            </Await>
        
        </Suspense>
    )
}