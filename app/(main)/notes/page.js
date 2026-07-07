'use client';
import { useState } from 'react';
import { FileText, Plus, Trash2, Save, BookOpen } from 'lucide-react';

export default function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');

  const addNote = () => {
    if (!newNote.trim()) return;
    setNotes([{ id: Date.now(), text: newNote, time: new Date().toLocaleString('en-IN') }, ...notes]);
    setNewNote('');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-black text-white mb-1 flex items-center gap-3"><FileText size={28} className="text-primary-400" /> My Notes</h1>
        <p className="text-slate-500">Save important grammar rules, vocabulary, or any notes while studying.</p>
      </div>
      <div className="card p-5">
        <label className="block text-sm font-semibold text-slate-300 mb-2">New Note</label>
        <textarea value={newNote} onChange={(e) => setNewNote(e.target.value)} rows={4}
          placeholder="Write a grammar rule, vocabulary word, or anything you want to remember…"
          className="input w-full resize-none mb-3" />
        <button onClick={addNote} disabled={!newNote.trim()} className="btn-primary flex items-center gap-2 text-sm">
          <Plus size={15} /> Save Note
        </button>
      </div>
      {notes.length === 0 ? (
        <div className="empty-state py-16">
          <FileText size={32} className="text-slate-600 mb-3" />
          <p className="text-slate-500">No notes yet. Start writing!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {notes.map((note) => (
            <div key={note.id} className="card p-5">
              <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap mb-3">{note.text}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-600">{note.time}</span>
                <button onClick={() => setNotes(notes.filter((n) => n.id !== note.id))}
                  className="text-danger-400 hover:text-danger-300 transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
