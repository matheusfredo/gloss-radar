"use client";

import { useEffect, useRef } from "react";
import { useGoogleMaps } from "@/hooks";

export default function Map() {
  const mapRef = useRef<HTMLDivElement>(null);
  const loaded = useGoogleMaps();

  useEffect(() => {
    if (!loaded || !mapRef.current) return;

    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: -15.7797, lng: -47.9297 }, // Fallback: Brasília
      zoom: 5,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      zoomControl: true,
      styles: [
        {
          elementType: "geometry",
          stylers: [{ color: "#1d2c4d" }],
        },
        {
          elementType: "labels.text.fill",
          stylers: [{ color: "#8ec3b9" }],
        },
        {
          elementType: "labels.text.stroke",
          stylers: [{ color: "#1a3646" }],
        },
        {
          featureType: "administrative.country",
          elementType: "geometry.stroke",
          stylers: [{ color: "#4b6878" }],
        },
        {
          featureType: "landscape",
          elementType: "geometry",
          stylers: [{ color: "#0e1626" }],
        },
        {
          featureType: "poi",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "road",
          elementType: "geometry",
          stylers: [{ color: "#304a7d" }],
        },
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [{ color: "#17263c" }],
        },
      ],
    });

    // Tentativa de geolocalização do usuário
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
            title: "Você está aqui",
            icon: {
              url: "/assets/my-location.png", // Substitua por seu ícone
              scaledSize: new window.google.maps.Size(32, 32),
            },
          });
        },
        (error) => {
          console.warn("Erro ao obter localização do usuário:", error.message);
        }
      );
    }

    // Exemplo de outro marcador
    new window.google.maps.Marker({
      position: { lat: -23.5505, lng: -46.6333 }, // São Paulo
      map,
      title: "Divina Beleza Studio",
      icon: {
        url: "/assets/marker-zara.png", // Ícone do salão
        scaledSize: new window.google.maps.Size(40, 40),
      },
    });
  }, [loaded]);

  return <div ref={mapRef} className="h-full w-full" />;
}
