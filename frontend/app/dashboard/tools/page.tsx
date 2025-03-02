import type { Metadata } from "next"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RetirementCalculator } from "@/components/tools/retirement-calculator"
import { LoanCalculator } from "@/components/tools/loan-calculator"
import { InflationCalculator } from "@/components/tools/inflation-calculator"
import { ExchangeRateCalculator } from "@/components/tools/exchange-rate-calculator"
import { FinancialFreedomCalculator } from "@/components/tools/financial-freedom-calculator"
import { HomeAffordabilityCalculator } from "@/components/tools/home-affordability-calculator"
import { CompoundInterestCalculator } from "@/components/tools/compound-interest-calculator"
import { ROICalculator } from "@/components/tools/roi-calculator"

export const metadata: Metadata = {
        title: "Financial Tools | Personal Finance App",
        description: "Use our financial calculators to plan your future",
}

export default function ToolsPage() {
        return (
                <div className="grid gap-6">
                        <h1 className="text-3xl font-bold">Financial Tools</h1>

                        <Tabs defaultValue="retirement" className="w-full">
                                <TabsList className="grid w-full grid-cols-4 md:grid-cols-8">
                                        <TabsTrigger value="retirement">Retirement</TabsTrigger>
                                        <TabsTrigger value="loan">Loan</TabsTrigger>
                                        <TabsTrigger value="inflation">Inflation</TabsTrigger>
                                        <TabsTrigger value="exchange">Exchange</TabsTrigger>
                                        <TabsTrigger value="freedom">Financial Freedom</TabsTrigger>
                                        <TabsTrigger value="home">Home Affordability</TabsTrigger>
                                        <TabsTrigger value="compound">Compound Interest</TabsTrigger>
                                        <TabsTrigger value="roi">ROI</TabsTrigger>
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
                                <TabsContent value="exchange">
                                        <ExchangeRateCalculator />
                                </TabsContent>
                                <TabsContent value="freedom">
                                        <FinancialFreedomCalculator />
                                </TabsContent>
                                <TabsContent value="home">
                                        <HomeAffordabilityCalculator />
                                </TabsContent>
                                <TabsContent value="compound">
                                        <CompoundInterestCalculator />
                                </TabsContent>
                                <TabsContent value="roi">
                                        <ROICalculator />
                                </TabsContent>
                        </Tabs>
                </div>
        )
}

