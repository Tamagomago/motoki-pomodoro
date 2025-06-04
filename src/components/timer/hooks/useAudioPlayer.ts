import { useEffect, useRef } from 'react';

function useAudioPlayer(
  src: string,
  shouldPlay: boolean,
  volume = 1,
  onCleanup?: (audio: HTMLAudioElement) => void,
  loop = true
) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(src);
      audioRef.current.volume = volume;
      audioRef.current.loop = loop;
    }

    const audio = audioRef.current;

    if (shouldPlay) {
      audio.play().catch((err) => console.error('Audio play error:', err));
    } else {
      audio.pause();
    }

    return () => {
      if (onCleanup) {
        onCleanup(audio);
      } else {
        audio.pause();
      }
    };
  }, [shouldPlay, src, loop]);
}

export default useAudioPlayer;
