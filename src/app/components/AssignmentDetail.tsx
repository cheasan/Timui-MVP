import { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle2, Circle, Plus, Trash2, StickyNote, ListTodo, Bell, Calendar, Edit2, CheckSquare, X, Clock } from 'lucide-react';

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
  days: number;
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

interface AssignmentDetailProps {
  assignment: Assignment;
  onClose: () => void;
  onUpdate: (assignment: Assignment) => void;
}

const PRESET_REMINDERS = [
  { label: '2 Days', days: 2 },
  { label: '3 Days', days: 3 },
  { label: '5 Days', days: 5 }
];

const DEFAULT_REMINDER_DAYS = [1, 3];

export function AssignmentDetail({ assignment, onClose, onUpdate }: AssignmentDetailProps) {
  const [activeTab, setActiveTab] = useState<'tasks' | 'notes'>('tasks');
  const [newTask, setNewTask] = useState('');
  const [newNote, setNewNote] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(assignment.title);
  const [editDeadline, setEditDeadline] = useState(assignment.deadline.toISOString().slice(0, 16));
  const [showRemindersSheet, setShowRemindersSheet] = useState(false);
  const [showNoteEditSheet, setShowNoteEditSheet] = useState(false);
  const [showCustomReminder, setShowCustomReminder] = useState(false);
  const [customReminderDate, setCustomReminderDate] = useState('');
  const [customReminderTime, setCustomReminderTime] = useState('');
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editingTaskText, setEditingTaskText] = useState('');
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [editingNoteText, setEditingNoteText] = useState('');
  const [originalReminders, setOriginalReminders] = useState<Reminder[]>([]);
  const [hasDefaultReminders, setHasDefaultReminders] = useState(false);
  const [globalReminderTime, setGlobalReminderTime] = useState('12:00');
  const [editingGlobalTime, setEditingGlobalTime] = useState(false);
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const [noteRows, setNoteRows] = useState(1);
  const [timeLeft, setTimeLeft] = useState('');
  const [isUrgent, setIsUrgent] = useState(false);

  // Calculate countdown timer and urgency
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
    const timer = setInterval(calculateTimeLeft, 60000);

    return () => clearInterval(timer);
  }, [assignment.deadline]);

  useEffect(() => {
    if (!hasDefaultReminders && assignment.reminders.length === 0) {
      const [hour, minute] = globalReminderTime.split(':');
      const defaults: Reminder[] = DEFAULT_REMINDER_DAYS.map(days => {
        const reminderDate = new Date(assignment.deadline);
        reminderDate.setDate(reminderDate.getDate() - days);
        reminderDate.setHours(parseInt(hour), parseInt(minute), 0, 0);
        return {
          id: `default-${days}-${Date.now()}`,
          text: `${days} day${days > 1 ? 's' : ''} before`,
          time: reminderDate.toISOString(),
          daysBeforeLabel: `${days}d before`,
          days: days
        };
      });
      onUpdate({ ...assignment, reminders: defaults });
      setOriginalReminders(defaults);
      setHasDefaultReminders(true);
    } else if (!hasDefaultReminders) {
      setOriginalReminders(assignment.reminders);
      setHasDefaultReminders(true);
    }
  }, [assignment, hasDefaultReminders, onUpdate, globalReminderTime]);

  const remindersChanged = JSON.stringify(assignment.reminders) !== JSON.stringify(originalReminders);

  const getUsedReminderDays = () => {
    return assignment.reminders.map(r => r.days).filter(d => d !== undefined);
  };

  const addTask = () => {
    if (!newTask.trim()) return;
    const task: Task = {
      id: Date.now().toString(),
      text: newTask,
      completed: false
    };
    onUpdate({ ...assignment, tasks: [...assignment.tasks, task] });
    setNewTask('');
  };

  const updateTask = (taskId: string, newText: string) => {
    const updatedTasks = assignment.tasks.map(task =>
      task.id === taskId ? { ...task, text: newText } : task
    );
    onUpdate({ ...assignment, tasks: updatedTasks });
    setEditingTaskId(null);
    setEditingTaskText('');
  };

  const toggleTask = (taskId: string) => {
    const updatedTasks = assignment.tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    onUpdate({ ...assignment, tasks: updatedTasks });
  };

  const deleteTask = (taskId: string) => {
    const updatedTasks = assignment.tasks.filter(task => task.id !== taskId);
    onUpdate({ ...assignment, tasks: updatedTasks });
  };

  const addNote = () => {
    if (!newNote.trim()) return;
    const note: Note = {
      id: Date.now().toString(),
      text: newNote,
      timestamp: new Date()
    };
    const notes = assignment.notes || [];
    onUpdate({ ...assignment, notes: [...notes, note] });
    setNewNote('');
  };

  const updateNote = () => {
    if (!editingNoteId || !editingNoteText.trim()) return;
    const notes = assignment.notes || [];
    const updatedNotes = notes.map(note =>
      note.id === editingNoteId ? { ...note, text: editingNoteText } : note
    );
    onUpdate({ ...assignment, notes: updatedNotes });
    setEditingNoteId(null);
    setEditingNoteText('');
    setShowNoteEditSheet(false);
  };

  const deleteNote = (noteId: string) => {
    const notes = assignment.notes || [];
    const updatedNotes = notes.filter(n => n.id !== noteId);
    onUpdate({ ...assignment, notes: updatedNotes });
  };

  const addPresetReminder = (days: number) => {
    const usedDays = getUsedReminderDays();
    if (usedDays.includes(days)) return;

    const [hour, minute] = globalReminderTime.split(':');
    const reminderDate = new Date(assignment.deadline);
    reminderDate.setDate(reminderDate.getDate() - days);
    reminderDate.setHours(parseInt(hour), parseInt(minute), 0, 0);
    
    const reminder: Reminder = {
      id: Date.now().toString(),
      text: `${days} day${days > 1 ? 's' : ''} before`,
      time: reminderDate.toISOString(),
      daysBeforeLabel: `${days}d before`,
      days: days
    };
    onUpdate({ ...assignment, reminders: [...assignment.reminders, reminder] });
  };

  const addCustomReminder = () => {
    if (!customReminderDate || !customReminderTime) return;
    
    const reminderDateTime = new Date(`${customReminderDate}T${customReminderTime}`);
    const daysDiff = Math.floor((assignment.deadline.getTime() - reminderDateTime.getTime()) / (1000 * 60 * 60 * 24));
    
    const reminder: Reminder = {
      id: Date.now().toString(),
      text: `Custom reminder`,
      time: reminderDateTime.toISOString(),
      daysBeforeLabel: daysDiff > 0 ? `${daysDiff}d before` : 'Custom',
      days: -1
    };
    onUpdate({ ...assignment, reminders: [...assignment.reminders, reminder] });
    setCustomReminderDate('');
    setCustomReminderTime('');
    setShowCustomReminder(false);
  };

  const deleteReminder = (reminderId: string) => {
    const updatedReminders = assignment.reminders.filter(r => r.id !== reminderId);
    onUpdate({ ...assignment, reminders: updatedReminders });
  };

  const setAsDefaultReminders = () => {
    setOriginalReminders(assignment.reminders);
  };

  const handleSaveEdit = () => {
    onUpdate({
      ...assignment,
      title: editTitle,
      deadline: new Date(editDeadline)
    });
    setIsEditing(false);
  };

  const updateGlobalTime = (newTime: string) => {
    setGlobalReminderTime(newTime);
    setEditingGlobalTime(false);
  };

  const completedTasks = assignment.tasks.filter(t => t.completed).length;
  const totalTasks = assignment.tasks.length;
  const progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const usedReminderDays = getUsedReminderDays();

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex flex-col" style={{ 
      background: 'var(--background-gradient)'
    }}>
      {/* Header */}
      <div className="backdrop-blur-xl border-b flex-shrink-0" style={{ 
        background: 'linear-gradient(170.349deg, rgb(239, 246, 255) 0%, rgb(250, 245, 255) 50%, rgb(238, 242, 255) 100%)',
        borderColor: 'rgba(130, 69, 254, 0.15)',
        boxShadow: '0px 8px 32px 0px rgba(14, 0, 73, 0.1)'
      }}>
        <div className="px-4 py-3">
          {/* Back and Edit Button Row */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={onClose}
              className="p-2 active:opacity-60 transition-opacity"
              style={{ 
                borderRadius: 'var(--radius-button)',
                minWidth: '44px',
                minHeight: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <ArrowLeft className="w-6 h-6" style={{ color: 'var(--foreground)' }} />
            </button>

            {/* Edit Button */}
            {isEditing ? (
              <div className="flex gap-2">
                <button
                  onClick={handleSaveEdit}
                  className="px-4 py-2 bg-primary text-primary-foreground active:opacity-80 transition-opacity flex items-center gap-2"
                  style={{ 
                    borderRadius: 'var(--radius-button)',
                    minHeight: '44px',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--font-weight-medium)',
                    fontFamily: 'Inter, sans-serif'
                  }}
                >
                  <CheckSquare className="w-4 h-4" />
                  <span>Save</span>
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setEditTitle(assignment.title);
                    setEditDeadline(assignment.deadline.toISOString().slice(0, 16));
                  }}
                  className="px-4 py-2 bg-secondary active:opacity-80 transition-opacity flex items-center gap-2"
                  style={{ 
                    borderRadius: 'var(--radius-button)',
                    minHeight: '44px',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--font-weight-medium)',
                    fontFamily: 'Inter, sans-serif'
                  }}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 active:bg-accent transition-colors flex items-center gap-2"
                style={{ 
                  borderRadius: 'var(--radius-button)',
                  minHeight: '44px',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-medium)',
                  fontFamily: 'Inter, sans-serif',
                  border: '1px solid var(--border)'
                }}
              >
                <Edit2 className="w-4 h-4" />
                <span>Edit</span>
              </button>
            )}
          </div>

          {/* Due Date Square and Title */}
          <div className="flex gap-4 mb-3">
            {/* Due Date - Matches Figma design */}
            <div className="w-[50px] flex-shrink-0 flex flex-col items-center justify-center gap-1">
              <span style={{ 
                fontSize: '48px',
                fontWeight: 'var(--font-weight-semibold)',
                fontFamily: 'Inter, sans-serif',
                lineHeight: '48px',
                color: isUrgent ? '#EF4444' : '#8245FE'
              }}>
                {assignment.deadline.getDate().toString().padStart(2, '0')}
              </span>
              <span style={{ 
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-weight-semibold)',
                fontFamily: 'Inter, sans-serif',
                lineHeight: '18px',
                color: isUrgent ? '#EF4444' : '#8245FE',
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}>
                {assignment.deadline.toLocaleDateString('en-US', { month: 'short' }).toUpperCase()}
              </span>
            </div>
            
            {/* Vertical Divider */}
            <div className="h-[100px] w-[1px] flex-shrink-0" style={{ 
              backgroundColor: 'rgba(130, 69, 254, 0.25)'
            }} />
            
            {/* Title and Info Row */}
            <div className="flex-1 min-w-0 flex flex-col gap-3">
              {isEditing ? (
                <>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                    style={{ 
                      borderRadius: 'var(--radius-input)',
                      fontSize: 'var(--text-base)',
                      fontWeight: 'var(--font-weight-normal)',
                      fontFamily: 'Inter, sans-serif'
                    }}
                  />
                  <input
                    type="datetime-local"
                    value={editDeadline}
                    onChange={(e) => setEditDeadline(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                    style={{ 
                      borderRadius: 'var(--radius-input)',
                      fontSize: 'var(--text-sm)',
                      fontFamily: 'Inter, sans-serif'
                    }}
                  />
                </>
              ) : (
                <>
                  <h2 className="mb-0" style={{ 
                    fontSize: 'var(--text-lg)',
                    fontWeight: 'var(--font-weight-normal)',
                    lineHeight: '28px',
                    color: '#0E0049',
                    fontFamily: 'Inter, sans-serif'
                  }}>
                    {assignment.title}
                  </h2>
                  
                  {/* Bottom Row: Countdown, Progress, Bell */}
                  <div className="flex items-center gap-3">
                    {/* Countdown Timer Chip */}
                    <div className="inline-flex items-center gap-2 px-3 py-2 flex-shrink-0" style={{
                      borderRadius: '20px',
                      backgroundColor: 'rgba(130, 69, 254, 0.15)',
                      border: '1px solid rgba(130, 69, 254, 0.2)'
                    }}>
                      <Clock className="w-4 h-4 flex-shrink-0" style={{ color: '#8245FE' }} />
                      <span style={{ 
                        fontSize: 'var(--text-sm)',
                        fontWeight: 'var(--font-weight-semibold)',
                        lineHeight: '1',
                        color: '#8245FE',
                        fontFamily: 'Inter, sans-serif'
                      }}>
                        {timeLeft}
                      </span>
                    </div>

                    {/* Progress (if tasks exist) */}
                    {totalTasks > 0 && (
                      <div className="flex-1 min-w-0 flex items-center gap-2">
                        <span style={{ 
                          fontSize: 'var(--text-xs)',
                          color: 'rgba(14, 0, 73, 0.6)',
                          fontFamily: 'Inter, sans-serif',
                          whiteSpace: 'nowrap'
                        }}>
                          {completedTasks} of {totalTasks}
                        </span>
                        <span style={{ 
                          fontSize: 'var(--text-xs)',
                          fontWeight: 'var(--font-weight-semibold)',
                          color: '#8245FE',
                          fontFamily: 'Inter, sans-serif'
                        }}>
                          {progressPercentage}%
                        </span>
                      </div>
                    )}

                    {/* Bell Button */}
                    <button
                      onClick={() => setShowRemindersSheet(true)}
                      className="relative p-2 active:opacity-60 transition-opacity flex-shrink-0"
                      style={{ 
                        borderRadius: '16px',
                        minWidth: '48px',
                        minHeight: '48px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: '#8245FE',
                        color: 'white'
                      }}
                    >
                      <Bell className="w-5 h-5" />
                      {assignment.reminders.length > 0 && (
                        <div 
                          className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full flex items-center justify-center"
                          style={{
                            width: '18px',
                            height: '18px',
                            fontSize: 'var(--text-xs)',
                            fontWeight: 'var(--font-weight-semibold)',
                            fontFamily: 'Inter, sans-serif'
                          }}
                        >
                          {assignment.reminders.length}
                        </div>
                      )}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Progress Bar (if tasks exist) */}
          {totalTasks > 0 && !isEditing && (
            <div className="mb-3">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="h-2 rounded-full transition-all"
                  style={{ 
                    width: `${progressPercentage}%`,
                    backgroundColor: '#8245FE'
                  }}
                />
              </div>
            </div>
          )}

          {/* Remove old progress section */}
          <div className="mb-3" style={{ display: 'none' }}>

            {/* Progress and Bell */}
            {totalTasks > 0 && (
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span style={{ 
                      fontSize: 'var(--text-xs)',
                      color: 'rgba(14, 0, 73, 0.6)',
                      fontFamily: 'Inter, sans-serif'
                    }}>
                      {completedTasks} of {totalTasks} completed
                    </span>
                    <span style={{ 
                      fontSize: 'var(--text-xs)',
                      fontWeight: 'var(--font-weight-semibold)',
                      color: '#8245FE',
                      fontFamily: 'Inter, sans-serif'
                    }}>
                      {progressPercentage}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all"
                      style={{ 
                        width: `${progressPercentage}%`,
                        backgroundColor: '#8245FE'
                      }}
                    />
                  </div>
                </div>
                
                {/* Bell Button */}
                <button
                  onClick={() => setShowRemindersSheet(true)}
                  className="relative p-2 active:opacity-60 transition-opacity flex-shrink-0"
                  style={{ 
                    borderRadius: 'var(--radius-button)',
                    minWidth: '40px',
                    minHeight: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#8245FE',
                    color: 'white'
                  }}
                >
                  <Bell className="w-5 h-5" />
                  {assignment.reminders.length > 0 && (
                    <div 
                      className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full flex items-center justify-center"
                      style={{
                        width: '18px',
                        height: '18px',
                        fontSize: 'var(--text-xs)',
                        fontWeight: 'var(--font-weight-semibold)',
                        fontFamily: 'Inter, sans-serif'
                      }}
                    >
                      {assignment.reminders.length}
                    </div>
                  )}
                </button>
              </div>
            )}

            {/* Bell without progress */}
            {totalTasks === 0 && (
              <div className="flex justify-end">
                <button
                  onClick={() => setShowRemindersSheet(true)}
                  className="relative p-2 active:opacity-60 transition-opacity"
                  style={{ 
                    borderRadius: 'var(--radius-button)',
                    minWidth: '40px',
                    minHeight: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#8245FE',
                    color: 'white'
                  }}
                >
                  <Bell className="w-5 h-5" />
                  {assignment.reminders.length > 0 && (
                    <div 
                      className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full flex items-center justify-center"
                      style={{
                        width: '18px',
                        height: '18px',
                        fontSize: 'var(--text-xs)',
                        fontWeight: 'var(--font-weight-semibold)',
                        fontFamily: 'Inter, sans-serif'
                      }}
                    >
                      {assignment.reminders.length}
                    </div>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tabs - Above Content */}
      <div className="px-4 py-3 flex justify-center" style={{ background: 'transparent' }}>
        <div className="backdrop-blur-xl border p-2" style={{ 
          background: 'linear-gradient(170.349deg, rgb(239, 246, 255) 0%, rgb(250, 245, 255) 50%, rgb(238, 242, 255) 100%)',
          borderColor: 'rgba(130, 69, 254, 0.15)',
          borderRadius: '24px',
          display: 'inline-flex',
          gap: '4px',
          boxShadow: '0px 8px 32px 0px rgba(14, 0, 73, 0.1)'
        }}>
          <button
            onClick={() => setActiveTab('tasks')}
            className="px-5 py-2 rounded-full transition-all flex items-center gap-2"
            style={{
              backgroundColor: activeTab === 'tasks' ? '#8245FE' : 'transparent',
              color: activeTab === 'tasks' ? 'white' : '#0E0049',
              borderRadius: '20px',
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-weight-medium)',
              fontFamily: 'Inter, sans-serif',
              minHeight: '37px'
            }}
          >
            <ListTodo className="w-4 h-4" />
            <span>Tasks</span>
          </button>
          <button
            onClick={() => setActiveTab('notes')}
            className="px-5 py-2 rounded-full transition-all flex items-center gap-2"
            style={{
              backgroundColor: activeTab === 'notes' ? '#8245FE' : 'transparent',
              color: activeTab === 'notes' ? 'white' : '#0E0049',
              borderRadius: '20px',
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-weight-normal)',
              fontFamily: 'Inter, sans-serif',
              minHeight: '37px'
            }}
          >
            <StickyNote className="w-4 h-4" />
            <span>Notes</span>
          </button>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4" style={{ paddingBottom: '120px' }}>
        {activeTab === 'tasks' ? (
          <div className="space-y-3">
            {assignment.tasks.length === 0 ? (
              <div className="text-center py-12">
                <ListTodo className="w-12 h-12 mx-auto mb-3" style={{ color: 'var(--muted-foreground)' }} />
                <p style={{ 
                  fontSize: 'var(--text-sm)',
                  color: 'var(--muted-foreground)',
                  fontFamily: 'Inter, sans-serif'
                }}>
                  No tasks yet. Add one below!
                </p>
              </div>
            ) : (
              assignment.tasks.map(task => (
                <div key={task.id} className="flex items-center gap-3 p-3 backdrop-blur-xl border" style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  borderColor: 'rgba(130, 69, 254, 0.15)',
                  borderRadius: '16px'
                }}>
                  <button
                    onClick={() => toggleTask(task.id)}
                    className="flex-shrink-0 active:opacity-60 transition-opacity"
                    style={{ minWidth: '44px', minHeight: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    {task.completed ? (
                      <CheckCircle2 className="w-6 h-6" style={{ color: '#8245FE' }} />
                    ) : (
                      <Circle className="w-6 h-6" style={{ color: 'rgba(14, 0, 73, 0.6)', strokeWidth: 2 }} />
                    )}
                  </button>
                  
                  {editingTaskId === task.id ? (
                    <input
                      type="text"
                      value={editingTaskText}
                      onChange={(e) => setEditingTaskText(e.target.value)}
                      onBlur={() => updateTask(task.id, editingTaskText)}
                      onKeyPress={(e) => e.key === 'Enter' && updateTask(task.id, editingTaskText)}
                      autoFocus
                      className="flex-1 px-2 py-1 bg-white border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                      style={{ 
                        borderRadius: 'var(--radius-small)',
                        fontSize: 'var(--text-sm)',
                        fontFamily: 'Inter, sans-serif'
                      }}
                    />
                  ) : (
                    <span
                      onClick={() => {
                        setEditingTaskId(task.id);
                        setEditingTaskText(task.text);
                      }}
                      className={`flex-1 cursor-pointer ${task.completed ? 'line-through' : ''}`}
                      style={{ 
                        fontSize: 'var(--text-sm)',
                        fontFamily: 'Inter, sans-serif',
                        color: task.completed ? 'var(--muted-foreground)' : '#0E0049'
                      }}
                    >
                      {task.text}
                    </span>
                  )}
                  
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="active:opacity-60 p-2 rounded transition-all flex-shrink-0"
                    style={{ 
                      borderRadius: '8px',
                      minWidth: '44px',
                      minHeight: '44px',
                      color: '#EF4444'
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {(!assignment.notes || assignment.notes.length === 0) ? (
              <div className="text-center py-12">
                <StickyNote className="w-12 h-12 mx-auto mb-3" style={{ color: 'var(--muted-foreground)' }} />
                <p style={{ 
                  fontSize: 'var(--text-sm)',
                  color: 'var(--muted-foreground)',
                  fontFamily: 'Inter, sans-serif'
                }}>
                  No notes yet. Write one below!
                </p>
              </div>
            ) : (
              assignment.notes.map(note => (
                <div key={note.id} className="p-4 backdrop-blur-xl border" style={{ 
                  backgroundColor: 'var(--glass-card)',
                  borderColor: 'var(--glass-border)',
                  borderRadius: 'var(--radius-card)'
                }}>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <p style={{ 
                      fontSize: 'var(--text-xs)',
                      color: 'var(--muted-foreground)',
                      fontFamily: 'Inter, sans-serif'
                    }}>
                      {new Date(note.timestamp).toLocaleDateString()} at {new Date(note.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                    <button
                      onClick={() => {
                        setEditingNoteId(note.id);
                        setEditingNoteText(note.text);
                        setShowNoteEditSheet(true);
                      }}
                      className="text-primary active:bg-primary/10 p-2 rounded transition-all flex-shrink-0"
                      style={{ 
                        borderRadius: 'var(--radius-small)',
                        minWidth: '44px',
                        minHeight: '44px'
                      }}
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="whitespace-pre-wrap" style={{ 
                    fontSize: 'var(--text-sm)',
                    fontFamily: 'Inter, sans-serif',
                    color: 'var(--foreground)'
                  }}>
                    {note.text}
                  </p>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Bottom Input */}
      <div className="flex-shrink-0 backdrop-blur-xl border-t p-4" style={{ 
        background: 'linear-gradient(170.349deg, rgb(239, 246, 255) 0%, rgb(250, 245, 255) 50%, rgb(238, 242, 255) 100%)',
        borderColor: 'rgba(130, 69, 254, 0.15)',
        boxShadow: '0 -4px 12px rgba(0,0,0,0.05)'
      }}>
        {activeTab === 'tasks' ? (
          <div className="flex gap-2">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTask()}
              placeholder="Add a new task..."
              className="flex-1 px-4 py-3 border focus:outline-none focus:ring-2"
              style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                borderColor: 'rgba(130, 69, 254, 0.15)',
                borderRadius: '12px',
                fontSize: 'var(--text-sm)',
                fontFamily: 'Inter, sans-serif',
                color: '#0E0049',
                minHeight: '52px'
              }}
            />
            <button
              onClick={addTask}
              className="active:opacity-80 transition-opacity flex items-center justify-center"
              style={{ 
                backgroundColor: '#8245FE',
                color: 'white',
                borderRadius: '12px',
                minWidth: '52px',
                minHeight: '52px'
              }}
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <div className="flex gap-2 items-start">
            <textarea
              value={newNote}
              onChange={(e) => {
                setNewNote(e.target.value);
                const textarea = e.target as HTMLTextAreaElement;
                textarea.style.height = 'auto';
                const newHeight = Math.min(textarea.scrollHeight, window.innerHeight * 0.5);
                textarea.style.height = `${newHeight}px`;
              }}
              placeholder="Write a note..."
              rows={1}
              className="flex-1 px-4 py-3 border focus:outline-none focus:ring-2 resize-none"
              style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                borderColor: 'rgba(130, 69, 254, 0.15)',
                borderRadius: '12px',
                fontSize: 'var(--text-sm)',
                fontFamily: 'Inter, sans-serif',
                color: '#0E0049',
                minHeight: '52px',
                maxHeight: '50vh'
              }}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  addNote();
                }
              }}
            />
            <button
              onClick={addNote}
              className="active:opacity-80 transition-opacity flex items-center justify-center flex-shrink-0"
              style={{ 
                backgroundColor: '#8245FE',
                color: 'white',
                borderRadius: '12px',
                minWidth: '52px',
                minHeight: '52px'
              }}
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {/* Note Edit Bottom Sheet */}
      {showNoteEditSheet && (
        <>
          <div 
            className="fixed inset-0 bg-black/40 z-50"
            onClick={() => {
              setShowNoteEditSheet(false);
              setEditingNoteId(null);
              setEditingNoteText('');
            }}
          />
          
          <div className="fixed bottom-0 left-0 right-0 z-50" style={{ 
            background: 'var(--background-gradient)',
            borderTopLeftRadius: '24px',
            borderTopRightRadius: '24px',
            maxHeight: '70vh',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 -4px 24px rgba(0,0,0,0.15)'
          }}>
            <div className="flex justify-center py-3">
              <div style={{ 
                width: '40px',
                height: '4px',
                backgroundColor: 'var(--border)',
                borderRadius: '2px'
              }} />
            </div>

            <div className="px-6 pb-4">
              <div className="flex items-center gap-3 mb-1">
                <button
                  onClick={() => setShowDeleteWarning(true)}
                  className="text-destructive active:bg-destructive/10 p-2 rounded transition-all"
                  style={{ 
                    borderRadius: 'var(--radius-button)',
                    minWidth: '44px',
                    minHeight: '44px'
                  }}
                >
                  <Trash2 className="w-5 h-5" />
                </button>
                <h3 className="flex-1" style={{ 
                  fontSize: 'var(--text-lg)',
                  fontWeight: 'var(--font-weight-semibold)',
                  fontFamily: 'Inter, sans-serif',
                  color: 'var(--foreground)'
                }}>
                  Edit Note
                </h3>
                <button
                  onClick={() => {
                    setShowNoteEditSheet(false);
                    setEditingNoteId(null);
                    setEditingNoteText('');
                  }}
                  className="p-2 active:opacity-60 transition-opacity flex items-center justify-center"
                  style={{ 
                    borderRadius: 'var(--radius-button)',
                    minWidth: '44px',
                    minHeight: '44px',
                    backgroundColor: 'rgba(0,0,0,0.05)'
                  }}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 pb-6">
              <textarea
                value={editingNoteText}
                onChange={(e) => setEditingNoteText(e.target.value)}
                autoFocus
                rows={8}
                className="w-full px-4 py-3 bg-white border border-border focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                style={{ 
                  borderRadius: 'var(--radius-input)',
                  fontSize: 'var(--text-sm)',
                  fontFamily: 'Inter, sans-serif'
                }}
                placeholder="Write your note..."
              />
            </div>

            <div className="px-6 py-4 border-t" style={{ 
              backgroundColor: 'var(--background)',
              borderColor: 'var(--border)'
            }}>
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setShowNoteEditSheet(false);
                    setEditingNoteId(null);
                    setEditingNoteText('');
                  }}
                  className="flex-1 px-4 py-3 bg-secondary active:opacity-80 transition-opacity"
                  style={{ 
                    borderRadius: 'var(--radius-button)',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--font-weight-medium)',
                    fontFamily: 'Inter, sans-serif',
                    minHeight: '52px'
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={updateNote}
                  className="flex-1 px-4 py-3 text-primary-foreground active:opacity-80 transition-opacity"
                  style={{ 
                    borderRadius: 'var(--radius-button)',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--font-weight-medium)',
                    fontFamily: 'Inter, sans-serif',
                    minHeight: '52px',
                    backgroundColor: 'var(--primary)'
                  }}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Reminders Bottom Sheet */}
      {showRemindersSheet && (
        <>
          <div 
            className="fixed inset-0 bg-black/40 z-50"
            onClick={() => setShowRemindersSheet(false)}
          />
          
          <div className="fixed bottom-0 left-0 right-0 z-50" style={{ 
            background: 'var(--background-gradient)',
            borderTopLeftRadius: '24px',
            borderTopRightRadius: '24px',
            maxHeight: '80vh',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0 -4px 24px rgba(0,0,0,0.15)'
          }}>
            <div className="flex justify-center py-3">
              <div style={{ 
                width: '40px',
                height: '4px',
                backgroundColor: 'var(--border)',
                borderRadius: '2px'
              }} />
            </div>

            <div className="px-6 pb-4">
              <div className="flex items-center justify-between mb-1">
                <h3 style={{ 
                  fontSize: 'var(--text-lg)',
                  fontWeight: 'var(--font-weight-semibold)',
                  fontFamily: 'Inter, sans-serif',
                  color: 'var(--foreground)'
                }}>
                  Reminders
                </h3>
                <button
                  onClick={() => setShowRemindersSheet(false)}
                  className="p-2 active:opacity-60 transition-opacity"
                  style={{ 
                    borderRadius: 'var(--radius-button)',
                    minWidth: '44px',
                    minHeight: '44px',
                    backgroundColor: 'rgba(0,0,0,0.05)'
                  }}
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              {/* Global Reminder Time */}
              <div className="flex items-center gap-2 mt-3">
                <span style={{ 
                  fontSize: 'var(--text-sm)',
                  color: 'var(--muted-foreground)',
                  fontFamily: 'Inter, sans-serif'
                }}>
                  Alert time:
                </span>
                {editingGlobalTime ? (
                  <input
                    type="time"
                    value={globalReminderTime}
                    onChange={(e) => updateGlobalTime(e.target.value)}
                    onBlur={() => setEditingGlobalTime(false)}
                    autoFocus
                    className="px-3 py-1 bg-white border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                    style={{ 
                      borderRadius: 'var(--radius-small)',
                      fontSize: 'var(--text-sm)',
                      fontFamily: 'Inter, sans-serif'
                    }}
                  />
                ) : (
                  <button
                    onClick={() => setEditingGlobalTime(true)}
                    className="px-3 py-1 active:opacity-80 transition-opacity"
                    style={{ 
                      borderRadius: 'var(--radius-small)',
                      fontSize: 'var(--text-sm)',
                      fontWeight: 'var(--font-weight-medium)',
                      fontFamily: 'Inter, sans-serif',
                      backgroundColor: 'rgba(130, 69, 254, 0.1)',
                      color: 'var(--primary)'
                    }}
                  >
                    {globalReminderTime}
                  </button>
                )}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6" style={{ paddingBottom: '80px' }}>
              {/* Active Reminders */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h4 style={{ 
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--font-weight-semibold)',
                    fontFamily: 'Inter, sans-serif',
                    color: 'var(--foreground)'
                  }}>
                    Active Reminders ({assignment.reminders.length})
                  </h4>
                  <button
                    onClick={setAsDefaultReminders}
                    disabled={!remindersChanged}
                    className="px-3 py-1 text-xs transition-opacity"
                    style={{ 
                      borderRadius: 'var(--radius-small)',
                      fontSize: 'var(--text-xs)',
                      fontWeight: 'var(--font-weight-medium)',
                      fontFamily: 'Inter, sans-serif',
                      backgroundColor: remindersChanged ? 'var(--primary)' : '#e5e7eb',
                      color: remindersChanged ? 'white' : '#9ca3af',
                      cursor: remindersChanged ? 'pointer' : 'not-allowed',
                      opacity: remindersChanged ? 1 : 0.6,
                      minHeight: '32px'
                    }}
                  >
                    Set as Default
                  </button>
                </div>
                {assignment.reminders.length === 0 ? (
                  <div className="text-center py-8">
                    <Bell className="w-10 h-10 mx-auto mb-2" style={{ color: 'var(--muted-foreground)' }} />
                    <p style={{ 
                      fontSize: 'var(--text-sm)',
                      color: 'var(--muted-foreground)',
                      fontFamily: 'Inter, sans-serif'
                    }}>
                      No reminders set
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {[...assignment.reminders].sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()).map(reminder => (
                      <div key={reminder.id} className="flex items-center gap-3 p-3 bg-white border" style={{ 
                        borderRadius: 'var(--radius-card)',
                        borderColor: 'var(--border)'
                      }}>
                        <Bell className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--primary)' }} />
                        <div className="flex-1 min-w-0">
                          <p style={{ 
                            fontSize: 'var(--text-sm)',
                            fontFamily: 'Inter, sans-serif',
                            fontWeight: 'var(--font-weight-medium)',
                            color: 'var(--foreground)'
                          }}>
                            {reminder.text}
                          </p>
                        </div>
                        
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <div className="flex items-center gap-1 px-2 py-1" style={{ 
                            backgroundColor: 'rgba(130, 69, 254, 0.1)',
                            borderRadius: 'var(--radius-small)'
                          }}>
                            <span style={{ 
                              fontSize: 'var(--text-xs)',
                              fontWeight: 'var(--font-weight-medium)',
                              fontFamily: 'Inter, sans-serif',
                              color: 'var(--primary)'
                            }}>
                              {new Date(reminder.time).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </span>
                          </div>
                          <button
                            onClick={() => deleteReminder(reminder.id)}
                            className="text-destructive active:bg-destructive/10 p-2 rounded transition-all"
                            style={{ 
                              borderRadius: 'var(--radius-small)',
                              minWidth: '36px',
                              minHeight: '36px'
                            }}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Quick Add */}
              <div className="mb-6">
                <h4 className="mb-3" style={{ 
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-weight-semibold)',
                  fontFamily: 'Inter, sans-serif',
                  color: 'var(--foreground)'
                }}>
                  Quick Add
                </h4>
                <div className="flex flex-wrap gap-2">
                  {PRESET_REMINDERS.map(preset => {
                    const isUsed = usedReminderDays.includes(preset.days);
                    return (
                      <button
                        key={preset.days}
                        onClick={() => {
                          if (!isUsed) {
                            addPresetReminder(preset.days);
                          }
                        }}
                        disabled={isUsed}
                        className="px-4 py-2 border transition-colors"
                        style={{ 
                          borderRadius: 'var(--radius-button)',
                          fontSize: 'var(--text-sm)',
                          fontFamily: 'Inter, sans-serif',
                          minHeight: '44px',
                          backgroundColor: isUsed ? '#e5e7eb' : 'white',
                          borderColor: isUsed ? '#d1d5db' : 'var(--border)',
                          color: isUsed ? '#9ca3af' : 'var(--foreground)',
                          cursor: isUsed ? 'not-allowed' : 'pointer',
                          opacity: isUsed ? 0.6 : 1
                        }}
                      >
                        {preset.label}
                      </button>
                    );
                  })}
                  <button
                    onClick={() => setShowCustomReminder(!showCustomReminder)}
                    className="px-4 py-2 text-primary-foreground active:opacity-80 transition-opacity"
                    style={{ 
                      borderRadius: 'var(--radius-button)',
                      fontSize: 'var(--text-sm)',
                      fontFamily: 'Inter, sans-serif',
                      minHeight: '44px',
                      backgroundColor: 'var(--primary)'
                    }}
                  >
                    Custom
                  </button>
                </div>
              </div>

              {/* Custom Reminder Form */}
              {showCustomReminder && (
                <div className="mb-6 p-4 bg-white border" style={{ 
                  borderRadius: 'var(--radius-card)',
                  borderColor: 'var(--border)'
                }}>
                  <h4 className="mb-3" style={{ 
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--font-weight-semibold)',
                    fontFamily: 'Inter, sans-serif'
                  }}>
                    Custom Reminder
                  </h4>
                  <div className="space-y-2 mb-3">
                    <input
                      type="date"
                      value={customReminderDate}
                      onChange={(e) => setCustomReminderDate(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                      style={{ 
                        borderRadius: 'var(--radius-input)',
                        fontSize: 'var(--text-sm)',
                        fontFamily: 'Inter, sans-serif',
                        minHeight: '44px'
                      }}
                    />
                    <input
                      type="time"
                      value={customReminderTime}
                      onChange={(e) => setCustomReminderTime(e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-border focus:outline-none focus:ring-2 focus:ring-ring"
                      style={{ 
                        borderRadius: 'var(--radius-input)',
                        fontSize: 'var(--text-sm)',
                        fontFamily: 'Inter, sans-serif',
                        minHeight: '44px'
                      }}
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={addCustomReminder}
                      className="flex-1 px-4 py-2 text-primary-foreground active:opacity-80 transition-opacity"
                      style={{ 
                        borderRadius: 'var(--radius-button)',
                        fontSize: 'var(--text-sm)',
                        fontFamily: 'Inter, sans-serif',
                        minHeight: '44px',
                        backgroundColor: 'var(--primary)'
                      }}
                    >
                      Add
                    </button>
                    <button
                      onClick={() => setShowCustomReminder(false)}
                      className="px-4 py-2 bg-secondary active:opacity-80 transition-opacity"
                      style={{ 
                        borderRadius: 'var(--radius-button)',
                        fontSize: 'var(--text-sm)',
                        fontFamily: 'Inter, sans-serif',
                        minHeight: '44px'
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="px-6 py-4 border-t" style={{ 
              background: 'var(--background-gradient)',
              borderColor: 'var(--border)'
            }}>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowRemindersSheet(false)}
                  className="flex-1 px-4 py-3 bg-secondary active:opacity-80 transition-opacity"
                  style={{ 
                    borderRadius: 'var(--radius-button)',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--font-weight-medium)',
                    fontFamily: 'Inter, sans-serif',
                    minHeight: '52px'
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowRemindersSheet(false)}
                  className="flex-1 px-4 py-3 text-primary-foreground active:opacity-80 transition-opacity"
                  style={{ 
                    borderRadius: 'var(--radius-button)',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--font-weight-medium)',
                    fontFamily: 'Inter, sans-serif',
                    minHeight: '52px',
                    backgroundColor: 'var(--primary)'
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Delete Warning Modal */}
      {showDeleteWarning && (
        <>
          <div 
            className="fixed inset-0 bg-black/60 z-[60]"
            onClick={() => setShowDeleteWarning(false)}
          />
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
            <div className="p-6 max-w-sm w-full" style={{ 
              background: 'var(--background-gradient)',
              borderRadius: 'var(--radius-card)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.2)'
            }}>
              <h3 className="mb-2" style={{ 
                fontSize: 'var(--text-lg)',
                fontWeight: 'var(--font-weight-semibold)',
                fontFamily: 'Inter, sans-serif',
                color: 'var(--foreground)'
              }}>
                Delete Note?
              </h3>
              <p className="mb-6" style={{ 
                fontSize: 'var(--text-sm)',
                color: 'var(--muted-foreground)',
                fontFamily: 'Inter, sans-serif'
              }}>
                This action cannot be undone. Are you sure you want to delete this note?
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowDeleteWarning(false)}
                  className="flex-1 px-4 py-3 bg-secondary active:opacity-80 transition-opacity"
                  style={{ 
                    borderRadius: 'var(--radius-button)',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--font-weight-medium)',
                    fontFamily: 'Inter, sans-serif',
                    minHeight: '48px'
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (editingNoteId) {
                      deleteNote(editingNoteId);
                    }
                    setShowDeleteWarning(false);
                    setShowNoteEditSheet(false);
                    setEditingNoteId(null);
                    setEditingNoteText('');
                  }}
                  className="flex-1 px-4 py-3 text-white active:opacity-80 transition-opacity"
                  style={{ 
                    borderRadius: 'var(--radius-button)',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--font-weight-medium)',
                    fontFamily: 'Inter, sans-serif',
                    minHeight: '48px',
                    backgroundColor: '#ef4444'
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}