"use client";
import { useEffect, useState } from "react";
import { apiUrl } from "@/lib/api";
import Link from "next/link";
import { PlusCircle, Trash2, Edit, CheckCircle, XCircle } from "lucide-react";

type Book = { id: number; title: string; author: string; available: boolean };

export default function BooksPage() {
    const [books, setBooks] = useState<Book[]>([]);
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");

    const fetchBooks = async () => {
        const r = await fetch(apiUrl("/books"));
        setBooks(await r.json());
    };

    useEffect(() => { fetchBooks(); }, []);

    const addBook = async () => {
        if (!title || !author) return alert("Title & author required");
        await fetch(apiUrl("/books"), {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, author, available: true })
        });
        setTitle(""); setAuthor("");
        fetchBooks();
    };

    const deleteBook = async (id: number) => {
        await fetch(apiUrl(`/books/${id}`), { method: "DELETE" });
        fetchBooks();
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-800">📚 Buku</h1>
            </div>

            <div className="mb-6 p-5 bg-white rounded-xl border border-gray-200">
                <h3 className="font-semibold text-gray-700 mb-3">Tambah Buku</h3>
                <div className="flex gap-3">
                    <input
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        placeholder="Judul Buku"
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                    />
                    <input
                        value={author}
                        onChange={e => setAuthor(e.target.value)}
                        placeholder="Penulis"
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                    />
                    <button
                        onClick={addBook}
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
                            <th className="p-3 text-left">Judul Buku</th>
                            <th className="p-3 text-left">Penulis</th>
                            <th className="p-3 text-left">ketersediaan</th>
                            <th className="p-3 text-left">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((b, idx) => (
                            <tr
                                key={b.id}
                                className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-100"
                                    } hover:bg-gray-200 transition`}
                            >
                                <td className="p-3">{b.id}</td>
                                <td className="p-3 font-medium">{b.title}</td>
                                <td className="p-3">{b.author}</td>
                                <td className="p-3">
                                    {b.available ? (
                                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-green-700 bg-green-100 text-xs">
                                            <CheckCircle size={14} /> Tersedia
                                        </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-red-700 bg-red-100 text-xs">
                                            <XCircle size={14} /> Tidak Tersedia
                                        </span>
                                    )}
                                </td>
                                <td className="p-3 flex gap-3">
                                    <Link
                                        href={`/admin/books/${b.id}/edit`}
                                        className="flex items-center gap-1 bg-sky-600 px-4 py-2 rounded-4xl text-white hover:bg-sky-800"
                                    >
                                        <Edit size={16} /> Ubah
                                    </Link>
                                    <button
                                        onClick={() => deleteBook(b.id)}
                                        className="flex items-center gap-1 bg-red-600 text-white px-4 py-2 rounded-4xl hover:bg-red-800"
                                    >
                                        <Trash2 size={16} /> Hapus
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {books.length === 0 && (
                            <tr>
                                <td colSpan={5} className="p-6 text-center text-gray-500">
                                    No books found 📭
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
