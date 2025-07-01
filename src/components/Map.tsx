"use client";

import { useEffect, useRef, useState } from "react";
import { useGoogleMaps } from "@/hooks";
import { useVisibleSalons } from "@/hooks/useVisibleSalons";

export default function Map() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapInstance, setMapInstance] = useState<google.maps.Map | null>(null);
  const [bounds, setBounds] = useState<any>(null);
  const loaded = useGoogleMaps();

  const { data: saloes } = useVisibleSalons(bounds);

  useEffect(() => {
    if (!loaded || !mapRef.current) return;

    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: -15.7797, lng: -47.9297 },
      zoom: 5,
    });

    setMapInstance(map);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          map.setCenter(userLocation);
          map.setZoom(14);

          new window.google.maps.Marker({
            position: userLocation,
            map,
            icon: {
              url: "/assets/my-location.png",
              scaledSize: new window.google.maps.Size(32, 32),
            },
          });
        },
        (error) => console.warn("Geolocalização falhou:", error.message)
      );
    }

    let timeout: NodeJS.Timeout;
    map.addListener("idle", () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        const bounds = map.getBounds();
        if (!bounds) return;
        setBounds({
          north: bounds.getNorthEast().lat(),
          east: bounds.getNorthEast().lng(),
          south: bounds.getSouthWest().lat(),
          west: bounds.getSouthWest().lng(),
        });
      }, 500); // Debounce
    });
  }, [loaded]);

  useEffect(() => {
    if (!mapInstance || !saloes) return;

    saloes.forEach((salao: any) => {
      new window.google.maps.Marker({
        position: {
          lat: parseFloat(salao.latitude),
          lng: parseFloat(salao.longitude),
        },
        map: mapInstance,
        title: salao.nome_salao,
        icon: {
          url: "/assets/marker-zara.png",
          scaledSize: new window.google.maps.Size(40, 40),
        },
      });
    });
  }, [mapInstance, saloes]);

  return <div ref={mapRef} className="h-full w-full" />;
}
