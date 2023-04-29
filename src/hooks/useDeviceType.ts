import { useState, useEffect } from 'react';

type DeviceType = 'desktop' | 'mobile';

// Function to determine device type based on user agent
function isMobileDevice(userAgent: string): boolean {
    const regex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    return regex.test(userAgent);
}

export function useDeviceType(serverUserAgent: string): DeviceType {
    const initialDeviceType = isMobileDevice(serverUserAgent) ? 'mobile' : 'desktop';
    const [deviceType, setDeviceType] = useState<DeviceType>(initialDeviceType);

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth <= 768) {
                setDeviceType('mobile');
            } else {
                setDeviceType('desktop');
            }
        }
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return deviceType;
}
