import type { NextApiRequest, NextApiResponse } from "next"
import bcrypt from "bcryptjs"
import { v4 as uuidv4 } from "uuid"
import pool from "@/lib/db"
import type { User, ApiResponse, SignUpRequest } from "@/lib/types"

export default async function handler(req: NextApiRequest, res: NextApiResponse<ApiResponse<User>>) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" })
  }

  const { name, email, phone, password }: SignUpRequest = req.body

  if (!name || (!email && !phone) || !password) {
    return res.status(400).json({ success: false, error: "Missing required fields" })
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    const userId = uuidv4()

    const query = `
      INSERT INTO users (id, name, email, phone, password, permissions)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id, name, email, phone, permissions
    `
    const values = [
      userId,
      name,
      email || null,
      phone || null,
      hashedPassword,
      JSON.stringify({ smsAccess: false, bankAccountLinking: false, cameraAccess: false }),
    ]

    const result = await pool.query(query, values)
    const user: User = result.rows[0]

    res.status(201).json({ success: true, data: user })
  } catch (error) {
    console.error("Error during sign-up:", error)
    res.status(500).json({ success: false, error: "Internal server error" })
  }
}

