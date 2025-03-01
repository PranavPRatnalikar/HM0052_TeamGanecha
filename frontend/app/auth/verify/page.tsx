import type { Metadata } from "next"
import { VerifyForm } from "@/components/auth/verify-form"

export const metadata: Metadata = {
  title: "Verify | Personal Finance App",
  description: "Verify your account",
}

export default function VerifyPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Verification Required</h1>
          <p className="text-sm text-muted-foreground">Enter the verification code sent to your email or phone</p>
        </div>
        <VerifyForm />
      </div>
    </div>
  )
}

