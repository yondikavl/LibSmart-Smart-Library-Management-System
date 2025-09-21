"use client";
import { useEffect, useState } from "react";
import { apiUrl } from "@/lib/api";
import {
  Book,
  BookOpen,
  BookmarkCheck,
  Users,
  ClipboardList,
  CheckCircle2,
} from "lucide-react";

type Stats = {
  totalBooks: number;
  availableBooks: number;
  borrowedBooks: number;
  totalMembers: number;
  activeLoans: number;
  finishedLoans: number;
};

export default function AdminPage() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch(apiUrl("/loans/stats"))
      .then((r) => r.json())
      .then(setStats)
      .catch((e) => console.error(e));
  }, []);

  if (!stats) return <div>Loading dashboard...</div>;

  const cards = [
    { label: "Total Books", value: stats.totalBooks, icon: Book, color: "bg-blue-500" },
    { label: "Available Books", value: stats.availableBooks, icon: BookOpen, color: "bg-green-500" },
    { label: "Borrowed Books", value: stats.borrowedBooks, icon: BookmarkCheck, color: "bg-yellow-500" },
    { label: "Total Members", value: stats.totalMembers, icon: Users, color: "bg-purple-500" },
    { label: "Active Loans", value: stats.activeLoans, icon: ClipboardList, color: "bg-orange-500" },
    { label: "Finished Loans", value: stats.finishedLoans, icon: CheckCircle2, color: "bg-teal-500" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">📊 Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <div
              key={c.label}
              className="flex items-center gap-4 bg-white p-5 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow duration-200"
            >
              <div className={`${c.color} p-3 rounded-lg text-white`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <div className="text-sm text-gray-500">{c.label}</div>
                <div className="text-2xl font-bold">{c.value}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
