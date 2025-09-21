"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Home, BookOpen, Users, Archive, Menu, X, LogOut } from "lucide-react";
import Cookies from "js-cookie";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const router = useRouter();

    const nav = [
        { name: "Beranda", href: "/admin", icon: Home },
        { name: "Buku", href: "/admin/books", icon: BookOpen },
        { name: "Anggota", href: "/admin/members", icon: Users },
        { name: "Peminjaman", href: "/admin/loans", icon: Archive },
    ];

    const handleLogout = () => {
        Cookies.remove("token");
        router.push("/auth/login");
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <div
                className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity ${sidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
                    }`}
                onClick={() => setSidebarOpen(false)}
            />

            <aside
                className={`fixed lg:static top-0 left-0 h-screen bg-sky-900 text-white p-6 w-64 z-50 transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
            >
                <div className="flex flex-col justify-between h-full">
                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold">Admin Libsmart</h2>
                            <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <nav className="flex flex-col gap-2">
                            {nav.map((n) => {
                                const Icon = n.icon;
                                return (
                                    <Link
                                        key={n.href}
                                        href={n.href}
                                        className={`flex items-center gap-2 px-3 py-2 rounded transition-colors ${pathname === n.href ? "bg-sky-700" : "hover:bg-sky-800"
                                            }`}
                                    >
                                        <Icon className="w-5 h-5" />
                                        <span>{n.name}</span>
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-3 py-2 rounded hover:bg-red-600 bg-red-500 mt-6"
                    >
                        <LogOut className="w-5 h-5" />
                        <span>Keluar</span>
                    </button>
                </div>
            </aside>

            <div className="flex flex-col flex-1 min-h-screen">
                <section className="flex-1 p-6 lg:ml-0">
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="mb-8 p-2 bg-sky-700 text-white rounded lg:hidden"
                    >
                        <Menu className="w-6 h-6" />
                    </button>

                    {children}
                </section>

                <footer className="bg-gray-200 text-center py-4 text-sm text-gray-600">
                    © {new Date().getFullYear()} Libsmart. Dikembangkan oleh Yondika
                </footer>
            </div>
        </div>
    );
}
