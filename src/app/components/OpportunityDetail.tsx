import { ArrowLeft, MapPin, Clock, DollarSign, Bookmark, Share2, Calendar, Award, CheckCircle2, Building2 } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

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

interface OpportunityDetailProps {
  opportunity: Opportunity;
  onBack: () => void;
}

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

// Mock detailed content based on type
const getDetailedContent = (opp: Opportunity) => {
  const baseContent = {
    volunteer: {
      description: `Join our team and make a real difference in the community! We're looking for passionate volunteers to help with ${opp.title.toLowerCase()}. Perfect for building experience and giving back.`,
      responsibilities: [
        'Engage with community members',
        'Assist with daily operations',
        'Help organize and coordinate activities',
        'Document impact and create reports'
      ],
      requirements: [
        'Passion for helping others',
        'Good communication skills',
        'Reliable and punctual',
        'Team player attitude'
      ],
      benefits: [
        'Build meaningful experience',
        'Network with community leaders',
        'Receive volunteer certificate',
        'Flexible scheduling'
      ]
    },
    internship: {
      description: `Exciting ${opp.title} opportunity at ${opp.organization}! Gain hands-on experience, learn from industry professionals, and build your portfolio while working on real projects.`,
      responsibilities: [
        'Work on real-world projects',
        'Collaborate with experienced team members',
        'Participate in team meetings and planning',
        'Deliver high-quality work on schedule'
      ],
      requirements: [
        'Currently enrolled in relevant program',
        'Strong problem-solving skills',
        'Eagerness to learn and grow',
        'Portfolio or relevant coursework'
      ],
      benefits: [
        'Mentorship from senior staff',
        'Networking opportunities',
        'Potential for full-time offer',
        'Real-world experience'
      ]
    },
    gig: {
      description: `Quick and flexible ${opp.title} gig at ${opp.organization}. Perfect for students looking to earn extra income while maintaining a flexible schedule. Get paid quickly for your work!`,
      responsibilities: [
        'Complete assigned tasks efficiently',
        'Maintain quality standards',
        'Communicate progress regularly',
        'Meet agreed-upon deadlines'
      ],
      requirements: [
        'Available on specified dates',
        'Self-motivated and reliable',
        'Good time management',
        'Relevant skills or experience'
      ],
      benefits: [
        'Flexible schedule',
        'Quick payment',
        'Build your portfolio',
        'Potential for repeat work'
      ]
    },
    'entry-job': {
      description: `${opp.organization} is seeking a ${opp.title} to join our growing team. This entry-level position offers great growth potential and the chance to launch your career with a forward-thinking company.`,
      responsibilities: [
        'Execute daily tasks and projects',
        'Collaborate with cross-functional teams',
        'Meet performance goals and KPIs',
        'Contribute to team success'
      ],
      requirements: [
        "Bachelor's degree or equivalent",
        'Strong work ethic',
        'Excellent communication skills',
        '0-2 years experience (training provided)'
      ],
      benefits: [
        'Competitive salary',
        'Health benefits',
        'Career growth opportunities',
        'Professional development'
      ]
    }
  };

  return baseContent[opp.type];
};

