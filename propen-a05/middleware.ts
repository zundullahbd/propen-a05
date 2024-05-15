export { default } from 'next-auth/middleware';

export const config = {
  matcher: ['/home', '/dashboard', '/tickets', '/customers', '/products', '/brands', '/users', '/articles'],
  session: {
    strategy: 'jwt',
  },
}