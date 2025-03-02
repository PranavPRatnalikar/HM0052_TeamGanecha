import type { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth/next"
import pool from "@/lib/db"
import type { Transaction, ApiResponse } from "@/lib/types"

export default async function handler(req: NextApiRequest, res: NextApiResponse<ApiResponse<Transaction[]>>) {
  if (req.method !== "GET") {
    return res.status(405).json({ success: false, error: "Method not allowed" })
  }

  const session = await getServerSession(req, res)

  if (!session) {
    return res.status(401).json({ success: false, error: "Unauthorized" })
  }

  try {
    const query = `
      SELECT * FROM transactions
      WHERE user_id = $1
      ORDER BY date DESC
      LIMIT 100
    `
    const result = await pool.query(query, [session.user.id])
    const transactions: Transaction[] = result.rows

    res.status(200).json({ success: true, data: transactions })
  } catch (error) {
    console.error("Error fetching transactions:", error)
    res.status(500).json({ success: false, error: "Internal server error" })
  }
}

