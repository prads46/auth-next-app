"use client";
import Link from "next/link";
import { useEffect,useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setButtonDisabled(!(user.email && user.password));
    }, [user]);

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login success", response.data);
            toast.success("Login successful!");
            router.push("/profile");
        } catch (error: any) {
            console.error("Login failed:", error.response ? error.response.data : error.message);

            if (error.response?.data?.error) {
                toast.error(error.response.data.error);
            } else {
                toast.error("Something went wrong. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-center text-gray-800">
                    {loading ? "Processing..." : "Login"}
                </h2>

                {/* Email */}
                <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 text-gray-900 bg-gray-50 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                />

                {/* Password */}
                <input
                    type="password"
                    placeholder="Enter your password"
                    className="w-full px-4 py-2 text-gray-900 bg-gray-50 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                />

                {/* Login Button */}
                <button
                    onClick={onLogin}
                    disabled={buttonDisabled}
                    className={`w-full px-4 py-2 text-white rounded ${buttonDisabled
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-indigo-600 hover:bg-indigo-700"
                        } focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                >
                    {loading ? "Processing..." : "Login"}
                </button>

                {/* Forgot Password */}
                <div className="text-center">
                    <Link href="/forgotpassword">
                        <button className="text-indigo-600 hover:underline focus:outline-none">
                            Forgotten Password?
                        </button>
                    </Link>
                </div>

                {/* Separator */}
                <div className="flex items-center my-4">
                    <div className="flex-grow h-px bg-gray-300"></div>
                    <span className="px-3 text-sm text-gray-500">or</span>
                    <div className="flex-grow h-px bg-gray-300"></div>
                </div>

                {/* Sign Up Link */}
                <div className="text-center">
                    <Link href="/signup">
                        <button className="w-full px-4 py-2 font-bold text-indigo-600 border border-indigo-600 rounded hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                            Sign Up
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
