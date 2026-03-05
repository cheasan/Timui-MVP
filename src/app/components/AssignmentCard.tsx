import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

interface Reminder {
  id: string;
  text: string;
  time: string;
  daysBeforeLabel: string;
}

interface Assignment {
  id: string;
  title: string;
  deadline: Date;
  tasks: Task[];
  reminders: Reminder[];
  imageUrl: string;
}

interface AssignmentCardProps {
  assignment: Assignment;
  onClick: () => void;
}

export function AssignmentCard({ assignment, onClick }: AssignmentCardProps) {
  const [timeLeft, setTimeLeft] = useState('');
  const [urgencyLevel, setUrgencyLevel] = useState<'urgent' | 'warning' | 'normal'>('normal');

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = assignment.deadline.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeLeft('Overdue');
        setUrgencyLevel('urgent');
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

      // Determine urgency level
      if (days === 0) {
        setUrgencyLevel('urgent');
      } else if (days <= 3) {
        setUrgencyLevel('urgent');
      } else {
        setUrgencyLevel('normal');
      }

      setTimeLeft(`${days}d ${hours}h ${minutes}m`);
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [assignment.deadline]);

  // Get urgency colors
  const getDateColor = () => {
    return urgencyLevel === 'urgent' ? '#EF4444' : 'var(--primary)';
  };

  const getBorderColor = () => {
    return urgencyLevel === 'urgent' 
      ? 'rgba(239, 68, 68, 0.3)' 
      : 'rgba(130, 69, 254, 0.25)';
  };

  const getBackgroundColor = () => {
    return urgencyLevel === 'urgent'
      ? 'rgba(239, 68, 68, 0.1)'
      : 'rgba(130, 69, 254, 0.1)';
  };

  const getBadgeBorderColor = () => {
    return urgencyLevel === 'urgent'
      ? 'rgba(239, 68, 68, 0.5)'
      : 'rgba(130, 69, 254, 0.2)';
  };

  const getShadowColor = () => {
    return urgencyLevel === 'urgent'
      ? '0px 8px 32px 0px rgba(239, 68, 68, 0.15)'
      : '0px 8px 32px 0px rgba(14, 0, 73, 0.1)';
  };

  const getDividerOpacity = () => {
    return urgencyLevel === 'urgent' ? 0.25 : 0.25;
  };

  // Format date
  const dateDay = assignment.deadline.getDate().toString().padStart(2, '0');
  const dateMonth = assignment.deadline.toLocaleString('en-US', { month: 'short' }).toUpperCase();

  return (
    <div
      onClick={onClick}
      className="bg-white relative rounded-[20px] shrink-0 w-full mb-4 cursor-pointer active:scale-[0.98] transition-transform"
    >
      <div className="overflow-clip rounded-[inherit] size-full">
        <div style={{ padding: '16px' }}>
          {/* Main Content */}
          <div className="flex gap-3 items-center w-full">
            {/* Date Badge */}
            <div 
              className="flex flex-col gap-1 items-center justify-center shrink-0"
              style={{ width: '50px' }}
            >
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 'var(--font-weight-semibold)',
                  fontSize: '28px',
                  lineHeight: '28px',
                  color: getDateColor()
                }}
              >
                {dateDay}
              </p>
              <p
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 'var(--font-weight-medium)',
                  fontSize: 'var(--text-sm)',
                  lineHeight: '18px',
                  color: getDateColor(),
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase'
                }}
              >
                {dateMonth}
              </p>
            </div>

            {/* Divider */}
            <div 
              style={{
                width: '1px',
                height: '57px',
                backgroundColor: getDateColor(),
                opacity: getDividerOpacity(),
                flexShrink: 0
              }}
            />

            {/* Assignment Info */}
            <div className="flex-1 min-w-0 flex flex-col gap-2">
              {/* Title */}
              <p
                className="overflow-hidden text-ellipsis whitespace-nowrap"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 'var(--font-weight-normal)',
                  fontSize: 'var(--text-sm)',
                  lineHeight: '24px',
                  color: '#0E0049'
                }}
              >
                {assignment.title}
              </p>

              {/* Countdown Badge */}
              <div
                className="flex items-center gap-2 shrink-0"
                style={{
                  backgroundColor: getBackgroundColor(),
                  borderRadius: '12px',
                  padding: '4px 13px',
                  border: `0.845px solid ${getBadgeBorderColor()}`,
                  width: 'fit-content'
                }}
              >
                <Clock 
                  style={{ 
                    width: '16px', 
                    height: '16px',
                    color: getDateColor(),
                    flexShrink: 0
                  }} 
                />
                <span
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 'var(--font-weight-semibold)',
                    fontSize: 'var(--text-sm)',
                    lineHeight: '14px',
                    color: getDateColor()
                  }}
                >
                  {timeLeft}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Border and Shadow Overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none rounded-[20px]"
        style={{
          border: `1.691px solid ${getBorderColor()}`,
          boxShadow: getShadowColor()
        }}
      />
    </div>
  );
}