import React, { useState, useEffect } from 'react';

const NotesModal = ({ showNotes, setShowNotes, currentUser }) => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    const savedNotes = localStorage.getItem(`notes_${currentUser.id || 'admin'}`);
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, [currentUser]);

  const saveNotes = (updatedNotes) => {
    setNotes(updatedNotes);
    localStorage.setItem(`notes_${currentUser.id || 'admin'}`, JSON.stringify(updatedNotes));
  };

  const addNote = () => {
    if (!newNote.trim()) return;
    
    const note = {
      id: Date.now(),
      text: newNote,
      timestamp: new Date().toLocaleString(),
      pinned: false
    };
    
    const updatedNotes = [note, ...notes];
    saveNotes(updatedNotes);
    setNewNote('');
  };

  const togglePin = (noteId) => {
    const updatedNotes = notes.map(note => 
      note.id === noteId ? { ...note, pinned: !note.pinned } : note
    );
    saveNotes(updatedNotes);
  };

  const deleteNote = (noteId) => {
    const updatedNotes = notes.filter(note => note.id !== noteId);
    saveNotes(updatedNotes);
  };

  const sortedNotes = [...notes].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return b.id - a.id;
  });

  if (!showNotes) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        background: 'var(--card-bg)',
        borderRadius: '15px',
        padding: '25px',
        width: '90%',
        maxWidth: '600px',
        maxHeight: '80vh',
        overflow: 'hidden',
        border: '1px solid rgba(55, 55, 55, 0.5)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
          borderBottom: '1px solid rgba(55, 55, 55, 0.5)',
          paddingBottom: '15px'
        }}>
          <h2 style={{ color: '#ffffff', margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
            📝 My Notes
          </h2>
          <button
            onClick={() => setShowNotes(false)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#ffffff',
              fontSize: '24px',
              cursor: 'pointer',
              padding: '5px'
            }}
          >
            ×
          </button>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <textarea
              placeholder="Write a new note..."
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              style={{
                flex: 1,
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid rgba(55, 55, 55, 0.5)',
                background: 'rgba(31, 31, 31, 0.8)',
                color: '#ffffff',
                fontSize: '14px',
                minHeight: '80px',
                resize: 'vertical',
                outline: 'none'
              }}
            />
            <button
              onClick={addNote}
              style={{
                padding: '12px 20px',
                borderRadius: '8px',
                border: 'none',
                background: 'linear-gradient(135deg, var(--accent-green) 0%, #1e7e1e 100%)',
                color: '#ffffff',
                cursor: 'pointer',
                fontWeight: '600',
                alignSelf: 'flex-start'
              }}
            >
              Add Note
            </button>
          </div>
        </div>

        <div style={{
          maxHeight: '400px',
          overflowY: 'auto',
          paddingRight: '10px'
        }}>
          {sortedNotes.length === 0 ? (
            <div style={{
              textAlign: 'center',
              color: '#9ca3af',
              padding: '40px',
              fontSize: '16px'
            }}>
              No notes yet. Add your first note above!
            </div>
          ) : (
            sortedNotes.map(note => (
              <div
                key={note.id}
                style={{
                  background: note.pinned ? 'rgba(34, 139, 34, 0.1)' : 'rgba(31, 31, 31, 0.8)',
                  border: note.pinned ? '1px solid rgba(34, 139, 34, 0.3)' : '1px solid rgba(55, 55, 55, 0.5)',
                  borderRadius: '8px',
                  padding: '15px',
                  marginBottom: '10px',
                  position: 'relative'
                }}
              >
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: '8px'
                }}>
                  <div style={{
                    fontSize: '12px',
                    color: '#9ca3af',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    {note.pinned && <span style={{ color: '#fbbf24' }}>📌</span>}
                    {note.timestamp}
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => togglePin(note.id)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: note.pinned ? '#fbbf24' : '#9ca3af',
                        cursor: 'pointer',
                        fontSize: '16px',
                        padding: '2px'
                      }}
                      title={note.pinned ? 'Unpin note' : 'Pin note'}
                    >
                      📌
                    </button>
                    <button
                      onClick={() => deleteNote(note.id)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: '#ef4444',
                        cursor: 'pointer',
                        fontSize: '16px',
                        padding: '2px'
                      }}
                      title="Delete note"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
                <div style={{
                  color: '#ffffff',
                  fontSize: '14px',
                  lineHeight: '1.5',
                  whiteSpace: 'pre-wrap'
                }}>
                  {note.text}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default NotesModal;