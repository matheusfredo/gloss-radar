import { useState } from "react";
import axios from "axios";

type Coordinates = {
  lat: number;
  lng: number;
};

export function useSalons(
  mapCallback: (data: any[], center: Coordinates) => void
) {
  const [loading, setLoading] = useState(false);
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL!;

  const buscarPorTexto = async (termo: string, distanciaKm = 5) => {
    if (!termo || termo.trim().length < 3) return;
    try {
      setLoading(true);

      const res = await axios.get(`${apiBaseUrl}/api/findplace`, {
        params: { input: termo },
      });

      const location = res.data?.candidates?.[0]?.geometry?.location;

      if (!location) {
        alert("Localização não encontrada.");
        return;
      }

      const saloesRes = await axios.get(`${apiBaseUrl}/api/saloes`, {
        params: {
          lat: location.lat,
          lng: location.lng,
          radius: distanciaKm * 1000,
        },
      });

      mapCallback(saloesRes.data, location);
    } catch (err) {
      console.error("Erro ao buscar salões:", err);
      alert("Erro ao buscar.");
    } finally {
      setLoading(false);
    }
  };

  return { buscarPorTexto, loading };
}
