export { default } from 'next-auth/middleware';
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/home', '/dashboard', '/tickets', '/customers', '/products', '/brands', '/users', '/articles']
}