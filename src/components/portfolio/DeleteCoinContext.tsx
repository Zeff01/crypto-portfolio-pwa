import { FetcherWithComponents } from "react-router-dom";
import {
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

type DeleteCoinContentProps = {
    coinSymbol: string;
    fetcher: FetcherWithComponents<any>;
    handleDelete: () => void;    
}

export default function DeleteCoinContent({coinSymbol, fetcher, handleDelete}:DeleteCoinContentProps) {
    return (
        <AlertDialogContent>
            <AlertDialogHeader>
            <AlertDialogTitle>Delete {coinSymbol}?</AlertDialogTitle>
            <AlertDialogDescription>
                This action cannot be undone. This will delete the coin records from our servers.
            </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
            disabled={fetcher.state === 'submitting'}
            className="disabled:opacity-60"
            onClick={handleDelete}
            >
                Continue
            </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    )
}