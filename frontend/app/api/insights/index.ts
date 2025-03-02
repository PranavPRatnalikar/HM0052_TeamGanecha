import type { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth/next"
import pool from "@/lib/db"
import type { ApiResponse, Insight } from "@/lib/types"

export default async function handler(req: NextApiRequest, res: NextApiResponse<ApiResponse<Insight[]>>) {
  if (req.method !== "GET") {
    return res.status(405).json({ success: false, error: "Method not allowed" })
  }

  const session = await getServerSession(req, res)

  if (!session) {
    return res.status(401).json({ success: false, error: "Unauthorized" })
  }

  try {
    // Fetch insights from the database
    const query = "SELECT * FROM insights WHERE user_id = $1 ORDER BY date DESC LIMIT 10"
    const result = await pool.query(query, [session.user.id])
    const insights: Insight[] = result.rows

    res.status(200).json({ success: true, data: insights })
  } catch (error) {
    console.error("Error fetching insights:", error)
    res.status(500).json({ success: false, error: "Internal server error" })
  }
}

