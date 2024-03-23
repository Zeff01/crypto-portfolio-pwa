
export default function Latest() {
    return (
        <div className="w-full flex flex-row flex-wrap py-3">
            <div className="basis-1/2  pe-3 pb-3">
                <div className="bg-custom-white dark:bg-custom-darkbackground h-[123px] rounded-lg shadow-md p-4 flex flex-col justify-between border border-transparent dark:border-gray-700">
                    <div className="flex flex-col gap-y-2">
                        <p className="text-custom-text  font-[500] text-sm">Market Cap</p>
                        <p>
                            <span className="font-semibold text-2xl">2.76T</span>
                            <span className="text-custom-text  font-[500] text-[10px]">USD</span>
                        </p>
                    </div>
                    <div>
                        <p className="font-semibold text-right text-sm text-custom-teal">2.18%</p>
                    </div>
                </div>
            </div>
            <div className="basis-1/2  pe-3 pb-3">
                <div className="bg-custom-white dark:bg-custom-darkbackground h-[123px] rounded-lg shadow-md p-4 flex flex-col justify-between border border-transparent dark:border-gray-700">
                    <div className="flex flex-col gap-y-2">
                        <p className="text-custom-text  font-[500] text-sm">BTC Dominance</p>
                        <p className="font-semibold text-2xl">52.14%</p>
                    </div>
                    <div>
                        <p className="font-semibold text-right text-sm text-custom-destructive">-0.35%</p>
                    </div>
                </div>
            </div>
            <div className="basis-1/2  pe-3 pb-3">
                <div className="bg-custom-white dark:bg-custom-darkbackground h-[123px] rounded-lg shadow-md p-4 flex flex-col justify-between border border-transparent dark:border-gray-700">
                    <div className="flex flex-col gap-y-2">
                        <p className="text-custom-text  font-[500] text-sm">Volume</p>
                        <p>
                            <span className="font-semibold text-2xl">161.93B</span>
                            <span className="text-custom-text  font-[500] text-[10px]">USD</span>
                        </p>
                    </div>
                    <div>
                        <p className="font-semibold text-right text-sm text-custom-teal">9.16%</p>
                    </div>
                </div>
            </div>
            <div className="basis-1/2  pe-3 pb-3">
                <div className="bg-custom-white dark:bg-custom-darkbackground h-[123px] rounded-lg shadow-md p-4 flex flex-col justify-between border border-transparent dark:border-gray-700">
                    <div className="flex flex-col gap-y-2">
                        <p className="text-custom-text  font-[500] text-sm">Fear % Greed</p>
                        <p className="font-semibold text-2xl">52.14%</p>
                    </div>
                </div>
            </div>               
        </div>
    )
}