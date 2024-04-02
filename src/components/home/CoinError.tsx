import  { useNavigate,  } from 'react-router-dom'
import { Button } from '../ui/button'
import { usePrevData } from '@/hooks/usePrevData'
import Coin from './Coin'

type ErrorType =  "trending"|"new"

export default function CoinError({type}:{type:ErrorType}) {
    const prevCoins = usePrevData(s => s.prevCoins)
    const navigate =  useNavigate()

    const texts : Record<ErrorType,string>  = {
        "trending": "failed to load trending tokens...",
        "new": "failed to load new tokens..."
    }
    
    if (!prevCoins) {
        return (
            <div className="flex flex-col gap-y-4 px-4 py-6">
                <p>{texts[type]}</p>
                <Button 
                className="px-0 w-fit text-lg bg-transparent hover:bg-transparent dark:bg-transparent underline" variant={"link"}
                onClick={() => {
                    navigate('/')
                    window.location.reload()
                }}>
                    reload
                </Button>
            </div>
        )
    }
    if (type === 'trending') {
        return (
            <>
                {prevCoins.map(m => (<Coin {...m} key={m.id} />))}
            </>
        )
    }
    const sortedCoins =  prevCoins.sort((a,b) => b.id - a.id)
    return (
        <>
            {sortedCoins.map(m => (<Coin {...m} key={m.id} />))}
        </>
    )
    
    
}