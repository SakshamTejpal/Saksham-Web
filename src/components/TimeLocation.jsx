import { useState, useEffect } from "react";
import { GlobeSimple } from "phosphor-react";

export default function Clock() {
  const [now, setNow] = useState(new Date());
  const [city, setCity] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((data) => {
        const place = `${data.region}, ${data.country_name}`;
        setCity(place);
      })
      .catch((err) => {
        console.error(err);
        setCity(`Error: ${err.message}`);
      });
  }, []);

  const timeString = now.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const locationDisplay = city ? (
    city
  ) : (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
      <GlobeSimple size={24} weight="regular" color="white" />
      Locating…
    </span>
  );

  return (
    <div className="clock-location">
      <div className="clock-time">{timeString}</div>
      <div className="clock-pos">{locationDisplay}</div>
    </div>
  );
}
