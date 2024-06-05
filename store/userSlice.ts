import type { StateCreator } from 'zustand';

import type { User } from '@/typings/User';

import { myProfile } from '@/constants/Moments';

export interface UserSliceState {
  me: string;
  users: Record<string, User>;
  addUser: (id: string, user: User) => void;
}

export const createUserSlice: StateCreator<UserSliceState> = (set) => ({
  me: myProfile.id,
  users: {
    [myProfile.id]: myProfile,
  },
  addUser: (id, user) => set((state) => ({ users: { ...state.users, [id]: user } })),
});
