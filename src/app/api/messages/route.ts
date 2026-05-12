import { getMessages } from '@/src/entities/message/api/messageApi';
import { CustomError, errorToResponse } from '@/src/shared/lib/error/error';
import { AUTH_COOKIE } from '@/src/shared/lib/auth/cookies';
import { verifyToken } from '@/src/shared/lib/auth/jwt';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(req: NextRequest) {
  try {
    const token = (await cookies()).get(AUTH_COOKIE)?.value;
    if (!token) throw new CustomError('Unauthorized', 'server', 401);
    await verifyToken(token);

    const res = await getMessages(req.signal);
    return NextResponse.json(res);
  } catch (e) {
    return errorToResponse(e instanceof Error ? e : new Error(String(e)));
  }
}
