"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

interface LoanResult {
  monthlyPayment: number
  totalPayment: number
  totalInterest: number
}

export function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState(200000)
  const [interestRate, setInterestRate] = useState(5)
  const [loanTerm, setLoanTerm] = useState(30)
  const [result, setResult] = useState<LoanResult>({
    monthlyPayment: 0,
    totalPayment: 0,
    totalInterest: 0,
  })

  const calculateLoan = useCallback(() => {
    const principal = loanAmount
    const monthlyRate = interestRate / 100 / 12
    const numberOfPayments = loanTerm * 12

    // Calculate monthly payment
    const x = Math.pow(1 + monthlyRate, numberOfPayments)
    const monthlyPayment = (principal * x * monthlyRate) / (x - 1)

    // Calculate total payment and interest
    const totalPayment = monthlyPayment * numberOfPayments
    const totalInterest = totalPayment - principal

    setResult({
      monthlyPayment: isNaN(monthlyPayment) ? 0 : monthlyPayment,
      totalPayment: isNaN(totalPayment) ? 0 : totalPayment,
      totalInterest: isNaN(totalInterest) ? 0 : totalInterest,
    })
  }, [loanAmount, interestRate, loanTerm])

  useEffect(() => {
    calculateLoan()
  }, [calculateLoan])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value)
  }

  const pieData = [
    { name: "Principal", value: loanAmount },
    { name: "Interest", value: result.totalInterest },
  ]

  const COLORS = ["#3b82f6", "#ef4444"]

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Loan Calculator</CardTitle>
        <CardDescription>Calculate your monthly payments and total interest for a loan.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="grid gap-2">
            <Label htmlFor="loanAmount">Loan Amount</Label>
            <Input
              id="loanAmount"
              type="number"
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="interestRate">Interest Rate (%)</Label>
            <div className="flex items-center gap-2">
              <Slider
                id="interestRate"
                min={0.1}
                max={20}
                step={0.1}
                value={[interestRate]}
                onValueChange={(value) => setInterestRate(value[0])}
              />
              <Input
                type="number"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-16"
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="loanTerm">Loan Term (years)</Label>
            <div className="flex items-center gap-2">
              <Slider
                id="loanTerm"
                min={1}
                max={40}
                step={1}
                value={[loanTerm]}
                onValueChange={(value) => setLoanTerm(value[0])}
              />
              <Input
                type="number"
                value={loanTerm}
                onChange={(e) => setLoanTerm(Number(e.target.value))}
                className="w-16"
              />
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="grid gap-2 p-4 border rounded-lg bg-muted">
              <div className="text-center">
                <h3 className="text-lg font-medium">Monthly Payment</h3>
                <p className="text-3xl font-bold">{formatCurrency(result.monthlyPayment)}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <h4 className="text-sm font-medium text-muted-foreground">Total Principal</h4>
                <p className="text-xl font-semibold">{formatCurrency(loanAmount)}</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="text-sm font-medium text-muted-foreground">Total Interest</h4>
                <p className="text-xl font-semibold">{formatCurrency(result.totalInterest)}</p>
              </div>
              <div className="p-4 border rounded-lg col-span-2">
                <h4 className="text-sm font-medium text-muted-foreground">Total Payment</h4>
                <p className="text-xl font-semibold">{formatCurrency(result.totalPayment)}</p>
              </div>
            </div>
          </div>

          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

