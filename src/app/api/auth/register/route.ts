import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { nanoid } from 'nanoid';
import { findUserByEmail, createUser } from '@/src/entities/user/api/userApi';
import { signToken } from '@/src/shared/lib/auth/jwt';
import { AUTH_COOKIE, COOKIE_OPTIONS } from '@/src/shared/lib/auth/cookies';
import { CustomError, errorToResponse } from '@/src/shared/lib/error/error';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      throw new CustomError('Email and password are required', 'validation', 400);
    }

    const existing = await findUserByEmail(email);
    if (existing) {
      throw new CustomError('Email already registered', 'validation', 409);
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await createUser({ id: nanoid(), email, passwordHash });

    const token = await signToken({ sub: user.id, email: user.email });

    const response = NextResponse.json({ ok: true }, { status: 201 });
    response.cookies.set(AUTH_COOKIE, token, COOKIE_OPTIONS);
    return response;
  } catch (e) {
    return errorToResponse(e instanceof Error ? e : new Error(String(e)));
  }
}
