import { IoChevronUp, IoChevronDown, IoClose , IoChevronForward } from "react-icons/io5";
import { PortfolioItem } from "@/types";
import { safeToFixed } from "@/lib/helpers";
import { useExchangeRate } from "@/hooks/useExchangeRate";
import { useFetcher, useNavigate } from "react-router-dom";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  


interface CoinAccordionProps extends PortfolioItem {
    index: number
}


export default function CoinAccordion({id, coinId, coinImage, coinName, currentPrice, priceChangePercentage, index}:CoinAccordionProps) {
    const exchangeRate = useExchangeRate(s => s.exchangeRate)

    const price = currentPrice < 1 ? currentPrice.toFixed(9) : safeToFixed(currentPrice)    
    const phpCurrentPrice = currentPrice * exchangeRate
    const phpPrice = phpCurrentPrice < 1 ? phpCurrentPrice.toFixed(9) : safeToFixed(phpCurrentPrice)

    const navigate = useNavigate()
    const fetcher = useFetcher()
    const deleteCoin = fetcher.submit
    
    return (
        <div className="pb-4"
        >
            <div>
                <div className="w-screen pe-10 font-[500] text-sm"> {/**<--- this styles is needed for horizontal scrollbar when overflowing */}
                    <div className="bg-white dark:bg-custom-card w-full h-full py-4 px-2 flex flex-row gap-x-4 overflow-x-scroll justify-between shadow-md rounded-md"
                    role="button"
                    tabIndex={index+2}
                    >
                        <div className="w-[80px] flex flex-col items-center justify-between">
                            <div className="w-[50px] h-[50px] bg-slate-400 shadow-sm rounded-full overflow-hidden">
                                <img src={coinImage} width={50} height={50} />
                            </div>
                            <p className="justify-self-end">{coinName}</p>
                        </div>
                        <div className="flex flex-col justify-between py-3 items-start">
                            <p className="flex flex-row gap-1 items-baseline">
                                <span>{Number(price).toLocaleString()}</span>
                                <span className="text-[10px] text-custom-text">USD</span>
                            </p>
                            <p className="flex flex-row gap-1 items-baseline">
                                <span>{Number(phpPrice).toLocaleString()}</span>
                                <span className="text-[10px] text-custom-text">PHP</span>
                            </p>
                        </div>
                        <div className="flex flex-col justify-between py-3 items-end">
                            <p>$ ${100}</p>
                            <div className={`${priceChangePercentage < 0 ? "text-custom-destructive": "text-custom-teal"} flex flex-row items-center`}>
                            {
                                priceChangePercentage < 0 ? 
                                <IoChevronDown /> :
                                <IoChevronUp />
                            }
                            <p>{safeToFixed(priceChangePercentage)}%</p>
                            </div>
                        </div>
                        <div className="flex flex-col  justify-between gap-y-2">
                           
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <div role="button" tabIndex={index+1} className="bg-custom-icongray  dark:bg-custom-black rounded-full shadow-sm p-3">
                                        <IoClose className="fill-custom-destructive" />
                                    </div>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will delete the coin records from our servers.
                                    </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                    disabled={fetcher.state === 'submitting'}
                                    className="disabled:opacity-60"
                                    onClick={() => {
                                        if (fetcher.state === 'idle') {
                                            deleteCoin(
                                                {
                                                    type: 'delete_coin',
                                                    itemId: id
                                                },
                                                {
                                                    method: 'DELETE',
                                                    action: ''   
                                                }

                                            )
                                        }
                                    }}
                                    >
                                        Continue
                                    </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                            <div role="button" tabIndex={index*2} className="bg-custom-icongray  dark:bg-custom-black rounded-full shadow-sm p-3"
                            onClick={() => navigate(`${coinId}`)}
                            >
                                <IoChevronForward className="stroke-custom-teal" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    )
}
