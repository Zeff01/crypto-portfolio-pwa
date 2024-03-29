import { IoChevronUp, IoChevronDown } from "react-icons/io5";
import { PortfolioItem } from "@/types";
import { safeToFixed } from "@/lib/helpers";
import { useNavigate } from "react-router-dom";

interface CoinCardProps extends PortfolioItem  {
    index: number
} 

export default function CoinCard( {coinId, coinName, currentPrice, priceChangePercentage, index, coinImage}:CoinCardProps) {
    const  navigate = useNavigate()

    const price = currentPrice < 1 ? currentPrice.toFixed(8) : Number(safeToFixed(currentPrice)).toLocaleString()

    return (
        <div className={`basis-1/2 pb-2 ${index%2===0?"pe-2":""} overflow-x-scroll`}>
            <div 
            className="bg-custom-white dark:bg-custom-card rounded-lg shadow-md p-4 pr-1 flex flex-col justify-between font-[500] h-[120px]"
            role="button"
            tabIndex={0}
            onClick={() => navigate(`${coinId}`)}            
            >
                <div className="flex flex-row items-center gap-x-2 ">
                    <div className="w-[20px] h-[20px] bg-slate-400 shadow-sm rounded-full overflow-hidden">
                        <img src={coinImage} width={20} height={20} />
                    </div>
                    <p className="text-nowrap">{coinName}</p>
                </div>
                <div>
                    <div className="flex flex-row items-end">
                        <p className="text-[12px]">Price:&nbsp;</p>
                        <p className="flex flex-row items-center">
                            <span className="text-sm">{price}</span>
                            <span className="text-[10px] font-[400]">&nbsp;USD</span>
                        </p> 
                    </div>
                </div>
                <div className={`${priceChangePercentage < 0 ? "text-custom-destructive": "text-custom-teal"} flex flex-row items-center`}>
                        {
                            priceChangePercentage < 0 ? 
                            <IoChevronDown /> :
                            <IoChevronUp />
                        }
                        <p>{safeToFixed(priceChangePercentage)}%</p>
                </div>
            </div>
        </div>
    )
}