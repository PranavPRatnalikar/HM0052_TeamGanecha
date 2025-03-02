import type { NextApiRequest, NextApiResponse } from "next"
import { getServerSession } from "next-auth/next"
import pool from "@/lib/db"
import type { ApiResponse, ChatbotQueryRequest } from "@/lib/types"

// Placeholder function for Flask API call
async function callFlaskAPI(query: string): Promise<string> {
  // TODO: Implement actual Flask API call
  console.log("Sending query to Flask API:", query)
  return "This is a placeholder response from the Flask API."
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ApiResponse<{ response: string }>>) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" })
  }

  const session = await getServerSession(req, res)

  if (!session) {
    return res.status(401).json({ success: false, error: "Unauthorized" })
  }

  const { query }: ChatbotQueryRequest = req.body

  if (!query) {
    return res.status(400).json({ success: false, error: "Missing query" })
  }

  try {
    // Check if the query matches any pre-approved FAQs
    const faqQuery = "SELECT response FROM faqs WHERE LOWER(question) = LOWER($1)"
    const faqResult = await pool.query(faqQuery, [query])

    let response: string

    if (faqResult.rows.length > 0) {
      response = faqResult.rows[0].response
    } else {
      // If not found in FAQs, call the Flask API
      response = await callFlaskAPI(query)
    }

    // Store the query and response
    const storeQuery = "INSERT INTO chatbot_queries (user_id, query, response, date) VALUES ($1, $2, $3, NOW())"
    await pool.query(storeQuery, [session.user.id, query, response])

    res.status(200).json({ success: true, data: { response } })
  } catch (error) {
    console.error("Error processing chatbot query:", error)
    res.status(500).json({ success: false, error: "Internal server error" })
  }
}

