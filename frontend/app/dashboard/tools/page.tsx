import type { Metadata } from "next"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RetirementCalculator } from "@/components/tools/retirement-calculator"
import { LoanCalculator } from "@/components/tools/loan-calculator"
import { InflationCalculator } from "@/components/tools/inflation-calculator"

export const metadata: Metadata = {
  title: "Financial Tools | Personal Finance App",
  description: "Use our financial calculators to plan your future",
}

export default function ToolsPage() {
  return (
    <div className="grid gap-6">
      <h1 className="text-3xl font-bold">Financial Tools</h1>

      <Tabs defaultValue="retirement" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="retirement">Retirement</TabsTrigger>
          <TabsTrigger value="loan">Loan</TabsTrigger>
          <TabsTrigger value="inflation">Inflation</TabsTrigger>
        </TabsList>
        <TabsContent value="retirement">
          <RetirementCalculator />
        </TabsContent>
        <TabsContent value="loan">
          <LoanCalculator />
        </TabsContent>
        <TabsContent value="inflation">
          <InflationCalculator />
        </TabsContent>
      </Tabs>
    </div>
  )
}

