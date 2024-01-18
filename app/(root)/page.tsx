"use client";

import {ThemeToggle} from "@/components/theme/theme-toggle";
import {cn} from "@/lib/utils";
import {useColor} from "@/hooks/use-color";
import {UserButton} from "@clerk/nextjs";

const Page = () => {
  const {color} = useColor();

  return (
      <>
        <h1 className={cn("text-[100px] text-primary", color)}>Twitch</h1>
        <ThemeToggle />
        <UserButton />
      </>
  );
};

export default Page;