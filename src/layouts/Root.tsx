import { Outlet } from "react-router-dom";
import ThemeProvider from "./ThemeProvider";

export default function Root() {


    return (
        <ThemeProvider>
            <div className="h-screen">
                <Outlet />
            </div>
        </ThemeProvider>
    )
}