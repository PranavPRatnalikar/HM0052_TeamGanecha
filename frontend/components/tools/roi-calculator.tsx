"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface ROIResult {
  roi: number
  annualizedRoi: number
}

export function ROICalculator() {
  const [initialInvestment, setInitialInvestment] = useState<number>(10000)
  const [finalValue, setFinalValue] = useState<number>(15000)
  const [timePeriod, setTimePeriod] = useState<number>(5)
  const [result, setResult] = useState<ROIResult | null>(null)

  const calculateROI = () => {
    const totalReturn = finalValue - initialInvestment
    const roi = (totalReturn / initialInvestment) * 100
    const annualizedRoi = (Math.pow(1 + roi / 100, 1 / timePeriod) - 1) * 100

    setResult({
      roi,
      annualizedRoi,
    })
  }

  const formatPercent = (value: number) => {
    return `${value.toFixed(2)}%`
  }

  const chartData = [
    { name: "Initial Investment", value: initialInvestment },
    { name: "Final Value", value: finalValue },
  ]

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>ROI Calculator</CardTitle>
        <CardDescription>
          Calculate the Return on Investment (ROI) and annualized ROI for your investments.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="grid gap-2">
            <Label htmlFor="initialInvestment">Initial Investment</Label>
            <Input
              id="initialInvestment"
              type="number"
              value={initialInvestment}
              onChange={(e) => setInitialInvestment(Number(e.target.value))}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="finalValue">Final Value</Label>
            <Input
              id="finalValue"
              type="number"
              value={finalValue}
              onChange={(e) => setFinalValue(Number(e.target.value))}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="timePeriod">Time Period (years)</Label>
            <Input
              id="timePeriod"
              type="number"
              value={timePeriod}
              onChange={(e) => setTimePeriod(Number(e.target.value))}
            />
          </div>
        </div>

        <Button onClick={calculateROI}>Calculate</Button>

        {result && (
          <div className="grid gap-4">
            <div className="grid gap-2 p-4 border rounded-lg bg-muted">
              <div className="text-center">
                <h3 className="text-lg font-medium">Total ROI</h3>
                <p className="text-3xl font-bold">{formatPercent(result.roi)}</p>
              </div>
            </div>
            <div className="grid gap-2 p-4 border rounded-lg bg-muted">
              <div className="text-center">
                <h3 className="text-lg font-medium">Annualized ROI</h3>
                <p className="text-3xl font-bold">{formatPercent(result.annualizedRoi)}</p>
              </div>
            </div>

            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis tickFormatter={(value) => `$${value / 1000}k`} />
                  <Tooltip formatter={(value) => [`$${Number(value).toFixed(2)}`, "Value"]} />
                  <Bar dataKey="value" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

