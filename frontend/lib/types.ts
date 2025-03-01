// User related interfaces
export interface User {
  id: string
  name: string
  email?: string
  phone?: string
  avatar?: string
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
  name: string
  type: "checking" | "savings" | "investment" | "cash" | "credit"
  balance: number
  currency: string
}

// Dashboard widget interfaces
export interface NetWorthData {
  total: number
  change: number
  changePercent: number
}

export interface SpendingData {
  date: string
  amount: number
}

export interface CategorySpending {
  category: string
  amount: number
  percent: number
}

// Insight interfaces
export interface Insight {
  id: string
  title: string
  description: string
  type: "warning" | "info" | "danger" | "success"
}

export interface Anomaly {
  id: string
  title: string
  description: string
  date: string
}

// Calculator interfaces
export interface RetirementInput {
  currentAge: number
  retirementAge: number
  currentSavings: number
  monthlySavings: number
  expectedReturn: number
  inflationRate: number
}

export interface LoanInput {
  loanAmount: number
  interestRate: number
  loanTerm: number
}

export interface InflationInput {
  currentAmount: number
  inflationRate: number
  years: number
}

// Chatbot interfaces
export interface ChatMessage {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
  chart?: {
    type: "bar" | "line" | "pie"
    data: any
  }
}

