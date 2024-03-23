
import { FaPlus } from "react-icons/fa6";
import { Button } from "../ui/button";

export default function Controls() {
    return (
        <div className="flex flex-row justify-end gap-x-2">
            <Button variant={"ghost"} size={"icon"} className="scale-125 translate-x-2">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="16" height="7" rx="2" fill="#1E1E1E"/>
                    <rect y="9" width="16" height="7" rx="2" fill="#1E1E1E"/>
                </svg>
            </Button>
            <Button variant={"ghost"} size={"icon"} className="scale-125">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="7" height="7" rx="2" fill="#1E1E1E"/>
                    <rect x="9" width="7" height="7" rx="2" fill="#1E1E1E"/>
                    <rect y="9" width="7" height="7" rx="2" fill="#1E1E1E"/>
                    <rect x="9" y="9" width="7" height="7" rx="2" fill="#1E1E1E"/>
                </svg>
            </Button>
            <Button className="gap-x-1 rounded-full px-4">
                <FaPlus className="fill-custom-teal" />
                <p className="text-sm font-[500]">Add</p>
            </Button>
        </div>
)
}