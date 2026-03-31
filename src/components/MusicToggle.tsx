"use client";
import { useState, useEffect, useRef } from "react";

export default function MusicToggle() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  // Shared flag — readable by both the gesture listeners AND the toggle button
  const startedRef = useRef(false);

  useEffect(() => {
    const audio = new Audio("/music.mp3");
    audio.loop = true;
    audio.volume = 0.4;
    audio.preload = "auto"; // start buffering immediately so it's ready on first touch
    audioRef.current = audio;

    function cleanup() {
      document.removeEventListener("touchstart", tryPlay);
      document.removeEventListener("touchend", tryPlay);
      document.removeEventListener("click", tryPlay);
      document.removeEventListener("keydown", tryPlay);
    }

    function tryPlay() {
      if (startedRef.current) return;
      audio
        .play()
        .then(() => {
          startedRef.current = true;
          setPlaying(true);
          cleanup();
        })
        .catch(() => {
          // Browser still blocking — keep listeners, retry on next gesture
        });
    }

    // Expose for SaveTheDateModal to call directly inside its gesture handler
    (window as Window & { __startMusic?: () => void }).__startMusic = tryPlay;

    // Try immediately (works on desktop / browsers without strict autoplay)
    tryPlay();

    // Retry on every interaction until it sticks — covers returning visitors
    // who've already dismissed the modal. Both touchstart + touchend for
    // maximum Android Chrome compatibility.
    document.addEventListener("touchstart", tryPlay, { passive: true });
    document.addEventListener("touchend", tryPlay, { passive: true });
    document.addEventListener("click", tryPlay);
    document.addEventListener("keydown", tryPlay);

    return () => {
      audio.pause();
      audio.src = "";
      cleanup();
      delete (window as Window & { __startMusic?: () => void }).__startMusic;
    };
  }, []);

  const toggle = () => {
    if (typeof navigator !== "undefined" && "vibrate" in navigator) navigator.vibrate(10);
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().then(() => {
        startedRef.current = true;
        setPlaying(true);
      }).catch(() => {});
    }
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
