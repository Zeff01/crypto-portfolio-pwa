import { useAuthContext } from "@/providers/AuthProvider";
import { BsFillExclamationTriangleFill } from "react-icons/bs";

export default function UnpaidModal() {
    const { showIsPaidModal } = useAuthContext()

    if (!showIsPaidModal) {
        return null
    }

    return (
        <div className={`z-[100] fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.5)] flex items-center justify-center`}>
            <div className="px-4 py-6 bg-custom-white w-[90%] flex flex-col items-center justify-center rounded-lg shadow-lg">
                <div>
                    <BsFillExclamationTriangleFill className="fill-custom-destructive text-5xl" />
                </div>
                <h2 className="font-bold text-lg">Access Denied</h2>
                <div className="pt-4">
                    <p className="text-center font-[500]">Please contact the admin to complete your payment.</p>
                </div>
            </div>            
        </div>
    )
}