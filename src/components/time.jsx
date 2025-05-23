// src/components/ClockLocation.jsx
import { useState, useEffect } from "react";

export default function Clock() {
  // --- Time State & Effect ---
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // --- Raw Geo State & Effect ---
  const [position, setPosition] = useState({
    latitude: null,
    longitude: null,
    error: null,
  });
  useEffect(() => {
    if (!navigator.geolocation) {
      setPosition((pos) => ({ ...pos, error: "Geolocation not supported" }));
      return;
    }
    const watcher = navigator.geolocation.watchPosition(
      ({ coords }) =>
        setPosition({
          latitude: coords.latitude,
          longitude: coords.longitude,
          error: null,
        }),
      (err) => setPosition((pos) => ({ ...pos, error: err.message }))
    );
    return () => navigator.geolocation.clearWatch(watcher);
  }, []);

  // --- Reverse-Geocode to City Name ---
  const [city, setCity] = useState(null);
  useEffect(() => {
    const { latitude, longitude, error } = position;
    if (error || latitude == null) return;        // bail if no coords or we already have an error
    const url = new URL("https://nominatim.openstreetmap.org/reverse");
    url.searchParams.set("format", "json");
    url.searchParams.set("lat", latitude);
    url.searchParams.set("lon", longitude);

    fetch(url, {
      headers: { "Accept-Language": "en" },
    })
      .then((res) => res.json())
      .then((data) => {
        const addr = data.address || {};
        // try a series of fallbacks for place names:
        setCity(addr.city || addr.town || addr.village || addr.county || "Unknown place");
      })
      .catch((err) => {
        console.error(err);
        setCity(`Error: ${err.message}`);
      });
  }, [position.latitude, position.longitude, position.error]);

  // --- Formatting ---
  const timeString = now.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  let locationDisplay;
  if (position.error) {
    locationDisplay = `Error: ${position.error}`;
  } else if (city) {
    locationDisplay = `${city}`;
  } else {
    locationDisplay = "🌐 Locating…";
  }

  // --- Render ---
  return (
    <div className="clock-location">
      <div className="clock-time">{timeString}</div>
      <div className="clock-pos">{locationDisplay}</div>
    </div>
  );
}
