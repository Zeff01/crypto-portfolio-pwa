import { NavLink, Outlet } from "react-router-dom";
import { HiHome } from "react-icons/hi2";
import { FaBriefcase } from "react-icons/fa";
import ThemeToggler from "@/components/common/ThemeToggler";
import Settings from "@/components/common/Settings";

export default function Main() {
    return (
        <div className="h-full w-full pt-16 pb-20">
            <nav className="bg-white z-10 h-12 px-2 py-1 w-full fixed top-0 left-0 flex flex-row justify-between">
                <div className="flex flex-row items-center">
                    <div>
                        <img src="./icon.svg" />
                    </div>
                    <p className="text-xl font-semibold">Crypto Profit</p>
                </div>
                <div className="flex flex-row items-center text-xl gap-x-2">
                    <ThemeToggler />
                    <Settings />

                </div>
            </nav>
            <Outlet />
            <nav className="bg-white h-16 z-10 fixed bottom-0 left-0 w-full flex flex-row border-t border-gray-200 py-2">
                <NavLink to="" className="basis-1/2 flex flex-col gap-y-1 items-center justify-center">
                    <div>
                        <HiHome />
                    </div>
                    <p>Home</p>
                </NavLink>
                <NavLink to="portfolio" className="basis-1/2 flex flex-col gap-y-1 items-center justify-center">
                    <div>
                        <FaBriefcase />
                    </div>
                    <p>Portfolio</p>
                </NavLink>
            </nav>
        </div>
    )
}