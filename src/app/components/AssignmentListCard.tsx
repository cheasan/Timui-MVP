import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

interface Note {
  id: string;
  text: string;
  timestamp: Date;
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
  notes?: Note[];
  imageUrl: string;
}

interface AssignmentListCardProps {
  assignment: Assignment;
  onClick: () => void;
}

export function AssignmentListCard({ assignment, onClick }: AssignmentListCardProps) {
  const [timeLeft, setTimeLeft] = useState('');
  const [isUrgent, setIsUrgent] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = assignment.deadline.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeLeft('Deadline passed');
        setIsUrgent(false);
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

      setTimeLeft(`${days}d ${hours}h ${minutes}m`);
      
      // Mark as urgent if 2 days or less
      setIsUrgent(days <= 2);
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 60000); // Update every minute

    return () => clearInterval(timer);
  }, [assignment.deadline]);

  const completedTasks = assignment.tasks.filter(t => t.completed).length;
  const totalTasks = assignment.tasks.length;

  const formatDeadline = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
  };

  return (
    <button
      onClick={onClick}
      className="w-full bg-white border mb-3 relative overflow-hidden active:opacity-80 transition-all text-left"
      style={{ 
        borderColor: isUrgent ? 'rgba(239, 68, 68, 0.3)' : 'rgba(130, 69, 254, 0.25)',
        borderRadius: '20px',
        boxShadow: isUrgent ? '0px 8px 32px 0px rgba(239, 68, 68, 0.15)' : '0px 8px 32px 0px rgba(14, 0, 73, 0.1)',
        padding: '16px',
        borderWidth: isUrgent ? '2px' : '1px'
      }}
    >
      <div className="flex gap-3 items-center">
        {/* Date Section - Left Aligned */}
        <div className="w-[50px] flex-shrink-0 flex flex-col items-center justify-center gap-1">
          <span style={{ 
            fontSize: '28px',
            fontWeight: 'var(--font-weight-semibold)',
            fontFamily: 'Inter, sans-serif',
            lineHeight: '28px',
            color: isUrgent ? '#EF4444' : '#8245FE'
          }}>
            {assignment.deadline.getDate().toString().padStart(2, '0')}
          </span>
          <span style={{ 
            fontSize: 'var(--text-sm)',
            fontWeight: 'var(--font-weight-medium)',
            fontFamily: 'Inter, sans-serif',
            lineHeight: '18px',
            color: isUrgent ? '#EF4444' : '#8245FE',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            {assignment.deadline.toLocaleDateString('en-US', { month: 'short' }).toUpperCase()}
          </span>
        </div>

        {/* Vertical Divider */}
        <div className="h-[57px] w-[1px] flex-shrink-0" style={{ 
          backgroundColor: isUrgent ? '#EF4444' : '#8245FE',
          opacity: '0.25'
        }} />
        
        {/* Content */}
        <div className="flex-1 min-w-0 flex flex-col gap-2">
          {/* Title */}
          <h4 className="mb-0 overflow-hidden text-ellipsis whitespace-nowrap" style={{ 
            fontSize: 'var(--text-sm)',
            fontWeight: 'var(--font-weight-normal)',
            lineHeight: '24px',
            color: '#0E0049',
            fontFamily: 'Inter, sans-serif'
          }}>
            {assignment.title}
          </h4>
          
          {/* Countdown Timer Chip */}
          <div className="inline-flex items-center gap-2 self-start px-3 py-1 border" style={{
            borderRadius: 'var(--radius-button)',
            backgroundColor: isUrgent ? 'rgba(239, 68, 68, 0.1)' : 'rgba(130, 69, 254, 0.1)',
            borderColor: isUrgent ? 'rgba(239, 68, 68, 0.3)' : 'rgba(130, 69, 254, 0.2)'
          }}>
            <Clock className="w-4 h-4 flex-shrink-0" style={{ color: isUrgent ? '#EF4444' : '#8245FE' }} />
            <span style={{ 
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-weight-semibold)',
              lineHeight: '14px',
              color: isUrgent ? '#EF4444' : '#8245FE',
              fontFamily: 'Inter, sans-serif'
            }}>
              {timeLeft}
            </span>
          </div>
        </div>
      </div>
    </button>
  );
}
