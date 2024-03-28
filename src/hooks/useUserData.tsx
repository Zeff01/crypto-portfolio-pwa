import { User, Session } from '@supabase/supabase-js'
import { UserInfo } from '@/types';

import { create } from 'zustand'

type State = {
    userData: {
        user: User,
        session: Session
    }|null;
    userInfo: {
        firstName: string;
        lastName: string;
        email: string;
        username: string;
    }|null;
}

type Action = {
    save(data: {user:User; session:Session}): void;
    remove(): void;
    saveInfo(data: UserInfo) : void;
}

export const userUserData = create<State & Action>((set) => ({
  userData: null,
  userInfo: null,

  save: (data) => set(() => ({ userData:data })),
  remove : () => set({ userData: null, userInfo: null }),
  saveInfo: (data) => set(() => ({userInfo: data}))
}))
    