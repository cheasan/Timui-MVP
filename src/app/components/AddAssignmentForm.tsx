import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

interface AddAssignmentFormProps {
  onAdd: (title: string, deadline: Date) => void;
  onCancel?: () => void;
}

export function AddAssignmentForm({ onAdd, onCancel }: AddAssignmentFormProps) {
  const [title, setTitle] = useState('');
  const [deadline, setDeadline] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !deadline) return;

    const deadlineDate = new Date(deadline);
    onAdd(title, deadlineDate);
    setTitle('');
    setDeadline('');
  };

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
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4" style={{
          background: 'var(--background-gradient)'
        }}>
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
            New Assignment
          </h2>
        </div>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto px-6 py-8">
        <div className="space-y-6">
          <div>
            <label className="block mb-2" style={{ 
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-weight-medium)',
              fontFamily: 'Inter, sans-serif',
              color: 'var(--foreground)'
            }}>
              Assignment Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Constitutional Law - Case Brief"
              className="w-full px-4 py-3 bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-ring"
              style={{ 
                borderRadius: 'var(--radius-input)',
                fontSize: 'var(--text-sm)',
                fontFamily: 'Inter, sans-serif',
                minHeight: '48px'
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
              Deadline *
            </label>
            <input
              type="datetime-local"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full px-4 py-3 bg-input-background border border-border focus:outline-none focus:ring-2 focus:ring-ring"
              style={{ 
                borderRadius: 'var(--radius-input)',
                fontSize: 'var(--text-sm)',
                fontFamily: 'Inter, sans-serif',
                minHeight: '48px'
              }}
            />
          </div>
        </div>
      </form>

      {/* Bottom Save Button */}
      <div className="fixed bottom-0 left-0 right-0 p-6" style={{ 
        background: 'var(--background-gradient)',
        borderTop: '1px solid var(--border)'
      }}>
        <div className="max-w-4xl mx-auto">
          <button
            onClick={handleSubmit}
            disabled={!title.trim() || !deadline}
            className="w-full px-6 py-4 bg-primary text-primary-foreground active:opacity-80 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
            style={{ 
              borderRadius: 'var(--radius-button)',
              fontSize: 'var(--text-base)',
              fontWeight: 'var(--font-weight-semibold)',
              fontFamily: 'Inter, sans-serif',
              minHeight: '56px'
            }}
          >
            Save Assignment
          </button>
        </div>
      </div>
    </div>
  );
}