import { UserBase } from '@/src/entities/user/model/userTypes';
import { SignJWT, jwtVerify } from 'jose';

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function signToken(payload: UserBase): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(SECRET);
}

export async function verifyToken(token: string): Promise<UserBase> {
  const { payload } = await jwtVerify<UserBase>(token, SECRET);
  return payload;
}
