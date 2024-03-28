
export default function CoinLoading() {
    return (
        <div className="bg-custom-white dark:bg-custom-card min-w-[200px] rounded-md shadow-md px-5 py-4 border border-transparent dark:border-gray-700">
            <div className="flex  flex-row gap-x-4 items-center">
                <div className="w-[28px] h-[28px] bg-slate-400 shadow-sm rounded-full overflow-hidden">
                </div>
                <div className="font-[500]">
                    <p>...</p>
                    <p>$----.--</p>
                </div>
            </div>
            <div>
                <p className={`text-custom-text font-semibold text-sm text-right`}>
                    --.--% (1d)
                </p>
            </div>
        </div>
    )
}