"use client";

import { useState } from "react";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");

    const handleForgot = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Reset password untuk:", email);
        alert("Link reset password sudah dikirim ke email Anda.");
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleForgot}
                className="bg-white p-6 rounded shadow-md w-full max-w-sm"
            >
                <h1 className="text-2xl font-bold mb-8 text-center">Lupa Password</h1>
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full border p-2 mb-3 rounded-lg border-gray-300"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button
                    type="submit"
                    className="w-full bg-sky-600 text-white py-2 rounded-lg hover:bg-sky-700"
                >
                    Kirim Link Reset
                </button>
                <p className="text-sm mt-4 text-center">
                    Ingat password?
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
