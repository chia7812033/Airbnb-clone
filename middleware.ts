import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/users",
  },
});

export const config = {
  matcher: [
    "/properties/:path*",
    "/profile/:path*",
    "/favorites/:path*",
    "/reservations/:path*",
    "/trips/:path*",
    "/chat/:path*",
  ],
};
