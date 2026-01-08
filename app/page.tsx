"use client";
import { useEffect, useState } from "react";

interface Note {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
}

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const fetchNotes = async (): Promise<void> => {
    const res = await fetch("/api/notes");
    const data: Note[] = await res.json();
    setNotes(data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const createNote = async (): Promise<void> => {
    if (!title || !content) return;

    await fetch("/api/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });

    setTitle("");
    setContent("");
    fetchNotes();
  };

  const deleteNote = async (id: string): Promise<void> => {
    await fetch(`/api/notes/${id}`, { method: "DELETE" });
    fetchNotes();
  };

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Notes App</h1>

      <input
        className="border p-2 w-full mb-2"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="border p-2 w-full mb-2"
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <button
        onClick={createNote}
        className="bg-blue-500 text-white px-4 py-2 mb-4"
      >
        Add Note
      </button>

      {notes.map((note) => (
        <div key={note._id} className="border p-3 mb-2">
          <h2 className="font-bold">{note.title}</h2>
          <p>{note.content}</p>
          <button
            onClick={() => deleteNote(note._id)}
            className="text-red-500 mt-2"
          >
            Delete
          </button>
        </div>
      ))}
    </main>
  );
}
