import { useEffect, useState } from 'react';
import { isMobile, isTablet } from 'react-device-detect';

export function useDeviceDetect() {
  const [isMobileDevice, setIsMobileDevice] = useState(false);
  const [isTabletDevice, setIsTabletDevice] = useState(false);

  useEffect(() => {
    setIsMobileDevice(isMobile);
    setIsTabletDevice(isTablet);
  }, []);

  return {
    isMobile: isMobileDevice,
    isTablet: isTabletDevice,
    isDesktop: !isMobileDevice && !isTabletDevice
  };
} 