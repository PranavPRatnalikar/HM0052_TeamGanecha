import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"

export function NetWorthWidget() {
  // Placeholder data - in a real app, this would come from an API
  const netWorth = 42680.75
  const change = 1250.5
  const changePercent = 3.2

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Net Worth</CardTitle>
        <TrendingUp className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">${netWorth.toLocaleString()}</div>
        <div className="flex items-center text-xs text-green-500">
          <span className="font-medium">+${change.toLocaleString()}</span>
          <span className="ml-1">({changePercent}%)</span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">Compared to last month</p>
      </CardContent>
    </Card>
  )
}

