
import { FaPlus } from "react-icons/fa6";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

type ControlsProps = {
    listType: 'card'|'accordion';
    toggleListType():void;
}

export default function Controls({listType, toggleListType}:ControlsProps) {
    const navigate = useNavigate()

    return (
        <div className="flex flex-row justify-end gap-x-2">
            {
            listType === 'card' ? 
            <Button 
            variant={"ghost"} 
            size={"icon"} 
            className="dark:hover:bg-custom-card" 
            onClick={toggleListType}
            >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect className="fill-custom-black dark:fill-custom-teal" width="16" height="7" rx="2" fill="#1E1E1E"/>
                    <rect className="fill-custom-black dark:fill-custom-teal" y="9" width="16" height="7" rx="2" fill="#1E1E1E"/>
                </svg>
            </Button> :
            <Button 
            variant={"ghost"} 
            size={"icon"} 
            className=" dark:hover:bg-custom-card" 
            onClick={toggleListType}
            >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect className="fill-custom-black dark:fill-custom-teal" width="7" height="7" rx="2" fill="#1E1E1E"/>
                    <rect className="fill-custom-black dark:fill-custom-teal" x="9" width="7" height="7" rx="2" fill="#1E1E1E"/>
                    <rect className="fill-custom-black dark:fill-custom-teal" y="9" width="7" height="7" rx="2" fill="#1E1E1E"/>
                    <rect className="fill-custom-black dark:fill-custom-teal" x="9" y="9" width="7" height="7" rx="2" fill="#1E1E1E"/>
                </svg>
            </Button>
            }                    
            <Button className="gap-x-1 rounded-full px-4 bg-custom-card hover:bg-custom-card dark:text-custom-white"
            onClick={() => navigate('/search')}
            >
                <FaPlus className="fill-custom-teal" />
                <p className="text-sm font-[500]">Add</p>
            </Button>
        </div>
)
}