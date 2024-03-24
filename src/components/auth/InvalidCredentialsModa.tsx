import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ForwardedRef, forwardRef } from "react"

  
export default forwardRef(function InvalidCredentialsModal({className}:{className?:string},ref?:ForwardedRef<HTMLButtonElement>) {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild   ref={ref}>
                <Button 
                variant="outline" 
                className={cn(className)}
                >
                    Show Dialog
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-custom-white dark:bg-custom-black">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-base font-[500] text-custom-destructive text-left">Login Failed</AlertDialogTitle>
                    <AlertDialogDescription   className="text-[#454545] dark:text-custom-text font-[500] text-left pt-2 ps-6">
                        Invalid Login Credentials
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                <AlertDialogAction className="w-fit h-fit self-end bg-transparent dark:bg-transparent text-custom-black dark:text-custom-teal">OK</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
})