export function OpportunityDetail({ opportunity, onBack }: OpportunityDetailProps) {
  const content = getDetailedContent(opportunity);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: opportunity.title,
          text: `${opportunity.title} at ${opportunity.organization}`,
          url: window.location.href
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    }
  };

  return (
    <div className="w-full">
      {/* Header with back button */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onBack}
          className="backdrop-blur-xl border active:scale-95 transition-transform"
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
          <ArrowLeft style={{ width: '20px', height: '20px', color: 'var(--foreground)' }} />
        </button>

        <div className="flex gap-2">
          <button
            onClick={handleShare}
            className="backdrop-blur-xl border active:scale-95 transition-transform"
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
            <Share2 style={{ width: '20px', height: '20px', color: 'var(--foreground)' }} />
          </button>

          <button
            className="backdrop-blur-xl border active:scale-95 transition-transform"
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
            <Bookmark style={{ width: '20px', height: '20px', color: 'var(--foreground)' }} />
          </button>
        </div>
      </div>

      {/* Hero Image */}
      <div 
        className="relative overflow-hidden mb-6"
        style={{ 
          height: '240px',
          borderRadius: 'var(--radius-card)'
        }}
      >
        <ImageWithFallback
          src={opportunity.imageUrl}
          alt={opportunity.organization}
          className="w-full h-full object-cover"
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          {opportunity.isNew && (
            <span
              className="px-3 py-1 backdrop-blur-xl"
              style={{
                backgroundColor: 'rgba(16, 185, 129, 0.9)',
                color: 'white',
                fontSize: 'var(--text-xs)',
                fontWeight: 'var(--font-weight-semibold)',
                fontFamily: 'Inter, sans-serif',
                borderRadius: 'var(--radius-small)'
              }}
            >
              NEW
            </span>
          )}
          {opportunity.isFeatured && (
            <span
              className="px-3 py-1 backdrop-blur-xl"
              style={{
                backgroundColor: 'rgba(130, 69, 254, 0.9)',
                color: 'white',
                fontSize: 'var(--text-xs)',
                fontWeight: 'var(--font-weight-semibold)',
                fontFamily: 'Inter, sans-serif',
                borderRadius: 'var(--radius-small)'
              }}
            >
              ⭐ FEATURED
            </span>
          )}
        </div>
      </div>

      {/* Title & Organization */}
      <div className="mb-6">
        <h1
          className="mb-2"
          style={{
            fontSize: 'var(--text-2xl)',
            fontWeight: 'var(--font-weight-semibold)',
            fontFamily: 'Inter, sans-serif',
            color: 'var(--foreground)',
            lineHeight: '1.3'
          }}
        >
          {opportunity.title}
        </h1>
        <div className="flex items-center gap-2 mb-4">
          <Building2 style={{ width: '16px', height: '16px', color: 'var(--muted-foreground)' }} />
          <p
            style={{
              fontSize: 'var(--text-base)',
              fontFamily: 'Inter, sans-serif',
              color: 'var(--muted-foreground)'
            }}
          >
            {opportunity.organization}
          </p>
        </div>

        {/* Type Badge */}
        <span
          className="inline-flex items-center px-3 py-1.5"
          style={{
            backgroundColor: typeColors[opportunity.type].bg,
            color: typeColors[opportunity.type].text,
            fontSize: 'var(--text-sm)',
            fontWeight: 'var(--font-weight-medium)',
            fontFamily: 'Inter, sans-serif',
            borderRadius: 'var(--radius-small)'
          }}
        >
          {typeLabels[opportunity.type]}
        </span>
      </div>

      {/* Quick Info Grid */}
      <div 
        className="grid grid-cols-2 gap-3 mb-6 backdrop-blur-xl border"
        style={{
          backgroundColor: 'white',
          borderColor: 'rgba(130, 69, 254, 0.15)',
          borderRadius: 'var(--radius-card)',
          padding: '16px'
        }}
      >
        <div>
          <div className="flex items-center gap-2 mb-1">
            <MapPin style={{ width: '14px', height: '14px', color: 'var(--muted-foreground)' }} />
            <span
              style={{
                fontSize: 'var(--text-xs)',
                fontFamily: 'Inter, sans-serif',
                color: 'var(--muted-foreground)'
              }}
            >
              Location
            </span>
          </div>
          <p
            style={{
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-weight-medium)',
              fontFamily: 'Inter, sans-serif',
              color: 'var(--foreground)'
            }}
          >
            {opportunity.location}
          </p>
        </div>

        {opportunity.duration && (
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Clock style={{ width: '14px', height: '14px', color: 'var(--muted-foreground)' }} />
              <span
                style={{
                  fontSize: 'var(--text-xs)',
                  fontFamily: 'Inter, sans-serif',
                  color: 'var(--muted-foreground)'
                }}
              >
                Duration
              </span>
            </div>
            <p
              style={{
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-weight-medium)',
                fontFamily: 'Inter, sans-serif',
                color: 'var(--foreground)'
              }}
            >
              {opportunity.duration}
            </p>
          </div>
        )}

        {opportunity.pay && (
          <div>
            <div className="flex items-center gap-2 mb-1">
              <DollarSign style={{ width: '14px', height: '14px', color: 'var(--muted-foreground)' }} />
              <span
                style={{
                  fontSize: 'var(--text-xs)',
                  fontFamily: 'Inter, sans-serif',
                  color: 'var(--muted-foreground)'
                }}
              >
                {opportunity.type === 'entry-job' ? 'Salary' : 'Pay'}
              </span>
            </div>
            <p
              style={{
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-weight-semibold)',
                fontFamily: 'Inter, sans-serif',
                color: 'var(--primary)'
              }}
            >
              {opportunity.pay}
            </p>
          </div>
        )}

        <div>
          <div className="flex items-center gap-2 mb-1">
            <Calendar style={{ width: '14px', height: '14px', color: 'var(--muted-foreground)' }} />
            <span
              style={{
                fontSize: 'var(--text-xs)',
                fontFamily: 'Inter, sans-serif',
                color: 'var(--muted-foreground)'
              }}
            >
              Posted
            </span>
          </div>
          <p
            style={{
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-weight-medium)',
              fontFamily: 'Inter, sans-serif',
              color: 'var(--foreground)'
            }}
          >
            2 days ago
          </p>
        </div>
      </div>

      {/* Description */}
      <div className="mb-6">
        <h2
          className="mb-3"
          style={{
            fontSize: 'var(--text-lg)',
            fontWeight: 'var(--font-weight-semibold)',
            fontFamily: 'Inter, sans-serif',
            color: 'var(--foreground)'
          }}
        >
          About this opportunity
        </h2>
        <p
          style={{
            fontSize: 'var(--text-sm)',
            fontFamily: 'Inter, sans-serif',
            color: 'var(--muted-foreground)',
            lineHeight: '1.6'
          }}
        >
          {content.description}
        </p>
      </div>

      {/* Responsibilities */}
      <div className="mb-6">
        <h2
          className="mb-3"
          style={{
            fontSize: 'var(--text-lg)',
            fontWeight: 'var(--font-weight-semibold)',
            fontFamily: 'Inter, sans-serif',
            color: 'var(--foreground)'
          }}
        >
          Responsibilities
        </h2>
        <ul className="space-y-2">
          {content.responsibilities.map((item, index) => (
            <li key={index} className="flex gap-2">
              <CheckCircle2 
                className="flex-shrink-0 mt-0.5"
                style={{ 
                  width: '16px', 
                  height: '16px', 
                  color: typeColors[opportunity.type].text 
                }} 
              />
              <span
                style={{
                  fontSize: 'var(--text-sm)',
                  fontFamily: 'Inter, sans-serif',
                  color: 'var(--muted-foreground)',
                  lineHeight: '1.6'
                }}
              >
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Requirements */}
      <div className="mb-6">
        <h2
          className="mb-3"
          style={{
            fontSize: 'var(--text-lg)',
            fontWeight: 'var(--font-weight-semibold)',
            fontFamily: 'Inter, sans-serif',
            color: 'var(--foreground)'
          }}
        >
          Requirements
        </h2>
        <ul className="space-y-2">
          {content.requirements.map((item, index) => (
            <li key={index} className="flex gap-2">
              <CheckCircle2 
                className="flex-shrink-0 mt-0.5"
                style={{ 
                  width: '16px', 
                  height: '16px', 
                  color: 'var(--muted-foreground)' 
                }} 
              />
              <span
                style={{
                  fontSize: 'var(--text-sm)',
                  fontFamily: 'Inter, sans-serif',
                  color: 'var(--muted-foreground)',
                  lineHeight: '1.6'
                }}
              >
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Benefits */}
      <div className="mb-6">
        <h2
          className="mb-3"
          style={{
            fontSize: 'var(--text-lg)',
            fontWeight: 'var(--font-weight-semibold)',
            fontFamily: 'Inter, sans-serif',
            color: 'var(--foreground)'
          }}
        >
          What you'll get
        </h2>
        <ul className="space-y-2">
          {content.benefits.map((item, index) => (
            <li key={index} className="flex gap-2">
              <Award 
                className="flex-shrink-0 mt-0.5"
                style={{ 
                  width: '16px', 
                  height: '16px', 
                  color: 'var(--primary)' 
                }} 
              />
              <span
                style={{
                  fontSize: 'var(--text-sm)',
                  fontFamily: 'Inter, sans-serif',
                  color: 'var(--muted-foreground)',
                  lineHeight: '1.6'
                }}
              >
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Apply Button - Fixed at bottom */}
      <div className="pb-6">
        <button
          className="w-full active:scale-[0.98] transition-transform"
          style={{
            backgroundColor: 'var(--primary)',
            color: 'white',
            borderRadius: 'var(--radius-button)',
            height: '52px',
            fontSize: 'var(--text-base)',
            fontWeight: 'var(--font-weight-semibold)',
            fontFamily: 'Inter, sans-serif'
          }}
        >
          {opportunity.type === 'volunteer' ? 'Sign Up' : 'Apply Now'}
        </button>
      </div>
    </div>
  );
}