import { useState, useEffect } from 'react';
import { User, Briefcase, Wallet, Share2, Plus, CreditCard, IdCard, Moon, Sun, X, Edit2, Mail, Phone, Linkedin, Github, Globe, Award, BookOpen, Code, Heart, Languages, FileText, Eye, ChevronRight, ChevronLeft, Trash2 } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { TelegramUser } from '../../telegram/TelegramProvider';

interface ProfileInfo {
  name: string;
  university: string;
  major: string;
  year: string;
  email: string;
  phone: string;
  bio: string;
  linkedin: string;
  github: string;
  portfolio: string;
  profileImage: string;
}

interface CVSection {
  id: string;
  type: 'education' | 'experience' | 'projects' | 'skills' | 'achievements' | 'volunteer' | 'languages' | 'certifications' | 'extracurricular';
  title: string;
  description: string;
  organization?: string;
  startDate?: string;
  endDate?: string;
  current?: boolean;
  level?: string;
}

interface WalletCard {
  id: string;
  type: 'student-id' | 'national-id' | 'drivers-license' | 'other';
  name: string;
  number: string;
  institution?: string;
  validUntil?: string;
  imageUrl?: string;
}

interface ProfileProps {
  user: TelegramUser | null;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onCVBuilderChange?: (isActive: boolean) => void;
}

type ViewMode = 'main' | 'cv' | 'wallet';

