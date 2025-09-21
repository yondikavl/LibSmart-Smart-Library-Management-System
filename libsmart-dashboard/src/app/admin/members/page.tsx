"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { apiUrl } from "@/lib/api";
import { PlusCircle, Trash2, Edit } from "lucide-react";

type Member = { id: number; name: string; email?: string };

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const fetchMembers = async () => {
    const r = await fetch(apiUrl("/members"));
    setMembers(await r.json());
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const addMember = async () => {
    if (!name) return alert("Name required");
    await fetch(apiUrl("/members"), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });
    setName("");
    setEmail("");
    fetchMembers();
  };

  const deleteMember = async (id: number) => {
    await fetch(apiUrl(`/members/${id}`), { method: "DELETE" });
    fetchMembers();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">👥 Anggota</h1>
      </div>

      <div className="mb-6 p-5 bg-white rounded-xl border border-gray-200">
        <h3 className="font-semibold text-gray-700 mb-3">Tambah Anggota</h3>
        <div className="flex gap-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nama Anggota"
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email (opsional)"
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <button
            onClick={addMember}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition"
          >
            <PlusCircle size={18} /> Tambah
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl overflow-x-auto border border-gray-200">
        <table className="min-w-full text-sm">
          <thead className="bg-sky-600 text-white uppercase text-xs">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Nama Anggota</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {members.map((m, idx) => (
              <tr
                key={m.id}
                className={`${
                  idx % 2 === 0 ? "bg-white" : "bg-gray-100"
                } hover:bg-gray-200 transition`}
              >
                <td className="p-3">{m.id}</td>
                <td className="p-3 font-medium">{m.name}</td>
                <td className="p-3">{m.email ?? "-"}</td>
                <td className="p-3 flex gap-3">
                  <Link
                    href={`/admin/members/${m.id}/edit`}
                    className="flex items-center gap-1 bg-sky-600 px-4 py-2 rounded-4xl text-white hover:bg-sky-800"
                  >
                    <Edit size={16} /> Ubah
                  </Link>
                  <button
                    onClick={() => deleteMember(m.id)}
                    className="flex items-center gap-1 bg-red-600 text-white px-4 py-2 rounded-4xl hover:bg-red-800"
                  >
                    <Trash2 size={16} /> Hapus
                  </button>
                </td>
              </tr>
            ))}
            {members.length === 0 && (
              <tr>
                <td colSpan={4} className="p-6 text-center text-gray-500">
                  No members found 🙅‍♂️
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
