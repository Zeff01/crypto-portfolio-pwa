

import { GlobalMetrics } from '@/types';
import { create } from 'zustand'

type State = {
    prevLatest: null|GlobalMetrics
}

type Action = {
    setPrevLatest: (value: null|GlobalMetrics) => void;
}

export const usePrevData = create<State & Action>((set) => ({
    prevLatest:null,
    setPrevLatest: (value) => set({prevLatest:value})
}))
    