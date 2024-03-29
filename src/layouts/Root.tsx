import { Outlet } from "react-router-dom";
import AppLoading from "@/components/common/AppLoading";
import { useAuthContext } from "@/providers/AuthProvider";
import UnpaidModal from "@/components/common/UnpaidModal";
import { Toaster } from "@/components/ui/toaster";

export default function Root() {
    const { appLoading } = useAuthContext()



    return (
        <>
            <UnpaidModal />
            <div className="h-screen">
                {
                    appLoading ?
                    <AppLoading /> :
                    <Outlet />
                }
            </div>
            <Toaster />
        </>
    )
}