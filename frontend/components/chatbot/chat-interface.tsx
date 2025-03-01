"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChatMessage } from "@/components/chatbot/chat-message"
import { Send } from "lucide-react"

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

export function ChatInterface() {
  const [activeTab, setActiveTab] = useState<"general" | "personal">("general")
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Initialize with welcome message
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        id: "welcome",
        content:
          activeTab === "general"
            ? "Hello! I'm your finance assistant. I can help you with general financial questions and guidance. What would you like to know about?"
            : "Hello! I'm your personal finance assistant. I can help you analyze your spending, track your budget, and provide personalized insights. What would you like to know about your finances?",
        sender: "bot",
        timestamp: new Date(),
      }
      setMessages([welcomeMessage])
    }
  }, [activeTab, messages.length])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Handle tab change
  const handleTabChange = (value: string) => {
    setActiveTab(value as "general" | "personal")
    setMessages([]) // Reset messages when changing tabs
  }

  // Handle sending a message
  const handleSendMessage = () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")

    // Simulate bot response
    setTimeout(() => {
      let botResponse: Message

      if (activeTab === "general") {
        // General mode responses
        botResponse = {
          id: `bot-${Date.now()}`,
          content: getGeneralResponse(input),
          sender: "bot",
          timestamp: new Date(),
        }
      } else {
        // Personal mode responses
        botResponse = getPersonalResponse(input)
      }

      setMessages((prev) => [...prev, botResponse])
    }, 1000)
  }

  // Get general mode response
  const getGeneralResponse = (query: string): string => {
    const lowerQuery = query.toLowerCase()

    if (lowerQuery.includes("budget") || lowerQuery.includes("budgeting")) {
      return "Budgeting is the process of creating a plan for how you will spend your money. This spending plan is called a budget. Creating a budget allows you to determine in advance whether you will have enough money to do the things you need to do or would like to do. Start by tracking your income and expenses, then allocate specific amounts to different categories."
    } else if (lowerQuery.includes("invest") || lowerQuery.includes("investing")) {
      return "Investing is putting money to work to grow your wealth. Common investment types include stocks, bonds, mutual funds, ETFs, and real estate. Before investing, consider your goals, time horizon, and risk tolerance. It's generally recommended to diversify your investments and to start as early as possible to benefit from compound growth."
    } else if (lowerQuery.includes("debt") || lowerQuery.includes("loan")) {
      return "When managing debt, focus on high-interest debt first (like credit cards). Consider the debt avalanche method (paying highest interest first) or the debt snowball method (paying smallest balances first). Always make at least minimum payments on all debts, and try to pay more than the minimum when possible."
    } else if (lowerQuery.includes("save") || lowerQuery.includes("saving")) {
      return "A good rule of thumb is to save at least 20% of your income. Start with an emergency fund that covers 3-6 months of expenses, then save for specific goals like retirement, a home, or education. Automate your savings by setting up automatic transfers to your savings account on payday."
    } else {
      return "I'm here to help with general financial questions. You can ask me about budgeting, investing, debt management, saving strategies, retirement planning, and more. How can I assist you today?"
    }
  }

  // Get personal mode response with potential chart data
  const getPersonalResponse = (query: string): Message => {
    const lowerQuery = query.toLowerCase()

    if (lowerQuery.includes("spend") && lowerQuery.includes("groceries")) {
      return {
        id: `bot-${Date.now()}`,
        content:
          "Based on your transaction history, you spend an average of $420 per month on groceries. This is about 15% of your total monthly expenses. Here's a breakdown of your grocery spending over the last 6 months:",
        sender: "bot",
        timestamp: new Date(),
        chart: {
          type: "bar",
          data: [
            { month: "Jan", amount: 380 },
            { month: "Feb", amount: 420 },
            { month: "Mar", amount: 450 },
            { month: "Apr", amount: 410 },
            { month: "May", amount: 430 },
            { month: "Jun", amount: 430 },
          ],
        },
      }
    } else if (lowerQuery.includes("budget") && lowerQuery.includes("status")) {
      return {
        id: `bot-${Date.now()}`,
        content:
          "Here's your budget status for this month. You're currently under budget in most categories, but you've exceeded your Entertainment budget by $45.",
        sender: "bot",
        timestamp: new Date(),
        chart: {
          type: "pie",
          data: [
            { name: "Food", value: 850, budget: 900 },
            { name: "Housing", value: 1200, budget: 1200 },
            { name: "Transportation", value: 350, budget: 400 },
            { name: "Entertainment", value: 345, budget: 300 },
            { name: "Utilities", value: 280, budget: 300 },
            { name: "Other", value: 175, budget: 200 },
          ],
        },
      }
    } else if (lowerQuery.includes("saving") && lowerQuery.includes("trend")) {
      return {
        id: `bot-${Date.now()}`,
        content:
          "Your savings have been growing steadily over the past year. You've saved an average of $650 per month, which is excellent! Here's your savings trend:",
        sender: "bot",
        timestamp: new Date(),
        chart: {
          type: "line",
          data: [
            { month: "Jul", amount: 5000 },
            { month: "Aug", amount: 5600 },
            { month: "Sep", amount: 6200 },
            { month: "Oct", amount: 6900 },
            { month: "Nov", amount: 7500 },
            { month: "Dec", amount: 8100 },
            { month: "Jan", amount: 8700 },
            { month: "Feb", amount: 9300 },
            { month: "Mar", amount: 9900 },
            { month: "Apr", amount: 10500 },
            { month: "May", amount: 11200 },
            { month: "Jun", amount: 11800 },
          ],
        },
      }
    } else {
      return {
        id: `bot-${Date.now()}`,
        content:
          "I can provide personalized insights about your finances. Try asking about your spending in specific categories, your budget status, saving trends, or investment performance. For example, 'How much did I spend on groceries last month?' or 'What's my budget status?'",
        sender: "bot",
        timestamp: new Date(),
      }
    }
  }

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="px-4 py-3 border-b">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl">Chat with Finance Assistant</CardTitle>
          <Tabs defaultValue="general" onValueChange={handleTabChange}>
            <TabsList>
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="personal">Personal</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-0 flex flex-col">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        <div className="p-4 border-t">
          <form
            className="flex items-center gap-2"
            onSubmit={(e) => {
              e.preventDefault()
              handleSendMessage()
            }}
          >
            <Input
              placeholder={`Ask a ${activeTab} finance question...`}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Button type="submit" size="icon">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </CardContent>
    </Card>
  )
}

