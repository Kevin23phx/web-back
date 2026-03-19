import React, { useEffect, useRef } from 'react';
import { Card } from '../components/ui/card';

interface Report {
  _id: string;
  title: string;
  category: string;
  status: string;
  location?: {
    type: string;
    coordinates: number[]; // [longitude, latitude]
  };
}

interface AdminMapProps {
  reports: Report[];
}

// Declaration for Leaflet which is loaded via script tag
declare global {
  interface Window {
    L: any;
  }
}

const AdminMap: React.FC<AdminMapProps> = ({ reports }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  useEffect(() => {
    // Initialize map if not already initialized
    if (mapRef.current && !mapInstanceRef.current && window.L) {
      // Default center: Koudougou (BIT, Palogo – 6J8F+V5)
      const center: [number, number] = [12.2526, -2.3627];
      
      mapInstanceRef.current = window.L.map(mapRef.current).setView(center, 7);

      window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(mapInstanceRef.current);
    }

    // Update markers when reports change
    if (mapInstanceRef.current && window.L) {
      // Clear existing markers
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];

      if (reports.length > 0) {
        const bounds = window.L.latLngBounds([]);
        
        reports.forEach(report => {
          if (report.location?.coordinates) {
            const [lng, lat] = report.location.coordinates;
            
            // Create custom icon or simple marker
            const marker = window.L.marker([lat, lng])
              .bindPopup(`
                <div class="p-2">
                  <h3 class="font-bold text-sm">${report.title}</h3>
                  <p class="text-xs text-gray-600">Catégorie: ${report.category}</p>
                  <p class="text-xs font-semibold ${report.status === 'resolved' ? 'text-green-600' : 'text-orange-600'}">
                    Statut: ${report.status}
                  </p>
                  <a href="/admin/reports/${report._id}" class="text-blue-600 text-xs hover:underline mt-1 inline-block">
                    Voir détails
                  </a>
                </div>
              `)
              .addTo(mapInstanceRef.current);
            
            markersRef.current.push(marker);
            bounds.extend([lat, lng]);
          }
        });

        // Fit map to markers if there are markers, otherwise stay at default
        if (markersRef.current.length > 0) {
          mapInstanceRef.current.fitBounds(bounds, { padding: [50, 50] });
        }
      }
    }

    return () => {
      // Cleanup is handled by keeping the instance in ref
    };
  }, [reports]);

  return (
    <Card className="overflow-hidden mb-8 border-none shadow-xl bg-white/50 backdrop-blur-sm">
      <div className="p-4 bg-green-600 text-white flex justify-between items-center">
        <h2 className="font-bold flex items-center gap-2">
          <span className="h-2 w-2 bg-white rounded-full animate-pulse" />
          Carte des signalements (Temps Réel)
        </h2>
        <span className="text-xs font-medium bg-white/20 px-2 py-1 rounded-full text-white/90">
          Source: OpenStreetMap
        </span>
      </div>
      <div 
        ref={mapRef} 
        style={{ height: '400px', width: '100%' }} 
        className="z-0"
      />
      <div className="p-2 bg-gray-50 text-[10px] text-gray-500 text-center italic border-t">
        Cette carte utilise OpenStreetMap pour une fiabilité maximale sans erreur de chargement.
      </div>
    </Card>
  );
};

export default AdminMap;
