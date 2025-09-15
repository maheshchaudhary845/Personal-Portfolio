import nodemailer from "nodemailer"
import { NextResponse } from "next/server";

export async function POST(req, res) {
    if (req.method === "POST") {
        const { name, email, subject, message } = await req.json();

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_ID,
                pass: process.env.EMAIL_SECRET,
            }
        })

        try {
            await transporter.sendMail({
                from: email,
                to: process.env.EMAIL_ID,
                subject: `Portfolio Contact: ${subject}`,
                text: `Name: ${name}\nEmail: ${email}\n\n${message}`
            })
            return NextResponse.json({ success: true })
        }
        catch (error) {
            return NextResponse.json({ success: false, message: error.message })
        }

    }
}