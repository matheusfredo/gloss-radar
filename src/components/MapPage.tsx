"use client";

import { useState } from "react";
import Map from "./Map";
import SalonList from "./SalonList";
import Header from "./Header";

export default function MapPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    console.log("🔍 Buscando por:", query);
  };

  return (
    <div className="flex flex-col h-screen bg-black text-white">
      <Header onSearch={handleSearch} />

      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1">
          <Map />
        </div>

        <aside className="w-[320px] bg-black overflow-y-auto p-4 border-l border-zinc-800">
          <SalonList searchQuery={searchQuery} />
        </aside>
      </div>
    </div>
  );
}
