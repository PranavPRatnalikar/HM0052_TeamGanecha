"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

interface HomeAffordabilityResult {
  affordableHomePrice: number
  monthlyPayment: number
  downPayment: number
  loanAmount: number
}

export function HomeAffordabilityCalculator() {
  const [annualIncome, setAnnualIncome] = useState<number>(100000)
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20)
  const [loanTenure, setLoanTenure] = useState<number>(30)
  const [interestRate, setInterestRate] = useState<number>(3.5)
  const [result, setResult] = useState<HomeAffordabilityResult | null>(null)

  const calculateHomeAffordability = () => {
    const monthlyIncome = annualIncome / 12
    const maxMonthlyPayment = monthlyIncome * 0.28 // 28% of monthly income for housing
    const downPaymentAmount = (downPaymentPercent / 100) * (maxMonthlyPayment * 12 * loanTenure)
    const r = interestRate / 100 / 12
    const n = loanTenure * 12
    const affordableHomePrice = (maxMonthlyPayment / r) * (1 - Math.pow(1 + r, -n)) + downPaymentAmount

    setResult({
      affordableHomePrice: affordableHomePrice,
      monthlyPayment: maxMonthlyPayment,
      downPayment: downPaymentAmount,
      loanAmount: affordableHomePrice - downPaymentAmount,
    })
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value)
  }

  const pieData = result
    ? [
        { name: "Down Payment", value: result.downPayment },
        { name: "Loan Amount", value: result.loanAmount },
      ]
    : []

  const COLORS = ["#3b82f6", "#ef4444"]

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Home Affordability Calculator</CardTitle>
        <CardDescription>
          Calculate how much home you can afford based on your income and other factors.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="annualIncome">Annual Income</Label>
            <Input
              id="annualIncome"
              type="number"
              value={annualIncome}
              onChange={(e) => setAnnualIncome(Number(e.target.value))}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="downPaymentPercent">Down Payment (%)</Label>
            <div className="flex items-center gap-2">
              <Slider
                id="downPaymentPercent"
                min={0}
                max={100}
                step={1}
                value={[downPaymentPercent]}
                onValueChange={(value) => setDownPaymentPercent(value[0])}
              />
              <Input
                type="number"
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                className="w-20"
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="loanTenure">Loan Tenure (years)</Label>
            <Input
              id="loanTenure"
              type="number"
              value={loanTenure}
              onChange={(e) => setLoanTenure(Number(e.target.value))}
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
                className="w-20"
              />
            </div>
          </div>
        </div>

        <Button onClick={calculateHomeAffordability}>Calculate</Button>

        {result && (
          <div className="grid gap-4">
            <div className="grid gap-2 p-4 border rounded-lg bg-muted">
              <div className="text-center">
                <h3 className="text-lg font-medium">Affordable Home Price</h3>
                <p className="text-3xl font-bold">{formatCurrency(result.affordableHomePrice)}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <h4 className="text-sm font-medium text-muted-foreground">Monthly Payment</h4>
                <p className="text-xl font-semibold">{formatCurrency(result.monthlyPayment)}</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="text-sm font-medium text-muted-foreground">Down Payment</h4>
                <p className="text-xl font-semibold">{formatCurrency(result.downPayment)}</p>
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
        )}
      </CardContent>
    </Card>
  )
}

