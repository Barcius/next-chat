import { getMessages } from '@/src/entities/message/api/messageApi';
import { errorToResponse } from '@/src/shared/lib/error/error';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const res = await getMessages(req.signal);
    return NextResponse.json(res);
  } catch (e) {
    return errorToResponse(e instanceof Error ? e : new Error(String(e)));
  }
}
