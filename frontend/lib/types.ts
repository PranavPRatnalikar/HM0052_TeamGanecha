// User related interfaces
export interface User {
  id: string
  name: string
  email?: string
  phone?: string
  password: string
  permissions: {
    smsAccess: boolean
    bankAccountLinking: boolean
    cameraAccess: boolean
  }
  verified?: boolean
}

export interface AuthToken {
  token: string
  expiresAt: Date
}

// Transaction related interfaces
export interface Transaction {
  id: string
  date: string
  description: string
  amount: number
  category: string
  accountId: string
  notes?: string
}

// Account related interfaces
export interface Account {
  id: string
  userId: string
  balance: number
  type: "bank" | "investment" | "cash"
}

// API request/response interfaces
export interface SignUpRequest {
  name: string
  email?: string
  phone?: string
  password: string
}

export interface LoginRequest {
  email?: string
  phone?: string
  password: string
}

export interface VerifyOTPRequest {
  email?: string
  phone?: string
  otp: string
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}

export interface CategorySpending {
  category: string
  amount: number
  percent: number
}

// New interfaces for insights and calculations
export interface Insight {
  id: string
  userId: string
  type: "spending_average" | "anomaly"
  description: string
  date: string
}

export interface Calculation {
  id: string
  userId: string
  type:
    | "retirement"
    | "exchange_rate"
    | "financial_freedom"
    | "home_affordability"
    | "loan"
    | "compound_interest"
    | "roi"
    | "inflation"
  inputs: Record<string, any>
  result: Record<string, any>
  date: string
}

export interface ChatbotQuery {
  userId: string
  query: string
  response: string
  date: string
}

// API request/response interfaces for new endpoints
export interface CategorizeTransactionRequest {
  transactionId: string
  category: string
}

export interface ChatbotQueryRequest {
  query: string
}

export interface CalculatorRequest {
  type:
    | "retirement"
    | "exchange_rate"
    | "financial_freedom"
    | "home_affordability"
    | "loan"
    | "compound_interest"
    | "roi"
    | "inflation"
  inputs: Record<string, any>
}

