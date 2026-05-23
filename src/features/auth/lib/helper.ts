import { CustomError } from '@/src/shared/lib/error/error';
import { getLoggedInUser } from '../api/authApi';

export async function requireAuth() {
  const user = await getLoggedInUser();
  if (!user) {
    throw new CustomError('Unauthorized', 'auth', 401);
  }
  return user;
}
