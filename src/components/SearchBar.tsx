"use client";
import { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value); // Passa o termo para o pai
  };

  return (
    <div className="flex justify-center mt-4">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Estado/Cidade/CEP/Salão/Profissional"
        className="w-[500px] p-2 rounded-md bg-zinc-800 text-white border border-zinc-600"
      />
    </div>
  );
}
