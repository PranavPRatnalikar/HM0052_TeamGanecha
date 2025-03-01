"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function VerifyForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [countdown, setCountdown] = useState<number>(30)
  const [canResend, setCanResend] = useState<boolean>(false)

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      setCanResend(true)
    }
  }, [countdown])

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    setIsLoading(true)

    // In a real app, this would call an API to verify the OTP
    setTimeout(() => {
      setIsLoading(false)
      // Redirect to dashboard
      router.push("/dashboard")
    }, 1000)
  }

  function handleResend() {
    setCanResend(false)
    setCountdown(30)
    // In a real app, this would call an API to resend the OTP
  }

  return (
    <div className="grid gap-6">
      <form onSubmit={onSubmit}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="otp">Verification Code</Label>
            <Input
              id="otp"
              placeholder="123456"
              type="text"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
              required
              className="text-center text-lg tracking-widest"
              maxLength={6}
            />
          </div>
          <Button disabled={isLoading} className="mt-2">
            {isLoading ? "Verifying..." : "Verify"}
          </Button>
        </div>
      </form>
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Didn&apos;t receive a code?{" "}
          {canResend ? (
            <Button variant="link" className="p-0 text-sm font-normal" onClick={handleResend}>
              Resend code
            </Button>
          ) : (
            <span className="text-sm">Resend in {countdown} seconds</span>
          )}
        </p>
      </div>
    </div>
  )
}

