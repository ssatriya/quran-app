import { Github } from "lucide-react";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full h-16 flex justify-center items-center gap-4">
      <Github />
      <Link href="https://github.com/ssatriya/quran-app" target="__blank">
        Github Repo
      </Link>
    </footer>
  );
};

export default Footer;
