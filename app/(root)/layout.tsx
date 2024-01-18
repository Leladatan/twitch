import {db} from "@/prisma/db";
import {User} from "@prisma/client";

const LayoutRoot = async ({children}: { children: React.ReactNode }) => {
  const user: User[] = await db.user.findMany();

  console.log("user", user);
  return (
    <main>
      {children}
    </main>
  );
};

export default LayoutRoot;