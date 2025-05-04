'use client';

import { useRef, useEffect } from 'react';

interface VideoPlayerProps {
  videoUrl: string;
  modelInfo?: {
    artist: string;
    medium: string;
  };
}

export default function VideoPlayer({ videoUrl, modelInfo }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error('Error playing video:', error);
      });
    }
  }, []);

  return (
    <div className="w-full h-full flex">
      <div className="w-2/3 h-full">
        <video
          ref={videoRef}
          className="w-full h-full object-contain"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <div className="w-1/3 p-4">
        <h2 className="text-xl font-review text-white mb-4 text-center">Info</h2>
        <table className="w-full text-white font-prestige">
          <tbody>
            <tr className="border-b border-gray-700">
              <td className="py-2 pr-4"><strong>Artist: </strong></td>
              <td className="py-2">{modelInfo?.artist || 'Unknown'}</td>
            </tr>
            <tr className="border-b border-gray-700">
              <td className="py-2 pr-4"><strong>Medium: </strong></td>
              <td className="py-2">{modelInfo?.medium || 'Unknown'}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
} 