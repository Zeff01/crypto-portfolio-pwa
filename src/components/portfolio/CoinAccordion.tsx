import { IoChevronUp, IoChevronDown, IoClose , IoChevronForward } from "react-icons/io5";
import { AccordionItem, AccordionTrigger, AccordionContent } from "../ui/accordion";
import { RiCoinLine } from "react-icons/ri";

type CoinType = {
    imageURL: string;
    coinName: string;
    price: number;
    priceChange: number;
    index: number
}

export default function CoinAccordion({imageURL, coinName, price, priceChange, index}:CoinType) {
    return (
        <AccordionItem 
        value={imageURL}
        >
            <AccordionTrigger>
                <div className="w-screen pe-10 font-[500] text-sm"> {/**<--- this styles is needed for horizontal scrollbar when overflowing */}
                    <div className="bg-white dark:bg-custom-card w-full h-full py-4 px-2 flex flex-row gap-x-4 overflow-x-scroll justify-between shadow-md rounded-md">
                        <div className="w-[80px] flex flex-col items-center justify-between">
                            <div className="w-[50px] h-[50px] bg-slate-400 shadow-sm rounded-full">
                            </div>
                            <p className="justify-self-end">{coinName}</p>
                        </div>
                        <div className="flex flex-col justify-between py-3 items-start">
                            <p className="flex flex-row gap-1 items-baseline">
                                <span>{price.toLocaleString()}</span>
                                <span className="text-[10px] text-custom-text">USD</span>
                            </p>
                            <p className="flex flex-row gap-1 items-baseline">
                                <span>{(price*55).toLocaleString()}</span>
                                <span className="text-[10px] text-custom-text">PHP</span>
                            </p>
                        </div>
                        <div className="flex flex-col justify-between py-3 items-end">
                            <p>$ ${100}</p>
                            <div className={`${priceChange < 0 ? "text-custom-destructive": "text-custom-teal"} flex flex-row items-center`}>
                            {
                                priceChange < 0 ? 
                                <IoChevronDown /> :
                                <IoChevronUp />
                            }
                            <p>{priceChange}%</p>
                            </div>
                        </div>
                        <div className="flex flex-col  justify-between gap-y-2">
                            <div role="button" tabIndex={index+1} className="bg-custom-icongray  dark:bg-custom-black rounded-full shadow-sm p-3">
                                <IoClose className="fill-custom-destructive" />
                            </div>
                            <div role="button" tabIndex={index*2} className="bg-custom-icongray  dark:bg-custom-black rounded-full shadow-sm p-3">
                                <IoChevronForward className="stroke-custom-teal" />
                            </div>
                        </div>
                    </div>
                </div>
            </AccordionTrigger>
            <AccordionContent>
                <div className="font-[500] w-full flex flex-col  gap-y-4 bg-custom-white dark:bg-custom-card p-4 rounded-md shadow-lg">
                    <div className="flex flex-row items-center justify-between">
                        <p className="flex flex-row items-center gap-x-4">
                            <span className="bg-opacity-55 bg-gray-300 dark:bg-custom-darkbackground p-2 rounded-full">
                                <RiCoinLine />
                            </span>
                            <span>Shares</span>
                        </p>                        
                        <p>200</p>
                    </div>
                    <div className="flex flex-row items-center justify-between">
                        <p className="flex flex-row items-center gap-x-4">
                            <span className="bg-opacity-55 bg-gray-300 dark:bg-custom-darkbackground p-2 rounded-full">
                                <RiCoinLine />
                            </span>
                            <span>Shares</span>
                        </p>                        
                        <p>200</p>
                    </div>
                    <div className="flex flex-row items-center justify-between">
                        <p className="flex flex-row items-center gap-x-4">
                            <span className="bg-opacity-55 bg-gray-300 dark:bg-custom-darkbackground p-2 rounded-full">
                                <RiCoinLine />
                            </span>
                            <span>Shares</span>
                        </p>                        
                        <p>200</p>
                    </div>
                    <div className="flex flex-row items-center justify-between">
                        <p className="flex flex-row items-center gap-x-4">
                            <span className="bg-opacity-55 bg-gray-300 dark:bg-custom-darkbackground p-2 rounded-full">
                                <RiCoinLine />
                            </span>
                            <span>Shares</span>
                        </p>                        
                        <p>200</p>
                    </div>
                </div>
            </AccordionContent>
        </AccordionItem>
    )
}
