import { IoChevronUp, IoChevronDown } from "react-icons/io5";
import { RiDeleteBin2Line } from "react-icons/ri";
import { PortfolioItem } from "@/types";
import { safeToFixed } from "@/lib/helpers";
import { useExchangeRate } from "@/hooks/useExchangeRate";
import { useFetcher, useNavigate } from "react-router-dom";
import DeleteCoinContent from "./DeleteCoinContent";

import {
    AlertDialog,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
  


interface CoinAccordionProps extends PortfolioItem {
    index: number;
    isSorterOpen: boolean;
}


export default function CoinAccordion({
    id, 
    coinId, 
    coinImage, 
    coinSymbol, 
    currentPrice, 
    priceChangePercentage, 
    shares,
    isSorterOpen,
}:CoinAccordionProps) {
    const exchangeRate = useExchangeRate(s => s.exchangeRate)

    const price = currentPrice < 1 ? currentPrice.toFixed(8) : Number(safeToFixed(currentPrice)).toLocaleString()

    const total = currentPrice * shares    
    const totalUSD =  total < 1 ? total.toFixed(8) : Number(safeToFixed(total)).toLocaleString()
    const totalPHP = total * exchangeRate < 1 ? (total * exchangeRate).toFixed(8) : Number(safeToFixed(total * exchangeRate)).toLocaleString()

    // const phpCurrentPrice = currentPrice * exchangeRate
    // const phpPrice = phpCurrentPrice < 1 ? phpCurrentPrice.toFixed(8) : Number(safeToFixed(phpCurrentPrice)).toLocaleString()

    const navigate = useNavigate()
    const fetcher = useFetcher()
    const deleteCoin = fetcher.submit

    function handleDelete() {
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
    }
    
    return (
        <div className="pb-4"
        >
            <div>
                <div className="w-screen pe-8 font-[500] text-sm"> {/**<--- this styles is needed for horizontal scrollbar when overflowing */}
                    <div className={`
                    ${{/**this will prevent the weird behavior on mobile view where when i click the <Select> sorter the click event goes through the card*/}}
                    ${isSorterOpen ? "pointer-events-none" : "pointer-events-auto"}
                    relative bg-white dark:bg-custom-card w-full h-full py-4 px-2 flex flex-row gap-x-2 overflow-x-scroll shadow-md rounded-md
                    `}
                    onClick={(e) => {
                        if (e.currentTarget === e.target) {
                            navigate(`${coinId}`)
                        }
                    }} 
                    >
                        <div className="w-[70px] flex flex-col items-center justify-center gap-y-1 pointer-events-none">
                            <div className="w-[40px] h-[40px] bg-slate-400 shadow-sm rounded-full overflow-hidden">
                                <img src={coinImage} width={40} height={40} />
                            </div>
                            <p className={`justify-self-end ${coinSymbol.length > 10 ? "text-[12px]" : "text-sm"}`}>{coinSymbol}</p>
                        </div>
                        <div className="flex flex-col justify-between py-3 items-start pointer-events-none">
                            <p className="flex flex-row gap-1 items-baseline">
                                <span>{totalUSD}</span>
                                <span className="text-[10px] text-custom-text">USD</span>
                            </p>
                            <p className="flex flex-row gap-1 items-baseline">
                                <span>{totalPHP}</span>
                                <span className="text-[10px] text-custom-text">PHP</span>
                            </p>
                        </div>
                        <div className="ms-auto flex flex-col justify-between py-3 pe-1 items-end pointer-events-none">
                            <p className="text-nowrap">$ {price}</p>
                            <div className={`${priceChangePercentage < 0 ? "text-custom-destructive": "text-custom-teal"} flex flex-row items-center`}>
                            {
                                priceChangePercentage < 0 ? 
                                <IoChevronDown /> :
                                <IoChevronUp />
                            }
                            <p>{safeToFixed(priceChangePercentage)}%</p>
                            </div>
                        </div>
                        <AlertDialog>
                            <AlertDialogTrigger asChild className="absolute top-[2px] right-1 text-md bg-transparent rounded-full shadow-sm p-2">
                                <div role="button" tabIndex={0}>
                                    <RiDeleteBin2Line className="fill-custom-destructive" />
                                </div>
                            </AlertDialogTrigger>
                            <DeleteCoinContent coinSymbol={coinSymbol} fetcher={fetcher} handleDelete={handleDelete} />
                        </AlertDialog>
                    </div>
                </div>
            </div>
            
        </div>
    )
}
