"use client";

import { useEffect, useState } from "react";
import { apiUrl } from "@/lib/api";
import { PlusCircle, CornerUpLeft } from "lucide-react";

export default function AdminLoans() {
  const [bookId, setBookId] = useState("");
  const [memberId, setMemberId] = useState("");
  const [loanId, setLoanId] = useState("");
  const [durationDays, setDurationDays] = useState("");
  const [active, setActive] = useState<any[]>([]);
  const [history, setHistory] = useState<any[]>([]);

  const fetchData = async () => {
    try {
      const a = await fetch(apiUrl("/loans/active"));
      const h = await fetch(apiUrl("/loans/history"));
      setActive(await a.json());
      setHistory(await h.json());
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const borrow = async () => {
    if (!bookId || !memberId || !durationDays) {
      return alert("Fill bookId, memberId & durationDays");
    }
    await fetch(
      apiUrl(
        `/loans/borrow?bookId=${bookId}&memberId=${memberId}&durationDays=${durationDays}`
      ),
      { method: "POST" }
    );
    setBookId("");
    setMemberId("");
    setDurationDays("");
    fetchData();
  };

  const returnBook = async () => {
    if (!loanId) return alert("Fill loanId");
    await fetch(apiUrl(`/loans/return?loanId=${loanId}`), { method: "POST" });
    setLoanId("");
    fetchData();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-800">📚 Peminjaman</h1>

      <div className="bg-white p-5 rounded-xl mb-6 border border-gray-200">
        <h3 className="font-semibold text-gray-700 mb-3">Pinjam Buku</h3>
        <div className="flex gap-3">
          <input
            value={bookId}
            onChange={(e) => setBookId(e.target.value)}
            placeholder="ID Buku"
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none w-full"
          />
          <input
            value={memberId}
            onChange={(e) => setMemberId(e.target.value)}
            placeholder="ID Anggota"
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none w-full"
          />
          <input
            value={durationDays}
            onChange={(e) => setDurationDays(e.target.value)}
            placeholder="Durasi (hari)"
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none w-full"
          />
          <button
            onClick={borrow}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg transition"
          >
            <PlusCircle size={18} /> Pinjam
          </button>
        </div>
      </div>

      <div className="bg-white p-5 rounded-xl mb-6 border border-gray-200">
        <h3 className="font-semibold text-gray-700 mb-3">Pengembalian Buku</h3>
        <div className="flex gap-3 w-1/2">
          <input
            value={loanId}
            onChange={(e) => setLoanId(e.target.value)}
            placeholder="ID Peminjaman"
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none w-full"
          />
          <button
            onClick={returnBook}
            className="flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-lg transition"
          >
            <CornerUpLeft size={18} /> Selesai
          </button>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold text-gray-700 mb-3">Sedang dipinjam</h3>
        <div className="bg-white rounded-xl overflow-x-auto border border-gray-200">
          <table className="min-w-full text-sm">
            <thead className="bg-sky-600 text-white uppercase text-xs">
              <tr>
                <th className="p-3 text-left">ID Peminjaman</th>
                <th className="p-3 text-left">Nama Buku</th>
                <th className="p-3 text-left">Nama Anggota</th>
                <th className="p-3 text-left">Tanggal Pinjam</th>
                <th className="p-3 text-left">Batas Waktu</th>
              </tr>
            </thead>
            <tbody>
              {active.map((l, idx) => (
                <tr
                  key={l.id}
                  className={`${
                    idx % 2 === 0 ? "bg-white" : "bg-gray-100"
                  } hover:bg-gray-200 transition`}
                >
                  <td className="p-3">{l.id}</td>
                  <td className="p-3">{l.book?.title}</td>
                  <td className="p-3">{l.member?.name}</td>
                  <td className="p-3">{l.loanDate}</td>
                  <td className="p-3">{l.dueDate}</td>
                </tr>
              ))}
              {active.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-gray-500">
                    Tidak Ada Peminjaman 🔍
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-gray-700 mb-3">Riwayat Peminjaman</h3>
        <div className="bg-white rounded-xl overflow-x-auto border border-gray-200">
          <table className="min-w-full text-sm">
            <thead className="bg-sky-600 text-white uppercase text-xs">
              <tr>
                <th className="p-3 text-left">ID Peminjaman</th>
                <th className="p-3 text-left">Nama Buku</th>
                <th className="p-3 text-left">Nama Anggota</th>
                <th className="p-3 text-left">Tanggal Pinjam</th>
                <th className="p-3 text-left">Tanggal Kembali</th>
                <th className="p-3 text-left">Denda</th>
              </tr>
            </thead>
            <tbody>
              {history.map((l, idx) => (
                <tr
                  key={l.id}
                  className={`${
                    idx % 2 === 0 ? "bg-white" : "bg-gray-10"
                  } hover:bg-gray-200 transition`}
                >
                  <td className="p-3">{l.id}</td>
                  <td className="p-3">{l.book?.title}</td>
                  <td className="p-3">{l.member?.name}</td>
                  <td className="p-3">{l.loanDate}</td>
                  <td className="p-3">{l.returnDate ?? "-"}</td>
                  <td className="p-3">
                    {l.fine ? `Rp ${l.fine.toLocaleString()}` : "-"}
                  </td>
                </tr>
              ))}
              {history.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-6 text-center text-gray-500">
                    Tidak ada Riwayat Peminjaman 📭
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
