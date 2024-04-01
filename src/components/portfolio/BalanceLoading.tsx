import { FaRegEdit } from "react-icons/fa";
import { Button } from "../ui/button";

export default function BalanceLoading() {
    return (
        <>
            <p className="text font-[500]">Balance</p>            
            <div>
                <p>
                    <span className="text-2xl font-[500]">----.--</span>
                    <span className="text-[10px] text-custom-text">USD</span>
                </p>
                <p>
                    <span className="text-2xl font-[500]">-----.--</span>
                    <span className="text-[10px] text-custom-text">PHP</span>
                </p>
            </div>
            <div>
                <p className="text font-[500] pt-4 pb-1">Total ROI</p>
                <p>
                    <span className="text-2xl font-[500]">----.--</span>
                    <span className="text-[10px] text-custom-text">USD</span>
                </p>
                <p>
                    <span className="text-2xl font-[500]">---,---.--</span>
                    <span className="text-[10px] text-custom-text">PHP</span>
                </p>
            </div>
            <div className="flex flex-row items-center font-[500] pt-4">
                <div className="flex flex-col">
                    <p className="text-sm">$ --.-- /</p>
                    <p className="text-sm">₱ --.--</p>                
                </div>
            </div>
            <Button disabled={true} variant={"ghost"} size={"icon"} className="ms-auto border-none hover:bg-transparent active:bg-transparent">
                    <FaRegEdit className="text-xl" />
            </Button>
        </>
    )
}