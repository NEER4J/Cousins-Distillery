import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  
  // Get hostname without port
  const hostname = request.headers.get('host')?.split(':')[0] || '';
  
  // Define our production domains
  const isProduction = 
    hostname === 'cousinsdistillery.com' || 
    hostname === 'www.cousinsdistillery.com' ||
    hostname === 'cousinsdistilleryltd.com' ||
    hostname === 'www.cousinsdistilleryltd.com';
  
  // If the request is for the main site (production) and NOT already on /coming-soon
  if (isProduction) {
    if (url.pathname !== '/coming-soon' && !url.pathname.startsWith('/_next') && !url.pathname.match(/\.(png|jpg|jpeg|gif|svg|ico)$/)) {
      url.pathname = '/coming-soon';
      return NextResponse.rewrite(url);
    }
  }

  // Allow the request to proceed
  const response = NextResponse.next();
  
  // Add X-Robots-Tag to prevent indexing on staging/non-production domains
  if (!isProduction) {
    response.headers.set('X-Robots-Tag', 'noindex, nofollow, nosnippet, noarchive');
  }

  return response;
}

export const config = {
  // Apply middleware to all routes except api, _next/static, _next/image, favicon.ico
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
