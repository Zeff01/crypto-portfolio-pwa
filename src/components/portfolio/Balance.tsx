import { FaRegEdit } from "react-icons/fa";

export default function Balance() {
    return (
        <div className="font-semibold bg-white shadow-lg w-full flex flex-col justify-between h-[300px] py-12 px-8">
            <p className="text-lg">Balance</p>
            <div>
                <p>
                    <span>1000.00</span><span>USD</span>
                </p>
                <p>
                    <span>50000.00</span><span>PHP</span>
                </p>
            </div>
            <div className="flex flex-row items-center">
                <p>Your Budget:</p>
                <div className="flex flex-row">
                    <p>$ 0.00</p>
                    <p>/</p>
                    <p>₱ 0.00</p>                
                </div>
                <div>
                    <FaRegEdit />
                </div>
            </div>
        </div>
    )
}