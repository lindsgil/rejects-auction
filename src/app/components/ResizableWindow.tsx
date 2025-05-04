'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useDeviceDetect } from '../hooks/useDeviceDetect';

interface ResizableWindowProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  initialPosition?: { x: number; y: number };
}

export default function ResizableWindow({ 
  title, 
  children, 
  onClose,
  initialPosition = { x: 100, y: 100 }
}: ResizableWindowProps) {
  const { isMobile, isTablet } = useDeviceDetect();
  const [position, setPosition] = useState(initialPosition);
  const [size, setSize] = useState({ width: 600, height: 500 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isResizing, setIsResizing] = useState(false);
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0 });
  const [isMaximized, setIsMaximized] = useState(false);
  const windowRef = useRef<HTMLDivElement>(null);
  const originalSize = useRef(size);
  const originalPosition = useRef(position);

  useEffect(() => {
    if (isMobile || isTablet) {
      setSize({ width: window.innerWidth, height: window.innerHeight });
      setPosition({ x: 0, y: 0 });
    }
  }, [isMobile, isTablet]);

  const handleMaximize = () => {
    if (isMaximized) {
      setSize(originalSize.current);
      setPosition(originalPosition.current);
    } else {
      originalSize.current = size;
      originalPosition.current = position;
      setSize({ width: window.innerWidth, height: window.innerHeight });
      setPosition({ x: 0, y: 0 });
    }
    setIsMaximized(!isMaximized);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.target instanceof HTMLElement && e.target.closest('.title-bar')) {
      setIsDragging(true);
      setDragOffset({
        x: e.clientX - position.x,
        y: e.clientY - position.y,
      });
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y,
      });
    } else if (isResizing) {
      const newWidth = Math.max(300, size.width + (e.clientX - resizeStart.x));
      const newHeight = Math.max(200, size.height + (e.clientY - resizeStart.y));
      setSize({ width: newWidth, height: newHeight });
      setResizeStart({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  useEffect(() => {
    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, size, resizeStart]);

  return (
    <div
      ref={windowRef}
      className="fixed bg-black text-white rounded-lg shadow-lg border border-gray-300 overflow-hidden flex flex-col"
      style={{
        left: isMobile || isTablet ? 0 : position.x,
        top: isMobile || isTablet ? 0 : position.y,
        width: isMobile || isTablet ? '100vw' : size.width,
        height: isMobile || isTablet ? '100vh' : size.height,
        userSelect: isDragging || isResizing ? 'none' : 'auto',
        backgroundColor: "black",
        borderRadius: isMobile || isTablet ? '0' : '0.5rem',
        zIndex: 50
      }}
    >
      <div
        className="title-bar bg-gray-800 p-2 cursor-move flex justify-between items-center border-b-2"
        style={{
          borderBottomColor: '#8bd200'
        }}
        onMouseDown={handleMouseDown}
      >
        <button
          onClick={onClose}
          className="bg-black cursor-pointer flex items-center justify-center hover:opacity-80 border-0"
          style={{
            backgroundColor: "black"
          }}
        >
          <Image src="/x_icon.png" alt="Close" width={24} height={24} />
        </button>
        <span className="text-[24px] font-review text-white flex-1 text-center">{title}</span>
        {!isMobile && !isTablet && (
          <button
            onClick={handleMaximize}
            className="bg-black cursor-pointer flex items-center justify-center hover:opacity-80 border-0"
            style={{
              backgroundColor: "black"
            }}
          >
            <Image 
              src={isMaximized ? "/minus_icon.png" : "/plus_icon.png"} 
              alt={isMaximized ? "Restore" : "Maximize"} 
              width={24} 
              height={24} 
            />
          </button>
        )}
      </div>
      <div className="flex-1 overflow-y-auto p-[20px] mt-0 space-y-4">
        {children}
      </div>
      {!isMobile && !isTablet && (
        <div
          className="absolute bottom-0 right-0 w-8 h-8 cursor-se-resize"
          onMouseDown={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsResizing(true);
            setResizeStart({ x: e.clientX, y: e.clientY });
          }}
          style={{
            zIndex: 10,
            background: 'linear-gradient(135deg, transparent 50%, #8bd200 50%)',
            borderBottom: '8px solid #8bd200',
            borderRight: '8px solid #8bd200',
            position: 'absolute',
            bottom: 0,
            right: 0
          }}
        />
      )}
    </div>
  );
} 