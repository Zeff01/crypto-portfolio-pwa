import { Input } from "@/components/ui/input"
import { CiSearch } from "react-icons/ci";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    // AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { useEffect, useState } from "react";
import { CoinData } from "@/types";
import { CoinFetch, ProfileFetch } from "@/queries";
import { debounce } from 'lodash'
import { getIdFromStorage, getJwtFromStorage } from "@/lib/helpers";
import { useNavigate } from "react-router-dom";
import { safeToFixed } from "@/lib/helpers";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { userUserData } from "@/hooks/useUserData";


export default function Search() {

    const [coinList, setCoinList] = useState<CoinData[]>([])
    const [query, setQuery] = useState('')
    const [selectedCoin, setSelectedCoin] = useState<CoinData|null>(null)
    const [numberOfShares, setNumberOfShares] = useState<number>(0)
    const [loading, setLoading] = useState(false)
    const userData  = userUserData(s => s.userData)
    const navigate = useNavigate()

    const debouncedSearch = debounce(async (query, abort:AbortController) => {
        if (!query) return setCoinList([]);
        try {
            setLoading(true)
            const results = await CoinFetch.searchWithDetails(query, abort);
            const data = results.data as CoinData[]
            setCoinList(data);
        } catch (error) {
            console.error(error);
        } finally {
              setLoading(false);
        }
      }, 500);

      async function addCoin() {
        const id = getIdFromStorage()
        const jwt = getJwtFromStorage()
        if (!id || !jwt || !numberOfShares || !selectedCoin) {
            return null
        }
        try {
            const budgetRes = await ProfileFetch.getBudget(id, jwt)
            const budget = budgetRes.data.budget
            const res = await ProfileFetch.addCoin(id, jwt, {
                selectedCoin,
                numberOfShares,
                budgetPerCoin: budget,
                userId: id
            })
            if (res.status === 201) {                
                navigate('/portfolio')
            }
        } catch (error) {
            console.error(error)
        }
      }

      useEffect(() => {
        const controller = new AbortController()
        debouncedSearch(query, controller);
        return () => {
            setLoading(false);
            controller.abort()
            debouncedSearch.cancel();
        };
      }, [query]);

    
    if (!userData) {
        return null
    }
    
    return (
        <div className="px-4 py-8 pb-12 w-screen h-fit min-h-full bg-custom-background dark:bg-custom-darkbackground">
            <div className="relative w-full h-fit">
                <Input 
                type="text" placeholder="Search a coin..." 
                className="px-6 h-14 rounded-full border border-transparent dark:border-gray-700"
                value={query}
                onChange={(e) => setQuery(e.currentTarget.value)}
                />
                <span className="absolute top-1/2 right-4 -translate-y-1/2 text-2xl">
                    {
                        loading ?
                        <AiOutlineLoading3Quarters className="fill-custom-teal animate-spin" /> :
                        <CiSearch className=" fill-custom-teal" />
                    }

                </span>
            </div>
            <div className="flex-grow flex flex-col pt-12 ps-4 gap-y-4">
                {coinList.map(s => {
                    return (
                        <AlertDialog key={s.id}>
                            <AlertDialogTrigger asChild onClick={() => setSelectedCoin(s)}>
                                <div className="pb-2 border-b border-custom-border flex flex-row gap-x-4 items-center" role="button" tabIndex={2}>
                                    <div className="w-[36px] h-[36px] bg-slate-400 shadow-sm rounded-full overflow-hidden">
                                        <img src={s.logo} width={36} height={36} />
                                    </div>
                                    <p>{s.symbol}</p>
                                    <p className="ms-auto pe-2 font-[500]">{safeToFixed(s.currentPrice)}</p>
                                </div>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="bg-custom-background dark:bg-custom-darkbackground">
                                <AlertDialogHeader>
                                <AlertDialogTitle>{s.name}</AlertDialogTitle>                              
                                </AlertDialogHeader>
                                <div className="relative w-full h-fit">
                                    <Input 
                                    type="number" placeholder="Search..." 
                                    min={0}
                                    className="text-lg px-6 h-16 rounded-full"
                                    value={numberOfShares}
                                    onChange={(e) => setNumberOfShares(Number(e.currentTarget.value))}
                                    
                                    />
                                </div>
                                <AlertDialogFooter className="flex flex-row items-center justify-between font-[500]">
                                <AlertDialogAction className="w-[45%] translate-y-1 rounded-full bg-custom-teal text-custom-black hover:bg-custom-teal shadow-md"
                                onClick={addCoin}
                                >
                                    Continue
                                </AlertDialogAction>
                                <AlertDialogCancel className="w-[45%] rounded-full bg-custom-card text-custom-white dark:bg-custom-card hover:bg-custom-card hover:text-custom-white shadow-md">
                                    Cancel
                                </AlertDialogCancel>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    )
                })}
            </div>
        </div>
    )
}
