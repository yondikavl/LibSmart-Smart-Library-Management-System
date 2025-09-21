"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiUrl } from "@/lib/api";

export default function EditMember() {
  const params = useParams() as { id: string };
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(()=>{
    fetch(apiUrl(`/members/${params.id}`))
      .then(r=>r.json())
      .then(m => {
        setName(m.name || "");
        setEmail(m.email || "");
      });
  }, [params.id]);

  const save = async () => {
    await fetch(apiUrl(`/members/${params.id}`), {
      method: "PUT",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({ name, email })
    });
    router.push("/admin/members");
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Edit Member</h1>
      <div className="flex gap-2">
        <input value={name} onChange={(e)=>setName(e.target.value)} className="border px-2 py-1" />
        <input value={email} onChange={(e)=>setEmail(e.target.value)} className="border px-2 py-1" />
        <button onClick={save} className="bg-green-600 text-white px-4 py-1 rounded">Save</button>
      </div>
    </div>
  );
}
