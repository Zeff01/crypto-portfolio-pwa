import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdSettings } from "react-icons/io";
import { MdOutlineHelp,  MdPrivacyTip } from "react-icons/md";
import { LiaSignOutAltSolid } from "react-icons/lia";

import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"

export default function Settings() {
    return (
        <Drawer direction="left">
            <DrawerTrigger>
                <RxHamburgerMenu />
            </DrawerTrigger>
            <DrawerContent className="flex flex-col w-[300px] h-screen rounded-none">
               <div className="px-6 border-b border-custom-text flex flex-col gap-y-2 py-6">
                    <p className="text-sm">Personal Account</p>
                    <div className="w-[70px] aspect-square rounded-full bg-custom-black  flex flex-col items-center justify-center">
                        <p className="text-custom-white font-[500] text-2xl">JS</p>
                    </div>
                    <p className="font-[500] text-2xl">Jzeff Somera</p>
                    <p className="text-custom-text">Jzeff@gmail.com</p>
               </div>
               <div className="px-6 py-12 flex-grow flex flex-col justify-between">
                    <div className="flex flex-col gap-y-4">
                        <div className="flex flex-row gap-x-6 items-center">
                            <div  className="aspect-square rounded-full flex items-center justify-center bg-gray-200 p-2">
                                <IoMdSettings />
                            </div>

                            <p>Settings</p>
                        </div>
                        <div className="flex flex-row gap-x-6 items-center">
                            <div  className="aspect-square rounded-full flex items-center justify-center bg-gray-200 p-2">
                                <MdOutlineHelp />
                            </div>

                            <p>Help</p>
                        </div>
                        <div className="flex flex-row gap-x-6 items-center">
                            <div  className="aspect-square rounded-full flex items-center justify-center bg-gray-200 p-2">
                                <MdPrivacyTip />
                            </div>

                            <p>Privacy And Security</p>
                        </div>
                        <div className="flex flex-row gap-x-6 items-center">
                            <div  className="aspect-square rounded-full flex items-center justify-center bg-gray-200 p-2">
                                <LiaSignOutAltSolid />
                            </div>

                            <p>Sign Out</p>
                        </div>
                    </div>
                    <p className="">Terms and Conditions</p>
               </div>
            </DrawerContent>
        </Drawer>
    )
}