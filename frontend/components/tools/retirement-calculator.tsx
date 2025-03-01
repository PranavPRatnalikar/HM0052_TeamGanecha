"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface RetirementResult {
  age: number
  savings: number
}

export function RetirementCalculator() {
  const [currentAge, setCurrentAge] = useState(30)
  const [retirementAge, setRetirementAge] = useState(65)
  const [currentSavings, setCurrentSavings] = useState(50000)
  const [monthlySavings, setMonthlySavings] = useState(1000)
  const [expectedReturn, setExpectedReturn] = useState(7)
  const [inflationRate, setInflationRate] = useState(3)
  const [results, setResults] = useState<RetirementResult[]>([])

  const calculateRetirement = useCallback(() => {
    const realReturnRate = (1 + expectedReturn / 100) / (1 + inflationRate / 100) - 1
    let savings = currentSavings
    const newResults: RetirementResult[] = []

    for (let age = currentAge; age <= retirementAge; age++) {
      newResults.push({ age, savings })
      savings = savings * (1 + realReturnRate) + monthlySavings * 12
    }

    setResults(newResults)
  }, [currentAge, retirementAge, currentSavings, monthlySavings, expectedReturn, inflationRate])

  useEffect(() => {
    calculateRetirement()
  }, [calculateRetirement])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value)
  }

  const finalAmount = results.length > 0 ? results[results.length - 1].savings : 0

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Retirement Calculator</CardTitle>
        <CardDescription>Plan your retirement savings and see how your investments can grow over time.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="currentAge">Current Age</Label>
            <div className="flex items-center gap-2">
              <Slider
                id="currentAge"
                min={18}
                max={80}
                step={1}
                value={[currentAge]}
                onValueChange={(value) => setCurrentAge(value[0])}
              />
              <Input
                type="number"
                value={currentAge}
                onChange={(e) => setCurrentAge(Number(e.target.value))}
                className="w-16"
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="retirementAge">Retirement Age</Label>
            <div className="flex items-center gap-2">
              <Slider
                id="retirementAge"
                min={currentAge + 1}
                max={90}
                step={1}
                value={[retirementAge]}
                onValueChange={(value) => setRetirementAge(value[0])}
              />
              <Input
                type="number"
                value={retirementAge}
                onChange={(e) => setRetirementAge(Number(e.target.value))}
                className="w-16"
              />
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="currentSavings">Current Savings</Label>
            <Input
              id="currentSavings"
              type="number"
              value={currentSavings}
              onChange={(e) => setCurrentSavings(Number(e.target.value))}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="monthlySavings">Monthly Contribution</Label>
            <Input
              id="monthlySavings"
              type="number"
              value={monthlySavings}
              onChange={(e) => setMonthlySavings(Number(e.target.value))}
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="expectedReturn">Expected Annual Return (%)</Label>
            <div className="flex items-center gap-2">
              <Slider
                id="expectedReturn"
                min={1}
                max={15}
                step={0.1}
                value={[expectedReturn]}
                onValueChange={(value) => setExpectedReturn(value[0])}
              />
              <Input
                type="number"
                value={expectedReturn}
                onChange={(e) => setExpectedReturn(Number(e.target.value))}
                className="w-16"
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="inflationRate">Inflation Rate (%)</Label>
            <div className="flex items-center gap-2">
              <Slider
                id="inflationRate"
                min={0}
                max={10}
                step={0.1}
                value={[inflationRate]}
                onValueChange={(value) => setInflationRate(value[0])}
              />
              <Input
                type="number"
                value={inflationRate}
                onChange={(e) => setInflationRate(Number(e.target.value))}
                className="w-16"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div className="grid gap-2 p-4 border rounded-lg bg-muted">
            <div className="text-center">
              <h3 className="text-lg font-medium">Estimated Retirement Savings</h3>
              <p className="text-3xl font-bold">{formatCurrency(finalAmount)}</p>
              <p className="text-sm text-muted-foreground">in today's dollars at age {retirementAge}</p>
            </div>
          </div>

          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={results}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="age" label={{ value: "Age", position: "insideBottom", offset: -5 }} />
                <YAxis
                  tickFormatter={(value) => `$${value / 1000}k`}
                  label={{ value: "Savings", angle: -90, position: "insideLeft" }}
                />
                <Tooltip
                  formatter={(value) => [formatCurrency(Number(value)), "Savings"]}
                  labelFormatter={(label) => `Age: ${label}`}
                />
                <Line
                  type="monotone"
                  dataKey="savings"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

