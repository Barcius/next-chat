import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { findUserByEmail } from '@/src/entities/user/api/userApi';
import { signToken } from '@/src/shared/lib/auth/jwt';
import { AUTH_COOKIE, COOKIE_OPTIONS } from '@/src/shared/lib/auth/cookies';
import { CustomError, errorToResponse } from '@/src/shared/lib/error/error';

const DUMMY_HASH = '$2b$12$invalidhashpadding0000000000000000000000000000000000000';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      throw new CustomError('Email and password are required', 'validation', 400);
    }

    const user = await findUserByEmail(email);
    // Always run bcrypt.compare to prevent timing attacks, even when user not found
    const hash = user?.passwordHash ?? DUMMY_HASH;
    const valid = await bcrypt.compare(password, hash);

    if (!user || !valid) {
      throw new CustomError('Invalid email or password', 'validation', 401);
    }

    const token = await signToken({ sub: user.id, email: user.email });

    const response = NextResponse.json({ ok: true });
    response.cookies.set(AUTH_COOKIE, token, COOKIE_OPTIONS);
    return response;
  } catch (e) {
    return errorToResponse(e instanceof Error ? e : new Error(String(e)));
  }
}
