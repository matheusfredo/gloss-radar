"use client";

import Image from "next/image";
import logo from "../../public/assets/gloss-logo.png";
import React from "react";

interface HeaderProps {
  onSearch: (query: string) => void;
}

const Header = ({ onSearch }: HeaderProps) => {
  return (
    <header className="w-full h-16 bg-black flex items-center justify-between px-4 shadow-md border-b border-zinc-800">
      <div className="flex items-center gap-2">
        <Image src={logo} alt="Gloss Express" height={40} />
      </div>

      <input
        type="text"
        placeholder="Buscar salões..."
        onChange={(e) => onSearch(e.target.value)}
        className="bg-zinc-900 text-white px-4 py-2 rounded-md text-sm w-72 border border-zinc-700"
      />
    </header>
  );
};

export default Header;
