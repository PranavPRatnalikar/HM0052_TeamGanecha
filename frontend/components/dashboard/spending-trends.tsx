"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

// Define interface for spending data
interface SpendingData {
  date: string
  amount: number
}

export function SpendingTrends() {
  // Placeholder data - in a real app, this would come from an API
  const [data, setData] = useState<SpendingData[]>([])
  const [period, setPeriod] = useState<"daily" | "weekly">("daily")

  useEffect(() => {
    // Generate random data for demo purposes
    if (period === "daily") {
      const dailyData = Array.from({ length: 7 }, (_, i) => {
        const date = new Date()
        date.setDate(date.getDate() - i)
        return {
          date: date.toLocaleDateString("en-US", { weekday: "short" }),
          amount: Math.floor(Math.random() * 100) + 50,
        }
      }).reverse()
      setData(dailyData)
    } else {
      const weeklyData = Array.from({ length: 4 }, (_, i) => {
        const date = new Date()
        date.setDate(date.getDate() - i * 7)
        return {
          date: `Week ${4 - i}`,
          amount: Math.floor(Math.random() * 500) + 200,
        }
      }).reverse()
      setData(weeklyData)
    }
  }, [period])

  return (
    <Card className="col-span-1 md:col-span-2 lg:col-span-1">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Spending Trends</CardTitle>
        <Tabs defaultValue="daily" className="w-[200px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="daily" onClick={() => setPeriod("daily")}>
              Daily
            </TabsTrigger>
            <TabsTrigger value="weekly" onClick={() => setPeriod("weekly")}>
              Weekly
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
              <YAxis tick={{ fontSize: 12 }} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
              <Tooltip formatter={(value) => [`$${value}`, "Spending"]} labelFormatter={(label) => `Date: ${label}`} />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

