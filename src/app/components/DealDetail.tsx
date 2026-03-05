import { useState, useEffect } from 'react';
import { ChevronLeft, Share2, MapPin, Navigation, Clock, Copy, ExternalLink, CheckCircle2 } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Location {
  id: string;
  name: string;
  address: string;
  distance?: number;
  lat: number;
  lng: number;
}

interface Deal {
  id: string;
  brand: string;
  title: string;
  discount: string;
  category: string;
  imageUrl: string;
  description: string;
  terms: string[];
  code?: string;
  link?: string;
  validUntil: string;
  locations: Location[];
  isNew?: boolean;
  endingSoon?: boolean;
}

interface DealDetailProps {
  deal: Deal;
  onBack: () => void;
}

export function DealDetail({ deal, onBack }: DealDetailProps) {
  const [copied, setCopied] = useState(false);
  const [locationPermission, setLocationPermission] = useState<'granted' | 'denied' | 'prompt'>('prompt');
  const [sortedLocations, setSortedLocations] = useState(deal.locations);

  useEffect(() => {
    // Check location permission status
    if (navigator.permissions) {
      navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        setLocationPermission(result.state as 'granted' | 'denied' | 'prompt');
      });
    }
  }, []);

  const handleCopyCode = () => {
    if (deal.code) {
      navigator.clipboard.writeText(deal.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${deal.brand} - ${deal.discount} OFF`,
          text: deal.description,
          url: window.location.href
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    }
  };

  const handleUseLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;
          
          // Calculate distances and sort
          const locationsWithDistance = deal.locations.map(loc => {
            if (loc.lat === 0 && loc.lng === 0) {
              // Online only
              return { ...loc, distance: undefined };
            }
            
            // Haversine formula for distance calculation
            const R = 3959; // Earth's radius in miles
            const dLat = ((loc.lat - userLat) * Math.PI) / 180;
            const dLng = ((loc.lng - userLng) * Math.PI) / 180;
            const a =
              Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos((userLat * Math.PI) / 180) *
                Math.cos((loc.lat * Math.PI) / 180) *
                Math.sin(dLng / 2) *
                Math.sin(dLng / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            const distance = R * c;
            
            return { ...loc, distance: Math.round(distance * 10) / 10 };
          }).sort((a, b) => {
            if (a.distance === undefined) return 1;
            if (b.distance === undefined) return -1;
            return a.distance - b.distance;
          });
          
          setSortedLocations(locationsWithDistance);
          setLocationPermission('granted');
        },
        (error) => {
          console.error('Location error:', {
            code: error.code,
            message: error.message,
            PERMISSION_DENIED: error.PERMISSION_DENIED,
            POSITION_UNAVAILABLE: error.POSITION_UNAVAILABLE,
            TIMEOUT: error.TIMEOUT
          });
          setLocationPermission('denied');
          // Use original locations without distance calculation
          setSortedLocations(deal.locations);
        }
      );
    }
  };

  const openInMaps = (location: Location) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.address)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="w-full min-h-screen pb-6">
      {/* Hero Image */}
      <div className="relative h-64 -mx-6 -mt-6 mb-6">
        <ImageWithFallback
          src={deal.imageUrl}
          alt={deal.brand}
          className="w-full h-full object-cover"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {/* Back Button */}
        <button
          onClick={onBack}
          className="absolute top-6 left-6 backdrop-blur-xl transition-all active:scale-95"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: 'var(--radius-button)',
            width: '44px',
            height: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <ChevronLeft style={{ width: '24px', height: '24px', color: 'var(--foreground)' }} />
        </button>
        
        {/* Share Button */}
        <button
          onClick={handleShare}
          className="absolute top-6 right-6 backdrop-blur-xl transition-all active:scale-95"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: 'var(--radius-button)',
            width: '44px',
            height: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Share2 style={{ width: '20px', height: '20px', color: 'var(--foreground)' }} />
        </button>
        
        {/* Discount Badge */}
        <div
          className="absolute bottom-6 right-6 px-4 py-2 backdrop-blur-xl"
          style={{
            backgroundColor: 'rgba(130, 69, 254, 0.95)',
            borderRadius: 'var(--radius-button)',
          }}
        >
          <span
            style={{
              fontSize: 'var(--text-xl)',
              fontWeight: 'var(--font-weight-bold)',
              fontFamily: 'Inter, sans-serif',
              color: 'white'
            }}
          >
            {deal.discount} OFF
          </span>
        </div>
      </div>

      {/* Content */}
      <div>
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <h1
              style={{
                fontSize: 'var(--text-2xl)',
                fontWeight: 'var(--font-weight-semibold)',
                fontFamily: 'Inter, sans-serif',
                color: 'var(--foreground)'
              }}
            >
              {deal.brand}
            </h1>
            {deal.isNew && (
              <span
                className="px-2 py-1"
                style={{
                  backgroundColor: 'rgba(16, 185, 129, 0.1)',
                  color: 'rgb(16, 185, 129)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 'var(--font-weight-semibold)',
                  fontFamily: 'Inter, sans-serif',
                  borderRadius: 'var(--radius-small)'
                }}
              >
                NEW
              </span>
            )}
            {deal.endingSoon && (
              <span
                className="px-2 py-1"
                style={{
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                  color: 'rgb(239, 68, 68)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 'var(--font-weight-semibold)',
                  fontFamily: 'Inter, sans-serif',
                  borderRadius: 'var(--radius-small)'
                }}
              >
                ENDING SOON
              </span>
            )}
          </div>
          <h2
            className="mb-3"
            style={{
              fontSize: 'var(--text-lg)',
              fontWeight: 'var(--font-weight-medium)',
              fontFamily: 'Inter, sans-serif',
              color: 'var(--foreground)'
            }}
          >
            {deal.title}
          </h2>
          <div className="flex items-center gap-2">
            <Clock style={{ width: '16px', height: '16px', color: 'var(--muted-foreground)' }} />
            <span
              style={{
                fontSize: 'var(--text-sm)',
                fontFamily: 'Inter, sans-serif',
                color: 'var(--muted-foreground)'
              }}
            >
              Valid until {deal.validUntil}
            </span>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <p
            style={{
              fontSize: 'var(--text-base)',
              fontFamily: 'Inter, sans-serif',
              color: 'var(--foreground)',
              lineHeight: '1.6'
            }}
          >
            {deal.description}
          </p>
        </div>

        {/* Code/Link Card */}
        {(deal.code || deal.link) && (
          <div
            className="backdrop-blur-xl border mb-6"
            style={{
              backgroundColor: 'var(--glass-card)',
              borderColor: 'var(--glass-border)',
              borderRadius: 'var(--radius-card)',
              padding: '16px'
            }}
          >
            {deal.code && (
              <div>
                <p
                  className="mb-2"
                  style={{
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--font-weight-medium)',
                    fontFamily: 'Inter, sans-serif',
                    color: 'var(--muted-foreground)'
                  }}
                >
                  Promo Code
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="flex-1"
                    style={{
                      backgroundColor: 'var(--background)',
                      borderRadius: 'var(--radius-input)',
                      padding: '12px 16px',
                      border: '2px dashed var(--primary)'
                    }}
                  >
                    <span
                      style={{
                        fontSize: 'var(--text-lg)',
                        fontWeight: 'var(--font-weight-semibold)',
                        fontFamily: 'Inter, sans-serif',
                        color: 'var(--primary)',
                        letterSpacing: '0.05em'
                      }}
                    >
                      {deal.code}
                    </span>
                  </div>
                  <button
                    onClick={handleCopyCode}
                    className="transition-all active:scale-95"
                    style={{
                      backgroundColor: copied ? 'rgb(16, 185, 129)' : 'var(--primary)',
                      borderRadius: 'var(--radius-button)',
                      width: '44px',
                      height: '44px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {copied ? (
                      <CheckCircle2 style={{ width: '20px', height: '20px', color: 'white' }} />
                    ) : (
                      <Copy style={{ width: '20px', height: '20px', color: 'white' }} />
                    )}
                  </button>
                </div>
              </div>
            )}
            {deal.link && (
              <button
                onClick={() => window.open(deal.link, '_blank')}
                className="w-full flex items-center justify-center gap-2 transition-all active:scale-98"
                style={{
                  backgroundColor: 'var(--primary)',
                  borderRadius: 'var(--radius-button)',
                  padding: '14px',
                  marginTop: deal.code ? '12px' : '0'
                }}
              >
                <span
                  style={{
                    fontSize: 'var(--text-base)',
                    fontWeight: 'var(--font-weight-semibold)',
                    fontFamily: 'Inter, sans-serif',
                    color: 'white'
                  }}
                >
                  Get Deal Online
                </span>
                <ExternalLink style={{ width: '18px', height: '18px', color: 'white' }} />
              </button>
            )}
          </div>
        )}

        {/* Locations Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3
              style={{
                fontSize: 'var(--text-lg)',
                fontWeight: 'var(--font-weight-semibold)',
                fontFamily: 'Inter, sans-serif',
                color: 'var(--foreground)'
              }}
            >
              Where to Redeem
            </h3>
            {locationPermission !== 'granted' && sortedLocations.some(loc => loc.distance !== undefined) && (
              <button
                onClick={handleUseLocation}
                className="flex items-center gap-2 px-3 py-2 transition-all active:scale-95"
                style={{
                  backgroundColor: 'var(--primary)',
                  borderRadius: 'var(--radius-button)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 'var(--font-weight-medium)',
                  fontFamily: 'Inter, sans-serif',
                  color: 'white'
                }}
              >
                <Navigation style={{ width: '14px', height: '14px' }} />
                Use My Location
              </button>
            )}
          </div>

          <div className="space-y-3">
            {sortedLocations.map((location) => (
              <div
                key={location.id}
                onClick={() => location.distance !== undefined && openInMaps(location)}
                className="backdrop-blur-xl border transition-all active:scale-[0.98]"
                style={{
                  backgroundColor: 'var(--glass-card)',
                  borderColor: 'var(--glass-border)',
                  borderRadius: 'var(--radius-card)',
                  padding: '16px',
                  cursor: location.distance !== undefined ? 'pointer' : 'default'
                }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="flex-shrink-0"
                    style={{
                      backgroundColor: 'rgba(130, 69, 254, 0.1)',
                      borderRadius: 'var(--radius-button)',
                      width: '40px',
                      height: '40px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <MapPin style={{ width: '20px', height: '20px', color: 'var(--primary)' }} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4
                        style={{
                          fontSize: 'var(--text-base)',
                          fontWeight: 'var(--font-weight-semibold)',
                          fontFamily: 'Inter, sans-serif',
                          color: 'var(--foreground)'
                        }}
                      >
                        {location.name}
                      </h4>
                      {location.distance !== undefined && (
                        <span
                          style={{
                            fontSize: 'var(--text-sm)',
                            fontWeight: 'var(--font-weight-medium)',
                            fontFamily: 'Inter, sans-serif',
                            color: 'var(--primary)'
                          }}
                        >
                          {location.distance} mi
                        </span>
                      )}
                    </div>
                    <p
                      style={{
                        fontSize: 'var(--text-sm)',
                        fontFamily: 'Inter, sans-serif',
                        color: 'var(--muted-foreground)',
                        lineHeight: '1.5'
                      }}
                    >
                      {location.address}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Terms & Conditions */}
        <div>
          <h3
            className="mb-3"
            style={{
              fontSize: 'var(--text-lg)',
              fontWeight: 'var(--font-weight-semibold)',
              fontFamily: 'Inter, sans-serif',
              color: 'var(--foreground)'
            }}
          >
            Terms & Conditions
          </h3>
          <div
            className="backdrop-blur-xl border"
            style={{
              backgroundColor: 'var(--glass-card)',
              borderColor: 'var(--glass-border)',
              borderRadius: 'var(--radius-card)',
              padding: '16px'
            }}
          >
            <ul className="space-y-2">
              {deal.terms.map((term, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2"
                >
                  <span
                    style={{
                      color: 'var(--primary)',
                      fontSize: 'var(--text-sm)',
                      marginTop: '4px'
                    }}
                  >
                    •
                  </span>
                  <span
                    style={{
                      fontSize: 'var(--text-sm)',
                      fontFamily: 'Inter, sans-serif',
                      color: 'var(--muted-foreground)',
                      lineHeight: '1.6',
                      flex: 1
                    }}
                  >
                    {term}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}