import type { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth/next"
import pool from "@/lib/db"
import type { ApiResponse, CategorizeTransactionRequest } from "@/lib/types"
import { categorizeTransaction } from "@/lib/transactionCategories"

export default async function handler(req: NextApiRequest, res: NextApiResponse<ApiResponse<{ category: string }>>) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" })
  }

  const session = await getServerSession(req, res)

  if (!session) {
    return res.status(401).json({ success: false, error: "Unauthorized" })
  }

  const { transactionId, category }: CategorizeTransactionRequest = req.body

  if (!transactionId) {
    return res.status(400).json({ success: false, error: "Missing transaction ID" })
  }

  try {
    let finalCategory = category

    if (!category) {
      // Fetch transaction details to auto-categorize
      const fetchQuery = "SELECT description FROM transactions WHERE id = $1 AND user_id = $2"
      const fetchResult = await pool.query(fetchQuery, [transactionId, session.user.id])

      if (fetchResult.rows.length === 0) {
        return res.status(404).json({ success: false, error: "Transaction not found" })
      }

      const { description } = fetchResult.rows[0]
      finalCategory = categorizeTransaction(description)
    }

    // Update the transaction category
    const updateQuery = "UPDATE transactions SET category = $1 WHERE id = $2 AND user_id = $3"
    await pool.query(updateQuery, [finalCategory, transactionId, session.user.id])

    res.status(200).json({ success: true, data: { category: finalCategory } })
  } catch (error) {
    console.error("Error categorizing transaction:", error)
    res.status(500).json({ success: false, error: "Internal server error" })
  }
}

