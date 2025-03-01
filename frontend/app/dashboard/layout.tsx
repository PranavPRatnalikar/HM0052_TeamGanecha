import type React from "react"
import type { Metadata } from "next"
import { Sidebar } from "@/components/dashboard/sidebar"
import { TopBar } from "@/components/dashboard/top-bar"

export const metadata: Metadata = {
  title: "Dashboard | Personal Finance App",
  description: "Manage your finances",
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen w-full flex-col md:flex-row">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <TopBar />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}