export function Profile({ user, isDarkMode, onToggleDarkMode, onCVBuilderChange }: ProfileProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('main');

  useEffect(() => {
    if (user) {
      setProfileInfo(prev => ({
        ...prev,
        name: `${user.firstName} ${user.lastName || ''}`.trim()
      }));
    }
  }, [user]);
  const [selectedCard, setSelectedCard] = useState<WalletCard | null>(null);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showAddCV, setShowAddCV] = useState(false);
  const [showAddCard, setShowAddCard] = useState(false);
  const [editingSection, setEditingSection] = useState<CVSection | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  // Profile state
  const [profileInfo, setProfileInfo] = useState<ProfileInfo>({
    name: 'Alex Johnson',
    university: 'University Name',
    major: 'Bachelor of Laws (LLB)',
    year: 'Year 1',
    email: 'alex.johnson@university.edu',
    phone: '+1 (555) 123-4567',
    bio: 'Passionate law student interested in criminal justice and human rights. Eager to gain practical experience through internships and volunteer work.',
    linkedin: 'linkedin.com/in/alexjohnson',
    github: '',
    portfolio: '',
    profileImage: 'https://images.unsplash.com/photo-1568880893176-fb2bdab44e41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwcHJvZmlsZSUyMHBvcnRyYWl0fGVufDF8fHx8MTc3MDM2NjU2M3ww&ixlib=rb-4.1.0&q=80&w=200'
  });

  // Temporary edit state
  const [editProfileData, setEditProfileData] = useState<ProfileInfo>(profileInfo);

  const [cvSections, setCvSections] = useState<CVSection[]>([
    {
      id: '1',
      type: 'education',
      title: 'Bachelor of Laws (LLB)',
      description: 'Relevant coursework: Criminal Law, Constitutional Law, Tort Law, Contract Law',
      organization: 'University Name',
      startDate: '2025',
      endDate: '2029',
      current: true
    },
    {
      id: '2',
      type: 'education',
      title: 'High School Diploma',
      description: 'GPA: 3.8/4.0 | Honor Roll | National Honor Society',
      organization: 'Lincoln High School',
      startDate: '2021',
      endDate: '2025'
    },
    {
      id: '3',
      type: 'skills',
      title: 'Legal Research & Writing',
      description: 'Proficient in legal research databases and legal writing formats',
      level: 'Intermediate'
    },
    {
      id: '4',
      type: 'skills',
      title: 'Microsoft Office Suite',
      description: 'Word, Excel, PowerPoint, Outlook',
      level: 'Advanced'
    },
    {
      id: '5',
      type: 'volunteer',
      title: 'Legal Aid Volunteer',
      description: 'Assisted attorneys with client intake and document preparation for low-income families',
      organization: 'Community Legal Center',
      startDate: 'Summer 2025',
      endDate: 'Present',
      current: true
    }
  ]);

  const [walletCards, setWalletCards] = useState<WalletCard[]>([
    {
      id: '1',
      type: 'student-id',
      name: 'Student ID Card',
      number: '2025-XXXX',
      institution: 'University Name',
      validUntil: '2029',
      imageUrl: 'https://images.unsplash.com/photo-1613826488523-b537c0cab318?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50JTIwaWQlMjBjYXJkfGVufDF8fHx8MTc3MDQ0MDYzMHww&ixlib=rb-4.1.0&q=80&w=400'
    }
  ]);

  // Form state for adding/editing CV sections
  const [newCVType, setNewCVType] = useState<CVSection['type']>('education');
  const [newCVTitle, setNewCVTitle] = useState('');
  const [newCVDesc, setNewCVDesc] = useState('');
  const [newCVOrg, setNewCVOrg] = useState('');
  const [newCVStartDate, setNewCVStartDate] = useState('');
  const [newCVEndDate, setNewCVEndDate] = useState('');
  const [newCVCurrent, setNewCVCurrent] = useState(false);
  const [newCVLevel, setNewCVLevel] = useState('');

  // Form state for wallet cards
  const [newCardType, setNewCardType] = useState<'student-id' | 'national-id' | 'drivers-license' | 'other'>('student-id');
  const [newCardName, setNewCardName] = useState('');
  const [newCardNumber, setNewCardNumber] = useState('');
  const [newCardInstitution, setNewCardInstitution] = useState('');
  const [newCardValidUntil, setNewCardValidUntil] = useState('');

  // Handle view mode changes
  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode);
    if (onCVBuilderChange) {
      onCVBuilderChange(mode === 'cv');
    }
  };

  const saveProfileEdit = () => {
    setProfileInfo(editProfileData);
    setShowEditProfile(false);
  };

  const cancelProfileEdit = () => {
    setEditProfileData(profileInfo);
    setShowEditProfile(false);
  };

  const resetCVForm = () => {
    setNewCVTitle('');
    setNewCVDesc('');
    setNewCVOrg('');
    setNewCVStartDate('');
    setNewCVEndDate('');
    setNewCVCurrent(false);
    setNewCVLevel('');
  };

  const addCVSection = () => {
    if (!newCVTitle.trim() || !newCVDesc.trim()) return;
    const section: CVSection = {
      id: Date.now().toString(),
      type: newCVType,
      title: newCVTitle,
      description: newCVDesc,
      organization: newCVOrg || undefined,
      startDate: newCVStartDate || undefined,
      endDate: newCVCurrent ? undefined : (newCVEndDate || undefined),
      current: newCVCurrent || undefined,
      level: newCVLevel || undefined
    };
    setCvSections([...cvSections, section]);
    resetCVForm();
    setShowAddCV(false);
  };

  const updateCVSection = () => {
    if (!editingSection) return;
    if (!newCVTitle.trim() || !newCVDesc.trim()) return;
    
    const updatedSection: CVSection = {
      ...editingSection,
      title: newCVTitle,
      description: newCVDesc,
      organization: newCVOrg || undefined,
      startDate: newCVStartDate || undefined,
      endDate: newCVCurrent ? undefined : (newCVEndDate || undefined),
      current: newCVCurrent || undefined,
      level: newCVLevel || undefined
    };
    
    setCvSections(cvSections.map(s => s.id === editingSection.id ? updatedSection : s));
    resetCVForm();
    setEditingSection(null);
  };

  const startEditSection = (section: CVSection) => {
    setEditingSection(section);
    setNewCVType(section.type);
    setNewCVTitle(section.title);
    setNewCVDesc(section.description);
    setNewCVOrg(section.organization || '');
    setNewCVStartDate(section.startDate || '');
    setNewCVEndDate(section.endDate || '');
    setNewCVCurrent(section.current || false);
    setNewCVLevel(section.level || '');
  };

  const cancelEditSection = () => {
    setEditingSection(null);
    resetCVForm();
  };

  const deleteCVSection = (id: string) => {
    setCvSections(cvSections.filter(s => s.id !== id));
  };

  const addWalletCard = () => {
    if (!newCardName.trim() || !newCardNumber.trim()) return;
    const card: WalletCard = {
      id: Date.now().toString(),
      type: newCardType,
      name: newCardName,
      number: newCardNumber,
      institution: newCardInstitution,
      validUntil: newCardValidUntil
    };
    setWalletCards([...walletCards, card]);
    setNewCardName('');
    setNewCardNumber('');
    setNewCardInstitution('');
    setNewCardValidUntil('');
    setShowAddCard(false);
  };

  const getCardIcon = (type: string) => {
    switch (type) {
      case 'student-id':
      case 'national-id':
        return <IdCard className="w-5 h-5" />;
      case 'drivers-license':
        return <CreditCard className="w-5 h-5" />;
      default:
        return <CreditCard className="w-5 h-5" />;
    }
  };

  const getCardGradient = (type: string) => {
    switch (type) {
      case 'student-id':
        return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
      case 'national-id':
        return 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)';
      case 'drivers-license':
        return 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)';
      default:
        return 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)';
    }
  };

  const getSectionIcon = (type: CVSection['type']) => {
    switch (type) {
      case 'education':
        return <BookOpen className="w-4 h-4" />;
      case 'experience':
        return <Briefcase className="w-4 h-4" />;
      case 'projects':
        return <Code className="w-4 h-4" />;
      case 'skills':
        return <Award className="w-4 h-4" />;
      case 'achievements':
        return <Award className="w-4 h-4" />;
      case 'volunteer':
        return <Heart className="w-4 h-4" />;
      case 'languages':
        return <Languages className="w-4 h-4" />;
      case 'certifications':
        return <FileText className="w-4 h-4" />;
      case 'extracurricular':
        return <User className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const getSectionColor = (type: CVSection['type']) => {
    switch (type) {
      case 'education':
        return { bg: 'rgba(59, 130, 246, 0.1)', text: 'rgb(59, 130, 246)' };
      case 'experience':
        return { bg: 'rgba(168, 85, 247, 0.1)', text: 'rgb(168, 85, 247)' };
      case 'projects':
        return { bg: 'rgba(245, 158, 11, 0.1)', text: 'rgb(245, 158, 11)' };
      case 'skills':
        return { bg: 'rgba(16, 185, 129, 0.1)', text: 'rgb(16, 185, 129)' };
      case 'achievements':
        return { bg: 'rgba(251, 191, 36, 0.1)', text: 'rgb(251, 191, 36)' };
      case 'volunteer':
        return { bg: 'rgba(236, 72, 153, 0.1)', text: 'rgb(236, 72, 153)' };
      case 'languages':
        return { bg: 'rgba(99, 102, 241, 0.1)', text: 'rgb(99, 102, 241)' };
      case 'certifications':
        return { bg: 'rgba(14, 165, 233, 0.1)', text: 'rgb(14, 165, 233)' };
      case 'extracurricular':
        return { bg: 'rgba(239, 68, 68, 0.1)', text: 'rgb(239, 68, 68)' };
      default:
        return { bg: 'rgba(156, 163, 175, 0.1)', text: 'rgb(156, 163, 175)' };
    }
  };

  const handleShareProfile = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${profileInfo.name}'s Profile`,
          text: `Check out ${profileInfo.name}'s profile - ${profileInfo.major} at ${profileInfo.university}`,
          url: window.location.href
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      alert('Profile sharing link: ' + window.location.href);
    }
  };

  // Group sections by type for better organization
  const groupedSections = cvSections.reduce((acc, section) => {
    if (!acc[section.type]) {
      acc[section.type] = [];
    }
    acc[section.type].push(section);
    return acc;
  }, {} as Record<string, CVSection[]>);

  const totalCVSections = cvSections.length;

  // CV Preview Modal
  if (showPreview) {
    return (
      <div 
        className="fixed inset-0 z-50 overflow-y-auto"
        style={{ backgroundColor: 'white' }}
      >
        <div className="max-w-4xl mx-auto px-6 py-8">
          {/* Close Button */}
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setShowPreview(false)}
              className="p-2 active:opacity-70 transition-opacity"
              style={{ 
                backgroundColor: 'var(--glass-card)',
                borderRadius: 'var(--radius-button)',
                minWidth: '44px',
                minHeight: '44px'
              }}
            >
              <X style={{ width: '20px', height: '20px', color: 'var(--foreground)' }} />
            </button>
          </div>

          {/* CV Preview Content */}
          <div style={{ backgroundColor: 'white', color: '#000' }}>
            {/* Header */}
            <div className="text-center mb-8">
              <h1 style={{
                fontSize: '32px',
                fontWeight: '700',
                fontFamily: 'Inter, sans-serif',
                color: '#000',
                marginBottom: '8px'
              }}>{profileInfo.name}</h1>
              <p style={{
                fontSize: '18px',
                fontFamily: 'Inter, sans-serif',
                color: '#666',
                marginBottom: '4px'
              }}>{profileInfo.major}</p>
              <p style={{
                fontSize: '16px',
                fontFamily: 'Inter, sans-serif',
                color: '#666',
                marginBottom: '16px'
              }}>{profileInfo.university}</p>
              
              {/* Contact Info */}
              <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                {profileInfo.email && (
                  <span style={{ fontSize: '14px', fontFamily: 'Inter, sans-serif', color: '#8245FE' }}>
                    {profileInfo.email}
                  </span>
                )}
                {profileInfo.phone && (
                  <span style={{ fontSize: '14px', fontFamily: 'Inter, sans-serif', color: '#8245FE' }}>
                    {profileInfo.phone}
                  </span>
                )}
                {profileInfo.linkedin && (
                  <span style={{ fontSize: '14px', fontFamily: 'Inter, sans-serif', color: '#8245FE' }}>
                    {profileInfo.linkedin}
                  </span>
                )}
              </div>
            </div>

            {/* Bio */}
            {profileInfo.bio && (
              <div className="mb-8">
                <h2 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  fontFamily: 'Inter, sans-serif',
                  color: '#000',
                  marginBottom: '12px',
                  borderBottom: '2px solid #8245FE',
                  paddingBottom: '8px'
                }}>About</h2>
                <p style={{
                  fontSize: '14px',
                  fontFamily: 'Inter, sans-serif',
                  color: '#333',
                  lineHeight: '1.6'
                }}>{profileInfo.bio}</p>
              </div>
            )}

            {/* CV Sections */}
            {Object.entries(groupedSections).map(([type, sections]) => (
              <div key={type} className="mb-8">
                <h2 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  fontFamily: 'Inter, sans-serif',
                  color: '#000',
                  marginBottom: '12px',
                  borderBottom: '2px solid #8245FE',
                  paddingBottom: '8px',
                  textTransform: 'capitalize'
                }}>{type === 'extracurricular' ? 'Extracurricular Activities' : type}</h2>
                
                {sections.map(section => (
                  <div key={section.id} className="mb-4">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '4px' }}>
                      <h3 style={{
                        fontSize: '16px',
                        fontWeight: '600',
                        fontFamily: 'Inter, sans-serif',
                        color: '#000'
                      }}>{section.title}</h3>
                      {section.level && (
                        <span style={{
                          fontSize: '12px',
                          fontFamily: 'Inter, sans-serif',
                          color: '#8245FE',
                          fontWeight: '600'
                        }}>{section.level}</span>
                      )}
                    </div>
                    {section.organization && (
                      <p style={{
                        fontSize: '14px',
                        fontFamily: 'Inter, sans-serif',
                        color: '#666',
                        marginBottom: '4px'
                      }}>{section.organization}</p>
                    )}
                    {(section.startDate || section.endDate) && (
                      <p style={{
                        fontSize: '12px',
                        fontFamily: 'Inter, sans-serif',
                        color: '#999',
                        marginBottom: '8px'
                      }}>
                        {section.startDate} - {section.current ? 'Present' : (section.endDate || '')}
                      </p>
                    )}
                    <p style={{
                      fontSize: '14px',
                      fontFamily: 'Inter, sans-serif',
                      color: '#333',
                      lineHeight: '1.5'
                    }}>{section.description}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Main Profile View
  if (viewMode === 'main') {
    return (
      <div className="pb-6">
        {/* Profile Header */}
        <div className="backdrop-blur-xl border mb-6" style={{ 
          backgroundColor: 'var(--glass-card)',
          borderColor: 'var(--glass-border)',
          borderRadius: 'var(--radius-card)',
          boxShadow: 'var(--glass-shadow)',
          padding: '20px'
        }}>
          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4" style={{ borderColor: 'var(--indigo-500)' }}>
              <ImageWithFallback
                src={profileInfo.profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 w-full">
              <div className="flex items-center justify-center gap-2 mb-1">
                <h2 style={{ 
                  fontSize: 'var(--text-xl)',
                  fontWeight: 'var(--font-weight-semibold)',
                  fontFamily: 'Inter, sans-serif',
                  color: 'var(--foreground)'
                }}>{profileInfo.name}</h2>
                <button
                  onClick={() => setShowEditProfile(true)}
                  className="p-1 active:opacity-70 transition-opacity"
                  style={{ minWidth: '32px', minHeight: '32px' }}
                >
                  <Edit2 style={{ width: '16px', height: '16px', color: 'var(--primary)' }} />
                </button>
              </div>
              <p style={{ 
                fontSize: 'var(--text-sm)',
                fontFamily: 'Inter, sans-serif',
                color: 'var(--muted-foreground)',
                marginBottom: '2px'
              }}>{profileInfo.major} | {profileInfo.year}</p>
              <p style={{ 
                fontSize: 'var(--text-sm)',
                fontFamily: 'Inter, sans-serif',
                color: 'var(--muted-foreground)',
                marginBottom: '12px'
              }}>{profileInfo.university}</p>
              
              {/* Bio */}
              {profileInfo.bio && (
                <p style={{ 
                  fontSize: 'var(--text-sm)',
                  fontFamily: 'Inter, sans-serif',
                  color: 'var(--foreground)',
                  lineHeight: '1.5',
                  marginBottom: '12px',
                  padding: '0 16px'
                }}>{profileInfo.bio}</p>
              )}

              {/* Contact Info */}
              <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
                {profileInfo.email && (
                  <a href={`mailto:${profileInfo.email}`} className="flex items-center gap-1 active:opacity-70 transition-opacity">
                    <Mail style={{ width: '14px', height: '14px', color: 'var(--primary)' }} />
                    <span style={{ 
                      fontSize: 'var(--text-xs)',
                      fontFamily: 'Inter, sans-serif',
                      color: 'var(--primary)'
                    }}>Email</span>
                  </a>
                )}
                {profileInfo.phone && (
                  <a href={`tel:${profileInfo.phone}`} className="flex items-center gap-1 active:opacity-70 transition-opacity">
                    <Phone style={{ width: '14px', height: '14px', color: 'var(--primary)' }} />
                    <span style={{ 
                      fontSize: 'var(--text-xs)',
                      fontFamily: 'Inter, sans-serif',
                      color: 'var(--primary)'
                    }}>Phone</span>
                  </a>
                )}
                {profileInfo.linkedin && (
                  <a href={`https://${profileInfo.linkedin}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 active:opacity-70 transition-opacity">
                    <Linkedin style={{ width: '14px', height: '14px', color: 'var(--primary)' }} />
                    <span style={{ 
                      fontSize: 'var(--text-xs)',
                      fontFamily: 'Inter, sans-serif',
                      color: 'var(--primary)'
                    }}>LinkedIn</span>
                  </a>
                )}
                {profileInfo.github && (
                  <a href={`https://${profileInfo.github}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 active:opacity-70 transition-opacity">
                    <Github style={{ width: '14px', height: '14px', color: 'var(--primary)' }} />
                    <span style={{ 
                      fontSize: 'var(--text-xs)',
                      fontFamily: 'Inter, sans-serif',
                      color: 'var(--primary)'
                    }}>GitHub</span>
                  </a>
                )}
                {profileInfo.portfolio && (
                  <a href={`https://${profileInfo.portfolio}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 active:opacity-70 transition-opacity">
                    <Globe style={{ width: '14px', height: '14px', color: 'var(--primary)' }} />
                    <span style={{ 
                      fontSize: 'var(--text-xs)',
                      fontFamily: 'Inter, sans-serif',
                      color: 'var(--primary)'
                    }}>Portfolio</span>
                  </a>
                )}
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="w-full flex gap-2">
              <button
                onClick={handleShareProfile}
                className="flex-1 px-4 py-3 bg-primary text-primary-foreground active:opacity-80 transition-opacity flex items-center justify-center gap-2"
                style={{ 
                  borderRadius: 'var(--radius-button)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-medium)',
                  fontFamily: 'Inter, sans-serif',
                  minHeight: '44px',
                  color: 'white'
                }}
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
              <button
                onClick={() => setShowPreview(true)}
                className="flex-1 px-4 py-3 active:opacity-80 transition-opacity flex items-center justify-center gap-2"
                style={{ 
                  backgroundColor: 'white',
                  color: 'var(--foreground)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-button)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-medium)',
                  fontFamily: 'Inter, sans-serif',
                  minHeight: '44px'
                }}
              >
                <Eye className="w-4 h-4" />
                Preview
              </button>
            </div>
          </div>
        </div>

        {/* Section Navigation Cards */}
        <div className="space-y-3 mb-6">
          {/* Digital CV Card */}
          <button
            onClick={() => handleViewModeChange('cv')}
            className="w-full backdrop-blur-xl border active:scale-[0.98] transition-transform"
            style={{ 
              backgroundColor: 'var(--glass-card)',
              borderColor: 'var(--glass-border)',
              borderRadius: 'var(--radius-card)',
              boxShadow: 'var(--glass-shadow)',
              padding: '20px',
              textAlign: 'left'
            }}
          >
            <div className="flex items-center gap-4">
              <div style={{
                backgroundColor: 'rgba(130, 69, 254, 0.1)',
                borderRadius: 'var(--radius-button)',
                padding: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Briefcase style={{ width: '24px', height: '24px', color: 'var(--primary)' }} />
              </div>
              <div className="flex-1">
                <h3 style={{
                  fontSize: 'var(--text-base)',
                  fontWeight: 'var(--font-weight-semibold)',
                  fontFamily: 'Inter, sans-serif',
                  color: 'var(--foreground)',
                  marginBottom: '4px'
                }}>Digital CV Builder</h3>
                <p style={{
                  fontSize: 'var(--text-sm)',
                  fontFamily: 'Inter, sans-serif',
                  color: 'var(--muted-foreground)'
                }}>
                  Build your professional resume • {totalCVSections} {totalCVSections === 1 ? 'section' : 'sections'}
                </p>
              </div>
              <ChevronRight style={{ width: '20px', height: '20px', color: 'var(--muted-foreground)' }} />
            </div>
          </button>

          {/* Digital Wallet Card */}
          <button
            onClick={() => handleViewModeChange('wallet')}
            className="w-full backdrop-blur-xl border active:scale-[0.98] transition-transform"
            style={{ 
              backgroundColor: 'var(--glass-card)',
              borderColor: 'var(--glass-border)',
              borderRadius: 'var(--radius-card)',
              boxShadow: 'var(--glass-shadow)',
              padding: '20px',
              textAlign: 'left'
            }}
          >
            <div className="flex items-center gap-4">
              <div style={{
                backgroundColor: 'rgba(130, 69, 254, 0.1)',
                borderRadius: 'var(--radius-button)',
                padding: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <Wallet style={{ width: '24px', height: '24px', color: 'var(--primary)' }} />
              </div>
              <div className="flex-1">
                <h3 style={{
                  fontSize: 'var(--text-base)',
                  fontWeight: 'var(--font-weight-semibold)',
                  fontFamily: 'Inter, sans-serif',
                  color: 'var(--foreground)',
                  marginBottom: '4px'
                }}>Digital Wallet</h3>
                <p style={{
                  fontSize: 'var(--text-sm)',
                  fontFamily: 'Inter, sans-serif',
                  color: 'var(--muted-foreground)'
                }}>
                  {walletCards.length} {walletCards.length === 1 ? 'card' : 'cards'} • Student ID & more
                </p>
              </div>
              <ChevronRight style={{ width: '20px', height: '20px', color: 'var(--muted-foreground)' }} />
            </div>
          </button>
        </div>

        {/* Edit Profile Modal - Keeping same implementation */}
        {showEditProfile && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
            onClick={() => cancelProfileEdit()}
          >
            <div 
              className="w-full max-w-md max-h-[80vh] overflow-y-auto backdrop-blur-xl border"
              style={{
                backgroundColor: 'var(--glass-card)',
                borderColor: 'var(--glass-border)',
                borderRadius: 'var(--radius-card)',
                padding: '24px'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 style={{
                  fontSize: 'var(--text-lg)',
                  fontWeight: 'var(--font-weight-semibold)',
                  fontFamily: 'Inter, sans-serif',
                  color: 'var(--foreground)'
                }}>Edit Profile</h3>
                <button
                  onClick={cancelProfileEdit}
                  className="p-1 active:opacity-70 transition-opacity"
                  style={{ minWidth: '44px', minHeight: '44px' }}
                >
                  <X style={{ width: '20px', height: '20px', color: 'var(--foreground)' }} />
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--font-weight-medium)',
                    fontFamily: 'Inter, sans-serif',
                    color: 'var(--foreground)',
                    marginBottom: '8px'
                  }}>Name</label>
                  <input
                    type="text"
                    value={editProfileData.name}
                    onChange={(e) => setEditProfileData({ ...editProfileData, name: e.target.value })}
                    className="w-full px-3 py-3 border focus:outline-none focus:ring-2 focus:ring-ring"
                    style={{ 
                      backgroundColor: 'var(--input-background)',
                      borderColor: 'var(--border)',
                      borderRadius: 'var(--radius-input)',
                      fontSize: 'var(--text-sm)',
                      fontFamily: 'Inter, sans-serif',
                      color: 'var(--foreground)',
                      minHeight: '44px'
                    }}
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--font-weight-medium)',
                    fontFamily: 'Inter, sans-serif',
                    color: 'var(--foreground)',
                    marginBottom: '8px'
                  }}>University</label>
                  <input
                    type="text"
                    value={editProfileData.university}
                    onChange={(e) => setEditProfileData({ ...editProfileData, university: e.target.value })}
                    className="w-full px-3 py-3 border focus:outline-none focus:ring-2 focus:ring-ring"
                    style={{ 
                      backgroundColor: 'var(--input-background)',
                      borderColor: 'var(--border)',
                      borderRadius: 'var(--radius-input)',
                      fontSize: 'var(--text-sm)',
                      fontFamily: 'Inter, sans-serif',
                      color: 'var(--foreground)',
                      minHeight: '44px'
                    }}
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--font-weight-medium)',
                    fontFamily: 'Inter, sans-serif',
                    color: 'var(--foreground)',
                    marginBottom: '8px'
                  }}>Major/Program</label>
                  <input
                    type="text"
                    value={editProfileData.major}
                    onChange={(e) => setEditProfileData({ ...editProfileData, major: e.target.value })}
                    className="w-full px-3 py-3 border focus:outline-none focus:ring-2 focus:ring-ring"
                    style={{ 
                      backgroundColor: 'var(--input-background)',
                      borderColor: 'var(--border)',
                      borderRadius: 'var(--radius-input)',
                      fontSize: 'var(--text-sm)',
                      fontFamily: 'Inter, sans-serif',
                      color: 'var(--foreground)',
                      minHeight: '44px'
                    }}
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--font-weight-medium)',
                    fontFamily: 'Inter, sans-serif',
                    color: 'var(--foreground)',
                    marginBottom: '8px'
                  }}>Year</label>
                  <select
                    value={editProfileData.year}
                    onChange={(e) => setEditProfileData({ ...editProfileData, year: e.target.value })}
                    className="w-full px-3 py-3 border focus:outline-none focus:ring-2 focus:ring-ring"
                    style={{ 
                      backgroundColor: 'var(--input-background)',
                      borderColor: 'var(--border)',
                      borderRadius: 'var(--radius-input)',
                      fontSize: 'var(--text-sm)',
                      fontFamily: 'Inter, sans-serif',
                      color: 'var(--foreground)',
                      minHeight: '44px'
                    }}
                  >
                    <option value="Year 1">Year 1</option>
                    <option value="Year 2">Year 2</option>
                    <option value="Year 3">Year 3</option>
                    <option value="Year 4">Year 4</option>
                    <option value="Graduate">Graduate</option>
                  </select>
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--font-weight-medium)',
                    fontFamily: 'Inter, sans-serif',
                    color: 'var(--foreground)',
                    marginBottom: '8px'
                  }}>Email</label>
                  <input
                    type="email"
                    value={editProfileData.email}
                    onChange={(e) => setEditProfileData({ ...editProfileData, email: e.target.value })}
                    className="w-full px-3 py-3 border focus:outline-none focus:ring-2 focus:ring-ring"
                    style={{ 
                      backgroundColor: 'var(--input-background)',
                      borderColor: 'var(--border)',
                      borderRadius: 'var(--radius-input)',
                      fontSize: 'var(--text-sm)',
                      fontFamily: 'Inter, sans-serif',
                      color: 'var(--foreground)',
                      minHeight: '44px'
                    }}
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--font-weight-medium)',
                    fontFamily: 'Inter, sans-serif',
                    color: 'var(--foreground)',
                    marginBottom: '8px'
                  }}>Phone</label>
                  <input
                    type="tel"
                    value={editProfileData.phone}
                    onChange={(e) => setEditProfileData({ ...editProfileData, phone: e.target.value })}
                    className="w-full px-3 py-3 border focus:outline-none focus:ring-2 focus:ring-ring"
                    style={{ 
                      backgroundColor: 'var(--input-background)',
                      borderColor: 'var(--border)',
                      borderRadius: 'var(--radius-input)',
                      fontSize: 'var(--text-sm)',
                      fontFamily: 'Inter, sans-serif',
                      color: 'var(--foreground)',
                      minHeight: '44px'
                    }}
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--font-weight-medium)',
                    fontFamily: 'Inter, sans-serif',
                    color: 'var(--foreground)',
                    marginBottom: '8px'
                  }}>Bio</label>
                  <textarea
                    value={editProfileData.bio}
                    onChange={(e) => setEditProfileData({ ...editProfileData, bio: e.target.value })}
                    rows={4}
                    className="w-full px-3 py-3 border focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                    style={{ 
                      backgroundColor: 'var(--input-background)',
                      borderColor: 'var(--border)',
                      borderRadius: 'var(--radius-input)',
                      fontSize: 'var(--text-sm)',
                      fontFamily: 'Inter, sans-serif',
                      color: 'var(--foreground)'
                    }}
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--font-weight-medium)',
                    fontFamily: 'Inter, sans-serif',
                    color: 'var(--foreground)',
                    marginBottom: '8px'
                  }}>LinkedIn</label>
                  <input
                    type="text"
                    value={editProfileData.linkedin}
                    onChange={(e) => setEditProfileData({ ...editProfileData, linkedin: e.target.value })}
                    placeholder="linkedin.com/in/yourname"
                    className="w-full px-3 py-3 border focus:outline-none focus:ring-2 focus:ring-ring"
                    style={{ 
                      backgroundColor: 'var(--input-background)',
                      borderColor: 'var(--border)',
                      borderRadius: 'var(--radius-input)',
                      fontSize: 'var(--text-sm)',
                      fontFamily: 'Inter, sans-serif',
                      color: 'var(--foreground)',
                      minHeight: '44px'
                    }}
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--font-weight-medium)',
                    fontFamily: 'Inter, sans-serif',
                    color: 'var(--foreground)',
                    marginBottom: '8px'
                  }}>GitHub (Optional)</label>
                  <input
                    type="text"
                    value={editProfileData.github}
                    onChange={(e) => setEditProfileData({ ...editProfileData, github: e.target.value })}
                    placeholder="github.com/yourname"
                    className="w-full px-3 py-3 border focus:outline-none focus:ring-2 focus:ring-ring"
                    style={{ 
                      backgroundColor: 'var(--input-background)',
                      borderColor: 'var(--border)',
                      borderRadius: 'var(--radius-input)',
                      fontSize: 'var(--text-sm)',
                      fontFamily: 'Inter, sans-serif',
                      color: 'var(--foreground)',
                      minHeight: '44px'
                    }}
                  />
                </div>

                <div>
                  <label style={{
                    display: 'block',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--font-weight-medium)',
                    fontFamily: 'Inter, sans-serif',
                    color: 'var(--foreground)',
                    marginBottom: '8px'
                  }}>Portfolio Website (Optional)</label>
                  <input
                    type="text"
                    value={editProfileData.portfolio}
                    onChange={(e) => setEditProfileData({ ...editProfileData, portfolio: e.target.value })}
                    placeholder="yourportfolio.com"
                    className="w-full px-3 py-3 border focus:outline-none focus:ring-2 focus:ring-ring"
                    style={{ 
                      backgroundColor: 'var(--input-background)',
                      borderColor: 'var(--border)',
                      borderRadius: 'var(--radius-input)',
                      fontSize: 'var(--text-sm)',
                      fontFamily: 'Inter, sans-serif',
                      color: 'var(--foreground)',
                      minHeight: '44px'
                    }}
                  />
                </div>
              </div>

              <div className="flex gap-2 mt-6">
                <button
                  onClick={saveProfileEdit}
                  className="flex-1 px-4 py-3 bg-primary text-primary-foreground active:opacity-80 transition-opacity"
                  style={{ 
                    borderRadius: 'var(--radius-button)',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--font-weight-medium)',
                    fontFamily: 'Inter, sans-serif',
                    minHeight: '44px',
                    color: 'white'
                  }}
                >
                  Save Changes
                </button>
                <button
                  onClick={cancelProfileEdit}
                  className="px-4 py-3 active:opacity-80 transition-opacity"
                  style={{ 
                    backgroundColor: 'var(--secondary)',
                    color: 'var(--foreground)',
                    borderRadius: 'var(--radius-button)',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--font-weight-medium)',
                    fontFamily: 'Inter, sans-serif',
                    minHeight: '44px'
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Settings Row - At Bottom */}
        <div className="backdrop-blur-xl border mt-6" style={{ 
          backgroundColor: 'var(--glass-card)',
          borderColor: 'var(--glass-border)',
          borderRadius: 'var(--radius-card)',
          boxShadow: 'var(--glass-shadow)',
          padding: '16px'
        }}>
          <div className="flex items-center justify-between gap-4">
            {/* Dark Mode Toggle */}
            <div className="flex items-center gap-3 flex-1">
              <div className="flex items-center gap-2">
                {isDarkMode ? (
                  <Moon className="w-5 h-5" style={{ color: 'var(--foreground)' }} />
                ) : (
                  <Sun className="w-5 h-5" style={{ color: 'var(--foreground)' }} />
                )}
                <span style={{ 
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-medium)',
                  fontFamily: 'Inter, sans-serif',
                  color: 'var(--foreground)'
                }}>
                  Dark Mode
                </span>
              </div>
              <button
                onClick={onToggleDarkMode}
                className="relative inline-flex items-center h-6 rounded-full w-11 transition-colors"
                style={{
                  backgroundColor: isDarkMode ? 'var(--primary)' : 'var(--muted)'
                }}
              >
                <span
                  className="inline-block w-4 h-4 transform rounded-full bg-white transition-transform"
                  style={{
                    transform: isDarkMode ? 'translateX(24px)' : 'translateX(4px)'
                  }}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Digital CV Sub-Panel - Full Screen
  if (viewMode === 'cv') {
    return (
      <div className="pb-32">
        {/* Header with Back Button */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => {
              handleViewModeChange('main');
              setShowAddCV(false);
              setEditingSection(null);
            }}
            className="p-2 active:opacity-70 transition-opacity"
            style={{ minWidth: '44px', minHeight: '44px' }}
          >
            <ChevronLeft style={{ width: '24px', height: '24px', color: 'var(--foreground)' }} />
          </button>
          <div className="flex-1">
            <p style={{
              fontSize: 'var(--text-sm)',
              fontFamily: 'Inter, sans-serif',
              color: 'var(--muted-foreground)'
            }}>Build your professional resume</p>
          </div>
        </div>

        {/* Add/Edit CV Section Form - Centered Modal */}
        {(showAddCV || editingSection) && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
            onClick={() => {
              if (editingSection) {
                cancelEditSection();
              } else {
                setShowAddCV(false);
              }
            }}
          >
            <div 
              className="w-full max-w-md max-h-[80vh] overflow-y-auto backdrop-blur-xl border"
              style={{
                backgroundColor: 'var(--glass-card)',
                borderColor: 'var(--glass-border)',
                borderRadius: 'var(--radius-card)',
                padding: '24px',
                boxShadow: 'var(--glass-shadow)'
              }}
              onClick={(e) => e.stopPropagation()}
            >
            <h4 style={{
              fontSize: 'var(--text-base)',
              fontWeight: 'var(--font-weight-semibold)',
              fontFamily: 'Inter, sans-serif',
              color: 'var(--foreground)',
              marginBottom: '12px'
            }}>{editingSection ? 'Edit Section' : 'Add New Section'}</h4>

            <select
              value={newCVType}
              onChange={(e) => setNewCVType(e.target.value as any)}
              disabled={!!editingSection}
              className="w-full px-3 py-3 border focus:outline-none focus:ring-2 focus:ring-ring mb-3"
              style={{ 
                backgroundColor: 'var(--input-background)',
                borderColor: 'var(--border)',
                borderRadius: 'var(--radius-input)',
                fontSize: 'var(--text-sm)',
                fontFamily: 'Inter, sans-serif',
                color: 'var(--foreground)',
                minHeight: '44px'
              }}
            >
              <option value="education">Education</option>
              <option value="experience">Work Experience</option>
              <option value="projects">Projects</option>
              <option value="skills">Skills</option>
              <option value="achievements">Achievements & Awards</option>
              <option value="volunteer">Volunteer Work</option>
              <option value="languages">Languages</option>
              <option value="certifications">Certifications</option>
              <option value="extracurricular">Extracurricular Activities</option>
            </select>

            <input
              type="text"
              value={newCVTitle}
              onChange={(e) => setNewCVTitle(e.target.value)}
              placeholder="Title (e.g., Bachelor of Laws, Legal Intern)"
              className="w-full px-3 py-3 border focus:outline-none focus:ring-2 focus:ring-ring mb-3"
              style={{ 
                backgroundColor: 'var(--input-background)',
                borderColor: 'var(--border)',
                borderRadius: 'var(--radius-input)',
                fontSize: 'var(--text-sm)',
                fontFamily: 'Inter, sans-serif',
                color: 'var(--foreground)',
                minHeight: '44px'
              }}
            />

            {(newCVType === 'education' || newCVType === 'experience' || newCVType === 'volunteer' || newCVType === 'projects' || newCVType === 'extracurricular') && (
              <input
                type="text"
                value={newCVOrg}
                onChange={(e) => setNewCVOrg(e.target.value)}
                placeholder="Organization/Institution"
                className="w-full px-3 py-3 border focus:outline-none focus:ring-2 focus:ring-ring mb-3"
                style={{ 
                  backgroundColor: 'var(--input-background)',
                  borderColor: 'var(--border)',
                  borderRadius: 'var(--radius-input)',
                  fontSize: 'var(--text-sm)',
                  fontFamily: 'Inter, sans-serif',
                  color: 'var(--foreground)',
                  minHeight: '44px'
                }}
              />
            )}

            <textarea
              value={newCVDesc}
              onChange={(e) => setNewCVDesc(e.target.value)}
              placeholder="Description (key responsibilities, achievements, skills gained)"
              rows={3}
              className="w-full px-3 py-3 border focus:outline-none focus:ring-2 focus:ring-ring resize-none mb-3"
              style={{ 
                backgroundColor: 'var(--input-background)',
                borderColor: 'var(--border)',
                borderRadius: 'var(--radius-input)',
                fontSize: 'var(--text-sm)',
                fontFamily: 'Inter, sans-serif',
                color: 'var(--foreground)'
              }}
            />

            {(newCVType === 'education' || newCVType === 'experience' || newCVType === 'volunteer' || newCVType === 'projects') && (
              <div className="grid grid-cols-2 gap-3 mb-3">
                <input
                  type="text"
                  value={newCVStartDate}
                  onChange={(e) => setNewCVStartDate(e.target.value)}
                  placeholder="Start Date (e.g., 2025)"
                  className="w-full px-3 py-3 border focus:outline-none focus:ring-2 focus:ring-ring"
                  style={{ 
                    backgroundColor: 'var(--input-background)',
                    borderColor: 'var(--border)',
                    borderRadius: 'var(--radius-input)',
                    fontSize: 'var(--text-sm)',
                    fontFamily: 'Inter, sans-serif',
                    color: 'var(--foreground)',
                    minHeight: '44px'
                  }}
                />
                <input
                  type="text"
                  value={newCVEndDate}
                  onChange={(e) => setNewCVEndDate(e.target.value)}
                  placeholder="End Date"
                  disabled={newCVCurrent}
                  className="w-full px-3 py-3 border focus:outline-none focus:ring-2 focus:ring-ring"
                  style={{ 
                    backgroundColor: newCVCurrent ? 'var(--muted)' : 'var(--input-background)',
                    borderColor: 'var(--border)',
                    borderRadius: 'var(--radius-input)',
                    fontSize: 'var(--text-sm)',
                    fontFamily: 'Inter, sans-serif',
                    color: 'var(--foreground)',
                    minHeight: '44px'
                  }}
                />
              </div>
            )}

            {(newCVType === 'education' || newCVType === 'experience' || newCVType === 'volunteer' || newCVType === 'projects') && (
              <label className="flex items-center gap-2 mb-3" style={{ cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={newCVCurrent}
                  onChange={(e) => setNewCVCurrent(e.target.checked)}
                  style={{ width: '16px', height: '16px' }}
                />
                <span style={{
                  fontSize: 'var(--text-sm)',
                  fontFamily: 'Inter, sans-serif',
                  color: 'var(--foreground)'
                }}>Currently active/ongoing</span>
              </label>
            )}

            {(newCVType === 'skills' || newCVType === 'languages') && (
              <select
                value={newCVLevel}
                onChange={(e) => setNewCVLevel(e.target.value)}
                className="w-full px-3 py-3 border focus:outline-none focus:ring-2 focus:ring-ring mb-3"
                style={{ 
                  backgroundColor: 'var(--input-background)',
                  borderColor: 'var(--border)',
                  borderRadius: 'var(--radius-input)',
                  fontSize: 'var(--text-sm)',
                  fontFamily: 'Inter, sans-serif',
                  color: 'var(--foreground)',
                  minHeight: '44px'
                }}
              >
                <option value="">Select Proficiency</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
                {newCVType === 'languages' && <option value="Native">Native</option>}
              </select>
            )}

            <div className="flex gap-2">
              <button
                onClick={editingSection ? updateCVSection : addCVSection}
                className="flex-1 px-4 py-3 bg-primary text-primary-foreground active:opacity-80 transition-opacity"
                style={{ 
                  borderRadius: 'var(--radius-button)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-medium)',
                  fontFamily: 'Inter, sans-serif',
                  minHeight: '44px',
                  color: 'white'
                }}
              >
                {editingSection ? 'Update Section' : 'Add Section'}
              </button>
              <button
                onClick={() => {
                  editingSection ? cancelEditSection() : setShowAddCV(false);
                }}
                className="px-4 py-3 active:opacity-80 transition-opacity"
                style={{ 
                  backgroundColor: 'var(--secondary)',
                  color: 'var(--foreground)',
                  borderRadius: 'var(--radius-button)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-medium)',
                  fontFamily: 'Inter, sans-serif',
                  minHeight: '44px'
                }}
              >
                Cancel
              </button>
            </div>
            </div>
          </div>
        )}

        {/* CV Sections - Grouped by Type */}
        <div className="space-y-6">
          {Object.entries(groupedSections).map(([type, sections]) => {
            const colors = getSectionColor(type as CVSection['type']);
            const Icon = getSectionIcon(type as CVSection['type']);
            return (
              <div key={type}>
                <div className="flex items-center gap-2 mb-3">
                  <div style={{
                    backgroundColor: colors.bg,
                    borderRadius: 'var(--radius-small)',
                    padding: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {Icon}
                  </div>
                  <h4 style={{
                    fontSize: 'var(--text-base)',
                    fontWeight: 'var(--font-weight-semibold)',
                    fontFamily: 'Inter, sans-serif',
                    color: 'var(--foreground)',
                    textTransform: 'capitalize'
                  }}>
                    {type === 'extracurricular' ? 'Extracurricular Activities' : type}
                  </h4>
                </div>

                <div className="space-y-3 ml-0">
                  {sections.map(section => (
                    <div key={section.id} className="backdrop-blur-xl border" style={{ 
                      backgroundColor: 'var(--glass-card)',
                      borderColor: 'var(--glass-border)',
                      borderRadius: 'var(--radius-card)',
                      boxShadow: 'var(--glass-shadow)',
                      padding: '16px'
                    }}>
                      <div className="mb-3">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h5 style={{ 
                              fontSize: 'var(--text-base)',
                              fontWeight: 'var(--font-weight-semibold)',
                              fontFamily: 'Inter, sans-serif',
                              color: 'var(--foreground)',
                              marginBottom: '4px'
                            }}>{section.title}</h5>
                            {section.organization && (
                              <p style={{ 
                                fontSize: 'var(--text-sm)',
                                fontFamily: 'Inter, sans-serif',
                                color: 'var(--muted-foreground)',
                                marginBottom: '4px'
                              }}>{section.organization}</p>
                            )}
                            {(section.startDate || section.endDate) && (
                              <p style={{ 
                                fontSize: 'var(--text-xs)',
                                fontFamily: 'Inter, sans-serif',
                                color: 'var(--muted-foreground)',
                                marginBottom: '8px'
                              }}>
                                {section.startDate} - {section.current ? 'Present' : (section.endDate || '')}
                              </p>
                            )}
                          </div>
                          {section.level && (
                            <span className="px-2 py-1 ml-2 flex-shrink-0" style={{ 
                              backgroundColor: colors.bg,
                              color: colors.text,
                              borderRadius: 'var(--radius-small)', 
                              fontSize: 'var(--text-xs)',
                              fontWeight: 'var(--font-weight-medium)',
                              fontFamily: 'Inter, sans-serif'
                            }}>
                              {section.level}
                            </span>
                          )}
                        </div>
                        <p style={{ 
                          fontSize: 'var(--text-sm)',
                          fontFamily: 'Inter, sans-serif',
                          color: 'var(--foreground)',
                          lineHeight: '1.5'
                        }}>{section.description}</p>
                      </div>

                      {/* Edit and Delete buttons at bottom */}
                      <div className="flex gap-2 pt-3 border-t" style={{ borderColor: 'var(--glass-border)' }}>
                        <button
                          onClick={() => startEditSection(section)}
                          className="flex-1 px-3 py-2 rounded transition-all active:opacity-70 flex items-center justify-center gap-2"
                          style={{ 
                            backgroundColor: 'rgba(130, 69, 254, 0.1)',
                            borderRadius: 'var(--radius-button)',
                            minHeight: '40px',
                            color: 'var(--primary)',
                            fontSize: 'var(--text-sm)',
                            fontWeight: 'var(--font-weight-medium)',
                            fontFamily: 'Inter, sans-serif'
                          }}
                        >
                          <Edit2 style={{ width: '16px', height: '16px' }} />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => deleteCVSection(section.id)}
                          className="flex-1 px-3 py-2 rounded transition-all active:opacity-70 flex items-center justify-center gap-2"
                          style={{ 
                            backgroundColor: 'rgba(239, 68, 68, 0.1)',
                            borderRadius: 'var(--radius-button)',
                            minHeight: '40px',
                            color: 'var(--destructive)',
                            fontSize: 'var(--text-sm)',
                            fontWeight: 'var(--font-weight-medium)',
                            fontFamily: 'Inter, sans-serif'
                          }}
                        >
                          <Trash2 style={{ width: '16px', height: '16px' }} />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {cvSections.length === 0 && (
          <div className="text-center py-12">
            <Briefcase className="mx-auto mb-4" style={{ 
              width: '48px', 
              height: '48px',
              color: 'var(--muted-foreground)' 
            }} />
            <p style={{
              fontSize: 'var(--text-sm)',
              fontFamily: 'Inter, sans-serif',
              color: 'var(--muted-foreground)'
            }}>
              Start building your CV by adding sections
            </p>
          </div>
        )}

        {/* Floating Add Button at bottom */}
        <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center px-6">
          <button
            onClick={() => {
              setShowAddCV(!showAddCV);
              setEditingSection(null);
            }}
            className="bg-primary text-primary-foreground active:opacity-80 transition-all shadow-lg flex items-center gap-2 px-6 py-4"
            style={{ 
              borderRadius: 'var(--radius-button)',
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-weight-semibold)',
              fontFamily: 'Inter, sans-serif',
              minHeight: '56px',
              color: 'white',
              boxShadow: '0 8px 32px rgba(130, 69, 254, 0.4)'
            }}
          >
            <Plus className="w-5 h-5" />
            <span>Add Section</span>
          </button>
        </div>
      </div>
    );
  }

  return null;
}