import { NavLink, Outlet } from "react-router-dom";
import { HiHome } from "react-icons/hi2";
import { FaBriefcase } from "react-icons/fa";
import ThemeToggler from "@/components/common/ThemeToggler";
import Settings from "@/components/common/Settings";

export default function Main() {
    return (
        <div className="h-full w-full flex flex-col">
            <nav className="bg-custom-background dark:bg-custom-darkbackground z-10 h-12 px-2 py-8 w-full flex flex-row justify-between shadow-sm">
                <div className="flex flex-row items-center">
                    <div>
                        <img src="./icon.svg" />
                    </div>
                    <p className="text-xl font-[500] text-custom-black dark:text-custom-white">Crypto Profit</p>
                </div>
                <div className="flex flex-row items-center text-xl gap-x-2">
                    <ThemeToggler />
                    <Settings />

                </div>
            </nav>
            <div className="flex-grow overflow-y-scroll overflow-x-hidden bg-custom-background dark:bg-custom-darkbackground">
            <Outlet />
            </div>
            <nav className=" bg-custom-background dark:bg-custom-darkbackground h-16 z-10  w-full flex flex-row border-t border-custom-border py-2">
                <NavLink to="" className={({isActive}) => `${isActive? "text-custom-teal":  ""} basis-1/2 flex flex-col gap-y-1 items-center justify-center`}>
                    <div>
                        <HiHome />
                    </div>
                    <p>Home</p>
                </NavLink>
                <NavLink to="portfolio" className={({isActive}) => `${isActive? "text-custom-teal":  ""} basis-1/2 flex flex-col gap-y-1 items-center justify-center`}>
                    <div>
                        <FaBriefcase />
                    </div>
                    <p>Portfolio</p>
                </NavLink>
            </nav>
        </div>
    )
}