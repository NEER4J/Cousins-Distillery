import { NextResponse } from 'next/server';
export function middleware() {
  // Allow the request to proceed (site is live, no coming-soon redirect)
  const response = NextResponse.next();

  // Keep site noindex so search engines do not index until ready
  response.headers.set('X-Robots-Tag', 'noindex, nofollow, nosnippet, noarchive');

  return response;
}

export const config = {
  // Apply middleware to all routes except api, _next/static, _next/image, favicon.ico
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
