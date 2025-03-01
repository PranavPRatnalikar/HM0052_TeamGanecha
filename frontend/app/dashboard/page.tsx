import { NetWorthWidget } from "@/components/dashboard/net-worth-widget"
import { AccountBalances } from "@/components/dashboard/account-balances"
import { SpendingTrends } from "@/components/dashboard/spending-trends"

export default function DashboardPage() {
  return (
    <div className="grid gap-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <NetWorthWidget />
        <AccountBalances />
        <SpendingTrends />
      </div>
    </div>
  )
}

