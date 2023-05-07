"use client";

import React from "react";
import Link from "next/link";
import { useTheme } from "next-themes";

import { Switch } from "./ui/switch";
import { Label } from "./ui/label";

const Navbar = () => {
  const { setTheme } = useTheme();
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
                // localStorage.setItem("darkMode", "on");
                // setCheckedValue(true);
              } else {
                setTheme("light");
                // localStorage.setItem("darkMode", "off");
                // setCheckedValue(false);
              }
            }}
          />
          <Label htmlFor="dark-mode">Dark Mode</Label>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
