'use server';
import { CustomError } from '@/src/shared/lib/error/error';
import bcrypt from 'bcrypt';
import { createUser, findUserByEmail } from '@/src/entities/user/api/userApi';
import { AuthFields } from '@/src/shared/model/types';
import { authSchema } from '@/src/shared/model/validators';
import { nanoid } from 'nanoid';
import { signToken } from '@/src/shared/lib/auth/jwt';
import { AUTH_COOKIE, COOKIE_OPTIONS } from '@/src/shared/lib/auth/cookies';
import { cookies } from 'next/headers';
import { UserBase } from '@/src/entities/user/model/userTypes';

export const registerUser = async (newUser: AuthFields) => {
  authSchema.parse(newUser);
  const { email, password } = newUser;

  const existing = await findUserByEmail(email);
  if (existing) {
    throw new CustomError('Email already registered', 'validation', 409);
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await createUser({ id: nanoid(), email, passwordHash });
  const userBase: UserBase = { id: user.id, email: user.email };

  const token = await signToken(userBase);

  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE, token, COOKIE_OPTIONS);

  return userBase;
};
