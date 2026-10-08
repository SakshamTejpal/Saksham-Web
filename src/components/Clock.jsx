import { useState, useEffect } from "react";
import { PiGlobeSimple } from "react-icons/pi";

// Live local time plus the visitor's approximate region (looked up from their IP).
export default function Clock() {
  const [now, setNow] = useState(new Date());
  const [place, setPlace] = useState(null); // null = still locating, "" = lookup failed

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetch("https://ipapi.co/json/", { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => setPlace(data.region && data.country_name ? `${data.region}, ${data.country_name}` : ""))
      .catch((err) => {
        if (err.name !== "AbortError") setPlace("");
      });
    return () => controller.abort();
  }, []);

  return (
    <div className="clock-location">
      <div className="clock-time">
        {now.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
      </div>
      <div className="clock-pos">
        {place ?? (
          <span className="clock-locating">
            <PiGlobeSimple size={24} />
            Locating…
          </span>
        )}
      </div>
    </div>
  );
}
