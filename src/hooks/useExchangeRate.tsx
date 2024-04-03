import { CoinFetch } from "@/queries";
import { create } from "zustand";
import { debounce } from "lodash";


type State = {
    exchangeRate: number
}
   
type Action = {
    updateExchangeRate() : void;
}

export const useExchangeRate = create<State & Action>((set) => ({
  exchangeRate: 1,
  updateExchangeRate: async () => {
    try {
        const res = await CoinFetch.getExchangeRate()
        console.log(`exchange rate is ${res.data.rates}`)
        set({exchangeRate: res.data.rates})
    } catch (error) {        
        console.error('fetch exchange rate failed retrying...', error)
        await debouncedGetExchangeRate(set)
    }

  }
}))


// TODO: proper type for set cb
const debouncedGetExchangeRate = debounce(async (set: any) => {
  console.log('refetching exchange rate...')
  try {
    const res = await CoinFetch.getExchangeRate();
    console.log(`exchange rate is ${res.data.rates}`)
    set({exchangeRate: res.data.rates})
    return
  } catch (error) {
    console.error('fetch exchange rate failed retrying...', error)
    await debouncedGetExchangeRate(set)    
    return
  }
},1500)




    