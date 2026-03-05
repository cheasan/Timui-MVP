import { CheckCircle2, Circle, Clock } from 'lucide-react';

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

interface TasksListProps {
  assignments: Assignment[];
  onToggleTask: (assignmentId: string, taskId: string) => void;
}

export function TasksList({ assignments, onToggleTask }: TasksListProps) {
  // Filter assignments that have tasks
  const assignmentsWithTasks = assignments.filter(a => a.tasks.length > 0);

  // Helper function to check if assignment is urgent (2 days or less)
  const isAssignmentUrgent = (deadline: Date) => {
    const now = new Date();
    const difference = deadline.getTime() - now.getTime();
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    return days <= 2 && days >= 0;
  };

  if (assignmentsWithTasks.length === 0) {
    return (
      <div className="text-center py-16">
        <CheckCircle2 className="w-16 h-16 mx-auto mb-4" style={{ color: 'var(--muted-foreground)' }} />
        <h3 className="mb-2" style={{ 
          color: 'var(--muted-foreground)',
          fontSize: 'var(--text-base)',
          fontWeight: 'var(--font-weight-medium)',
          fontFamily: 'Inter, sans-serif'
        }}>
          No tasks yet
        </h3>
        <p style={{ 
          color: 'var(--muted-foreground)',
          fontSize: 'var(--text-sm)',
          fontFamily: 'Inter, sans-serif'
        }}>
          Add tasks to your assignments to see them here
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {assignmentsWithTasks.map(assignment => {
        const isUrgent = isAssignmentUrgent(assignment.deadline);
        
        return (
          <div key={assignment.id}>
            {/* Assignment Header - Small and Outside */}
            <div className="flex items-center gap-2 mb-2 px-1">
              <span style={{ 
                fontSize: 'var(--text-xs)',
                fontWeight: 'var(--font-weight-medium)',
                fontFamily: 'Inter, sans-serif',
                color: 'rgba(14, 0, 73, 0.6)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                flex: '1',
                minWidth: '0'
              }}>
                {assignment.title}
              </span>
              
              {/* Date Chip */}
              <div 
                className="flex items-center gap-1 px-2 py-1"
                style={{
                  backgroundColor: isUrgent ? 'rgba(239, 68, 68, 0.1)' : 'rgba(130, 69, 254, 0.1)',
                  borderRadius: 'var(--radius-small)',
                  flexShrink: '0'
                }}
              >
                <Clock 
                  className="w-3 h-3" 
                  style={{ color: isUrgent ? '#EF4444' : '#8245FE' }}
                />
                <span style={{ 
                  fontSize: 'var(--text-xs)',
                  fontFamily: 'Inter, sans-serif',
                  color: isUrgent ? '#EF4444' : '#8245FE',
                  fontWeight: 'var(--font-weight-medium)',
                  whiteSpace: 'nowrap'
                }}>
                  {assignment.deadline.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
              </div>
            </div>

            {/* Tasks List - Focus on Tasks */}
            <div className="space-y-2">
              {assignment.tasks.map(task => (
                <div 
                  key={task.id} 
                  className="backdrop-blur-xl border transition-all active:scale-[0.98]" 
                  style={{ 
                    backgroundColor: 'var(--glass-card)',
                    borderColor: isUrgent && !task.completed ? 'rgba(239, 68, 68, 0.2)' : 'var(--glass-border)',
                    borderRadius: 'var(--radius-card)',
                    boxShadow: isUrgent && !task.completed ? '0px 4px 16px 0px rgba(239, 68, 68, 0.1)' : 'var(--glass-shadow)',
                    padding: '16px',
                    borderWidth: isUrgent && !task.completed ? '1.5px' : '1px'
                  }}
                >
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => onToggleTask(assignment.id, task.id)}
                      className="flex-shrink-0 transition-transform active:scale-90"
                      style={{ 
                        color: task.completed ? '#8245FE' : (isUrgent ? '#EF4444' : '#8245FE'),
                        minWidth: '24px',
                        minHeight: '24px'
                      }}
                    >
                      {task.completed ? (
                        <CheckCircle2 className="w-6 h-6" />
                      ) : (
                        <Circle className="w-6 h-6" />
                      )}
                    </button>
                    <span
                      style={{
                        fontSize: 'var(--text-base)',
                        fontWeight: 'var(--font-weight-normal)',
                        fontFamily: 'Inter, sans-serif',
                        color: task.completed ? 'var(--muted-foreground)' : '#0E0049',
                        textDecoration: task.completed ? 'line-through' : 'none',
                        flex: '1'
                      }}
                    >
                      {task.text}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}