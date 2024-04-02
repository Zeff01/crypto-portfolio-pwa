

import { GlobalMetrics, TrendingToken } from '@/types';
import { create } from 'zustand'

type State = {
    prevLatest: null|GlobalMetrics
    prevCoins: null|TrendingToken[]
}

type Action = {
    setPrevLatest: (value: null|GlobalMetrics) => void;
    setPrevCoins: (value: null|TrendingToken[]) => void;
}

export const usePrevData = create<State & Action>((set) => ({
    prevLatest:null,
    prevCoins:null,

    setPrevLatest: (value) => set({prevLatest:value}),
    setPrevCoins: (value) => set({prevCoins:value})
}))
    