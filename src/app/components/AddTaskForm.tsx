import { useState } from 'react';
import { ArrowLeft, ChevronDown } from 'lucide-react';

interface Assignment {
  id: string;
  title: string;
}

interface AddTaskFormProps {
  assignments: Assignment[];
  onAdd: (taskText: string, assignmentId?: string) => void;
  onCancel?: () => void;
}

export function AddTaskForm({ assignments, onAdd, onCancel }: AddTaskFormProps) {
  const [taskText, setTaskText] = useState('');
  const [selectedAssignmentId, setSelectedAssignmentId] = useState<string>('');
  const [showAssignmentDropdown, setShowAssignmentDropdown] = useState(false);

  const handleSubmit = () => {
    if (!taskText.trim()) return;
    
    onAdd(taskText, selectedAssignmentId || undefined);
    setTaskText('');
    setSelectedAssignmentId('');
  };

  const selectedAssignment = assignments.find(a => a.id === selectedAssignmentId);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" style={{ 
      background: 'var(--background-gradient)' 
    }}>
      {/* Header */}
      <div className="backdrop-blur-xl border-b sticky top-0 z-10" style={{ 
        backgroundColor: 'var(--glass-background)',
        borderColor: 'var(--glass-border)',
        boxShadow: 'var(--glass-shadow)'
      }}>
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4">
          <button
            onClick={onCancel}
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
          <h2 style={{ 
            fontSize: 'var(--text-lg)',
            fontWeight: 'var(--font-weight-semibold)',
            fontFamily: 'Inter, sans-serif',
            color: 'var(--foreground)'
          }}>
            New Task
          </h2>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="space-y-6">
          <div>
            <label className="block mb-2" style={{ 
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-weight-medium)',
              fontFamily: 'Inter, sans-serif',
              color: 'var(--foreground)'
            }}>
              Task Description *
            </label>
            <textarea
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
              placeholder="e.g., Review Chapter 3 notes"
              className="w-full px-4 py-3 bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              style={{ 
                borderRadius: 'var(--radius-input)',
                fontSize: 'var(--text-sm)',
                fontFamily: 'Inter, sans-serif',
                minHeight: '120px'
              }}
              autoFocus
            />
          </div>

          <div>
            <label className="block mb-2" style={{ 
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-weight-medium)',
              fontFamily: 'Inter, sans-serif',
              color: 'var(--foreground)'
            }}>
              Link to Assignment (Optional)
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowAssignmentDropdown(!showAssignmentDropdown)}
                className="w-full px-4 py-3 bg-input-background border border-border flex items-center justify-between active:opacity-80 transition-opacity"
                style={{ 
                  borderRadius: 'var(--radius-input)',
                  fontSize: 'var(--text-sm)',
                  fontFamily: 'Inter, sans-serif',
                  minHeight: '48px'
                }}
              >
                <span style={{ color: selectedAssignment ? 'var(--foreground)' : 'var(--muted-foreground)' }}>
                  {selectedAssignment ? selectedAssignment.title : 'No assignment (standalone task)'}
                </span>
                <ChevronDown className="w-5 h-5" style={{ color: 'var(--muted-foreground)' }} />
              </button>

              {showAssignmentDropdown && (
                <div 
                  className="absolute top-full left-0 right-0 mt-2 bg-card border border-border overflow-hidden z-20"
                  style={{ 
                    borderRadius: 'var(--radius-input)',
                    boxShadow: 'var(--glass-shadow-lg)',
                    maxHeight: '240px',
                    overflowY: 'auto'
                  }}
                >
                  <button
                    onClick={() => {
                      setSelectedAssignmentId('');
                      setShowAssignmentDropdown(false);
                    }}
                    className="w-full px-4 py-3 text-left active:bg-accent transition-colors"
                    style={{ 
                      fontSize: 'var(--text-sm)',
                      fontFamily: 'Inter, sans-serif',
                      color: 'var(--muted-foreground)',
                      borderBottom: '1px solid var(--border)'
                    }}
                  >
                    No assignment (standalone task)
                  </button>
                  {assignments.map(assignment => (
                    <button
                      key={assignment.id}
                      onClick={() => {
                        setSelectedAssignmentId(assignment.id);
                        setShowAssignmentDropdown(false);
                      }}
                      className="w-full px-4 py-3 text-left active:bg-accent transition-colors"
                      style={{ 
                        fontSize: 'var(--text-sm)',
                        fontFamily: 'Inter, sans-serif',
                        color: 'var(--foreground)',
                        borderBottom: assignment.id === assignments[assignments.length - 1].id ? 'none' : '1px solid var(--border)'
                      }}
                    >
                      {assignment.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Save Button */}
      <div className="fixed bottom-0 left-0 right-0 p-6" style={{ 
        background: 'var(--background-gradient)',
        borderTop: '1px solid var(--border)'
      }}>
        <div className="max-w-4xl mx-auto">
          <button
            onClick={handleSubmit}
            disabled={!taskText.trim()}
            className="w-full px-6 py-4 bg-primary text-primary-foreground active:opacity-80 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ 
              borderRadius: 'var(--radius-button)',
              fontSize: 'var(--text-base)',
              fontWeight: 'var(--font-weight-semibold)',
              fontFamily: 'Inter, sans-serif',
              minHeight: '56px'
            }}
          >
            Save Task
          </button>
        </div>
      </div>
    </div>
  );
}