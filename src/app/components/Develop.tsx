import { useState } from 'react';
import { Search, Sparkles, Heart, Briefcase, Zap, GraduationCap, MapPin, Clock, DollarSign } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { OpportunityDetail } from './OpportunityDetail';

interface Opportunity {
  id: string;
  title: string;
  organization: string;
  type: 'volunteer' | 'internship' | 'gig' | 'entry-job';
  imageUrl: string;
  location: string;
  duration?: string;
  pay?: string;
  isRemote?: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
}

interface DevelopProps {
  onDetailViewChange?: (isDetailView: boolean) => void;
}

const quickFilters = [
  { id: 'all', name: 'All', icon: Sparkles },
  { id: 'volunteer', name: 'Volunteering', icon: Heart },
  { id: 'internship', name: 'Internships', icon: GraduationCap },
  { id: 'gig', name: 'Quick Gigs', icon: Zap },
  { id: 'entry-job', name: 'Entry Jobs', icon: Briefcase },
];

const opportunities: Opportunity[] = [
  {
    id: '1',
    title: 'Social Media Volunteer',
    organization: 'Local Food Bank',
    type: 'volunteer',
    imageUrl: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    location: 'Downtown',
    duration: '2-4 hrs/week',
    isNew: true
  },
  {
    id: '2',
    title: 'Software Engineering Intern',
    organization: 'TechCorp',
    type: 'internship',
    imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    location: 'San Francisco',
    duration: '3 months',
    pay: '$25/hr',
    isFeatured: true
  },
  {
    id: '3',
    title: 'Event Setup Assistant',
    organization: 'Campus Events',
    type: 'gig',
    imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    location: 'University',
    duration: '1 day',
    pay: '$18/hr'
  },
  {
    id: '4',
    title: 'Junior Marketing Associate',
    organization: 'StartupHub',
    type: 'entry-job',
    imageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    location: 'Remote',
    pay: '$45k-55k',
    isRemote: true,
    isFeatured: true
  },
  {
    id: '5',
    title: 'Community Tutor',
    organization: 'Youth Education Project',
    type: 'volunteer',
    imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    location: 'Community Center',
    duration: '3 hrs/week'
  },
  {
    id: '6',
    title: 'UX Design Intern',
    organization: 'Design Studio',
    type: 'internship',
    imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    location: 'New York',
    duration: '6 months',
    pay: '$22/hr',
    isNew: true
  },
  {
    id: '7',
    title: 'Freelance Content Writer',
    organization: 'Content Agency',
    type: 'gig',
    imageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    location: 'Remote',
    pay: '$50/article',
    isRemote: true
  },
  {
    id: '8',
    title: 'Customer Success Rep',
    organization: 'SaaS Company',
    type: 'entry-job',
    imageUrl: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    location: 'Austin',
    pay: '$40k-50k'
  },
  {
    id: '9',
    title: 'Environmental Cleanup',
    organization: 'Green Earth Initiative',
    type: 'volunteer',
    imageUrl: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    location: 'City Park',
    duration: 'Weekends',
    isNew: true
  },
  {
    id: '10',
    title: 'Data Analyst Intern',
    organization: 'Finance Corp',
    type: 'internship',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    location: 'Chicago',
    duration: '4 months',
    pay: '$28/hr',
    isFeatured: true
  },
  {
    id: '11',
    title: 'Social Media Manager',
    organization: 'Local Business',
    type: 'gig',
    imageUrl: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    location: 'Nearby',
    duration: 'Flexible',
    pay: '$200/week'
  },
  {
    id: '12',
    title: 'Junior Software Developer',
    organization: 'Tech Startup',
    type: 'entry-job',
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080',
    location: 'Remote',
    pay: '$60k-70k',
    isRemote: true,
    isNew: true
  }
];

const typeColors = {
  volunteer: { bg: 'rgba(16, 185, 129, 0.1)', text: 'rgb(16, 185, 129)' },
  internship: { bg: 'rgba(59, 130, 246, 0.1)', text: 'rgb(59, 130, 246)' },
  gig: { bg: 'rgba(245, 158, 11, 0.1)', text: 'rgb(245, 158, 11)' },
  'entry-job': { bg: 'rgba(168, 85, 247, 0.1)', text: 'rgb(168, 85, 247)' }
};

const typeLabels = {
  volunteer: 'Volunteer',
  internship: 'Internship',
  gig: 'Quick Gig',
  'entry-job': 'Entry Job'
};

