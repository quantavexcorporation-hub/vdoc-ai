"use client"

import { useState } from "react"
import { Bot, Send, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const sampleMessages = [
  {
    role: "character",
    name: "Nova",
    message: "Welcome, traveler. I&apos;ve been waiting for someone like you. The portals are unstable, and only you can help restore balance.",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
  },
  {
    role: "user",
    message: "What happened to the portals?",
  },
  {
    role: "character",
    name: "Nova",
    message: "An ancient AI awakened and disrupted the fabric of our worlds. But I sense great potential in you. Will you join me on this journey?",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
  },
]

export function AICharacterPanel() {
  const [inputValue, setInputValue] = useState("")

  return (
    <section className="py-16 px-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent">
            <Bot className="h-5 w-5 text-foreground" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">AI Character Interaction</h2>
            <p className="text-sm text-muted-foreground">Chat with AI characters from any world</p>
          </div>
        </div>

        <div className="glass-panel overflow-hidden rounded-2xl neon-border">
          {/* Character Header */}
          <div className="flex items-center gap-4 border-b border-border bg-secondary/30 p-4">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face"
                alt="Nova"
                className="h-12 w-12 rounded-full object-cover"
              />
              <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent">
                <Sparkles className="h-3 w-3 text-foreground" />
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Nova</h3>
              <p className="text-sm text-muted-foreground">Portal Guardian • AI Character</p>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-accent" />
              <span className="text-xs text-muted-foreground">Online</span>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="h-80 overflow-y-auto p-4 space-y-4">
            {sampleMessages.map((msg, index) => (
              <div
                key={index}
                className={cn(
                  "flex gap-3",
                  msg.role === "user" && "flex-row-reverse"
                )}
              >
                {msg.role === "character" && (
                  <img
                    src={msg.avatar}
                    alt={msg.name}
                    className="h-8 w-8 rounded-full object-cover"
                  />
                )}
                <div
                  className={cn(
                    "max-w-[70%] rounded-2xl px-4 py-3",
                    msg.role === "character"
                      ? "bg-secondary/50 text-foreground"
                      : "bg-gradient-to-r from-primary to-accent text-foreground"
                  )}
                >
                  {msg.role === "character" && (
                    <p className="mb-1 text-xs font-medium text-primary">{msg.name}</p>
                  )}
                  <p className="text-sm">{msg.message}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Choice Buttons */}
          <div className="border-t border-border bg-secondary/20 p-4">
            <p className="mb-3 text-xs text-muted-foreground">Choose your response:</p>
            <div className="mb-4 flex flex-wrap gap-2">
              {["Join Nova&apos;s quest", "Ask for more information", "Decline and explore alone"].map((choice) => (
                <button
                  key={choice}
                  className="rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm text-primary transition-all hover:border-primary hover:bg-primary/20"
                >
                  {choice}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="flex gap-3">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Talk to character..."
                className="flex-1 rounded-xl border border-border bg-secondary/50 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
              />
              <Button className="bg-gradient-to-r from-primary to-accent px-6 text-foreground">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
