import { Button } from "../ui/button";
import { GoEye } from "react-icons/go";
import { useGlobalTheme } from "@/layouts/ThemeProvider";

export default function ThemeToggler() {
    const { toggleTheme } = useGlobalTheme()


    return (
        <Button 
        variant={"ghost"} 
        size={'icon'} 
        className="p-2 bg-white dark:bg-custom-darkbackground  shadow-md rounded-full"
        onClick={toggleTheme}
        >
            <GoEye />
        </Button>
    )
}