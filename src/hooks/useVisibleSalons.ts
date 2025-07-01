// src/hooks/useVisibleSalons.ts
import { useQuery } from "@tanstack/react-query";

export const useVisibleSalons = (bounds: any) => {
  return useQuery({
    queryKey: ["saloes", bounds],
    queryFn: async () => {
      const { north, south, east, west } = bounds;
      const res = await fetch(
        `/api/saloes/mapa?north=${north}&south=${south}&east=${east}&west=${west}`
      );
      return res.json();
    },
    enabled: !!bounds, // só executa se bounds existirem
    staleTime: 60_000,
  });
};