export function Develop({ onDetailViewChange }: DevelopProps) {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showSearch, setShowSearch] = useState(false);
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);

  const filteredOpportunities = opportunities.filter(opp => {
    if (selectedFilter === 'all') return true;
    return opp.type === selectedFilter;
  });

  const handleSelectOpportunity = (opp: Opportunity) => {
    setSelectedOpportunity(opp);
    onDetailViewChange?.(true);
  };

  const handleBackToList = () => {
    setSelectedOpportunity(null);
    onDetailViewChange?.(false);
  };

  // If an opportunity is selected, show detail page
  if (selectedOpportunity) {
    return (
      <OpportunityDetail 
        opportunity={selectedOpportunity} 
        onBack={handleBackToList} 
      />
    );
  }

  // Otherwise show list view
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
          >Develop</h1>
          <p
            style={{
              fontSize: 'var(--text-sm)',
              fontFamily: 'Inter, sans-serif',
              color: 'var(--muted-foreground)'
            }}
          >
            Build experience, earn, and grow 💼
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

      {/* Quick Filters */}
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
              <Icon style={{ width: '16px', height: '16px' }} />
              {filter.name}
            </button>
          );
        })}
      </div>

      {/* Opportunities List */}
      <div className="space-y-4 pb-6">
        {filteredOpportunities.map((opp) => (
          <div
            key={opp.id}
            onClick={() => handleSelectOpportunity(opp)}
            className="backdrop-blur-xl border overflow-hidden active:scale-[0.98] transition-transform cursor-pointer"
            style={{
              backgroundColor: 'var(--glass-card)',
              borderColor: 'var(--glass-border)',
              borderRadius: 'var(--radius-card)'
            }}
          >
            <div className="flex gap-4" style={{ padding: '16px' }}>
              {/* Image */}
              <div
                className="flex-shrink-0 overflow-hidden"
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: 'var(--radius-small)'
                }}
              >
                <ImageWithFallback
                  src={opp.imageUrl}
                  alt={opp.organization}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                {/* Title & Badges */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3
                    style={{
                      fontSize: 'var(--text-base)',
                      fontWeight: 'var(--font-weight-semibold)',
                      fontFamily: 'Inter, sans-serif',
                      color: 'var(--foreground)',
                      lineHeight: '1.4'
                    }}
                  >
                    {opp.title}
                  </h3>
                  {(opp.isNew || opp.isFeatured) && (
                    <span
                      className="flex-shrink-0 px-2 py-1"
                      style={{
                        backgroundColor: opp.isNew ? 'rgba(16, 185, 129, 0.1)' : 'rgba(130, 69, 254, 0.1)',
                        color: opp.isNew ? 'rgb(16, 185, 129)' : 'var(--primary)',
                        fontSize: 'var(--text-xs)',
                        fontWeight: 'var(--font-weight-semibold)',
                        fontFamily: 'Inter, sans-serif',
                        borderRadius: 'var(--radius-small)'
                      }}
                    >
                      {opp.isNew ? 'NEW' : '⭐'}
                    </span>
                  )}
                </div>

                {/* Organization */}
                <p
                  className="mb-3"
                  style={{
                    fontSize: 'var(--text-sm)',
                    fontFamily: 'Inter, sans-serif',
                    color: 'var(--muted-foreground)'
                  }}
                >
                  {opp.organization}
                </p>

                {/* Meta Info */}
                <div className="flex flex-wrap gap-3">
                  {/* Type Badge */}
                  <span
                    className="inline-flex items-center px-2 py-1"
                    style={{
                      backgroundColor: typeColors[opp.type].bg,
                      color: typeColors[opp.type].text,
                      fontSize: 'var(--text-xs)',
                      fontWeight: 'var(--font-weight-medium)',
                      fontFamily: 'Inter, sans-serif',
                      borderRadius: 'var(--radius-small)'
                    }}
                  >
                    {typeLabels[opp.type]}
                  </span>

                  {/* Location */}
                  <span
                    className="inline-flex items-center gap-1"
                    style={{
                      fontSize: 'var(--text-xs)',
                      fontFamily: 'Inter, sans-serif',
                      color: 'var(--muted-foreground)'
                    }}
                  >
                    <MapPin style={{ width: '12px', height: '12px' }} />
                    {opp.location}
                  </span>

                  {/* Duration */}
                  {opp.duration && (
                    <span
                      className="inline-flex items-center gap-1"
                      style={{
                        fontSize: 'var(--text-xs)',
                        fontFamily: 'Inter, sans-serif',
                        color: 'var(--muted-foreground)'
                      }}
                    >
                      <Clock style={{ width: '12px', height: '12px' }} />
                      {opp.duration}
                    </span>
                  )}

                  {/* Pay */}
                  {opp.pay && (
                    <span
                      className="inline-flex items-center gap-1"
                      style={{
                        fontSize: 'var(--text-xs)',
                        fontWeight: 'var(--font-weight-medium)',
                        fontFamily: 'Inter, sans-serif',
                        color: 'var(--primary)'
                      }}
                    >
                      <DollarSign style={{ width: '12px', height: '12px' }} />
                      {opp.pay}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredOpportunities.length === 0 && (
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
            No opportunities found in this category
          </p>
        </div>
      )}
    </div>
  );
}