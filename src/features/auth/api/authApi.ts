'use server';
import { CustomError } from '@/src/shared/lib/error/error';
import bcrypt from 'bcrypt';
import { createUser, findUserByEmail } from '@/src/entities/user/api/userApi';
import { AuthFields } from '@/src/shared/model/types';
import { authSchema } from '@/src/shared/model/validators';
import { nanoid } from 'nanoid';
import { signToken, verifyToken } from '@/src/shared/lib/auth/jwt';
import { AUTH_COOKIE, COOKIE_OPTIONS } from '@/src/shared/lib/auth/cookies';
import { cookies } from 'next/headers';
import { UserBase } from '@/src/entities/user/model/userTypes';

const DUMMY_HASH = '$2b$12$invalidhashpadding0000000000000000000000000000000000000';

export const registerUser = async (creds: AuthFields) => {
  const { email, password } = authSchema.parse(creds);

  if (await findUserByEmail(email)) throw new CustomError('Email already registered', 'auth', 409);

  const passwordHash = await bcrypt.hash(password, 12);
  const id = nanoid();
  const user = await createUser({ id, email, passwordHash });
  const userBase: UserBase = { id: user.id, email: user.email };

  const token = await signToken(userBase);

  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE, token, COOKIE_OPTIONS);

  return userBase;
};

export const logoutUser = async () => {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE);
};

export const getLoggedInUser = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_COOKIE)?.value;
  if (!token) return null;
  return await verifyToken(token);
};

export const loginUser = async (creds: AuthFields) => {
  const { email, password } = authSchema.parse(creds);

  const user = await findUserByEmail(email);
  if (!user) throw new CustomError('Invalid email or password', 'auth', 401);

  const hash = user?.passwordHash ?? DUMMY_HASH;
  const valid = await bcrypt.compare(password, hash);

  if (!valid) {
    throw new CustomError('Invalid email or password', 'auth', 401);
  }
  const userBase: UserBase = { id: user.id, email: user.email };

  const token = await signToken(userBase);

  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE, token, COOKIE_OPTIONS);

  return userBase;
};
