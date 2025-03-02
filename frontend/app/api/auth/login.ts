import type { NextApiRequest, NextApiResponse } from "next"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import pool from "@/lib/db"
import type { User, ApiResponse, LoginRequest, AuthToken } from "@/lib/types"

const JWT_SECRET = process.env.JWT_SECRET

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not set")
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ApiResponse<AuthToken>>) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" })
  }

  const { email, phone, password }: LoginRequest = req.body

  if ((!email && !phone) || !password) {
    return res.status(400).json({ success: false, error: "Missing required fields" })
  }

  try {
    const query = `
      SELECT * FROM users
      WHERE email = $1 OR phone = $2
    `
    const result = await pool.query(query, [email, phone])

    if (result.rows.length === 0) {
      return res.status(401).json({ success: false, error: "Invalid credentials" })
    }

    const user: User = result.rows[0]
    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      return res.status(401).json({ success: false, error: "Invalid credentials" })
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1d" })
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000) // 1 day from now

    res.status(200).json({
      success: true,
      data: { token, expiresAt },
    })
  } catch (error) {
    console.error("Error during login:", error)
    res.status(500).json({ success: false, error: "Internal server error" })
  }
}

