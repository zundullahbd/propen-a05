// export { default } from 'next-auth/middleware';
// // See "Matching Paths" below to learn more
// export const config = {
//   matcher: ['/dashboard', '/tickets', '/customers', '/products', '/brands', '/users', '/articles']
// }


import { withAuth } from 'next-auth/middleware'

export default withAuth({
  pages: {
    signIn: '/auth/signin',
  },
})

// The following is optional and will match the default behavior of Next.js
// See "Matching Paths" below to learn more
export const config = {
  matcher: (url: string) => {
    if (url.startsWith('/api/auth/')) {
      return false
    }
    return url.startsWith('/dashboard') || url.startsWith('/tickets') || url.startsWith('/customers') || url.startsWith('/products') || url.startsWith('/brands') || url.startsWith('/users') || url.startsWith('/articles')
  },
}