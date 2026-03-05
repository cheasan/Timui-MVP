import { useState, useEffect } from 'react';
import { Plus, Tag, TrendingUp, User } from 'lucide-react';
import { AssignmentCard } from './components/AssignmentCard';
import { AssignmentDetail } from './components/AssignmentDetail';
import { AddAssignmentForm } from './components/AddAssignmentForm';
import { AddTaskForm } from './components/AddTaskForm';
import { BottomNav } from './components/BottomNav';
import { Welcome } from './components/Welcome';
import { Onboarding } from './components/Onboarding';
import { Profile } from './components/Profile';
import { TasksList } from './components/TasksList';
import { Deals } from './components/Deals';
import { Develop } from './components/Develop';
import Group from '../imports/Group1';

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

type BottomTab = 'do' | 'deals' | 'develop' | 'profile';
type ContentTab = 'assignments' | 'tasks';

export default function App() {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
  const [userProvider, setUserProvider] = useState<'google' | 'apple' | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const [bottomTab, setBottomTab] = useState<BottomTab>('do');
  const [contentTab, setContentTab] = useState<ContentTab>('assignments');
  const [assignments, setAssignments] = useState<Assignment[]>([
    {
      id: '1',
      title: 'Criminal Law - Final Case Analysis',
      deadline: new Date('2026-02-25T23:59:00'), // Feb 25, 2026 - URGENT (TODAY based on system date)
      tasks: [
        { id: 't1', text: 'Review case files and evidence', completed: false },
        { id: 't2', text: 'Draft opening arguments', completed: false },
        { id: 't3', text: 'Prepare closing statement', completed: false }
      ],
      reminders: [],
      notes: [],
      imageUrl: 'https://images.unsplash.com/photo-1769092992534-f2d0210162b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXclMjBib29rcyUyMGxlZ2FsJTIwbGlicmFyeXxlbnwxfHx8fDE3NzA0MDI5OTV8MA&ixlib=rb-4.1.0&q=80&w=400'
    },
    {
      id: '2',
      title: 'Criminal Law - Assignment 2',
      deadline: new Date('2026-02-26T23:59:00'), // Feb 26, 2026 - URGENT (1 day)
      tasks: [],
      reminders: [],
      notes: [],
      imageUrl: 'https://images.unsplash.com/photo-1769092992534-f2d0210162b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXclMjBib29rcyUyMGxlZ2FsJTIwbGlicmFyeXxlbnwxfHx8fDE3NzA0MDI5OTV8MA&ixlib=rb-4.1.0&q=80&w=400'
    },
    {
      id: '3',
      title: 'Tort Law - Presentation',
      deadline: new Date('2026-03-22T23:59:00'), // Mar 22, 2026
      tasks: [],
      reminders: [],
      notes: [],
      imageUrl: 'https://images.unsplash.com/photo-1769092992534-f2d0210162b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXclMjBib29rcyUyMGxlZ2FsJTIwbGlicmFyeXxlbnwxfHx8fDE3NzA0MDI5OTV8MA&ixlib=rb-4.1.0&q=80&w=400'
    },
    {
      id: '4',
      title: 'International Law - Essay',
      deadline: new Date('2026-04-03T23:59:00'), // Apr 03, 2026
      tasks: [],
      reminders: [],
      notes: [],
      imageUrl: 'https://images.unsplash.com/photo-1769092992534-f2d0210162b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXclMjBib29rcyUyMGxlZ2FsJTIwbGlicmFyeXxlbnwxfHx8fDE3NzA0MDI5OTV8MA&ixlib=rb-4.1.0&q=80&w=400'
    },
    {
      id: '5',
      title: 'Family Law - Case Study',
      deadline: new Date('2026-04-10T23:59:00'), // Apr 10, 2026
      tasks: [],
      reminders: [],
      notes: [],
      imageUrl: 'https://images.unsplash.com/photo-1769092992534-f2d0210162b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXclMjBib29rcyUyMGxlZ2FsJTIwbGlicmFyeXxlbnwxfHx8fDE3NzA0MDI5OTV8MA&ixlib=rb-4.1.0&q=80&w=400'
    },
    {
      id: '6',
      title: 'Constitutional Law - Case Brief',
      deadline: new Date('2026-02-28T23:59:00'), // Feb 28, 2026
      tasks: [
        { id: 't4', text: 'Read and analyze case', completed: true },
        { id: 't5', text: 'Prepare discussion points', completed: false }
      ],
      reminders: [],
      notes: [],
      imageUrl: 'https://images.unsplash.com/photo-1769092992534-f2d0210162b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXclMjBib29rcyUyMGxlZ2FsJTIwbGlicmFyeXxlbnwxfHx8fDE3NzA0MDI5OTV8MA&ixlib=rb-4.1.0&q=80&w=400'
    },
    {
      id: '7',
      title: 'Contract Law - Problem Set 2',
      deadline: new Date('2026-03-02T23:59:00'), // Mar 02, 2026
      tasks: [
        { id: 't6', text: 'Review case files and evidence', completed: false },
        { id: 't7', text: 'Draft opening arguments', completed: false },
        { id: 't8', text: 'Prepare closing statement', completed: false }
      ],
      reminders: [],
      notes: [],
      imageUrl: 'https://images.unsplash.com/photo-1769092992534-f2d0210162b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXclMjBib29rcyUyMGxlZ2FsJTIwbGlicmFyeXxlbnwxfHx8fDE3NzA0MDI5OTV8MA&ixlib=rb-4.1.0&q=80&w=400'
    },
    {
      id: '8',
      title: 'Legal Research & Writing',
      deadline: new Date('2026-03-07T23:59:00'), // Mar 07, 2026
      tasks: [
        { id: 't9', text: 'Choose research topic', completed: true },
        { id: 't10', text: 'Find 10 relevant sources', completed: false },
        { id: 't11', text: 'Create outline', completed: false },
        { id: 't12', text: 'Write first draft', completed: false }
      ],
      reminders: [],
      notes: [],
      imageUrl: 'https://images.unsplash.com/photo-1769092992534-f2d0210162b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXclMjBib29rcyUyMGxlZ2FsJTIwbGlicmFyeXxlbnwxfHx8fDE3NzA0MDI5OTV8MA&ixlib=rb-4.1.0&q=80&w=400'
    }
  ]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showAddTaskForm, setShowAddTaskForm] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [showDevelopDetail, setShowDevelopDetail] = useState(false);
  const [showDealDetail, setShowDealDetail] = useState(false);
  const [showCVBuilder, setShowCVBuilder] = useState(false);

  const addAssignment = (title: string, deadline: Date) => {
    const newAssignment: Assignment = {
      id: Date.now().toString(),
      title,
      deadline,
      tasks: [],
      reminders: [],
      notes: [],
      imageUrl: 'https://images.unsplash.com/photo-1769092992534-f2d0210162b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXclMjBib29rcyUyMGxlZ2FsJTIwbGlicmFyeXxlbnwxfHx8fDE3NzA0MDI5OTV8MA&ixlib=rb-4.1.0&q=80&w=400'
    };
    setAssignments([...assignments, newAssignment]);
    setShowAddForm(false);
  };

  const addTask = (taskText: string, assignmentId?: string) => {
    if (assignmentId) {
      // Add task to specific assignment
      const assignment = assignments.find(a => a.id === assignmentId);
      if (assignment) {
        const newTask: Task = {
          id: `t${Date.now()}`,
          text: taskText,
          completed: false
        };
        const updatedAssignment = {
          ...assignment,
          tasks: [...assignment.tasks, newTask]
        };
        updateAssignment(updatedAssignment);
      }
    }
    // Note: standalone tasks without assignment are not stored yet
    // Would need a separate standalone tasks state in the future
    setShowAddTaskForm(false);
  };

  const updateAssignment = (updatedAssignment: Assignment) => {
    setAssignments(assignments.map(a => 
      a.id === updatedAssignment.id ? updatedAssignment : a
    ));
    // Only update selectedAssignment if it's already selected
    if (selectedAssignment && selectedAssignment.id === updatedAssignment.id) {
      setSelectedAssignment(updatedAssignment);
    }
  };

  const deleteAssignment = (id: string) => {
    setAssignments(assignments.filter(a => a.id !== id));
  };

  const toggleTaskFromList = (assignmentId: string, taskId: string) => {
    const assignment = assignments.find(a => a.id === assignmentId);
    if (!assignment) return;

    const updatedTasks = assignment.tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    
    // Update assignments without triggering navigation
    setAssignments(assignments.map(a => 
      a.id === assignmentId ? { ...a, tasks: updatedTasks } : a
    ));
    
    // Only update selectedAssignment if it's currently selected
    if (selectedAssignment && selectedAssignment.id === assignmentId) {
      setSelectedAssignment({ ...assignment, tasks: updatedTasks });
    }
  };

  const sortedAssignments = [...assignments].sort((a, b) => 
    a.deadline.getTime() - b.deadline.getTime()
  );

  // Authentication handlers
  const handleLogin = (provider: 'google' | 'apple') => {
    // In a real app, this would handle actual authentication
    console.log(`Logging in with ${provider}`);
    setUserProvider(provider);
    setIsAuthenticated(true);
  };

  const handleOnboardingComplete = (data: any) => {
    // In a real app, this would save the onboarding data
    console.log('Onboarding completed with data:', data);
    setHasCompletedOnboarding(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setHasCompletedOnboarding(false);
    setUserProvider(null);
    // Dark mode persists across logout
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Apply dark mode class to document root
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Show welcome screen if not authenticated
  if (!isAuthenticated) {
    return <Welcome onLogin={handleLogin} isDarkMode={isDarkMode} />;
  }

  // Show onboarding if authenticated but hasn't completed onboarding
  if (!hasCompletedOnboarding) {
    return <Onboarding onComplete={handleOnboardingComplete} isDarkMode={isDarkMode} />;
  }

  // Main app
  return (
    <div className="min-h-screen relative pb-32" style={{
      background: isDarkMode 
        ? 'rgba(18, 18, 20, 1.00)' 
        : 'var(--background-gradient)'
    }}>
      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8 relative z-0">
        {bottomTab === 'do' ? (
          <div>
            {/* Header with Title */}
            <div className="flex items-center justify-between ml-[10px] mr-[0px] mt-[0px] mb-[24px]">
              <div style={{ width: '100px', height: '38.35px' }}>
                <Group />
              </div>
              
              {/* Add Button - Icon Only */}
              <button
                onClick={() => contentTab === 'assignments' ? setShowAddForm(true) : setShowAddTaskForm(true)}
                className="bg-primary text-primary-foreground active:opacity-80 transition-opacity flex items-center justify-center"
                style={{ 
                  borderRadius: 'var(--radius-button)',
                  width: '44px',
                  height: '44px'
                }}
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>

            {/* Content Tabs */}
            <div className="backdrop-blur-xl border mb-6 w-full" style={{ 
              background: 'linear-gradient(170.349deg, rgb(239, 246, 255) 0%, rgb(250, 245, 255) 50%, rgb(238, 242, 255) 100%)',
              borderColor: 'rgba(130, 69, 254, 0.15)',
              borderRadius: '24px',
              padding: '6px',
              boxShadow: '0px 8px 32px 0px rgba(14, 0, 73, 0.1)'
            }}>
              <div className="flex gap-2">
                <button
                  onClick={() => setContentTab('assignments')}
                  className="flex-1 px-4 py-3 rounded-full transition-all"
                  style={{
                    backgroundColor: contentTab === 'assignments' ? 'var(--indigo-500)' : 'transparent',
                    color: contentTab === 'assignments' ? 'white' : 'var(--muted-foreground)',
                    borderRadius: '20px',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--font-weight-medium)',
                    minHeight: '44px'
                  }}
                >
                  Assignments
                </button>
                <button
                  onClick={() => setContentTab('tasks')}
                  className="flex-1 px-4 py-3 rounded-full transition-all"
                  style={{
                    backgroundColor: contentTab === 'tasks' ? 'var(--indigo-500)' : 'transparent',
                    color: contentTab === 'tasks' ? 'white' : 'var(--muted-foreground)',
                    borderRadius: '20px',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--font-weight-medium)',
                    minHeight: '44px'
                  }}
                >
                  Tasks
                </button>
              </div>
            </div>

            {/* Content */}
            {contentTab === 'assignments' ? (
              <div>
                {showAddForm && (
                  <AddAssignmentForm 
                    onAdd={addAssignment}
                    onCancel={() => setShowAddForm(false)}
                  />
                )}
                
                {sortedAssignments.map(assignment => (
                  <AssignmentCard
                    key={assignment.id}
                    assignment={assignment}
                    onClick={() => setSelectedAssignment(assignment)}
                  />
                ))}
              </div>
            ) : (
              <TasksList 
                assignments={sortedAssignments}
                onToggleTask={toggleTaskFromList}
              />
            )}
          </div>
        ) : bottomTab === 'deals' ? (
          <Deals onDetailViewChange={setShowDealDetail} />
        ) : bottomTab === 'develop' ? (
          <Develop onDetailViewChange={setShowDevelopDetail} />
        ) : bottomTab === 'profile' ? (
          <div>
            {/* Header with Title */}
            <div className="flex items-center justify-between mb-6">
              <h1 style={{ 
                fontSize: 'var(--text-2xl)',
                fontWeight: 'var(--font-weight-semibold)',
                fontFamily: 'Inter, sans-serif',
                color: 'var(--foreground)'
              }}>
                Profile
              </h1>
            </div>

            {/* Profile Content */}
            <Profile 
              isDarkMode={isDarkMode}
              onToggleDarkMode={toggleDarkMode}
              onLogout={handleLogout}
              onCVBuilderChange={setShowCVBuilder}
            />
          </div>
        ) : null}
      </main>

      {/* Floating Bottom Navigation - Hide when in detail view */}
      {!showDevelopDetail && !showDealDetail && !showCVBuilder && (
        <nav className="fixed bottom-0 left-0 right-0 z-20 px-6 pb-6">
          <div className="max-w-md mx-auto">
            {/* Navigation Bar with 4 Tabs */}
            <div 
              className="flex items-center backdrop-blur-xl border"
              style={{ 
                background: 'linear-gradient(170.349deg, rgb(239, 246, 255) 0%, rgb(250, 245, 255) 50%, rgb(238, 242, 255) 100%)',
                borderColor: 'rgba(130, 69, 254, 0.15)',
                boxShadow: '0px 8px 32px 0px rgba(14, 0, 73, 0.1)',
                borderRadius: '28px',
                padding: '8px',
                gap: '4px'
              }}
            >
              <button
                onClick={() => setBottomTab('do')}
                className="flex flex-col items-center gap-1 flex-1 py-2 rounded-full transition-all"
                style={{
                  backgroundColor: bottomTab === 'do' ? 'var(--indigo-500)' : 'transparent',
                  color: bottomTab === 'do' ? 'white' : 'var(--muted-foreground)',
                  borderRadius: '20px'
                }}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 11l3 3L22 4" />
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                </svg>
                <span style={{ fontSize: 'var(--text-xs)', fontFamily: 'Inter, sans-serif' }}>Do</span>
              </button>

              <button
                onClick={() => setBottomTab('deals')}
                className="flex flex-col items-center gap-1 flex-1 py-2 rounded-full transition-all"
                style={{
                  backgroundColor: bottomTab === 'deals' ? 'var(--indigo-500)' : 'transparent',
                  color: bottomTab === 'deals' ? 'white' : 'var(--muted-foreground)',
                  borderRadius: '20px'
                }}
              >
                <Tag className="w-5 h-5" />
                <span style={{ fontSize: 'var(--text-xs)', fontFamily: 'Inter, sans-serif' }}>Deals</span>
              </button>

              <button
                onClick={() => setBottomTab('develop')}
                className="flex flex-col items-center gap-1 flex-1 py-2 rounded-full transition-all"
                style={{
                  backgroundColor: bottomTab === 'develop' ? 'var(--indigo-500)' : 'transparent',
                  color: bottomTab === 'develop' ? 'white' : 'var(--muted-foreground)',
                  borderRadius: '20px'
                }}
              >
                <TrendingUp className="w-5 h-5" />
                <span style={{ fontSize: 'var(--text-xs)', fontFamily: 'Inter, sans-serif' }}>Develop</span>
              </button>

              <button
                onClick={() => setBottomTab('profile')}
                className="flex flex-col items-center gap-1 flex-1 py-2 rounded-full transition-all"
                style={{
                  backgroundColor: bottomTab === 'profile' ? 'var(--indigo-500)' : 'transparent',
                  color: bottomTab === 'profile' ? 'white' : 'var(--muted-foreground)',
                  borderRadius: '20px'
                }}
              >
                <User className="w-5 h-5" />
                <span style={{ fontSize: 'var(--text-xs)', fontFamily: 'Inter, sans-serif' }}>Profile</span>
              </button>
            </div>
          </div>
        </nav>
      )}

      {/* Assignment Detail Modal */}
      {selectedAssignment && (
        <AssignmentDetail
          assignment={selectedAssignment}
          onClose={() => setSelectedAssignment(null)}
          onUpdate={updateAssignment}
        />
      )}

      {/* Add Task Modal */}
      {showAddTaskForm && (
        <AddTaskForm
          assignments={sortedAssignments}
          onAdd={addTask}
          onCancel={() => setShowAddTaskForm(false)}
        />
      )}
    </div>
  );
}