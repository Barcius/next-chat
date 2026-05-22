import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { authPaths } from './shared/lib/auth/paths';

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isAuth = authPaths.includes(pathname);

  const token = req.cookies.get('auth_token')?.value;

  if (!token) {
    if (isAuth) return NextResponse.next();
    return NextResponse.redirect(new URL('/login', req.url));
  } else if (isAuth) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  try {
    await jwtVerify(token, SECRET);
    return NextResponse.next();
  } catch {
    const response = NextResponse.redirect(new URL('/login', req.url));
    response.cookies.set('auth_token', '', { maxAge: 0, path: '/' });
    return response;
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
