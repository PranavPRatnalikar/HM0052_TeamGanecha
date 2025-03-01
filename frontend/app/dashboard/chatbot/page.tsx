import type { Metadata } from "next"
import { ChatInterface } from "@/components/chatbot/chat-interface"

export const metadata: Metadata = {
  title: "Chatbot | Personal Finance App",
  description: "Chat with our AI assistant about your finances",
}

export default function ChatbotPage() {
  return (
    <div className="grid gap-6 h-[calc(100vh-8rem)]">
      <h1 className="text-3xl font-bold">Finance Assistant</h1>

      <ChatInterface />
    </div>
  )
}

