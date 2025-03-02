"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

interface CompoundInterestResult {
        finalAmount: number
        interestEarned: number
}

export function CompoundInterestCalculator() {
        const [principal, setPrincipal] = useState<number>(10000)
        const [tenure, setTenure] = useState<number>(10)
        const [interestRate, setInterestRate] = useState<number>(5)
        const [compoundingFrequency, setCompoundingFrequency] = useState<number>(12)
        const [result, setResult] = useState<CompoundInterestResult | null>(null)

        const calculateCompoundInterest = () => {
                const r = interestRate / 100
                const n = compoundingFrequency
                const t = tenure
                const finalAmount = principal * Math.pow(1 + r / n, n * t)
                const interestEarned = finalAmount - principal

                setResult({
                        finalAmount,
                        interestEarned,
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
                ? Array.from({ length: tenure + 1 }, (_, i) => ({
                        year: i,
                        amount: principal * Math.pow(1 + interestRate / 100 / compoundingFrequency, compoundingFrequency * i),
                }))
                : []

        return (
                <Card className="w-full">
                        <CardHeader>
                                <CardTitle>Compound Interest Calculator</CardTitle>
                                <CardDescription>Calculate the growth of your investment over time with compound interest.</CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-6">
                                <div className="grid gap-4 sm:grid-cols-2">
                                        <div className="grid gap-2">
                                                <Label htmlFor="principal">Principal Amount</Label>
                                                <Input
                                                        id="principal"
                                                        type="number"
                                                        value={principal}
                                                        onChange={(e) => setPrincipal(Number(e.target.value))}
                                                />
                                        </div>
                                        <div className="grid gap-2">
                                                <Label htmlFor="tenure">Investment Period (years)</Label>
                                                <Input id="tenure" type="number" value={tenure} onChange={(e) => setTenure(Number(e.target.value))} />
                                        </div>
                                        <div className="grid gap-2">
                                                <Label htmlFor="interestRate">Annual Interest Rate (%)</Label>
                                                <Input
                                                        id="interestRate"
                                                        type="number"
                                                        value={interestRate}
                                                        onChange={(e) => setInterestRate(Number(e.target.value))}
                                                />
                                        </div>
                                        <div className="grid gap-2">
                                                <Label htmlFor="compoundingFrequency">Compounding Frequency</Label>
                                                <Select
                                                        value={compoundingFrequency.toString()}
                                                        onValueChange={(value) => setCompoundingFrequency(Number(value))}
                                                >
                                                        <SelectTrigger id="compoundingFrequency">
                                                                <SelectValue placeholder="Select frequency" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                                <SelectItem value="1">Annually</SelectItem>
                                                                <SelectItem value="2">Semi-annually</SelectItem>
                                                                <SelectItem value="4">Quarterly</SelectItem>
                                                                <SelectItem value="12">Monthly</SelectItem>
                                                                <SelectItem value="365">Daily</SelectItem>
                                                        </SelectContent>
                                                </Select>
                                        </div>
                                </div>

                                <Button onClick={calculateCompoundInterest}>Calculate</Button>

                                {result && (
                                        <div className="grid gap-4">
                                                <div className="grid gap-2 p-4 border rounded-lg bg-muted">
                                                        <div className="text-center">
                                                                <h3 className="text-lg font-medium">Final Amount</h3>
                                                                <p className="text-3xl font-bold">{formatCurrency(result.finalAmount)}</p>
                                                        </div>
                                                </div>
                                                <div className="grid gap-2 p-4 border rounded-lg bg-muted">
                                                        <div className="text-center">
                                                                <h3 className="text-lg font-medium">Interest Earned</h3>
                                                                <p className="text-3xl font-bold">{formatCurrency(result.interestEarned)}</p>
                                                        </div>
                                                </div>

                                                <div className="h-[300px]">
                                                        <ResponsiveContainer width="100%" height="100%">
                                                                <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                                                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                                                        <XAxis dataKey="year" label={{ value: "Years", position: "insideBottom", offset: -5 }} />
                                                                        <YAxis tickFormatter={(value) => `$${value / 1000}k`} />
                                                                        <Tooltip formatter={(value) => [formatCurrency(Number(value)), "Amount"]} />
                                                                        <Line type="monotone" dataKey="amount" stroke="#3b82f6" strokeWidth={2} />
                                                                </LineChart>
                                                        </ResponsiveContainer>
                                                </div>
                                        </div>
                                )}
                        </CardContent>
                </Card>
        )
}

