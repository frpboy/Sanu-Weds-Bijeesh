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
          cleanup();
        })
        .catch(() => {
          // Still blocked — keep listeners alive, retry on next interaction
        });
    }

    function cleanup() {
      document.removeEventListener("click", tryPlay);
      document.removeEventListener("touchend", tryPlay);
      document.removeEventListener("keydown", tryPlay);
    }

    // Expose a direct handle so other components (e.g. SaveTheDateModal)
    // can call audio.play() from within their own gesture handler — this
    // keeps the user-gesture trust chain intact on Android Chrome.
    (window as Window & { __startMusic?: () => void }).__startMusic = tryPlay;

    // Attempt immediately (works on desktop / permissive browsers)
    tryPlay();

    // Fallback: retry on every subsequent interaction
    document.addEventListener("click", tryPlay);
    document.addEventListener("touchend", tryPlay);
    document.addEventListener("keydown", tryPlay);

    return () => {
      audio.pause();
      audio.src = "";
      cleanup();
      delete (window as Window & { __startMusic?: () => void }).__startMusic;
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
