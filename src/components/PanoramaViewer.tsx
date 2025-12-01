please enhance this code to make functional:

import { useEffect, useRef, useState } from 'react';
import 'pannellum/build/pannellum.js';
import 'pannellum/build/pannellum.css';

declare global {
  interface Window {
    pannellum: any;
  }
}

interface Location {
  name: string;
  driveId: string;
  imageUrl: string;
}

const locations: Location[] = [
  {
    name: 'Site A - Main Plaza',
    driveId: '1ABC123',
    imageUrl: '/Panorama.jpg'
  },
  {
    name: 'Site B - Emergency Center',
    driveId: '1XYZ789',
    imageUrl: '/Panorama.jpg'
  },
  {
    name: 'Site C - Evacuation Point',
    driveId: '1DEF456',
    imageUrl: '/Panorama.jpg'
  }
];

export default function PanoramaViewer() {
  const viewerContainer = useRef<HTMLDivElement>(null);
  const viewerInstance = useRef<any>(null);
  const [selectedLocation, setSelectedLocation] = useState<string>(locations[0].driveId);

  useEffect(() => {
    if (!viewerContainer.current) return;

    const currentLocation = locations.find(loc => loc.driveId === selectedLocation);
    if (!currentLocation) return;

    if (viewerInstance.current) {
      viewerInstance.current.destroy();
    }

    viewerInstance.current = window.pannellum.viewer(viewerContainer.current, {
      type: 'equirectangular',
      panorama: currentLocation.imageUrl,
      autoLoad: true,
      showControls: true,
      showFullscreenCtrl: true,
      showZoomCtrl: true,
      mouseZoom: true,
      draggable: true,
      keyboardZoom: true,
      autoRotate: -2,
      compass: true,
      northOffset: 0,
      hfov: 100,
      pitch: 0,
      yaw: 0
    });

    return () => {
      if (viewerInstance.current) {
        viewerInstance.current.destroy();
        viewerInstance.current = null;
      }
    };
  }, [selectedLocation]);

  const handleLocationChange = (driveId: string) => {
    setSelectedLocation(driveId);
  };

  return (
    <div className="w-full h-full bg-white/40 backdrop-blur-md rounded-3xl shadow-2xl p-6 border border-white/50 flex flex-col">
      <div className="mb-4">
        <label className="block text-[#1a1a2e] font-semibold mb-2 text-sm">
          Select Location:
        </label>
        <select
          value={selectedLocation}
          onChange={(e) => handleLocationChange(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-white/80 border-2 border-white/60 shadow-lg focus:outline-none focus:ring-2 focus:ring-sky-400 text-gray-700 font-medium transition-all"
        >
          {locations.map((location) => (
            <option key={location.driveId} value={location.driveId}>
              {location.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-1 rounded-2xl overflow-hidden shadow-inner bg-gray-900">
        <div ref={viewerContainer} className="w-full h-full"></div>
      </div>

      <div className="mt-4 text-center text-sm text-[#1a1a2e]/70 font-medium">
        Use mouse to look around • Scroll to zoom • Click and drag to rotate
      </div>
    </div>
  );
}
