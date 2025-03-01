"use client"

import { useState } from "react"
import type { Transaction } from "@/lib/types"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ChevronDown,
  ChevronUp,
  ShoppingBag,
  Car,
  Film,
  Lightbulb,
  ShoppingCart,
  Heart,
  Plane,
  GraduationCap,
  HelpCircle,
} from "lucide-react"
import { CategoryPrompt } from "@/components/transactions/category-prompt"

interface TransactionItemProps {
  transaction: Transaction
}

export function TransactionItem({ transaction }: TransactionItemProps) {
  const [expanded, setExpanded] = useState(false)
  const [showCategoryPrompt, setShowCategoryPrompt] = useState(false)
  const [currentTransaction, setCurrentTransaction] = useState<Transaction>(transaction)

  // Get icon based on category
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Food":
        return <ShoppingBag className="h-4 w-4" />
      case "Transportation":
        return <Car className="h-4 w-4" />
      case "Entertainment":
        return <Film className="h-4 w-4" />
      case "Utilities":
        return <Lightbulb className="h-4 w-4" />
      case "Shopping":
        return <ShoppingCart className="h-4 w-4" />
      case "Health":
        return <Heart className="h-4 w-4" />
      case "Travel":
        return <Plane className="h-4 w-4" />
      case "Education":
        return <GraduationCap className="h-4 w-4" />
      default:
        return <HelpCircle className="h-4 w-4" />
    }
  }

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const handleCategoryChange = (newCategory: string) => {
    setCurrentTransaction({
      ...currentTransaction,
      category: newCategory,
    })
    setShowCategoryPrompt(false)
  }

  return (
    <>
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="flex items-center justify-between p-4 cursor-pointer" onClick={() => setExpanded(!expanded)}>
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-full bg-primary/10 text-primary`}>
                {getCategoryIcon(currentTransaction.category)}
              </div>
              <div>
                <h3 className="font-medium">{currentTransaction.description}</h3>
                <p className="text-sm text-muted-foreground">{formatDate(currentTransaction.date)}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className={`font-medium ${currentTransaction.amount > 0 ? "text-green-500" : ""}`}>
                  ${Math.abs(currentTransaction.amount).toFixed(2)}
                </p>
                <Badge
                  variant="outline"
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowCategoryPrompt(true)
                  }}
                >
                  {currentTransaction.category}
                </Badge>
              </div>
              {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </div>
          </div>

          {expanded && (
            <div className="p-4 pt-0 border-t">
              <div className="grid gap-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Date:</span>
                  <span className="text-sm">{formatDate(currentTransaction.date)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Category:</span>
                  <span className="text-sm">{currentTransaction.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Account:</span>
                  <span className="text-sm">Checking Account</span>
                </div>
                {currentTransaction.notes && (
                  <div className="mt-2">
                    <span className="text-sm text-muted-foreground">Notes:</span>
                    <p className="text-sm mt-1 p-2 bg-muted rounded-md">{currentTransaction.notes}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {showCategoryPrompt && (
        <CategoryPrompt
          transaction={currentTransaction}
          onSelect={handleCategoryChange}
          onCancel={() => setShowCategoryPrompt(false)}
        />
      )}
    </>
  )
}

