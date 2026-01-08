import dbConnect from "@/lib/mongodb";
import Note from "@/models/Note";
import { NextResponse } from "next/server";

// GET all notes
export async function GET() {
  await dbConnect();
  const notes = await Note.find().sort({ createdAt: -1 });
  return NextResponse.json(notes);
}

// CREATE new note
export async function POST(req) {
  await dbConnect();
  const { title, content } = await req.json();

  const note = await Note.create({ title, content });
  return NextResponse.json(note);
}
