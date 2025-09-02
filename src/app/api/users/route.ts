import { NextResponse } from "next/server";
import pool from "@/backend/db";

// Handle GET request → fetch all users
export async function GET() {
  try {
    const [rows] = await pool.query("SELECT * FROM users_info");
    // ✅ rows is an array, perfect for .map()
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

// Example: Handle POST request → insert a user
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email } = body;

    await pool.query("INSERT INTO users (name, email) VALUES (?, ?)", [name, email]);

    return NextResponse.json({ message: "User added successfully" }, { status: 201 });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
