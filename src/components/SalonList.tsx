"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Dot } from "lucide-react";

const fakeSalons = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  name: "Divina Beleza Studio",
  address: "R. Koesa, 361, Sala 4 – Kobrasol, São José",
  open: true,
  stock: true,
}));

export default function SalonList() {
  return (
    <ScrollArea className="h-full pr-4">
      <div className="space-y-4">
        {fakeSalons.map((salon) => (
          <div key={salon.id} className="border-b border-zinc-700 pb-4">
            <h3 className="text-lg font-semibold">{salon.name}</h3>
            <p className="text-sm text-zinc-300">{salon.address}</p>
            <p className="text-sm text-green-400 mt-1 flex items-center gap-1">
              <Dot className="fill-green-400 stroke-none" size={18} />
              Aberto agora
            </p>
            <p className="text-sm text-zinc-300 mt-1 italic">
              Disponibilidade de estoque*
            </p>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
