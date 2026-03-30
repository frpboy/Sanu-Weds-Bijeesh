"use client";
import { useState, useEffect } from "react";

const WEDDING_DATE = new Date("April 8, 2026 10:30:00").getTime();

export default function Countdown() {
  const [isClient, setIsClient] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const tick = () => {
      const diff = WEDDING_DATE - Date.now();
      if (diff <= 0) {
        setExpired(true);
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / 86400000)
          .toString()
          .padStart(2, "0"),
        hours: Math.floor((diff % 86400000) / 3600000)
          .toString()
          .padStart(2, "0"),
        minutes: Math.floor((diff % 3600000) / 60000)
          .toString()
          .padStart(2, "0"),
        seconds: Math.floor((diff % 60000) / 1000)
          .toString()
          .padStart(2, "0"),
      });
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  if (!isClient) return null;

  if (expired) {
    return (
      <h3 style={{ color: "var(--primary-color)", fontFamily: "var(--font-cinzel)" }}>
        Just Married! 🎉
      </h3>
    );
  }

  return (
    <div className="countdown">
      {(
        [
          { value: timeLeft.days, label: "Days" },
          { value: timeLeft.hours, label: "Hours" },
          { value: timeLeft.minutes, label: "Mins" },
          { value: timeLeft.seconds, label: "Secs" },
        ] as const
      ).map(({ value, label }) => (
        <div key={label} className="time-block">
          <span>{value}</span>
          <label>{label}</label>
        </div>
      ))}
    </div>
  );
}
