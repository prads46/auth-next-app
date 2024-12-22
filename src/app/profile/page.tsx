"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import Link from "next/link";

export default function ProfilePage() {
    const router = useRouter();
    const [data, setData] = useState("No Info");
    const handleLogout = async () => {
        try {
            await axios.get("/api/users/logout");
            toast.success("Logged out successfully");
            router.push("/login");
        } catch (error: any) {
            toast.error("Logout failed");
        }
    };

    const getUserDetails = async () => {
        const res = await axios.get('api/users/me');
        console.log(res);
        setData(res.data.data._id);
    }
    return (
        <div className="flex flex-col items-center justify-center h-screen space-y-4">
            <h1 className="text-2xl font-bold">Profile Page</h1>
            <h2 className="p-1 rounded bg-greeen-500">{data === "No Info" ? "No User Info To Display" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
            <button
                onClick={handleLogout}
                className="px-4 py-2 text-white rounded bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
                Logout
            </button>
            <button
                onClick={getUserDetails}
                className="bg-green-800 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >GetUser Details</button>
        </div>
    );
}
