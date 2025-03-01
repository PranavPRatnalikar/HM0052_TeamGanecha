"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Filter } from "lucide-react"

interface TransactionFiltersProps {
  filters: {
    dateRange: string
    category: string
    minAmount: string
    maxAmount: string
  }
  setFilters: React.Dispatch<
    React.SetStateAction<{
      dateRange: string
      category: string
      minAmount: string
      maxAmount: string
    }>
  >
}

export function TransactionFilters({ filters, setFilters }: TransactionFiltersProps) {
  const [isOpen, setIsOpen] = useState(false)

  const handleReset = () => {
    setFilters({
      dateRange: "all",
      category: "all",
      minAmount: "",
      maxAmount: "",
    })
    setIsOpen(false)
  }

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
    <div className="flex items-center">
      <div className="hidden md:flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Label htmlFor="dateRange" className="whitespace-nowrap">
            Date Range:
          </Label>
          <Select value={filters.dateRange} onValueChange={(value) => setFilters({ ...filters, dateRange: value })}>
            <SelectTrigger id="dateRange" className="w-[150px]">
              <SelectValue placeholder="Select date range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="week">Last 7 Days</SelectItem>
              <SelectItem value="month">Last 30 Days</SelectItem>
              <SelectItem value="year">Last Year</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="category" className="whitespace-nowrap">
            Category:
          </Label>
          <Select value={filters.category} onValueChange={(value) => setFilters({ ...filters, category: value })}>
            <SelectTrigger id="category" className="w-[150px]">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="minAmount" className="whitespace-nowrap">
            Min Amount:
          </Label>
          <Input
            id="minAmount"
            type="number"
            placeholder="0"
            className="w-[100px]"
            value={filters.minAmount}
            onChange={(e) => setFilters({ ...filters, minAmount: e.target.value })}
          />
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="maxAmount" className="whitespace-nowrap">
            Max Amount:
          </Label>
          <Input
            id="maxAmount"
            type="number"
            placeholder="1000"
            className="w-[100px]"
            value={filters.maxAmount}
            onChange={(e) => setFilters({ ...filters, maxAmount: e.target.value })}
          />
        </div>
        <Button variant="outline" onClick={handleReset}>
          Reset
        </Button>
      </div>

      {/* Mobile filters */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" className="md:hidden">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
            <SheetDescription>Filter your transactions by date, category, and amount.</SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="mobile-dateRange">Date Range</Label>
              <Select value={filters.dateRange} onValueChange={(value) => setFilters({ ...filters, dateRange: value })}>
                <SelectTrigger id="mobile-dateRange">
                  <SelectValue placeholder="Select date range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="week">Last 7 Days</SelectItem>
                  <SelectItem value="month">Last 30 Days</SelectItem>
                  <SelectItem value="year">Last Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="mobile-category">Category</Label>
              <Select value={filters.category} onValueChange={(value) => setFilters({ ...filters, category: value })}>
                <SelectTrigger id="mobile-category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="mobile-minAmount">Min Amount</Label>
              <Input
                id="mobile-minAmount"
                type="number"
                placeholder="0"
                value={filters.minAmount}
                onChange={(e) => setFilters({ ...filters, minAmount: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="mobile-maxAmount">Max Amount</Label>
              <Input
                id="mobile-maxAmount"
                type="number"
                placeholder="1000"
                value={filters.maxAmount}
                onChange={(e) => setFilters({ ...filters, maxAmount: e.target.value })}
              />
            </div>
            <div className="flex justify-between mt-4">
              <Button variant="outline" onClick={handleReset}>
                Reset
              </Button>
              <Button onClick={() => setIsOpen(false)}>Apply Filters</Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

