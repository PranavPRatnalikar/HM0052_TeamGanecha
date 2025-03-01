"use client"

import { useState } from "react"
import { TransactionFilters } from "@/components/transactions/transaction-filters"
import { TransactionItem } from "@/components/transactions/transaction-item"
import { TransactionForm } from "@/components/transactions/transaction-form"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import type { Transaction } from "@/lib/types"

export function TransactionList() {
  const [showForm, setShowForm] = useState(false)
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions)
  const [filters, setFilters] = useState({
    dateRange: "all",
    category: "all",
    minAmount: "",
    maxAmount: "",
  })

  const filteredTransactions = transactions.filter((transaction) => {
    // Filter by category
    if (filters.category !== "all" && transaction.category !== filters.category) {
      return false
    }

    // Filter by amount
    if (filters.minAmount && transaction.amount < Number.parseFloat(filters.minAmount)) {
      return false
    }
    if (filters.maxAmount && transaction.amount > Number.parseFloat(filters.maxAmount)) {
      return false
    }

    // Filter by date range
    if (filters.dateRange !== "all") {
      const today = new Date()
      const transactionDate = new Date(transaction.date)
      const daysDiff = Math.floor((today.getTime() - transactionDate.getTime()) / (1000 * 60 * 60 * 24))

      if (filters.dateRange === "week" && daysDiff > 7) {
        return false
      } else if (filters.dateRange === "month" && daysDiff > 30) {
        return false
      } else if (filters.dateRange === "year" && daysDiff > 365) {
        return false
      }
    }

    return true
  })

  const handleAddTransaction = (transaction: Transaction) => {
    setTransactions([transaction, ...transactions])
    setShowForm(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <TransactionFilters filters={filters} setFilters={setFilters} />
        <Button onClick={() => setShowForm(true)} className="shrink-0">
          <Plus className="mr-2 h-4 w-4" /> Add Transaction
        </Button>
      </div>

      {showForm && <TransactionForm onSubmit={handleAddTransaction} onCancel={() => setShowForm(false)} />}

      <div className="space-y-4">
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map((transaction) => <TransactionItem key={transaction.id} transaction={transaction} />)
        ) : (
          <div className="text-center p-8 border rounded-lg">
            <p className="text-muted-foreground">No transactions found</p>
          </div>
        )}
      </div>
    </div>
  )
}

// Mock data - in a real app, this would come from an API
const mockTransactions: Transaction[] = [
  {
    id: "t1",
    date: "2023-03-01",
    description: "Grocery Shopping",
    amount: 85.75,
    category: "Food",
    accountId: "1",
    notes: "Weekly grocery run",
  },
  {
    id: "t2",
    date: "2023-03-02",
    description: "Netflix Subscription",
    amount: 14.99,
    category: "Entertainment",
    accountId: "1",
    notes: "Monthly subscription",
  },
  {
    id: "t3",
    date: "2023-03-05",
    description: "Gas Station",
    amount: 45.5,
    category: "Transportation",
    accountId: "1",
    notes: "Filled up the tank",
  },
  {
    id: "t4",
    date: "2023-03-10",
    description: "Restaurant Dinner",
    amount: 78.25,
    category: "Food",
    accountId: "1",
    notes: "Dinner with friends",
  },
  {
    id: "t5",
    date: "2023-03-15",
    description: "Electric Bill",
    amount: 120.0,
    category: "Utilities",
    accountId: "1",
    notes: "Monthly bill",
  },
  {
    id: "t6",
    date: "2023-03-20",
    description: "Amazon Purchase",
    amount: 65.99,
    category: "Shopping",
    accountId: "1",
    notes: "New headphones",
  },
  {
    id: "t7",
    date: "2023-03-25",
    description: "Gym Membership",
    amount: 50.0,
    category: "Health",
    accountId: "1",
    notes: "Monthly membership",
  },
]

