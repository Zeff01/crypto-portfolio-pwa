import { FaRegEdit } from "react-icons/fa";

export default function Balance() {
    return (
        <div className=" bg-custom-white shadow-lg w-full flex flex-col justify-between h-[220px] py-8 px-6 rounded-lg">
            <p className="text font-[500]">Balance</p>
            <div>
                <p>
                    <span className="text-2xl font-[500]">1000.00</span><span className="text-[10px] text-custom-text">USD</span>
                </p>
                <p>
                    <span className="text-2xl font-[500]">50000.00</span><span className="text-[10px] text-custom-text">PHP</span>
                </p>
            </div>
            <div className="flex flex-row items-center font-[500]">
                <p className="me-4">Your Budget:</p>
                <div className="flex flex-row">
                    <p>$ 0.00</p>
                    <p>/</p>
                    <p>₱ 0.00</p>                
                </div>
                <div className="ms-auto">
                    <FaRegEdit />
                </div>
            </div>
        </div>
    )
}