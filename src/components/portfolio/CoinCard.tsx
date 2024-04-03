import { IoChevronUp, IoChevronDown } from "react-icons/io5";
import { PortfolioItem } from "@/types";
import { safeToFixed } from "@/lib/helpers";
import { useNavigate, useFetcher } from "react-router-dom";
import { RiDeleteBin2Line } from "react-icons/ri";
import { useExchangeRate } from "@/hooks/useExchangeRate";
import DeleteCoinContent from "./DeleteCoinContent";

import {
    AlertDialog,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface CoinCardProps extends PortfolioItem  {
    index: number
} 



export default function CoinCard( {id, coinId, coinSymbol, currentPrice, priceChangePercentage, index, coinImage, shares}:CoinCardProps) {
    const  navigate = useNavigate()
    const exchangeRate = useExchangeRate(s => s.exchangeRate)

    const fetcher = useFetcher()
    const deleteCoin = fetcher.submit

    const total = currentPrice * shares    
    const totalPHP = total * exchangeRate < 1 ? (total * exchangeRate).toFixed(8) : Number(safeToFixed(total * exchangeRate)).toLocaleString()

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
        <div className={`basis-1/2 pb-2 ${index%2===0?"pe-2":""} overflow-x-scroll`}>
            <div 
            className="relative bg-custom-white dark:bg-custom-card rounded-lg shadow-md p-4 pr-1 flex flex-col justify-between font-[500] h-[120px]"
            role="button"
            tabIndex={0}
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    navigate(`${coinId}`)                                        
                }
            }} 
            >
                <div className="flex flex-row items-center gap-x-2 pointer-events-none">
                    <div className="w-[20px] h-[20px] bg-slate-400 shadow-sm rounded-full overflow-hidden">
                        <img src={coinImage} width={20} height={20} />
                    </div>
                    <p className="text-nowrap">{coinSymbol}</p>
                </div>
                <div className="pointer-events-none">
                    <div className="flex flex-row items-end">
                        <p className="flex flex-row items-center">
                            <span className="text-sm">₱ {totalPHP}</span>
                            {/* <span className="text-[10px] font-[400]">&nbsp;PHP</span> */}
                        </p> 
                    </div>
                </div>
                <div className={`${priceChangePercentage < 0 ? "text-custom-destructive": "text-custom-teal"} flex flex-row items-center pointer-events-none`}>
                        {
                            priceChangePercentage < 0 ? 
                            <IoChevronDown /> :
                            <IoChevronUp />
                        }
                        <p>{safeToFixed(priceChangePercentage)}%</p>
                </div>
                
                <AlertDialog>
                    <AlertDialogTrigger> 
                        <span                        
                        role="button"
                        tabIndex={0}
                        className="absolute top-4 right-4 text-custom-destructive dark:opacity-65 text-lg"
                        > 
                            <RiDeleteBin2Line className="pointer-events-none" />
                        </span>
                    </AlertDialogTrigger>
                    <DeleteCoinContent coinSymbol={coinSymbol} fetcher={fetcher} handleDelete={handleDelete} />
                </AlertDialog>
            </div>
        </div>
    )
}