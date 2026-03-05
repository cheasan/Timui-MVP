import { useState } from 'react';
import { Search, Sparkles, TrendingUp, Clock, Zap } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { DealDetail } from './DealDetail';

interface Deal {
  id: string;
  brand: string;
  discount: string;
  category: string;
  imageUrl: string;
  isNew?: boolean;
  endingSoon?: boolean;
  title: string;
  description: string;
  terms: string[];
  code?: string;
  link?: string;
  validUntil: string;
  locations: Array<{
    id: string;
    name: string;
    address: string;
    distance?: number;
    lat: number;
    lng: number;
  }>;
}

const quickFilters = [
  { id: 'all', name: 'All', icon: Sparkles },
  { id: 'popular', name: 'Popular', icon: TrendingUp },
  { id: 'new', name: 'New', icon: Zap },
  { id: 'ending', name: 'Ending Soon', icon: Clock },
  { id: 'tech', name: 'Tech' },
  { id: 'food', name: 'Food' },
  { id: 'fashion', name: 'Fashion' },
];

const deals: Deal[] = [
  {
    id: '1',
    brand: 'Spotify',
    title: 'Premium Student Plan',
    discount: '50%',
    category: 'entertainment',
    imageUrl: 'https://images.unsplash.com/photo-1551817958-795f9440ce4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcG90aWZ5JTIwbXVzaWMlMjBzdHJlYW1pbmclMjBhcHB8ZW58MXx8fHwxNzcxOTM1MTcxfDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Get 50% off Spotify Premium as a student. Stream unlimited music, podcasts, and audiobooks ad-free. Download songs to listen offline. Enjoy the best sound quality.',
    terms: ['Must be enrolled in an accredited university', 'Verification required through SheerID', 'Offer valid for up to 4 years', 'Can be canceled anytime'],
    code: 'STUDENT50',
    validUntil: 'Ongoing',
    isNew: true,
    locations: [
      { id: '1', name: 'Online Only', address: 'Available worldwide', lat: 0, lng: 0 }
    ]
  },
  {
    id: '2',
    brand: 'Apple',
    title: 'Education Pricing on Mac',
    discount: '10%',
    category: 'tech',
    imageUrl: 'https://images.unsplash.com/photo-1719861566531-b1c880d89ed6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcHBsZSUyMG1hY2Jvb2slMjBsYXB0b3AlMjBzdHVkZW50fGVufDF8fHx8MTc3MjAzOTkxOHww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Save on Mac, iPad, and other products with Apple Education Pricing. Get student discounts on MacBook Air, MacBook Pro, and accessories. Free engraving available.',
    terms: ['Valid student ID required', 'Available to university students and parents', 'One device per academic year', 'Cannot be combined with other offers'],
    link: 'https://www.apple.com/education',
    validUntil: 'Year Round',
    locations: [
      { id: '1', name: 'Apple Store - Downtown', address: '123 Main St, City Center', lat: 40.7128, lng: -74.0060, distance: 0.8 },
      { id: '2', name: 'Apple Store - University Mall', address: '456 Campus Dr', lat: 40.7580, lng: -73.9855, distance: 2.3 },
      { id: '3', name: 'Apple Store - Tech Plaza', address: '789 Innovation Blvd', lat: 40.7489, lng: -73.9680, distance: 3.1 }
    ]
  },
  {
    id: '3',
    brand: 'Nike',
    title: 'Student Discount',
    discount: '15%',
    category: 'fashion',
    imageUrl: 'https://images.unsplash.com/photo-1637744360335-4df6d1d5ecf6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaWtlJTIwc25lYWtlcnMlMjBzaG9lc3xlbnwxfHx8fDE3NzE5MzI4MDF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Get 15% off on Nike sneakers, apparel, and gear. Unlock exclusive student pricing on the latest collections. Free shipping on orders over $50.',
    terms: ['Valid .edu email required', 'Discount applies to regular-priced items only', 'Cannot be used with other promotional codes', 'Revalidation required every 12 months'],
    code: 'NIKE15',
    validUntil: 'Mar 31, 2026',
    endingSoon: true,
    locations: [
      { id: '1', name: 'Nike Store - Sports Complex', address: '321 Athletic Way', lat: 40.7614, lng: -73.9776, distance: 1.2 },
      { id: '2', name: 'Nike Factory Outlet', address: '654 Outlet Dr', lat: 40.7282, lng: -74.0776, distance: 4.5 }
    ]
  },
  {
    id: '4',
    brand: 'Amazon Prime',
    title: 'Prime Student Membership',
    discount: '50%',
    category: 'tech',
    imageUrl: 'https://images.unsplash.com/photo-1633174524778-61a18ee54490?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbWF6b24lMjBwcmltZSUyMGRlbGl2ZXJ5JTIwYm94fGVufDF8fHx8MTc3MjAzOTkxOHww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Prime Student gives you 50% off Prime membership. Get FREE Two-Day Shipping, exclusive deals, Prime Video, Prime Music, and unlimited photo storage.',
    terms: ['6-month free trial available', 'Valid .edu email required', 'Auto-renews at discounted rate', 'Up to 4 years of eligibility'],
    link: 'https://www.amazon.com/student',
    validUntil: 'Ongoing',
    locations: [
      { id: '1', name: 'Online Only', address: 'Available worldwide', lat: 0, lng: 0 }
    ]
  },
  {
    id: '5',
    brand: 'Uber Eats',
    title: 'Student Discount',
    discount: '25%',
    category: 'food',
    imageUrl: 'https://images.unsplash.com/photo-1559941727-6fb446e7e8ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1YmVyJTIwZm9vZCUyMGRlbGl2ZXJ5fGVufDF8fHx8MTc3MjAzOTkxOXww&ixlib=rb-4.1.0&q=80&w=1080',
    description: '25% off on food delivery orders. Order from your favorite restaurants near campus. Contactless delivery available. Save on late-night study sessions.',
    terms: ['Valid for first-time Uber Eats users only', 'Minimum order value: $15', 'Maximum discount: $10', 'Valid until Apr 15, 2026'],
    code: 'STUDENT25',
    validUntil: 'Apr 15, 2026',
    isNew: true,
    locations: [
      { id: '1', name: 'Campus Food Court', address: 'University Student Center', lat: 40.7489, lng: -73.9680, distance: 0.3 },
      { id: '2', name: 'Downtown Restaurants', address: 'Various locations', lat: 40.7128, lng: -74.0060, distance: 1.5 }
    ]
  },
  {
    id: '6',
    brand: 'Adobe',
    title: 'Creative Cloud Student',
    discount: '60%',
    category: 'tech',
    imageUrl: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZG9iZSUyMGNyZWF0aXZlJTIwY2xvdWQlMjBkZXNpZ258ZW58MXx8fHwxNzcyMDM5OTE5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Access all Adobe Creative Cloud apps including Photoshop, Illustrator, Premiere Pro, and more. Get 100GB of cloud storage and Adobe Portfolio.',
    terms: ['Valid student ID required', 'Verification through institution required', 'Annual subscription only', 'Price increases after first year'],
    link: 'https://www.adobe.com/students',
    validUntil: 'Year Round',
    locations: [
      { id: '1', name: 'Online Only', address: 'Available worldwide', lat: 0, lng: 0 }
    ]
  },
  {
    id: '7',
    brand: 'Netflix',
    title: 'Mobile-Only Plan',
    discount: '30%',
    category: 'entertainment',
    imageUrl: 'https://images.unsplash.com/photo-1717295248299-74c084c31184?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXRmbGl4JTIwc3RyZWFtaW5nJTIwZW50ZXJ0YWlubWVudHxlbnwxfHx8fDE3NzE5NDI1NzR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Stream unlimited movies and TV shows on your mobile device with student pricing. Perfect for watching on the go between classes.',
    terms: ['Mobile streaming only', 'One device at a time', 'Student verification required', 'Cancel anytime'],
    code: 'STUDENTFLIX',
    validUntil: 'Ongoing',
    endingSoon: true,
    locations: [
      { id: '1', name: 'Online Only', address: 'Available worldwide', lat: 0, lng: 0 }
    ]
  },
  {
    id: '8',
    brand: 'Grammarly',
    title: 'Premium Student Discount',
    discount: '20%',
    category: 'tech',
    imageUrl: 'https://images.unsplash.com/photo-1554686844-d67d59760029?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFtbWFybHklMjB3cml0aW5nJTIwa2V5Ym9hcmR8ZW58MXx8fHwxNzcyMDM5OTIwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'Get advanced writing assistance for essays, papers, and assignments. Check grammar, spelling, punctuation, and plagiarism. Improve your writing style.',
    terms: ['Valid .edu email required', 'Annual subscription only', '20% off regular price', 'Access to all premium features'],
    code: 'STUDENT20',
    validUntil: 'Year Round',
    locations: [
      { id: '1', name: 'Online Only', address: 'Available worldwide', lat: 0, lng: 0 }
    ]
  }
];

