import dbConnect from "@/lib/mongodb";
import Note from "@/models/Note";
import { NextResponse } from "next/server";

// UPDATE
export async function PUT(req, { params }) {
  await dbConnect();
  const { title, content } = await req.json();

  const note = await Note.findByIdAndUpdate(
    params.id,
    { title, content },
    { new: true }
  );

  return NextResponse.json(note);
}

// DELETE
export async function DELETE(req, { params }) {
  await dbConnect();
  await Note.findByIdAndDelete(params.id);
  return NextResponse.json({ success: true });
}
