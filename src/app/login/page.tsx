"use client"
import Link from "next/link"
import React, { useEffect } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import toast from "react-hot-toast"

export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    })

    const [buttonDisabled, setButtonDisabled] = React.useState(true);
    const [loading, setLoading] = React.useState(false);

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

    return (<div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
            <h2 className="text-2xl font-bold text-center text-gray-800">
                {loading ? "Processing" : "Login"}
            </h2>

            {/* Username */}

            {/* Email */}
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 mt-1 text-gray-900 bg-gray-50 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter your email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
            </div>

            {/* Password */}
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    className="w-full px-4 py-2 mt-1 text-gray-900 bg-gray-50 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Enter your password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                />
            </div>

            {/* Submit Button */}
            <button onClick={onLogin} disabled={buttonDisabled}
                type="submit"
                className={`w-full px-4 py-2 text-white rounded ${buttonDisabled
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700"
                    } focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}>
                {loading ? "Processing..." : "Login"}
            </button>
            <div className="flex justify-center text-indigo-600">
                <Link href="/signup">
                    <span className="text-black mr-2">New User?</span>
                    <span className="font-bold">SignUp</span>
                </Link>
            </div>

        </div>
    </div>
    )
}