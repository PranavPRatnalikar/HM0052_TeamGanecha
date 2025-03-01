"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import type { CategorySpending } from "@/lib/types"

export function CategoryTrends() {
  const [period, setPeriod] = useState<"daily" | "weekly" | "monthly">("daily")

  // Mock data - in a real app, this would come from an API
  const categoryData: Record<string, CategorySpending[]> = {
    daily: [
      { category: "Food", amount: 25, percent: 30 },
      { category: "Transportation", amount: 15, percent: 18 },
      { category: "Entertainment", amount: 10, percent: 12 },
      { category: "Utilities", amount: 8, percent: 10 },
      { category: "Shopping", amount: 20, percent: 24 },
      { category: "Other", amount: 5, percent: 6 },
    ],
    weekly: [
      { category: "Food", amount: 175, percent: 35 },
      { category: "Transportation", amount: 100, percent: 20 },
      { category: "Entertainment", amount: 75, percent: 15 },
      { category: "Utilities", amount: 50, percent: 10 },
      { category: "Shopping", amount: 80, percent: 16 },
      { category: "Other", amount: 20, percent: 4 },
    ],
    monthly: [
      { category: "Food", amount: 750, percent: 38 },
      { category: "Transportation", amount: 400, percent: 20 },
      { category: "Entertainment", amount: 300, percent: 15 },
      { category: "Utilities", amount: 200, percent: 10 },
      { category: "Shopping", amount: 250, percent: 13 },
      { category: "Other", amount: 80, percent: 4 },
    ],
  }

  const data = categoryData[period]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xl">Category Trends</CardTitle>
        <Tabs defaultValue="daily" className="w-[200px]">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="daily" onClick={() => setPeriod("daily")}>
              Daily
            </TabsTrigger>
            <TabsTrigger value="weekly" onClick={() => setPeriod("weekly")}>
              Weekly
            </TabsTrigger>
            <TabsTrigger value="monthly" onClick={() => setPeriod("monthly")}>
              Monthly
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="category" />
              <YAxis tickFormatter={(value) => `$${value}`} />
              <Tooltip formatter={(value) => [`$${value}`, "Amount"]} />
              <Bar dataKey="amount" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 space-y-2">
          {data.map((item) => (
            <div key={item.category} className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary"></div>
                <span>{item.category}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-muted-foreground">${item.amount}/day</span>
                <span className="text-sm font-medium">{item.percent}%</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

