import { Button } from "../ui/button";
import { GoEye } from "react-icons/go";
import { useState, useLayoutEffect } from "react";

export default function ThemeToggler() {

    const [mode, setMode] = useState<"light"|"dark">(localStorage.getItem("mode") as "light"|"dark" ?? "light");

    function toggleMode() {
        setMode(m => m ===  "light" ? "dark" : "light")
    }

    useLayoutEffect(() => {
        if (mode === "dark") {
            document.documentElement.classList.add("dark");
            localStorage.setItem("mode", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("mode", "light");
        }
    }, [mode]);


    return (
        <Button 
        variant={"outline"} 
        size={'icon'} 
        className="p-2 bg-white  shadow-md rounded-full"
        onClick={toggleMode}
        >
            <GoEye />
        </Button>
    )
}