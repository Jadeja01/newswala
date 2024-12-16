import { NextResponse } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request) {
  console.log('request',request);
  const path = request.nextUrl.pathname;
  const isPublicPath = path === "/login" || path === "/signup"
  const token = request.cookies.get("authToken")
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/user',request.nextUrl))
    }
  if(isPublicPath && token){
    return NextResponse.redirect(new URL('/',request.nextUrl))
  }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/login',
    '/signup'
  ],
}