interface DealsProps {
  onDetailViewChange?: (isDetailView: boolean) => void;
}

export function Deals({ onDetailViewChange }: DealsProps) {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showSearch, setShowSearch] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);

  const filteredDeals = deals.filter(deal => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'popular') return true; // Mock - all deals are popular
    if (selectedFilter === 'new') return deal.isNew;
    if (selectedFilter === 'ending') return deal.endingSoon;
    return deal.category === selectedFilter;
  });

  const handleSelectDeal = (deal: Deal) => {
    setSelectedDeal(deal);
    onDetailViewChange?.(true);
  };

  const handleBackToList = () => {
    setSelectedDeal(null);
    onDetailViewChange?.(false);
  };

  // Show detail view if a deal is selected
  if (selectedDeal) {
    return <DealDetail deal={selectedDeal} onBack={handleBackToList} />;
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1
            style={{
              fontSize: 'var(--text-2xl)',
              fontWeight: 'var(--font-weight-semibold)',
              fontFamily: 'Inter, sans-serif',
              color: 'var(--foreground)',
              marginBottom: '4px'
            }}
          >
            Student Deals
          </h1>
          <p
            style={{
              fontSize: 'var(--text-sm)',
              fontFamily: 'Inter, sans-serif',
              color: 'var(--muted-foreground)'
            }}
          >
            Save money on what you love 💜
          </p>
        </div>
        
        {/* Search Button */}
        <button
          onClick={() => setShowSearch(!showSearch)}
          className="backdrop-blur-xl border transition-all active:scale-95"
          style={{
            backgroundColor: 'var(--glass-card)',
            borderColor: 'var(--glass-border)',
            borderRadius: 'var(--radius-button)',
            width: '44px',
            height: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Search style={{ width: '20px', height: '20px', color: 'var(--foreground)' }} />
        </button>
      </div>

      {/* Quick Filters - Airbnb Style */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide" style={{ scrollbarWidth: 'none' }}>
        {quickFilters.map((filter) => {
          const Icon = filter.icon;
          const isSelected = selectedFilter === filter.id;
          return (
            <button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              className="flex items-center gap-2 px-4 py-2 shrink-0 transition-all active:scale-95"
              style={{
                backgroundColor: isSelected ? 'var(--foreground)' : 'var(--glass-card)',
                borderRadius: '9999px',
                border: `1px solid ${isSelected ? 'var(--foreground)' : 'var(--glass-border)'}`,
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-weight-medium)',
                fontFamily: 'Inter, sans-serif',
                color: isSelected ? 'var(--background)' : 'var(--foreground)',
                minHeight: '44px',
                whiteSpace: 'nowrap'
              }}
            >
              {Icon && <Icon style={{ width: '16px', height: '16px' }} />}
              {filter.name}
            </button>
          );
        })}
      </div>

      {/* Deals Grid - 2 Columns */}
      <div className="grid grid-cols-2 gap-4 pb-6">
        {filteredDeals.map((deal) => (
          <div
            key={deal.id}
            onClick={() => handleSelectDeal(deal)}
            className="backdrop-blur-xl border overflow-hidden active:scale-[0.97] transition-transform cursor-pointer"
            style={{
              backgroundColor: 'var(--glass-card)',
              borderColor: 'var(--glass-border)',
              borderRadius: 'var(--radius-card)'
            }}
          >
            {/* Deal Image */}
            <div className="relative aspect-square overflow-hidden">
              <ImageWithFallback
                src={deal.imageUrl}
                alt={deal.brand}
                className="w-full h-full object-cover"
              />
              
              {/* Discount Badge */}
              <div
                className="absolute top-2 right-2 px-2 py-1 backdrop-blur-xl"
                style={{
                  backgroundColor: 'rgba(130, 69, 254, 0.95)',
                  borderRadius: 'var(--radius-small)',
                }}
              >
                <span
                  style={{
                    fontSize: 'var(--text-xs)',
                    fontWeight: 'var(--font-weight-semibold)',
                    fontFamily: 'Inter, sans-serif',
                    color: 'white'
                  }}
                >
                  {deal.discount} OFF
                </span>
              </div>

              {/* Status Badge */}
              {(deal.isNew || deal.endingSoon) && (
                <div
                  className="absolute top-2 left-2 px-2 py-1 backdrop-blur-xl"
                  style={{
                    backgroundColor: deal.isNew ? 'rgba(16, 185, 129, 0.95)' : 'rgba(239, 68, 68, 0.95)',
                    borderRadius: 'var(--radius-small)',
                  }}
                >
                  <span
                    style={{
                      fontSize: 'var(--text-xs)',
                      fontWeight: 'var(--font-weight-semibold)',
                      fontFamily: 'Inter, sans-serif',
                      color: 'white'
                    }}
                  >
                    {deal.isNew ? 'NEW' : 'ENDING'}
                  </span>
                </div>
              )}
            </div>

            {/* Brand Name */}
            <div style={{ padding: '12px' }}>
              <h3
                style={{
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-semibold)',
                  fontFamily: 'Inter, sans-serif',
                  color: 'var(--foreground)'
                }}
              >
                {deal.brand}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredDeals.length === 0 && (
        <div className="text-center py-16">
          <Sparkles 
            className="mx-auto mb-4" 
            style={{ 
              width: '48px', 
              height: '48px',
              color: 'var(--muted-foreground)' 
            }} 
          />
          <p
            style={{
              fontSize: 'var(--text-sm)',
              fontFamily: 'Inter, sans-serif',
              color: 'var(--muted-foreground)'
            }}
          >
            No deals found in this category
          </p>
        </div>
      )}
    </div>
  );
}