import type { Metadata } from "next"
import { CategoryTrends } from "@/components/insights/category-trends"
import { MLInsights } from "@/components/insights/ml-insights"
import { AnomalyAlerts } from "@/components/insights/anomaly-alerts"

export const metadata: Metadata = {
  title: "Insights | Personal Finance App",
  description: "Get insights about your spending habits",
}

export default function InsightsPage() {
  return (
    <div className="grid gap-6">
      <h1 className="text-3xl font-bold">Insights</h1>

      <div className="grid gap-6">
        <AnomalyAlerts />
        <MLInsights />
        <CategoryTrends />
      </div>
    </div>
  )
}

