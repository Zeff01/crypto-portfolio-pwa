import { User, Session } from '@supabase/supabase-js'

import { create } from 'zustand'

type State = {
    userData: {
        user: User,
        session: Session
    }|null
}

type Action = {
    save(data: {user:User; session:Session}): void;
    remove(): void;
}

export const userUserData = create<State & Action>((set) => ({
  userData: null,
  save: (data) => set(() => ({ userData:data })),
  remove : () => set({ userData: null }),
}))
