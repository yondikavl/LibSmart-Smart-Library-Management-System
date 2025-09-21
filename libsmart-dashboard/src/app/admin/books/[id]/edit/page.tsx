"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiUrl } from "@/lib/api";

export default function EditBook() {
  const params = useParams() as { id: string };
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    fetch(apiUrl(`/books/${params.id}`))
      .then(r=>r.json())
      .then(b => {
        setTitle(b.title || "");
        setAuthor(b.author || "");
      });
  }, [params.id]);

  const updateBook = async () => {
    await fetch(apiUrl(`/books/${params.id}`), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, author, available: true })
    });
    router.push("/admin/books");
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Edit Book</h1>
      <div className="flex gap-2">
        <input value={title} onChange={(e)=>setTitle(e.target.value)} className="border px-2 py-1" />
        <input value={author} onChange={(e)=>setAuthor(e.target.value)} className="border px-2 py-1" />
        <button onClick={updateBook} className="bg-green-600 text-white px-4 py-1 rounded">Save</button>
      </div>
    </div>
  );
}
