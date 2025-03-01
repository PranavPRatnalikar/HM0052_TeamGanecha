import type { Metadata } from "next"
import { TransactionList } from "@/components/transactions/transaction-list"

export const metadata: Metadata = {
  title: "Transactions | Personal Finance App",
  description: "Manage your transactions",
}

export default function TransactionsPage() {
  return (
    <div className="grid gap-6">
      <h1 className="text-3xl font-bold">Transactions</h1>
      <TransactionList />
    </div>
  )
}

