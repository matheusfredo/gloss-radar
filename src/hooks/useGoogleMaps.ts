import { useEffect, useState } from "react";

export default function useGoogleMaps() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const existingScript = document.getElementById("google-maps-script");
    if (existingScript) {
      setLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.id = "google-maps-script";
    script.src = `https://maps.googleapis.com/maps/api/js?key=${"chave"}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => setLoaded(true);

    document.body.appendChild(script);
  }, []);

  return loaded;
}
