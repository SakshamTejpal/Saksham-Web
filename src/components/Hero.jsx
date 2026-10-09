import { useEffect, useRef, useState } from "react";
import "../styles/Hero.css";

const HOME_ZONE = "America/Toronto";
const HOME_CITY = "Toronto";
const VISITOR_ZONE = Intl.DateTimeFormat().resolvedOptions().timeZone;
const HOUR_LABELS = ["00", "06", "12", "18", "24"];

function formatTime(zone, date, withSeconds) {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: zone,
    hour: "2-digit",
    minute: "2-digit",
    second: withSeconds ? "2-digit" : undefined,
    hourCycle: "h23",
  }).format(date);
}

// Minutes since midnight in `zone`, used to place a marker on the 24-hour line.
function minutesOfDay(zone, date) {
  const [hours, minutes] = formatTime(zone, date, false).split(":").map(Number);
  return hours * 60 + minutes;
}

// UTC offset of `zone` in minutes, e.g. -240 for Toronto in summer.
function utcOffset(zone, date) {
  const name = new Intl.DateTimeFormat("en-US", { timeZone: zone, timeZoneName: "longOffset" })
    .formatToParts(date)
    .find((part) => part.type === "timeZoneName").value; // "GMT-04:00", or "GMT" for UTC
  const match = name.match(/([+-])(\d{2}):?(\d{2})?/);
  if (!match) return 0;
  const minutes = Number(match[2]) * 60 + Number(match[3] ?? 0);
  return match[1] === "-" ? -minutes : minutes;
}

function formatDifference(minutes) {
  const hours = Math.floor(Math.abs(minutes) / 60);
  const rest = Math.abs(minutes) % 60;
  return `${minutes > 0 ? "+" : "−"}${hours}h${rest ? ` ${rest}m` : ""}`;
}

// Some browsers still report a few zones by their old names.
const RENAMED_CITIES = { Calcutta: "Kolkata", Saigon: "Ho Chi Minh", Kiev: "Kyiv", Rangoon: "Yangon", Katmandu: "Kathmandu" };

// "America/Argentina/Buenos_Aires" → "Buenos Aires"
function cityName(zone) {
  const city = zone.split("/").pop();
  return (RENAMED_CITIES[city] ?? city).replace(/_/g, " ");
}

// Scales the text so it exactly fills its container's width on one line.
function useFitWidth() {
  const ref = useRef(null);
  useEffect(() => {
    const text = ref.current;
    const container = text.parentElement;
    const fit = () => {
      text.style.fontSize = "100px";
      text.style.fontSize = `${(100 * container.clientWidth) / text.getBoundingClientRect().width}px`;
    };
    fit();
    document.fonts.ready.then(fit);
    const observer = new ResizeObserver(fit);
    observer.observe(container);
    return () => observer.disconnect();
  }, []);
  return ref;
}

export default function Hero() {
  const [now, setNow] = useState(() => new Date());
  const nameRef = useFitWidth();

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const homeAt = (minutesOfDay(HOME_ZONE, now) / 1440) * 100;
  const visitorAt = (minutesOfDay(VISITOR_ZONE, now) / 1440) * 100;
  const difference = utcOffset(VISITOR_ZONE, now) - utcOffset(HOME_ZONE, now);
  const showVisitor = difference !== 0; // visitors in Saksham's time only see his clock

  return (
    <section id="hero" className="hero" data-snap>
      <div className="day">
        <div className="day-line">
          {showVisitor && (
            <span
              className="day-span"
              style={{ left: `${Math.min(homeAt, visitorAt)}%`, width: `${Math.abs(homeAt - visitorAt)}%` }}
            />
          )}
          <span className="day-marker home" style={{ left: `${homeAt}%` }} />
          {showVisitor && <span className="day-marker visitor" style={{ left: `${visitorAt}%` }} />}
        </div>
        <div className="day-hours label" aria-hidden="true">
          {HOUR_LABELS.map((hour) => <span key={hour}>{hour}</span>)}
        </div>

        <dl className="clock">
          <div className="clock-row">
            <dt className="label">{HOME_CITY}</dt>
            <dd className="clock-time">{formatTime(HOME_ZONE, now, true)}</dd>
          </div>
          {showVisitor && (
            <div className="clock-row visitor">
              <dt className="label">{cityName(VISITOR_ZONE)}</dt>
              <dd className="clock-time">{formatTime(VISITOR_ZONE, now, true)}</dd>
              <dd className="clock-difference">{formatDifference(difference)}</dd>
            </div>
          )}
        </dl>
      </div>

      <div className="hero-intro">
        <p className="hero-hello">Hello, I am</p>
        <div className="hero-name-fit">
          <h1 className="hero-name" ref={nameRef}>Saksham Tejpal</h1>
        </div>
        <p className="hero-role">AI Engineer &amp; Researcher</p>
      </div>
    </section>
  );
}
