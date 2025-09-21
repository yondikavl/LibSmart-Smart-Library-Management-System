"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Register:", { name, email, password });
        alert("Pendaftaran berhasil! Silakan login.");
        router.push("/auth/login");
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-white">
            <form
                onSubmit={handleRegister}
                className="bg-white p-6 rounded-2xl border border-gray-200 w-full max-w-sm"
            >
                <h1 className="text-2xl font-bold mb-8 text-center">Daftar Libsmart</h1>
                <input
                    type="text"
                    placeholder="Nama"
                    className="w-full border border-gray-300 p-2 mb-3 rounded-lg"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full border border-gray-300 p-2 mb-3 rounded-lg"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full border border-gray-300 p-2 mb-3 rounded-lg"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    type="submit"
                    className="w-full bg-sky-600 text-white py-2 rounded-lg hover:bg-sky-700"
                >
                    Daftar
                </button>
                <p className="text-sm m-4 text-center">
                    Sudah punya akun?
                </p>
                <div className="flex justify-between mt-3 text-center">
                    <a href="/auth/login" className="w-full bg-gray-100 text-sky-900 py-2 rounded-lg hover:bg-gray-200">
                        Masuk
                    </a>
                </div>
            </form>
        </div>
    );
}
