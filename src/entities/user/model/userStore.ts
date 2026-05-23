import { create } from 'zustand';
import { UserBase } from './userTypes';

interface UserState {
  currentUser: UserBase | null;
}

const useUserStore = create<UserState>(() => ({
  currentUser: null,
}));

export default useUserStore;
