import { useState } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';

interface OnboardingData {
  // Survey responses
  primaryGoal: string;
  interests: string[];
  currentChallenges: string[];
  
  // Personal information
  fullName: string;
  email: string;
  phoneNumber: string;
  
  // Study information
  university: string;
  program: string;
  yearOfStudy: string;
  expectedGraduation: string;
  
  // Career status
  careerStatus: string;
}

interface OnboardingProps {
  onComplete: (data: OnboardingData) => void;
}

export function Onboarding({ onComplete, isDarkMode }: OnboardingProps & { isDarkMode: boolean }) {
  const [step, setStep] = useState(1);
  const totalSteps = 7;
  
  const [data, setData] = useState<OnboardingData>({
    primaryGoal: '',
    interests: [],
    currentChallenges: [],
    fullName: '',
    email: '',
    phoneNumber: '',
    university: '',
    program: '',
    yearOfStudy: '',
    expectedGraduation: '',
    careerStatus: ''
  });

  const primaryGoals = [
    { id: 'organize', label: 'Stay organized with assignments', icon: '📚' },
    { id: 'deals', label: 'Save money with student deals', icon: '💰' },
    { id: 'career', label: 'Find internships and jobs', icon: '💼' },
    { id: 'portfolio', label: 'Build my portfolio/CV', icon: '📄' },
    { id: 'all', label: 'All of the above!', icon: '🎯' }
  ];

  const interestOptions = [
    { id: 'volunteer', label: 'Volunteer Work', icon: '🤝' },
    { id: 'internships', label: 'Internships', icon: '💡' },
    { id: 'parttime', label: 'Part-time Jobs', icon: '⏰' },
    { id: 'networking', label: 'Networking Events', icon: '🌐' },
    { id: 'workshops', label: 'Workshops & Training', icon: '🎓' },
    { id: 'mentorship', label: 'Mentorship Programs', icon: '👥' }
  ];

  const challengeOptions = [
    { id: 'deadlines', label: 'Missing assignment deadlines', icon: '⏱️' },
    { id: 'organization', label: 'Staying organized', icon: '📋' },
    { id: 'budget', label: 'Managing student budget', icon: '💵' },
    { id: 'experience', label: 'Finding work experience', icon: '🔍' },
    { id: 'resume', label: 'Building my resume', icon: '📝' },
    { id: 'balance', label: 'Work-life balance', icon: '⚖️' }
  ];

  const yearsOfStudy = [
    'First Year',
    'Second Year',
    'Third Year',
    'Fourth Year',
    'Fifth Year+',
    'Graduate Student'
  ];

  const toggleSelection = (field: 'interests' | 'currentChallenges', value: string) => {
    const currentArray = data[field];
    if (currentArray.includes(value)) {
      setData({ ...data, [field]: currentArray.filter(v => v !== value) });
    } else {
      setData({ ...data, [field]: [...currentArray, value] });
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return true; // Welcome screen
      case 2:
        return data.primaryGoal !== '';
      case 3:
        return data.interests.length > 0;
      case 4:
        return data.currentChallenges.length > 0;
      case 5:
        return data.fullName && data.email;
      case 6:
        return data.university && data.program && data.yearOfStudy;
      case 7:
        return data.careerStatus !== '';
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onComplete(data);
    }
  };

  const renderProgressBar = () => (
    <div className="fixed top-0 left-0 right-0 z-10 px-6 pt-6">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between mb-2">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="p-2 active:bg-accent rounded-full transition-colors"
              style={{ minWidth: '44px', minHeight: '44px' }}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          ) : (
            <div style={{ width: '44px' }} />
          )}
          
          {/* Step Dots Indicator */}
          <div className="flex items-center gap-2">
            {Array.from({ length: totalSteps }).map((_, index) => {
              const stepNumber = index + 1;
              const isCompleted = stepNumber < step;
              const isCurrent = stepNumber === step;
              
              return (
                <div
                  key={stepNumber}
                  className="transition-all duration-300"
                  style={{
                    width: isCurrent ? '32px' : '8px',
                    height: '8px',
                    borderRadius: '4px',
                    backgroundColor: isCompleted || isCurrent ? 'var(--primary)' : 'rgba(130, 69, 254, 0.2)'
                  }}
                />
              );
            })}
          </div>
          
          <button
            onClick={() => onComplete(data)}
            className="px-3 py-1 active:opacity-80 transition-opacity"
            style={{
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-weight-medium)',
              fontFamily: 'Inter, sans-serif',
              color: 'var(--primary)',
              minHeight: '32px',
              borderRadius: 'var(--radius-button)'
            }}
          >
            Skip
          </button>
        </div>
      </div>
    </div>
  );

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="text-center">
            <div className="mb-6" style={{ fontSize: '64px' }}>👋</div>
            <h2 className="mb-4" style={{ 
              fontSize: 'var(--text-2xl)',
              fontWeight: 'var(--font-weight-semibold)',
              fontFamily: 'Inter, sans-serif'
            }}>
              Welcome to Timui!
            </h2>
            <p style={{ 
              fontSize: 'var(--text-base)',
              color: 'var(--muted-foreground)',
              fontFamily: 'Inter, sans-serif',
              lineHeight: '1.6',
              marginBottom: '32px'
            }}>
              Let's take a moment to personalize your experience. This will only take 2 minutes.
            </p>
          </div>
        );

      case 2:
        return (
          <div>
            <h2 className="mb-2" style={{ 
              fontSize: 'var(--text-xl)',
              fontWeight: 'var(--font-weight-semibold)',
              fontFamily: 'Inter, sans-serif'
            }}>
              What's your primary goal?
            </h2>
            <p className="mb-6" style={{ 
              fontSize: 'var(--text-sm)',
              color: 'var(--muted-foreground)',
              fontFamily: 'Inter, sans-serif'
            }}>
              Select what matters most to you right now
            </p>
            <div className="space-y-3">
              {primaryGoals.map(goal => (
                <button
                  key={goal.id}
                  onClick={() => setData({ ...data, primaryGoal: goal.id })}
                  className="w-full flex items-center gap-4 p-4 border-2 active:scale-98 transition-all"
                  style={{ 
                    borderRadius: 'var(--radius-card)',
                    borderColor: data.primaryGoal === goal.id ? '#8445ff' : 'var(--border)',
                    backgroundColor: data.primaryGoal === goal.id ? 'rgba(132, 69, 255, 0.05)' : 'white',
                    minHeight: '72px'
                  }}
                >
                  <span style={{ fontSize: '32px' }}>{goal.icon}</span>
                  <span style={{ 
                    fontSize: 'var(--text-base)',
                    fontWeight: 'var(--font-weight-medium)',
                    fontFamily: 'Inter, sans-serif',
                    flex: 1,
                    textAlign: 'left'
                  }}>
                    {goal.label}
                  </span>
                  {data.primaryGoal === goal.id && (
                    <CheckCircle className="w-6 h-6" style={{ color: '#8445ff' }} />
                  )}
                </button>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div>
            <h2 className="mb-2" style={{ 
              fontSize: 'var(--text-xl)',
              fontWeight: 'var(--font-weight-semibold)',
              fontFamily: 'Inter, sans-serif'
            }}>
              What opportunities interest you?
            </h2>
            <p className="mb-6" style={{ 
              fontSize: 'var(--text-sm)',
              color: 'var(--muted-foreground)',
              fontFamily: 'Inter, sans-serif'
            }}>
              Select all that apply
            </p>
            <div className="grid grid-cols-2 gap-3">
              {interestOptions.map(option => (
                <button
                  key={option.id}
                  onClick={() => toggleSelection('interests', option.id)}
                  className="flex flex-col items-center gap-2 p-4 border-2 active:scale-98 transition-all"
                  style={{ 
                    borderRadius: 'var(--radius-card)',
                    borderColor: data.interests.includes(option.id) ? '#8445ff' : 'var(--border)',
                    backgroundColor: data.interests.includes(option.id) ? 'rgba(132, 69, 255, 0.05)' : 'white',
                    minHeight: '120px'
                  }}
                >
                  <span style={{ fontSize: '32px' }}>{option.icon}</span>
                  <span style={{ 
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--font-weight-medium)',
                    fontFamily: 'Inter, sans-serif',
                    textAlign: 'center',
                    lineHeight: '1.3'
                  }}>
                    {option.label}
                  </span>
                  {data.interests.includes(option.id) && (
                    <CheckCircle className="w-5 h-5 absolute top-2 right-2" style={{ color: '#8445ff' }} />
                  )}
                </button>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div>
            <h2 className="mb-2" style={{ 
              fontSize: 'var(--text-xl)',
              fontWeight: 'var(--font-weight-semibold)',
              fontFamily: 'Inter, sans-serif'
            }}>
              What challenges are you facing?
            </h2>
            <p className="mb-6" style={{ 
              fontSize: 'var(--text-sm)',
              color: 'var(--muted-foreground)',
              fontFamily: 'Inter, sans-serif'
            }}>
              We'll help you tackle these head-on
            </p>
            <div className="grid grid-cols-2 gap-3">
              {challengeOptions.map(option => (
                <button
                  key={option.id}
                  onClick={() => toggleSelection('currentChallenges', option.id)}
                  className="flex flex-col items-center gap-2 p-4 border-2 active:scale-98 transition-all relative"
                  style={{ 
                    borderRadius: 'var(--radius-card)',
                    borderColor: data.currentChallenges.includes(option.id) ? '#8445ff' : 'var(--border)',
                    backgroundColor: data.currentChallenges.includes(option.id) ? 'rgba(132, 69, 255, 0.05)' : 'white',
                    minHeight: '120px'
                  }}
                >
                  <span style={{ fontSize: '32px' }}>{option.icon}</span>
                  <span style={{ 
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--font-weight-medium)',
                    fontFamily: 'Inter, sans-serif',
                    textAlign: 'center',
                    lineHeight: '1.3'
                  }}>
                    {option.label}
                  </span>
                  {data.currentChallenges.includes(option.id) && (
                    <CheckCircle className="w-5 h-5 absolute top-2 right-2" style={{ color: '#8445ff' }} />
                  )}
                </button>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div>
            <h2 className="mb-2" style={{ 
              fontSize: 'var(--text-xl)',
              fontWeight: 'var(--font-weight-semibold)',
              fontFamily: 'Inter, sans-serif'
            }}>
              Tell us about yourself
            </h2>
            <p className="mb-6" style={{ 
              fontSize: 'var(--text-sm)',
              color: 'var(--muted-foreground)',
              fontFamily: 'Inter, sans-serif'
            }}>
              We'll use this to personalize your experience
            </p>
            <div className="space-y-4">
              <div>
                <label className="block mb-2" style={{ 
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-medium)',
                  fontFamily: 'Inter, sans-serif'
                }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  value={data.fullName}
                  onChange={(e) => setData({ ...data, fullName: e.target.value })}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 bg-white border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                  style={{ 
                    borderRadius: 'var(--radius-input)',
                    fontSize: 'var(--text-sm)',
                    fontFamily: 'Inter, sans-serif',
                    minHeight: '48px'
                  }}
                />
              </div>
              <div>
                <label className="block mb-2" style={{ 
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-medium)',
                  fontFamily: 'Inter, sans-serif'
                }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  placeholder="john.doe@university.edu"
                  className="w-full px-4 py-3 bg-white border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                  style={{ 
                    borderRadius: 'var(--radius-input)',
                    fontSize: 'var(--text-sm)',
                    fontFamily: 'Inter, sans-serif',
                    minHeight: '48px'
                  }}
                />
              </div>
              <div>
                <label className="block mb-2" style={{ 
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-medium)',
                  fontFamily: 'Inter, sans-serif'
                }}>
                  Phone Number (Optional)
                </label>
                <input
                  type="tel"
                  value={data.phoneNumber}
                  onChange={(e) => setData({ ...data, phoneNumber: e.target.value })}
                  placeholder="+1 (555) 123-4567"
                  className="w-full px-4 py-3 bg-white border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                  style={{ 
                    borderRadius: 'var(--radius-input)',
                    fontSize: 'var(--text-sm)',
                    fontFamily: 'Inter, sans-serif',
                    minHeight: '48px'
                  }}
                />
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div>
            <h2 className="mb-2" style={{ 
              fontSize: 'var(--text-xl)',
              fontWeight: 'var(--font-weight-semibold)',
              fontFamily: 'Inter, sans-serif'
            }}>
              Your academic details
            </h2>
            <p className="mb-6" style={{ 
              fontSize: 'var(--text-sm)',
              color: 'var(--muted-foreground)',
              fontFamily: 'Inter, sans-serif'
            }}>
              Help us tailor opportunities for you
            </p>
            <div className="space-y-4">
              <div>
                <label className="block mb-2" style={{ 
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-medium)',
                  fontFamily: 'Inter, sans-serif'
                }}>
                  University *
                </label>
                <input
                  type="text"
                  value={data.university}
                  onChange={(e) => setData({ ...data, university: e.target.value })}
                  placeholder="Harvard University"
                  className="w-full px-4 py-3 bg-white border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                  style={{ 
                    borderRadius: 'var(--radius-input)',
                    fontSize: 'var(--text-sm)',
                    fontFamily: 'Inter, sans-serif',
                    minHeight: '48px'
                  }}
                />
              </div>
              <div>
                <label className="block mb-2" style={{ 
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-medium)',
                  fontFamily: 'Inter, sans-serif'
                }}>
                  Program/Major *
                </label>
                <input
                  type="text"
                  value={data.program}
                  onChange={(e) => setData({ ...data, program: e.target.value })}
                  placeholder="Computer Science"
                  className="w-full px-4 py-3 bg-white border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                  style={{ 
                    borderRadius: 'var(--radius-input)',
                    fontSize: 'var(--text-sm)',
                    fontFamily: 'Inter, sans-serif',
                    minHeight: '48px'
                  }}
                />
              </div>
              <div>
                <label className="block mb-2" style={{ 
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-medium)',
                  fontFamily: 'Inter, sans-serif'
                }}>
                  Year of Study *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {yearsOfStudy.map(year => (
                    <button
                      key={year}
                      onClick={() => setData({ ...data, yearOfStudy: year })}
                      className="px-4 py-3 border-2 active:scale-98 transition-all"
                      style={{ 
                        borderRadius: 'var(--radius-input)',
                        borderColor: data.yearOfStudy === year ? '#8445ff' : 'var(--border)',
                        backgroundColor: data.yearOfStudy === year ? 'rgba(132, 69, 255, 0.05)' : 'white',
                        fontSize: 'var(--text-sm)',
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 'var(--font-weight-medium)',
                        minHeight: '48px',
                        color: data.yearOfStudy === year ? '#8445ff' : 'var(--foreground)'
                      }}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block mb-2" style={{ 
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-medium)',
                  fontFamily: 'Inter, sans-serif'
                }}>
                  Expected Graduation (Optional)
                </label>
                <input
                  type="month"
                  value={data.expectedGraduation}
                  onChange={(e) => setData({ ...data, expectedGraduation: e.target.value })}
                  className="w-full px-4 py-3 bg-white border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                  style={{ 
                    borderRadius: 'var(--radius-input)',
                    fontSize: 'var(--text-sm)',
                    fontFamily: 'Inter, sans-serif',
                    minHeight: '48px'
                  }}
                />
              </div>
            </div>
          </div>
        );

      case 7:
        return (
          <div>
            <div className="text-center mb-6">
              <div className="mb-4" style={{ fontSize: '48px' }}>🎯</div>
              <h2 className="mb-2" style={{ 
                fontSize: 'var(--text-xl)',
                fontWeight: 'var(--font-weight-semibold)',
                fontFamily: 'Inter, sans-serif'
              }}>
                One last thing! 
              </h2>
              <p style={{ 
                fontSize: 'var(--text-sm)',
                color: 'var(--muted-foreground)',
                fontFamily: 'Inter, sans-serif',
                lineHeight: '1.6'
              }}>
                What's your current career status? Don't worry, you can change this anytime in your profile.
              </p>
            </div>
            <div className="space-y-3">
              <button
                onClick={() => setData({ ...data, careerStatus: 'internship' })}
                className="w-full flex items-center gap-4 p-4 border-2 active:scale-98 transition-all"
                style={{ 
                  borderRadius: 'var(--radius-card)',
                  borderColor: data.careerStatus === 'internship' ? '#8445ff' : 'var(--border)',
                  backgroundColor: data.careerStatus === 'internship' ? 'rgba(132, 69, 255, 0.05)' : 'white',
                  minHeight: '72px'
                }}
              >
                <span style={{ fontSize: '32px' }}>💼</span>
                <div style={{ flex: 1, textAlign: 'left' }}>
                  <div style={{ 
                    fontSize: 'var(--text-base)',
                    fontWeight: 'var(--font-weight-semibold)',
                    fontFamily: 'Inter, sans-serif',
                    marginBottom: '4px'
                  }}>
                    Looking for Internships
                  </div>
                  <div style={{ 
                    fontSize: 'var(--text-sm)',
                    color: 'var(--muted-foreground)',
                    fontFamily: 'Inter, sans-serif'
                  }}>
                    Ready to gain experience
                  </div>
                </div>
                {data.careerStatus === 'internship' && (
                  <CheckCircle className="w-6 h-6" style={{ color: '#8445ff' }} />
                )}
              </button>

              <button
                onClick={() => setData({ ...data, careerStatus: 'volunteer' })}
                className="w-full flex items-center gap-4 p-4 border-2 active:scale-98 transition-all"
                style={{ 
                  borderRadius: 'var(--radius-card)',
                  borderColor: data.careerStatus === 'volunteer' ? '#8445ff' : 'var(--border)',
                  backgroundColor: data.careerStatus === 'volunteer' ? 'rgba(132, 69, 255, 0.05)' : 'white',
                  minHeight: '72px'
                }}
              >
                <span style={{ fontSize: '32px' }}>🤝</span>
                <div style={{ flex: 1, textAlign: 'left' }}>
                  <div style={{ 
                    fontSize: 'var(--text-base)',
                    fontWeight: 'var(--font-weight-semibold)',
                    fontFamily: 'Inter, sans-serif',
                    marginBottom: '4px'
                  }}>
                    Looking for Volunteer Work
                  </div>
                  <div style={{ 
                    fontSize: 'var(--text-sm)',
                    color: 'var(--muted-foreground)',
                    fontFamily: 'Inter, sans-serif'
                  }}>
                    Want to make an impact
                  </div>
                </div>
                {data.careerStatus === 'volunteer' && (
                  <CheckCircle className="w-6 h-6" style={{ color: '#8445ff' }} />
                )}
              </button>

              <button
                onClick={() => setData({ ...data, careerStatus: 'just-starting' })}
                className="w-full flex items-center gap-4 p-4 border-2 active:scale-98 transition-all"
                style={{ 
                  borderRadius: 'var(--radius-card)',
                  borderColor: data.careerStatus === 'just-starting' ? '#8445ff' : 'var(--border)',
                  backgroundColor: data.careerStatus === 'just-starting' ? 'rgba(132, 69, 255, 0.05)' : 'white',
                  minHeight: '72px'
                }}
              >
                <span style={{ fontSize: '32px' }}>🌱</span>
                <div style={{ flex: 1, textAlign: 'left' }}>
                  <div style={{ 
                    fontSize: 'var(--text-base)',
                    fontWeight: 'var(--font-weight-semibold)',
                    fontFamily: 'Inter, sans-serif',
                    marginBottom: '4px'
                  }}>
                    Just Getting Started
                  </div>
                  <div style={{ 
                    fontSize: 'var(--text-sm)',
                    color: 'var(--muted-foreground)',
                    fontFamily: 'Inter, sans-serif'
                  }}>
                    Building skills from scratch
                  </div>
                </div>
                {data.careerStatus === 'just-starting' && (
                  <CheckCircle className="w-6 h-6" style={{ color: '#8445ff' }} />
                )}
              </button>

              <button
                onClick={() => setData({ ...data, careerStatus: 'not-looking' })}
                className="w-full flex items-center gap-4 p-4 border-2 active:scale-98 transition-all"
                style={{ 
                  borderRadius: 'var(--radius-card)',
                  borderColor: data.careerStatus === 'not-looking' ? '#8445ff' : 'var(--border)',
                  backgroundColor: data.careerStatus === 'not-looking' ? 'rgba(132, 69, 255, 0.05)' : 'white',
                  minHeight: '72px'
                }}
              >
                <span style={{ fontSize: '32px' }}>📚</span>
                <div style={{ flex: 1, textAlign: 'left' }}>
                  <div style={{ 
                    fontSize: 'var(--text-base)',
                    fontWeight: 'var(--font-weight-semibold)',
                    fontFamily: 'Inter, sans-serif',
                    marginBottom: '4px'
                  }}>
                    Not Looking Right Now
                  </div>
                  <div style={{ 
                    fontSize: 'var(--text-sm)',
                    color: 'var(--muted-foreground)',
                    fontFamily: 'Inter, sans-serif'
                  }}>
                    Focused on studies
                  </div>
                </div>
                {data.careerStatus === 'not-looking' && (
                  <CheckCircle className="w-6 h-6" style={{ color: '#8445ff' }} />
                )}
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col" style={{
      background: isDarkMode 
        ? 'rgba(18, 18, 20, 1.00)' 
        : 'var(--background-gradient)'
    }}>
      {renderProgressBar()}
      
      <div className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="w-full max-w-md">
          {renderStep()}
        </div>
      </div>

      {/* Bottom Button */}
      <div className="fixed bottom-0 left-0 right-0 p-6" style={{ 
        background: isDarkMode 
          ? 'rgba(18, 18, 20, 1.00)' 
          : 'var(--background-gradient)',
        borderTop: '1px solid var(--border)'
      }}>
        <div className="max-w-md mx-auto">
          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className="w-full flex items-center justify-center gap-2 px-6 py-4 active:opacity-80 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ 
              backgroundColor: '#8445ff',
              color: 'white',
              borderRadius: 'var(--radius-button)',
              fontSize: 'var(--text-base)',
              fontWeight: 'var(--font-weight-semibold)',
              fontFamily: 'Inter, sans-serif',
              minHeight: '56px'
            }}
          >
            {step === totalSteps ? (
              <>
                <span>Get Started</span>
                <CheckCircle className="w-5 h-5" />
              </>
            ) : (
              <>
                <span>Continue</span>
                <ChevronRight className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}