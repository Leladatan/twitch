import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({});

export const config: {matcher: string[]} = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};