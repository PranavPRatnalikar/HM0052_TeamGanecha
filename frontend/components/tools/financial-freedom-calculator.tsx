"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface FinancialFreedomResult {
  yearsToFreedom: number
  monthlyPassiveIncome: number
}

export function FinancialFreedomCalculator() {
  const [desiredIncome, setDesiredIncome] = useState<number>(5000)
  const [currentInvestments, setCurrentInvestments] = useState<number>(100000)
  const [roi, setRoi] = useState<number>(7)
  const [result, setResult] = useState<FinancialFreedomResult | null>(null)

  const calculateFinancialFreedom = () => {
    const monthlyRoi = roi / 12 / 100
    const yearsToFreedom = Math.log(desiredIncome / (currentInvestments * monthlyRoi)) / Math.log(1 + monthlyRoi)
    const monthlyPassiveIncome = currentInvestments * monthlyRoi

    setResult({
      yearsToFreedom: Math.ceil(yearsToFreedom),
      monthlyPassiveIncome: monthlyPassiveIncome,
    })
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value)
  }

  const chartData = result
    ? Array.from({ length: result.yearsToFreedom + 1 }, (_, i) => ({
        year: i,
        income: currentInvestments * Math.pow(1 + roi / 100, i) * (roi / 100),
      }))
    : []

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Financial Freedom Calculator</CardTitle>
        <CardDescription>
          Calculate how long it will take to achieve financial freedom based on your desired passive income.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="desiredIncome">Desired Monthly Passive Income</Label>
            <Input
              id="desiredIncome"
              type="number"
              value={desiredIncome}
              onChange={(e) => setDesiredIncome(Number(e.target.value))}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="currentInvestments">Current Investments</Label>
            <Input
              id="currentInvestments"
              type="number"
              value={currentInvestments}
              onChange={(e) => setCurrentInvestments(Number(e.target.value))}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="roi">Expected Annual Return on Investment (%)</Label>
            <div className="flex items-center gap-2">
              <Slider id="roi" min={1} max={20} step={0.1} value={[roi]} onValueChange={(value) => setRoi(value[0])} />
              <Input type="number" value={roi} onChange={(e) => setRoi(Number(e.target.value))} className="w-20" />
            </div>
          </div>
        </div>

        <Button onClick={calculateFinancialFreedom}>Calculate</Button>

        {result && (
          <div className="grid gap-4">
            <div className="grid gap-2 p-4 border rounded-lg bg-muted">
              <div className="text-center">
                <h3 className="text-lg font-medium">Years to Financial Freedom</h3>
                <p className="text-3xl font-bold">{result.yearsToFreedom}</p>
              </div>
            </div>
            <div className="grid gap-2 p-4 border rounded-lg bg-muted">
              <div className="text-center">
                <h3 className="text-lg font-medium">Current Monthly Passive Income</h3>
                <p className="text-3xl font-bold">{formatCurrency(result.monthlyPassiveIncome)}</p>
              </div>
            </div>

            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="year" label={{ value: "Years", position: "insideBottom", offset: -5 }} />
                  <YAxis tickFormatter={(value) => `$${value / 1000}k`} />
                  <Tooltip formatter={(value) => [`$${Number(value).toFixed(2)}`, "Annual Passive Income"]} />
                  <Bar dataKey="income" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

