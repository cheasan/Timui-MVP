import Container from '../../imports/Container-60-24';

export function Welcome({ onLogin, isDarkMode }: { onLogin: (provider: 'google' | 'apple') => void; isDarkMode: boolean }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6" style={{
      background: isDarkMode 
        ? 'rgba(18, 18, 20, 1.00)' 
        : 'linear-gradient(114.762deg, rgb(239, 246, 255) 0%, rgb(250, 245, 255) 50%, rgb(238, 242, 255) 100%)'
    }}>
      <div className="w-full max-w-md">
        {/* Logo/App Name */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div style={{ width: '100px' }}>
              <Container />
            </div>
          </div>
          <p style={{ 
            fontSize: 'var(--text-lg)',
            color: 'var(--muted-foreground)',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 'var(--font-weight-normal)',
            lineHeight: '1.5'
          }}>
            Your university companion from first year to first job
          </p>
        </div>

        {/* Features List */}
        <div className="mb-12 space-y-4">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#8445ff' }}>
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 11l3 3L22 4" />
                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
              </svg>
            </div>
            <div>
              <h3 style={{ 
                fontSize: 'var(--text-base)',
                fontWeight: 'var(--font-weight-semibold)',
                fontFamily: 'Inter, sans-serif',
                marginBottom: '4px'
              }}>
                Track Assignments
              </h3>
              <p style={{ 
                fontSize: 'var(--text-sm)',
                color: 'var(--muted-foreground)',
                fontFamily: 'Inter, sans-serif',
                lineHeight: '1.5'
              }}>
                Stay on top of deadlines with smart reminders
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#8445ff' }}>
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <div>
              <h3 style={{ 
                fontSize: 'var(--text-base)',
                fontWeight: 'var(--font-weight-semibold)',
                fontFamily: 'Inter, sans-serif',
                marginBottom: '4px'
              }}>
                Build Your Portfolio
              </h3>
              <p style={{ 
                fontSize: 'var(--text-sm)',
                color: 'var(--muted-foreground)',
                fontFamily: 'Inter, sans-serif',
                lineHeight: '1.5'
              }}>
                Create a digital CV and showcase your achievements
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#8445ff' }}>
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5" />
                <path d="M2 12l10 5 10-5" />
              </svg>
            </div>
            <div>
              <h3 style={{ 
                fontSize: 'var(--text-base)',
                fontWeight: 'var(--font-weight-semibold)',
                fontFamily: 'Inter, sans-serif',
                marginBottom: '4px'
              }}>
                Find Opportunities
              </h3>
              <p style={{ 
                fontSize: 'var(--text-sm)',
                color: 'var(--muted-foreground)',
                fontFamily: 'Inter, sans-serif',
                lineHeight: '1.5'
              }}>
                Access student deals, internships, and job listings
              </p>
            </div>
          </div>
        </div>

        {/* Login Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => onLogin('google')}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white border border-border active:bg-gray-50 transition-colors"
            style={{ 
              borderRadius: 'var(--radius-button)',
              minHeight: '56px',
              boxShadow: 'var(--elevation-sm)'
            }}
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span style={{ 
              fontSize: 'var(--text-base)',
              fontWeight: 'var(--font-weight-medium)',
              fontFamily: 'Inter, sans-serif'
            }}>
              Continue with Google
            </span>
          </button>

          <button
            onClick={() => onLogin('apple')}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 active:opacity-80 transition-opacity"
            style={{ 
              backgroundColor: '#000000',
              color: '#ffffff',
              borderRadius: 'var(--radius-button)',
              minHeight: '56px'
            }}
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
            </svg>
            <span style={{ 
              fontSize: 'var(--text-base)',
              fontWeight: 'var(--font-weight-medium)',
              fontFamily: 'Inter, sans-serif'
            }}>
              Continue with Apple
            </span>
          </button>
        </div>

        {/* Terms */}
        <p className="text-center mt-6" style={{ 
          fontSize: 'var(--text-xs)',
          color: 'var(--muted-foreground)',
          fontFamily: 'Inter, sans-serif',
          lineHeight: '1.5'
        }}>
          By continuing, you agree to Timui's Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}