"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface ExchangeRateResult {
  convertedAmount: number
  rate: number
}

export function ExchangeRateCalculator() {
  const [amount, setAmount] = useState<number>(1000)
  const [sourceCurrency, setSourceCurrency] = useState<string>("USD")
  const [targetCurrency, setTargetCurrency] = useState<string>("EUR")
  const [result, setResult] = useState<ExchangeRateResult | null>(null)

  const currencies = ["USD", "EUR", "GBP", "JPY", "CAD", "AUD", "CHF", "CNY", "INR"]

  const calculateExchangeRate = () => {
    // In a real app, this would call an API to get the current exchange rate
    const mockRate = 0.85 // Mock exchange rate for USD to EUR
    const convertedAmount = amount * mockRate
    setResult({ convertedAmount, rate: mockRate })
  }

  // Mock historical data for the chart
  const historicalData = [
    { date: "2023-01", rate: 0.82 },
    { date: "2023-02", rate: 0.83 },
    { date: "2023-03", rate: 0.84 },
    { date: "2023-04", rate: 0.85 },
    { date: "2023-05", rate: 0.86 },
    { date: "2023-06", rate: 0.85 },
  ]

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Exchange Rate Calculator</CardTitle>
        <CardDescription>Convert currencies and see historical exchange rates.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="grid gap-2">
            <Label htmlFor="amount">Amount</Label>
            <Input id="amount" type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="sourceCurrency">From</Label>
            <Select value={sourceCurrency} onValueChange={setSourceCurrency}>
              <SelectTrigger id="sourceCurrency">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((currency) => (
                  <SelectItem key={currency} value={currency}>
                    {currency}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="targetCurrency">To</Label>
            <Select value={targetCurrency} onValueChange={setTargetCurrency}>
              <SelectTrigger id="targetCurrency">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((currency) => (
                  <SelectItem key={currency} value={currency}>
                    {currency}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button onClick={calculateExchangeRate}>Calculate</Button>

        {result && (
          <div className="grid gap-4">
            <div className="grid gap-2 p-4 border rounded-lg bg-muted">
              <div className="text-center">
                <h3 className="text-lg font-medium">Converted Amount</h3>
                <p className="text-3xl font-bold">
                  {result.convertedAmount.toFixed(2)} {targetCurrency}
                </p>
                <p className="text-sm text-muted-foreground">
                  1 {sourceCurrency} = {result.rate.toFixed(4)} {targetCurrency}
                </p>
              </div>
            </div>

            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={historicalData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="rate" stroke="#3b82f6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

