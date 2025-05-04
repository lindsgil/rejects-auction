'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useDeviceDetect } from '../hooks/useDeviceDetect';

interface DraggableIconProps {
  initialX: number;
  initialY: number;
  icon: string;
  label: string;
  onDoubleClick: () => void;
}

export default function DraggableIcon({ initialX, initialY, icon, label, onDoubleClick }: DraggableIconProps) {
  const { isMobile, isTablet } = useDeviceDetect();
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const iconRef = useRef<HTMLDivElement>(null);
  const lastTapRef = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (isMobile || isTablet) {
      const currentTime = new Date().getTime();
      const tapLength = currentTime - lastTapRef.current;
      
      if (tapLength < 300 && tapLength > 0) {
        // Double tap detected
        onDoubleClick();
      } else {
        // Start dragging
        setIsDragging(true);
        setDragOffset({
          x: e.touches[0].clientX - position.x,
          y: e.touches[0].clientY - position.y,
        });
      }
      lastTapRef.current = currentTime;
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    setPosition({
      x: e.touches[0].clientX - dragOffset.x,
      y: e.touches[0].clientY - dragOffset.y,
    });
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    setDragOffset({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragOffset.x,
      y: e.clientY - dragOffset.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      if (isMobile || isTablet) {
        document.addEventListener('touchmove', handleTouchMove, { passive: false });
        document.addEventListener('touchend', handleTouchEnd);
      } else {
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
      }
    }
    return () => {
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset, isMobile, isTablet, handleMouseMove]);

  return (
    <div
      ref={iconRef}
      className="w-12 h-12 flex flex-col items-center justify-center cursor-pointer bg-gray-100 rounded-lg transition-colors absolute"
      style={{
        left: position.x,
        top: position.y,
        userSelect: isDragging ? 'none' : 'auto',
        cursor: isDragging ? 'grabbing' : 'pointer',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '20px',
        padding: '8px'
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onDoubleClick={onDoubleClick}
    >
      <Image height={48} width={48} src={icon} alt={label} />
      <span className="text-[12px] mt-0.5 font-prestige">{label}</span>
    </div>
  );
} 
