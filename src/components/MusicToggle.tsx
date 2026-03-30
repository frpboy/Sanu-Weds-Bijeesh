"use client";
import { useState, useEffect, useRef } from "react";

export default function MusicToggle() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio("/music.mp3");
    audio.loop = true;
    audio.volume = 0.4;
    audioRef.current = audio;

    let started = false;

    function tryPlay() {
      if (started) return;
      audio
        .play()
        .then(() => {
          started = true;
          setPlaying(true);
          document.removeEventListener("click", tryPlay);
          document.removeEventListener("touchstart", tryPlay);
          document.removeEventListener("touchend", tryPlay);
          document.removeEventListener("keydown", tryPlay);
        })
        .catch(() => {
          // Still blocked — keep listeners alive and retry on next interaction
        });
    }

    // Attempt immediately (works on desktop or permissive browsers)
    tryPlay();

    // Keep retrying on every interaction until it starts — needed for iOS Safari
    document.addEventListener("click", tryPlay);
    document.addEventListener("touchstart", tryPlay);
    document.addEventListener("touchend", tryPlay);
    document.addEventListener("keydown", tryPlay);

    return () => {
      audio.pause();
      audio.src = "";
      document.removeEventListener("click", tryPlay);
      document.removeEventListener("touchstart", tryPlay);
      document.removeEventListener("touchend", tryPlay);
      document.removeEventListener("keydown", tryPlay);
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
    setPlaying((p) => !p);
  };

  return (
    <button
      onClick={toggle}
      className="music-toggle"
      title={playing ? "Pause music" : "Play music"}
      aria-label={playing ? "Pause music" : "Play music"}
    >
      <i className={`fas ${playing ? "fa-pause" : "fa-music"}`} />
    </button>
  );
}
