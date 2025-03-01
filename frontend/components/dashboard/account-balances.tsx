import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CreditCard, Wallet, Building, PiggyBank } from "lucide-react"

// Define interface for account data
interface Account {
  id: string
  name: string
  balance: number
  icon: React.ElementType
  color: string
}

export function AccountBalances() {
  // Placeholder data - in a real app, this would come from an API
  const accounts: Account[] = [
    {
      id: "1",
      name: "Checking Account",
      balance: 5680.42,
      icon: CreditCard,
      color: "text-blue-500",
    },
    {
      id: "2",
      name: "Savings Account",
      balance: 12450.0,
      icon: PiggyBank,
      color: "text-green-500",
    },
    {
      id: "3",
      name: "Investment Account",
      balance: 24550.33,
      icon: Building,
      color: "text-purple-500",
    },
    {
      id: "4",
      name: "Cash",
      balance: 350.0,
      icon: Wallet,
      color: "text-yellow-500",
    },
  ]

  return (
    <Card className="col-span-1 md:col-span-2 lg:col-span-1">
      <CardHeader>
        <CardTitle className="text-sm font-medium">Account Balances</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {accounts.map((account) => (
            <div key={account.id} className="flex items-center">
              <div className={`mr-4 rounded-full p-2 ${account.color} bg-opacity-10`}>
                <account.icon className={`h-5 w-5 ${account.color}`} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{account.name}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">${account.balance.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

