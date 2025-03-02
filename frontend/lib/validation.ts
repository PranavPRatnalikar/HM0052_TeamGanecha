import { z } from "zod"

export const signUpSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email().optional(),
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/)
    .optional(),
  password: z.string().min(8).max(100),
})

export const loginSchema = z.object({
  email: z.string().email().optional(),
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/)
    .optional(),
  password: z.string().min(8).max(100),
})

export const verifyOTPSchema = z.object({
  email: z.string().email().optional(),
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/)
    .optional(),
  otp: z.string().length(6),
})

export const categorizeTransactionSchema = z.object({
  transactionId: z.string().uuid(),
  category: z.string().min(1).max(50).optional(),
})

export const chatbotQuerySchema = z.object({
  query: z.string().min(1).max(500),
})

export const calculatorSchema = z.object({
  type: z.enum([
    "retirement",
    "exchange_rate",
    "financial_freedom",
    "home_affordability",
    "loan",
    "compound_interest",
    "roi",
    "inflation",
  ]),
  inputs: z.record(z.any()),
})

export function validateInput<T>(schema: z.ZodSchema<T>, data: unknown): T {
  return schema.parse(data)
}

