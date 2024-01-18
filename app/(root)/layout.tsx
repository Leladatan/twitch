import {db} from "@/prisma/db";
import {User} from "@prisma/client";

const LayoutRoot = async ({children}: { children: React.ReactNode }) => {
  const user: User[] = await db.user.findMany();

  return (
    <main>
      {user[0]?.id}
      {children}
    </main>
  );
};

export default LayoutRoot;