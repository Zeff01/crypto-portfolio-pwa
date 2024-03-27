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


export default function Search() {

    const [coinList, setCoinList] = useState<CoinData[]>([])
    const [query, setQuery] = useState('')
    const [selectedCoin, setSelectedCoin] = useState<CoinData|null>(null)
    const [numberOfShares, setNumberOfShares] = useState<number>(0)
    const navigate = useNavigate()

    const debouncedSearch = debounce(async (query) => {
        if (!query) return setCoinList([]);
        // setSearchLoading(true);
        try {
          const results = await CoinFetch.searchWithDetails(query);
          const data = results.data as CoinData[]
          setCoinList(data);
        } catch (error) {
          console.error(error);
        } finally {
        //   setSearchLoading(false);
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
                navigate('/profile')
            }
        } catch (error) {
            console.error(error)
        }
      }

      useEffect(() => {
        debouncedSearch(query);
        return () => {
        //   setSearchLoading(false);
          return debouncedSearch.cancel();
        };
      }, [query]);

    

    return (
        <div className="px-4 py-12 w-screen h-fit min-h-full bg-custom-background dark:bg-custom-darkbackground">
            <div className="relative w-full h-fit">
                <Input 
                type="text" placeholder="Search..." 
                className="px-6 h-14 rounded-full border border-transparent dark:border-gray-700"
                value={query}
                onChange={(e) => setQuery(e.currentTarget.value)}
                />
                <CiSearch className="absolute top-1/2 right-4 -translate-y-1/2 text-2xl fill-custom-teal" />
            </div>
            <div className="flex-grow flex flex-col pt-12 ps-4 gap-y-4">
                {coinList.map(s => {
                    return (
                        <AlertDialog key={s.id}>
                            <AlertDialogTrigger asChild onClick={() => setSelectedCoin(s)}>
                                <div className="flex flex-row gap-x-4 items-center" role="button" tabIndex={2}>
                                    <div className="w-[36px] h-[36px] bg-slate-400 shadow-sm rounded-full overflow-hidden">
                                        <img src={s.logo} width={36} height={36} />
                                    </div>
                                    <p>{s.symbol}</p>
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






const searchResults = [
    {
        imageURL: 'https://example.com/coin13.png',
        coinSymbol: 'XRP',
        coinName: 'Ripple',
    },
    {
        imageURL: 'https://example.com/coin14.png',
        coinSymbol: 'LTC',
        coinName: 'Litecoin',
    },
    {
        imageURL: 'https://example.com/coin15.png',
        coinSymbol: 'ADA',
        coinName: 'Cardano',
    },
    {
        imageURL: 'https://example.com/coin16.png',
        coinSymbol: 'LINK',
        coinName: 'Chainlink',
    },
    {
        imageURL: 'https://example.com/coin17.png',
        coinSymbol: 'DOT',
        coinName: 'Polkadot',
    },
    {
        imageURL: 'https://example.com/coin18.png',
        coinSymbol: 'XLM',
        coinName: 'Stellar',
    },
    {
        imageURL: 'https://example.com/coin19.png',
        coinSymbol: 'VET',
        coinName: 'VeChain',
    },
    {
        imageURL: 'https://example.com/coin20.png',
        coinSymbol: 'DOGE',
        coinName: 'Dogecoin',
    },
    {
        imageURL: 'https://example.com/coin21.png',
        coinSymbol: 'ATOM',
        coinName: 'Cosmos',
    },
    {
        imageURL: 'https://example.com/coin22.png',
        coinSymbol: 'UNI',
        coinName: 'Uniswap',
    },
];