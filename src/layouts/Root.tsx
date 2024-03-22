import { Outlet } from "react-router-dom";

export default function Root() {


    return (
        <div className="px-2 w-screen h-screen">
            <Outlet />
        </div>
    )
}