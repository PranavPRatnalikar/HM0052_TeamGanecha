import { Pool } from "pg"
import { createClient } from "@neondatabase/serverless"

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  throw new Error("DATABASE_URL is not set")
}

const pool = new Pool({
  connectionString,
})

export const db = createClient({ connectionString })

export default pool

