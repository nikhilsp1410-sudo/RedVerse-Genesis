import { createContext, useContext, useState, useEffect, useRef } from 'react';

const AudioContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAudio = () => useContext(AudioContext);

export const AudioProvider = ({ children }) => {
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    // Create an audio element with a generic low ambient hum
    // In production, this would be a high-quality ambient track.
    const audio = new Audio('https://www.soundjay.com/misc/sounds/wind-howl-01.mp3');
    audio.loop = true;
    audio.volume = 0.2; // Keep it subtle
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.pause();
      } else {
        // Attempt to play (browsers require user interaction first)
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.log("Audio play prevented by browser policy:", error);
            setIsMuted(true);
          });
        }
      }
    }
  }, [isMuted]);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <AudioContext.Provider value={{ isMuted, toggleMute }}>
      {children}
    </AudioContext.Provider>
  );
};
