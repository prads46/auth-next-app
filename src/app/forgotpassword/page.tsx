"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function ForgotPasswordPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [disabled, setDisabled] = useState(true);
    const [info, setInfo] = useState({
        email: "",
        password: "",
    });

    const resetPassword = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/forgotpassword", { info });
            console.log("Reset Password success", response.data);
            router.push("/login");
        } catch (error: any) {
            console.error("Reset Password failed:", error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (info.email.length > 0 && info.password.length > 0) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    });

    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen py-6 bg-gray-100">
            {loading && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="w-16 h-16 border-4 border-t-blue-500 border-white rounded-full animate-spin"></div>
                </div>
            )}

            <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
                <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">Forgot Password</h1>

                <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full text-black px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    value={info.email}
                    onChange={(e) => setInfo({ ...info, email: e.target.value })}
                    required
                />

                <input
                    type="password"
                    placeholder="Enter your password"
                    className="w-full text-black px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    value={info.password}
                    onChange={(e) => setInfo({ ...info, password: e.target.value })}
                    required
                />

                <div className="flex justify-between gap-4">
                    <button
                        onClick={() => router.push("/login")}
                        className="w-1/2 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={resetPassword}
                        disabled={disabled}
                        type="submit"
                        className={`w-1/2 px-4 py-2 text-white rounded-lg transition-colors duration-300 ${disabled
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            }`}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}
