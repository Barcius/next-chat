import { UserBase } from '@/src/entities/user/model/userTypes';
import { SignJWT, jwtVerify } from 'jose';

export const jwtSecret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function signToken(payload: UserBase): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(jwtSecret);
}

export async function verifyToken(token: string): Promise<UserBase> {
  const { payload } = await jwtVerify<UserBase>(token, jwtSecret);
  return payload;
}
