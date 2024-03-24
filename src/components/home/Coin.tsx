
type TrendingCoinType = {
    imageURL: string;
    coinName: string;
    price: number;
    priceChange: number;
}

export default function Coin({/**imageURL**/ coinName, price, priceChange}:TrendingCoinType) {
    return (
        <div className="bg-custom-white dark:bg-custom-card min-w-[200px] rounded-md shadow-md px-5 py-4 border border-transparent dark:border-gray-700">
            <div className="flex  flex-row gap-x-4 items-center">
                <div className="w-[28px] h-[28px] bg-slate-400 shadow-sm rounded-full">
                </div>
                <div className="font-[500]">
                    <p>{coinName}</p>
                    <p>${price}</p>
                </div>
            </div>
            <div>
                <p className={`${priceChange > 0 ? "text-custom-teal" : "text-custom-destructive"} font-semibold text-sm text-right`}>%{priceChange}(1d)</p>
            </div>
        </div>
    )
}