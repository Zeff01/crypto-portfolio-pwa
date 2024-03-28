import { create } from "zustand";

type State = {
    listType: "card"|"accordion"
}

type Action = {
    toggleListType(): void;
}


export const listTypeStore = create<State & Action>((set) => ({
    listType: "card",
    toggleListType: () => set((s) => ({
        listType: s.listType === "card" ? "accordion" : "card"
    }))
}))