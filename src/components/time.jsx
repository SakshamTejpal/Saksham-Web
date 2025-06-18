import { useState, useEffect } from "react";
import { GlobeSimple } from "phosphor-react";

export default function Clock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const [position, setPosition] = useState({
    latitude: null,
    longitude: null,
    error: null,
  });

  const [geoPermission, setGeoPermission] = useState(Date.now());

  // Listen for permission changes
  useEffect(() => {
    if (navigator.permissions) {
      navigator.permissions.query({ name: "geolocation" }).then((permissionStatus) => {
        permissionStatus.onchange = () => {
          console.log("Geolocation permission changed:", permissionStatus.state);
          setGeoPermission(Date.now());
        };
      });
    }
  }, []);

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
  }, [geoPermission]);

  const [city, setCity] = useState(null);
  useEffect(() => {
    const { latitude, longitude, error } = position;
    if (error || latitude == null) return;
    const url = new URL("https://nominatim.openstreetmap.org/reverse");
    url.searchParams.set("format", "json");
    url.searchParams.set("lat", latitude);
    url.searchParams.set("lon", longitude);

    fetch(url, { headers: { "Accept-Language": "en" } })
      .then((res) => res.json())
      .then((data) => {
        const addr = data.address || {};
        setCity(addr.city || addr.town || addr.village || addr.county || "Unknown place");
      })
      .catch((err) => {
        console.error(err);
        setCity(`My bad, some error happened`);
      });
  }, [position.latitude, position.longitude, position.error]);

  const timeString = now.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  let locationDisplay;
  if (position.error) {
    locationDisplay = `Don't worry, I won't track your location`;
  } else if (city) {
    locationDisplay = `${city}`;
  } else {
    locationDisplay = (
      <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
        <GlobeSimple size={24} weight="regular" color="white" />
        Locating…
      </span>
    );
  }

  return (
    <div className="clock-location">
      <div className="clock-time">{timeString}</div>
      <div className="clock-pos">{locationDisplay}</div>
    </div>
  );
}
