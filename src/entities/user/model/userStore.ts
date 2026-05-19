import { create } from 'zustand';
import { UserBase } from './userTypes';

interface UserState {
  currentUser: UserBase | null;
  setCurrentUser: (user: UserBase | null) => void;
}

const useUserStore = create<UserState>((set) => ({
  currentUser: null,
  setCurrentUser: (user) => set({ currentUser: user }),
}));

export default useUserStore;
