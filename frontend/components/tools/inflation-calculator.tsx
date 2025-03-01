"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface InflationResult {
  year: number
  originalValue: number
  inflatedValue: number
}

export function InflationCalculator() {
  const [currentAmount, setCurrentAmount] = useState(1000)
  const [inflationRate, setInflationRate] = useState(3)
  const [years, setYears] = useState(10)
  const [results, setResults] = useState<InflationResult[]>([])

  useEffect(() => {
    calculateInflation()
  }, [currentAmount, inflationRate, years])

  const calculateInflation = () => {
    const newResults: InflationResult[] = []

    for (let year = 0; year <= years; year++) {
      const inflatedValue = currentAmount * Math.pow(1 + inflationRate / 100, year)
      newResults.push({
        year,
        originalValue: currentAmount,
        inflatedValue,
      })
    }

    setResults(newResults)
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value)
  }

  const finalValue = results.length > 0 ? results[results.length - 1].inflatedValue : 0
  const purchasingPowerLoss = ((currentAmount - currentAmount / (finalValue / currentAmount)) / currentAmount) * 100

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Inflation Calculator</CardTitle>
        <CardDescription>See how inflation affects the purchasing power of your money over time.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="grid gap-2">
            <Label htmlFor="currentAmount">Current Amount</Label>
            <Input
              id="currentAmount"
              type="number"
              value={currentAmount}
              onChange={(e) => setCurrentAmount(Number(e.target.value))}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="inflationRate">Inflation Rate (%)</Label>
            <div className="flex items-center gap-2">
              <Slider
                id="inflationRate"
                min={0}
                max={15}
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
          <div className="grid gap-2">
            <Label htmlFor="years">Number of Years</Label>
            <div className="flex items-center gap-2">
              <Slider
                id="years"
                min={1}
                max={50}
                step={1}
                value={[years]}
                onValueChange={(value) => setYears(value[0])}
              />
              <Input type="number" value={years} onChange={(e) => setYears(Number(e.target.value))} className="w-16" />
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div className="grid gap-2 p-4 border rounded-lg bg-muted">
              <div className="text-center">
                <h3 className="text-lg font-medium">Future Value</h3>
                <p className="text-3xl font-bold">{formatCurrency(finalValue)}</p>
                <p className="text-sm text-muted-foreground">in {years} years</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border rounded-lg">
                <h4 className="text-sm font-medium text-muted-foreground">Current Value</h4>
                <p className="text-xl font-semibold">{formatCurrency(currentAmount)}</p>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="text-sm font-medium text-muted-foreground">Purchasing Power Loss</h4>
                <p className="text-xl font-semibold">{purchasingPowerLoss.toFixed(1)}%</p>
              </div>
            </div>
          </div>

          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={results.filter((_, index) => index % Math.ceil(years / 10) === 0 || index === years)}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="year" label={{ value: "Years", position: "insideBottom", offset: -5 }} />
                <YAxis
                  tickFormatter={(value) => `$${value / 1000}k`}
                  label={{ value: "Value", angle: -90, position: "insideLeft" }}
                />
                <Tooltip
                  formatter={(value) => [formatCurrency(Number(value)), "Value"]}
                  labelFormatter={(label) => `Year: ${label}`}
                />
                <Bar dataKey="inflatedValue" fill="#3b82f6" name="Future Value" />
                <Bar dataKey="originalValue" fill="#9ca3af" name="Original Value" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

