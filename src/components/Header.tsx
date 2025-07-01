"use client";
import Image from "next/image";
import SearchBar from "./SearchBar";

interface HeaderProps {
  onSearch: (query: string) => void;
}

export default function Header({ onSearch }: HeaderProps) {
  return (
    <header className="flex items-center justify-between bg-black p-4">
      <Image src="/assets/gloss-logo.png" alt="Logo" width={120} height={40} />
      <SearchBar onSearch={onSearch} />
    </header>
  );
}
