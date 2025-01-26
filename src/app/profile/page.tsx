"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import Link from "next/link";

export default function ProfilePage() {
    const router = useRouter();
    const [data, setData] = useState("No Info");
    const [isVerified, setIsVerified] = useState(false); // State for verification status

    const handleLogout = async () => {
        try {
            await axios.get("/api/users/logout");
            toast.success("Logged out successfully");
            router.push("/login");
        } catch (error: any) {
            toast.error("Logout failed");
        }
    };

    const handleVerifyEmail = async () => {
        try {
            await axios.post("/api/users/send-verification-email");
            toast.success("Verification email sent successfully");
        } catch (error: any) {
            toast.error("Failed to send verification email");
        }
    };

    // Automatically fetch user details when the page loads
    useEffect(() => {
        const getUserDetails = async () => {
            try {
                const res = await axios.get("/api/users/me");
                setData(res.data.data._id);
                setIsVerified(res.data.data.isVerified); // Set verification status
            } catch (error: any) {
                toast.error("Failed to fetch user details");
            }
        };
        getUserDetails();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-screen space-y-6 bg-gray-100 p-6">
            <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md space-y-4">
                <h1 className="text-3xl font-bold text-center text-gray-800">Profile Page</h1>
                <div className="p-4 bg-green-100 text-green-700 rounded-md text-center">
                    {data === "No Info" ? (
                        <p>No User Info To Display</p>
                    ) : (
                        <Link
                            href={`/profile/${data}`}
                            className="text-blue-600 hover:underline font-semibold"
                        >
                            {data}
                        </Link>
                    )}
                </div>
                <div className="space-y-2">
                    {!isVerified && (
                        <button
                            onClick={handleVerifyEmail}
                            className="w-full px-4 py-2 text-white font-medium bg-yellow-500 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2"
                        >
                            Verify Email
                        </button>
                    )}
                    <button
                        onClick={handleLogout}
                        className="w-full px-4 py-2 text-white font-medium bg-red-600 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}
