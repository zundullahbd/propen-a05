import { withAuth } from "next-auth/middleware";
export default withAuth({
  secret: process.env.SECRET,
});
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/dashboard', '/tickets', '/customers', '/products', '/brands', '/users', '/articles']
}