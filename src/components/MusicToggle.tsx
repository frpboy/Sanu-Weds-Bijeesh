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

    // Attempt autoplay immediately
    audio
      .play()
      .then(() => setPlaying(true))
      .catch(() => {
        // Browser blocked autoplay — start on first user interaction
        const startOnInteraction = () => {
          audio
            .play()
            .then(() => setPlaying(true))
            .catch(() => {});
          document.removeEventListener("click", startOnInteraction);
          document.removeEventListener("touchstart", startOnInteraction);
          document.removeEventListener("keydown", startOnInteraction);
        };
        document.addEventListener("click", startOnInteraction, { once: true });
        document.addEventListener("touchstart", startOnInteraction, { once: true });
        document.addEventListener("keydown", startOnInteraction, { once: true });
      });

    return () => {
      audio.pause();
      audio.src = "";
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
      audio.play();
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
