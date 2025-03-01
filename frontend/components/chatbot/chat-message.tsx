"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
  chart?: {
    type: "bar" | "line" | "pie"
    data: any
  }
}

interface ChatMessageProps {
  message: Message
}

export function ChatMessage({ message }: ChatMessageProps) {
  const COLORS = ["#3b82f6", "#ef4444", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899"]

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  const renderChart = () => {
    if (!message.chart) return null

    switch (message.chart.type) {
      case "bar":
        return (
          <div className="h-[200px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={message.chart.data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => `$${value}`} />
                <Tooltip formatter={(value) => [`$${value}`, "Amount"]} />
                <Bar dataKey="amount" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )

      case "line":
        return (
          <div className="h-[200px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={message.chart.data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => `$${value}`} />
                <Tooltip formatter={(value) => [`$${value}`, "Amount"]} />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )

      case "pie":
        return (
          <div className="h-[200px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={message.chart.data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {message.chart.data.map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`$${value}`, "Amount"]} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className={`flex gap-3 ${message.sender === "user" ? "justify-end" : ""}`}>
      {message.sender === "bot" && (
        <Avatar className="h-8 w-8">
          <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Bot" />
          <AvatarFallback>AI</AvatarFallback>
        </Avatar>
      )}

      <div
        className={`max-w-[80%] ${message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"} rounded-lg p-3`}
      >
        <div className="text-sm">{message.content}</div>
        {renderChart()}
        <div className="text-xs mt-1 opacity-70 text-right">{formatTime(message.timestamp)}</div>
      </div>

      {message.sender === "user" && (
        <Avatar className="h-8 w-8">
          <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      )}
    </div>
  )
}

