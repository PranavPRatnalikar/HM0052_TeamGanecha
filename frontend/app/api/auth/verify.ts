import type { NextApiRequest, NextApiResponse } from "next"
import pool from "@/lib/db"
import type { ApiResponse, VerifyOTPRequest } from "@/lib/types"

export default async function handler(req: NextApiRequest, res: NextApiResponse<ApiResponse<{ verified: boolean }>>) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" })
  }

  const { email, phone, otp }: VerifyOTPRequest = req.body

  if ((!email && !phone) || !otp) {
    return res.status(400).json({ success: false, error: "Missing required fields" })
  }

  try {
    // In a real implementation, you would verify the OTP against a stored value
    // For this example, we'll just check if the OTP is '123456'
    const isValidOTP = otp === "123456"

    if (isValidOTP) {
      // Update the user's verified status in the database
      const query = `
        UPDATE users
        SET verified = true
        WHERE email = $1 OR phone = $2
      `
      await pool.query(query, [email, phone])

      res.status(200).json({ success: true, data: { verified: true } })
    } else {
      res.status(400).json({ success: false, error: "Invalid OTP" })
    }
  } catch (error) {
    console.error("Error during OTP verification:", error)
    res.status(500).json({ success: false, error: "Internal server error" })
  }
}

