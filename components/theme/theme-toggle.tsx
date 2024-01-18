"use client";

import { Moon, Sun } from "lucide-react";

import { useTheme } from "next-themes";
import {Color, useColor} from "@/hooks/use-color";
import {useLocalStorage} from "@/hooks/use-local-storage";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {colors} from "@/constants/colors";
import {firstSymbolUppercase} from "@/functions/first-symbol-uppercase";

export const ThemeToggle = () => {
  const { setTheme } = useTheme();
  const {setColor} = useColor();
  const {setLocalStorage} = useLocalStorage();

  const handleTheme = (value: Color): void => {
    setColor(value);
    return setLocalStorage({key: "twitch-color", value});
  };

  const handleThemeForDefault = (value: "light" | "dark" | "system"): void => {
    setColor("default");
    setTheme(value);
    return setLocalStorage({key: "twitch-color", value: "default"});
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="bg-primary text-primary-foreground">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleThemeForDefault("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeForDefault("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleThemeForDefault("system")}>
          System
        </DropdownMenuItem>
        {colors.map((color, index) => (
          <DropdownMenuItem key={index} onClick={() => handleTheme(color)}>
            {firstSymbolUppercase(color)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
