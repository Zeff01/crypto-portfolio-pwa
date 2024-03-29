import { useAuthContext } from "@/providers/AuthProvider";
import { BsFillExclamationTriangleFill } from "react-icons/bs";
import { TbLogout } from "react-icons/tb";
import { AuthFetch } from "@/queries";
import { useNavigate } from "react-router-dom";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
import { userUserData } from "@/hooks/useUserData";

export default function UnpaidModal() {
    const { showIsPaidModal } = useAuthContext()
    const navigate = useNavigate()
    const remove = userUserData(s => s.remove)

    if (!showIsPaidModal) {
        return null
    }

    async function logout() {
        try {
            const res = await AuthFetch.signout()
            if (res.status === 200) {
                remove()
                navigate('/signin')
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className={`z-[100] fixed top-0 left-0 w-screen h-screen bg-[rgba(0,0,0,0.5)] flex items-center justify-center`}>
            <div className="relative px-4 py-6 bg-custom-white w-[90%] flex flex-col items-center justify-center rounded-lg shadow-lg">
                <div>
                    <BsFillExclamationTriangleFill className="fill-custom-destructive text-5xl" />
                </div>
                <h2 className="font-bold text-lg">Access Denied</h2>
                <div className="pt-4">
                    <p className="text-center font-[500]">Please contact the admin to complete your payment.</p>
                </div>
                <TooltipProvider>
                    <Tooltip>
                    <TooltipTrigger asChild>
                        <div className="absolute top-4 right-4 text-custom-destructive text-2xl"
                        role="button"
                        tabIndex={0}
                        onClick={logout}
                        >
                            <TbLogout />
                        </div>
                    </TooltipTrigger>
                    <TooltipContent>
                    <p>logout</p>
                    </TooltipContent>
                </Tooltip>
                </TooltipProvider>
               
            </div>            
        </div>
    )
}