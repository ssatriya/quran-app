import { Github } from "lucide-react";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer>
      <div className="mb-20 py-8 flex gap-4 items-center justify-center">
        <Github />
        <Link href="https://github.com/ssatriya/quran-app" target="__blank">
          Github Repo
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
