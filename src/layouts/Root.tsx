import { Outlet } from "react-router-dom";
import AppLoading from "@/components/common/AppLoading";
import { useAuthContext } from "@/providers/AuthProvider";

export default function Root() {
    const { appLoading } = useAuthContext()

    return (
        <div className="h-screen">
            {
                appLoading ?
                <AppLoading /> :
                <Outlet />
            }
        </div>
    )
}