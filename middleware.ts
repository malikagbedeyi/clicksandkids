import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const adminToken = process.env.ADMIN_UPLOAD_TOKEN;
  const path = request.nextUrl.pathname;

  const isAdminPath = path.startsWith('/admin');
  
  const isLoginPage = path === '/admin/login';

  if (isAdminPath && !isLoginPage) {
    const cookie = request.cookies.get('admin_access')?.value;

    if (!cookie || cookie !== adminToken) {

      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};