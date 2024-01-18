import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import {ClerkProvider} from "@clerk/nextjs";
import {NextFont} from "next/dist/compiled/@next/font";
import ThemesProvider from "@/providers/theme-provider";
import {dark} from "@clerk/themes";

const inter: NextFont = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Twitch",
  description: "Twitch desc",
};

export default function Layout({children}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider appearance={{baseTheme: dark}}>
      <html lang="en">
      <body className={inter.className}>
      <ThemesProvider>
        {children}
      </ThemesProvider>
      </body>
      </html>
    </ClerkProvider>
  );
};
