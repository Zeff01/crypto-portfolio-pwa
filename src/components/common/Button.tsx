import { Button as UIButton, ButtonProps, buttonVariants } from "../ui/button"
import { forwardRef } from "react"
import { cn } from "@/lib/utils"

interface CustomButtonProps extends ButtonProps {
    loading?:boolean;
    loadingClassName?: string;
}

// use this for buttons with loading
const Button = forwardRef<HTMLButtonElement, CustomButtonProps>(
    ({ loading, loadingClassName, className, variant, size, asChild = false, children, ...props }, ref) => {
      return (
        <UIButton 
        className={cn('relative', buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props} 
        >
            {loading &&
            <span className={cn("absolute z-10 w-[20px] h-[20px] bg-transparent border-t border-l border-custom-teal dark:border-custom-black rounded-full animate-spin", loadingClassName)}> 
            </span>
            }
            {children}
        </UIButton>
      )
    }
  )

export default Button