'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface DesktopIconProps {
  icon: string;
  label: string;
  onDoubleClick: () => void;
}

export default function DesktopIcon({ icon, label, onDoubleClick }: DesktopIconProps) {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <motion.div
      className="flex flex-col items-center w-20 cursor-pointer select-none"
      drag
      dragMomentum={false}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      onDoubleClick={(e) => {
        e.preventDefault();
        onDoubleClick();
      }}
      animate={{
        scale: isDragging ? 1.1 : 1,
      }}
      style={{
        position: 'absolute',
        left: '50px',
        top: '50px',
      }}
    >
      <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center mb-1">
        <span className="text-4xl">{icon}</span>
      </div>
      <span className="text-white text-sm text-center">{label}</span>
    </motion.div>
  );
} 