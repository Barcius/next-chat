import 'server-only';
import api from '@/src/shared/api';
import { User } from '../model/userTypes';

export const findUserByEmail = async (email: string): Promise<User | null> => {
  const users = await api.get<User[]>(`/users?email=${encodeURIComponent(email)}`);
  return users[0] ?? null;
};

export const createUser = async (user: User): Promise<User> =>
  api.post<User>('/users', { body: JSON.stringify(user) });
