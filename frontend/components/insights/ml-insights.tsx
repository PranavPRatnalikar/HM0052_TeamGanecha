import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle } from "lucide-react"

export function MLInsights() {
  // Mock data - in a real app, this would come from an API
  const insights = [
    {
      id: "1",
      title: "Spending Profile",
      description: "Based on your spending patterns, you're an Aggressive Spender in the Food category.",
      type: "warning",
      icon: TrendingUp,
    },
    {
      id: "2",
      title: "Savings Opportunity",
      description: "You could save $150/month by reducing your Entertainment expenses to match similar users.",
      type: "info",
      icon: TrendingDown,
    },
    {
      id: "3",
      title: "Budget Alert",
      description: "You're on track to exceed your Shopping budget by 20% this month.",
      type: "danger",
      icon: AlertTriangle,
    },
    {
      id: "4",
      title: "Financial Health",
      description: "Your savings rate of 15% is better than 70% of users in your income bracket.",
      type: "success",
      icon: CheckCircle,
    },
  ]

  const getTypeStyles = (type: string) => {
    switch (type) {
      case "warning":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "info":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "danger":
        return "bg-red-100 text-red-800 border-red-200"
      case "success":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getBadgeVariant = (type: string) => {
    switch (type) {
      case "warning":
        return "warning" as const
      case "info":
        return "secondary" as const
      case "danger":
        return "destructive" as const
      case "success":
        return "outline" as const
      default:
        return "default" as const
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">ML-Driven Insights</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2">
          {insights.map((insight) => (
            <Card key={insight.id} className={`border ${getTypeStyles(insight.type)}`}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant={getBadgeVariant(insight.type)}>
                        {insight.type.charAt(0).toUpperCase() + insight.type.slice(1)}
                      </Badge>
                      <h3 className="font-medium">{insight.title}</h3>
                    </div>
                    <p className="text-sm">{insight.description}</p>
                  </div>
                  <insight.icon className="h-5 w-5 mt-1 shrink-0" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

