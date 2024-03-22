import { cn } from "@/lib/utils"
import { HTMLAttributes } from "react"

interface LogoSmallProps extends HTMLAttributes<HTMLOrSVGElement> {}

export default function LogoSmall({className, ...props}:LogoSmallProps) {
    return (
        <svg width="46" height="44" viewBox="0 0 46 44" fill="none" xmlns="http://www.w3.org/2000/svg" className={cn(className)} {...props}>
            <path d="M15 19.522V14.6918L19.9308 17.4591L24.9623 14.6918V19.522L19.9308 22.4403L15 19.522Z" fill="#02F5C3"/>
            <path d="M15 32.7044V21.3333L19.3774 23.7987V35.4717L15 32.7044Z" fill="#02F5C3"/>
            <path d="M25.5157 20.8805L20.6352 23.7987V28.8302L25.5157 26.0126L31 28.8302V23.7987L27.9811 22.1384L28.8868 20.8805L31 22.1384V10.6667L26.4214 8V19.522L25.5157 20.8805Z" fill="#02F5C3"/>
        </svg>
    )
}