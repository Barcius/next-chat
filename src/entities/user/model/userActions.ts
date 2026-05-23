import useUserStore from './userStore';
import { UserBase } from './userTypes';

export const setCurrentUser = (user: UserBase | null) => {
  useUserStore.setState(() => ({ currentUser: user }));
};
