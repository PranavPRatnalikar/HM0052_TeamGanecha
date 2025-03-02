import type { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth/next"
import pool from "@/lib/db"
import type { Account, ApiResponse } from "@/lib/types"

export default async function handler(req: NextApiRequest, res: NextApiResponse<ApiResponse<Account[]>>) {
  if (req.method !== "GET") {
    return res.status(405).json({ success: false, error: "Method not allowed" })
  }

  const session = await getServerSession(req, res)

  if (!session) {
    return res.status(401).json({ success: false, error: "Unauthorized" })
  }

  try {
    const query = `
      SELECT * FROM accounts
      WHERE user_id = $1
    `
    const result = await pool.query(query, [session.user.id])
    const accounts: Account[] = result.rows

    res.status(200).json({ success: true, data: accounts })
  } catch (error) {
    console.error("Error fetching accounts:", error)
    res.status(500).json({ success: false, error: "Internal server error" })
  }
}

