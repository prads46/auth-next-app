import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"
// import { sendEmail } from "@/helpers/mailer";


connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { email, password } = reqBody

        console.log(reqBody);

        //check if user already exists
        const user = await User.findOne({ email })

        if (!user) {
            return NextResponse.json({ error: "User does not exists" }, { status: 404 })
        }
        console.log("user exists");

        const validPassword = await bcryptjs.compare(password, user.password,);
        if (!validPassword) {
            return (NextResponse.json({ error: "Invalid Password" }, { status: 400 }))
        }

        console.log(user);

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        //creating token
        const token = await jwt.sign(tokenData, 'RODRYGO', { expiresIn: "1d" })

        const response = NextResponse.json({
            message: "Login Successful",
            success: true
        })

        response.cookies.set("token", token, {
            httpOnly: true,
        })
        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}