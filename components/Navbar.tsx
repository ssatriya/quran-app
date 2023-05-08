"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";

import { Switch } from "./ui/switch";
import { Label } from "./ui/label";

const Navbar = () => {
  const [switchValue, setSwitchValue] = useState<boolean>(false);
  const { setTheme } = useTheme();

  useEffect(() => {
    const storedThemeState = localStorage.getItem("darkMode");

    if (storedThemeState && storedThemeState === "on") {
      setSwitchValue(true);
    }
    if (storedThemeState && storedThemeState === "off") {
      setSwitchValue(false);
    }
    if (!storedThemeState) {
      setTheme("dark");
    }
  }, []);

  return (
    <header>
      <nav className="flex justify-between items-center mt-8 my-12">
        <Link href="/" className="text-2xl font-bold leading-6">
          Lite Quran
        </Link>
        <div className="flex justify-center items-center gap-3">
          <Switch
            id="dark-mode"
            onCheckedChange={(e) => {
              if (e) {
                setTheme("dark");
                localStorage.setItem("darkMode", "on");
                setSwitchValue(true);
              } else {
                setTheme("light");
                localStorage.setItem("darkMode", "off");
                setSwitchValue(false);
              }
            }}
            checked={switchValue}
          />
          <Label htmlFor="dark-mode">Dark Mode</Label>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
