import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Define public paths
  const isPublicPath = path === '/login' || path === '/signup' || path === '/forgotpassword';
  const isVerifyEmailPath = path === '/verifyemail';

  // Retrieve token from cookies
  const token = request.cookies.get('token')?.value || '';

  // Redirect authenticated users away from /login or /signup
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }

  // Allow access to /verifyemail regardless of token presence
  if (isVerifyEmailPath) {
    return NextResponse.next();
  }

  // Redirect unauthenticated users trying to access private paths
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/', '/profile', '/login', '/signup', '/verifyemail','/forgotpassword'],
};
