"use client"

import { useState } from "react"
import type { Transaction } from "@/lib/types"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface CategoryPromptProps {
  transaction: Transaction
  onSelect: (category: string) => void
  onCancel: () => void
}

export function CategoryPrompt({ transaction, onSelect, onCancel }: CategoryPromptProps) {
  const [newCategory, setNewCategory] = useState("")
  const [showCustomInput, setShowCustomInput] = useState(false)

  const categories = [
    "Food",
    "Transportation",
    "Entertainment",
    "Utilities",
    "Shopping",
    "Health",
    "Travel",
    "Education",
    "Other",
  ]

  return (
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Categorize Transaction</DialogTitle>
          <DialogDescription>
            Categorize transaction: ${transaction.amount.toFixed(2)} at {transaction.description}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant="outline"
                className={`justify-start ${transaction.category === category ? "border-primary" : ""}`}
                onClick={() => onSelect(category)}
              >
                {category}
              </Button>
            ))}
            <Button variant="outline" className="justify-start" onClick={() => setShowCustomInput(true)}>
              + Custom
            </Button>
          </div>

          {showCustomInput && (
            <div className="grid gap-2">
              <Label htmlFor="custom-category">Custom Category</Label>
              <div className="flex gap-2">
                <Input
                  id="custom-category"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  placeholder="Enter custom category"
                  autoFocus
                />
                <Button onClick={() => onSelect(newCategory)} disabled={!newCategory}>
                  Add
                </Button>
              </div>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

