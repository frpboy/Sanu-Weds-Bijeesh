"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { Howl } from "howler";

/**
 * useAudio Hook - Cinematic Audio Experience for "Uyire"
 * 
 * Features:
 * - Low-pass filter at 400Hz when muffled (gate closed)
 * - Ramps to 20000Hz when unmuted (gate open)
 * - Volume fades from 0 to 0.6 over 3 seconds
 * - Uses Web Audio API for filter control with Howler.js
 */
export function useAudio(src: string) {
  const [sound, setSound] = useState<Howl | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMuffled, setIsMuffled] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  const filterRef = useRef<BiquadFilterNode | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  useEffect(() => {
    const audio = new Howl({
      src: [src],
      html5: true, // Required for large files
      preload: true,
      volume: 0, // Start silent, we'll fade in
      onload: () => {
        setIsLoaded(true);
      },
      onplay: () => {
        setIsPlaying(true);
        setupAudioFilter();
      },
    });

    /**
     * Setup Web Audio API filter chain:
     * Audio Element → Source → LowPass Filter → Gain → Destination
     */
    const setupAudioFilter = () => {
      if (!audioCtxRef.current) {
        // Get the underlying audio element from Howler
        // @ts-ignore - Accessing Howler's internal sound node
        const audioElement = audio._sounds[0]?._node;
        
        if (audioElement) {
          const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
          const ctx = new AudioContext();
          audioCtxRef.current = ctx;

          // Create source from audio element
          const source = ctx.createMediaElementSource(audioElement);
          sourceRef.current = source;

          // Create low-pass filter (starts at 400Hz - muffled)
          const filter = ctx.createBiquadFilter();
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(400, ctx.currentTime);
          filter.Q.value = 1; // Resonance for smoother filter
          filterRef.current = filter;

          // Create gain node for volume control
          const gainNode = ctx.createGain();
          gainNode.gain.setValueAtTime(0, ctx.currentTime);
          gainNodeRef.current = gainNode;

          // Connect the chain: source → filter → gain → destination
          source.connect(filter);
          filter.connect(gainNode);
          gainNode.connect(ctx.destination);
        }
      }
    };

    setSound(audio);

    return () => {
      audio.unload();
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, [src]);

  /**
   * unmute - Opens the "Gate"
   * - Ramps filter from 400Hz to 20000Hz (clear audio)
   * - Fades volume from 0 to 0.6 over 3 seconds
   */
  const unmute = useCallback(() => {
    if (sound && audioCtxRef.current && filterRef.current && gainNodeRef.current) {
      const ctx = audioCtxRef.current;
      const filter = filterRef.current;
      const gainNode = gainNodeRef.current;
      const now = ctx.currentTime;

      // Ramp filter frequency from 400Hz to 20000Hz over 3 seconds
      filter.frequency.cancelScheduledValues(now);
      filter.frequency.setValueAtTime(filter.frequency.value, now);
      filter.frequency.exponentialRampToValueAtTime(20000, now + 3);

      // Fade volume from current to 0.6 over 3 seconds
      gainNode.gain.cancelScheduledValues(now);
      gainNode.gain.setValueAtTime(gainNode.gain.value, now);
      gainNode.gain.linearRampToValueAtTime(0.6, now + 3);

      setIsMuffled(false);
    }
  }, [sound]);

  /**
   * play - Starts audio playback (call this before unmute)
   */
  const play = useCallback(() => {
    if (sound) {
      sound.play();
    }
  }, [sound]);

  /**
   * stop - Stops playback and resets filter
   */
  const stop = useCallback(() => {
    if (sound) {
      sound.stop();
      setIsPlaying(false);
      setIsMuffled(true);
    }
    
    // Reset filter for next play
    if (audioCtxRef.current && filterRef.current && gainNodeRef.current) {
      const ctx = audioCtxRef.current;
      filterRef.current.frequency.setValueAtTime(400, ctx.currentTime);
      gainNodeRef.current.gain.setValueAtTime(0, ctx.currentTime);
    }
  }, [sound]);

  return { 
    sound, 
    isLoaded, 
    isMuffled, 
    isPlaying,
    unmute, 
    play,
    stop 
  };
}
