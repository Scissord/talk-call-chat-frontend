import React, { useRef, useState } from 'react';
import styles from './chat_audio.module.scss';
import { Icon } from 'components/lib';

export const ChatAudio = ({ src }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("0:00");

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const togglePlayPause = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    const currentProgress = (audioRef.current.currentTime / audioRef.current.duration) * 100;
    setProgress(currentProgress);
    setCurrentTime(formatTime(audioRef.current.currentTime));
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime("0:00");
  };

  return (
    <div className={styles.chat_audio_container}>
      <audio ref={audioRef} src={src} onTimeUpdate={handleTimeUpdate} onEnded={handleEnded} />

      {!isPlaying ? (
        <div 
          onClick={togglePlayPause}
          className='p-2 hover bg-[#0086FF] cursor-pointer rounded-md'
        >
          <Icon 
            image={'play-circle'} 
            size={18} 
            color="white"
          />
        </div>
      ) : (
        <div 
          onClick={togglePlayPause}
          className='p-2 hover bg-[#0086FF] cursor-pointer rounded-md'
        >
          <Icon 
            image={'pause'} 
            size={18} 
            color="white"
          />
        </div>
      )}

      <div className={styles.progress_bar_container}>
        <div className={styles.progress_bar} style={{ width: `${progress}%` }}></div>
        <span className={styles.current_time}>{currentTime}</span>
      </div>
    </div>
  );
};
