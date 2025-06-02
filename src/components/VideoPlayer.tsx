import React, { useState, useRef } from 'react';

interface VideoPlayerProps {
  src: string;
  caption?: string;
  className?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, caption, className }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayClick = () => {
    if (!hasLoaded) {
      // Set the video source only when first clicked
      if (videoRef.current) {
        videoRef.current.src = src;
        setHasLoaded(true);
      }
    }
    
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative pt-[56.25%]"> {/* 16:9 aspect ratio */}
        {!isPlaying && (
          <button
            onClick={handlePlayClick}
            className="absolute inset-0 w-full h-full flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-50 transition-all"
            aria-label="Play video"
          >
            <svg
              className="w-16 h-16 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
        <video
          ref={videoRef}
          className="absolute top-0 left-0 w-full h-full object-cover"
          controls={isPlaying}
          onClick={handlePlayClick}
        />
      </div>
      {caption && (
        <div className="p-4 bg-white">
          <p className="text-gray-600">{caption}</p>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
