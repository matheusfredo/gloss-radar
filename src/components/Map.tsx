"use client";

import { useEffect, useRef } from "react";
import { useGoogleMaps } from "@/hooks";

export default function Map() {
  const mapRef = useRef<HTMLDivElement>(null);
  const loaded = useGoogleMaps();

  useEffect(() => {
    if (!loaded || !mapRef.current) return;

    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: -15.7797, lng: -47.9297 },
      zoom: 5,
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
          elementType: "labels.text.fill",
          stylers: [{ color: "#6f9ba5" }],
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

    new window.google.maps.Marker({
      position: { lat: -23.5505, lng: -46.6333 },
      map,
      title: "Divina Beleza Studio",
      icon: {
        url: "/assets/marker-zara.png",
        scaledSize: new window.google.maps.Size(40, 40),
      },
    });
  }, [loaded]);

  return <div ref={mapRef} className="h-full w-full" />;
}
