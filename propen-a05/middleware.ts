export { default } from 'next-auth/middleware';
// See "Matching Paths" below to learn more
export const config = {
<<<<<<< HEAD
  matcher: ['/home', '/dashboard', '/tickets', '/customers', '/products', '/brands', '/users', '/articles']
}
=======
  matcher: ['/dashboard', '/tickets', '/customers', '/products', '/brands', '/users', '/articles'],
  session: {
    strategy: 'jwt',
  },
}



// import { withAuth } from 'next-auth/middleware'

// export default withAuth({
//   pages: {
//     signIn: '/auth/sign-in',
//   },
// })

// // The following is optional and will match the default behavior of Next.js
// // See "Matching Paths" below to learn more
// export const config = {
//   matcher: (url: string) => {
//     if (url.startsWith('/api/auth/')) {
//       return false
//     }
//     return url.startsWith('/dashboard') || url.startsWith('/tickets') || url.startsWith('/customers') || url.startsWith('/products') || url.startsWith('/brands') || url.startsWith('/users') || url.startsWith('/articles')
//   },
// }

// import { NextResponse } from "next/server";
// import type { Session } from "next-auth";
// import { getServerSession } from "next-auth"

// export async function middleware(req: any) {
//   // Get the session from the request
//   const session: Session | null = await getServerSession(req);
//   // If there is no session, return a 401 Unauthorized response
//   if (!session) {
//     return NextResponse.redirect("/sign-in");
//   }

//   // Get the requested route
//   const { pathname } = req.nextUrl;

//   // Define the routes that require specific roles
//   const protectedRoutes = {
//     "/tickets": ["admin", "exec"],
//     "/dashboard": ["admin", "exec"],
//     "/products": ["admin", "cs"],
//     "/customers": ["admin", "cs", "sales"],
//     "/users": ["admin"],
//     "/brands": ["admin"],
//     "/articles": ["admin"],
//   };

//   // If the requested route requires a specific role, check if the user has that role
//   if (protectedRoutes[pathname as keyof typeof protectedRoutes]) {
//     if (!protectedRoutes[pathname as keyof typeof protectedRoutes].includes(session.user.role)) {
//       return new Response("Forbidden", { status: 403 });
//     }
//   }

//   // If the user is authenticated and has the correct role, continue to the requested page
//   return NextResponse.next();
// }

// // Apply the middleware to all routes except for the sign-in page
// export const config = {
//   matcher: "/((?!sign-in).*)",
// };
// import { NextRequest, NextResponse } from 'next/server';

// export function middleware(request: NextRequest) {
//   const shouldHandle = [
//     '/dashboard',
//     '/tickets',
//     '/customers',
//     '/products',
//     '/brands',
//     '/users',
//     '/articles',
//   ].some((path) => request.nextUrl.pathname.startsWith(path));

//   if (shouldHandle) {
//     const user = request.nextauth.token;

//     if (!user) {
//       return NextResponse.redirect('/api/auth/signin');
//     }
//   }

//   return NextResponse.next();
// }

>>>>>>> 00275c8952a285256573ec2fb5852d10ae870112
