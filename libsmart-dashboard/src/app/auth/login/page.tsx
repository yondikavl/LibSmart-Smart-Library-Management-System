"use client";

import { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (email === "admin@mail.com" && password === "123456") {
            Cookies.set("token", "dummy-token", { expires: 1 });
            router.push("/admin");
        } else {
            alert("Email atau password salah");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-white">
            <form
                onSubmit={handleLogin}
                className="bg-white p-6 rounded-2xl border border-gray-200 w-full max-w-sm"
            >
                <h1 className="text-2xl font-bold mb-8 text-center">Masuk Libsmart</h1>
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
                    Masuk
                </button>
                <div className="flex justify-end mt-3 text-sm">
                    <a
                        href="/auth/forgot-password"
                        className="text-sky-700 hover:underline"
                    >
                        Lupa Password?
                    </a>
                </div>
                <div className="flex justify-between mt-3 text-center">
                    <a href="/auth/register" className="w-full bg-gray-100 text-sky-900 py-2 rounded-lg hover:bg-gray-200">
                        Daftar
                    </a>
                </div>
            </form>
        </div>
    );
}
