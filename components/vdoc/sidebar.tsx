"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import {
  Home,
  Sparkles,
  Gamepad2,
  BookOpen,
  Users,
  Wrench,
  Bot,
  ChevronRight,
} from "lucide-react"

const menuItems = [
  { icon: Home, label: "Home", active: true },
  { icon: Sparkles, label: "AI Feed" },
  { icon: Gamepad2, label: "Games" },
  { icon: BookOpen, label: "Comics" },
  { icon: Users, label: "Community" },
  { icon: Wrench, label: "Creator Tools" },
  { icon: Bot, label: "AI Assistant" },
]

export function Sidebar() {
  const [expanded, setExpanded] = useState(false)

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-50 h-screen glass-panel transition-all duration-300 ease-out",
        expanded ? "w-56" : "w-16"
      )}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <div className="flex h-full flex-col py-6">
        {/* Logo */}
        <div className="mb-8 flex items-center justify-center px-4">
          <div className="relative flex h-10 w-10 items-center justify-center">
            <div className="absolute inset-0 animate-pulse-glow rounded-xl bg-gradient-to-br from-primary to-accent opacity-80" />
            <span className="relative z-10 text-xl font-bold text-foreground">V</span>
          </div>
          <span
            className={cn(
              "ml-2 text-xl font-bold text-foreground transition-opacity duration-200",
              expanded ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
            )}
          >
            doc
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 px-2">
          {menuItems.map((item) => (
            <button
              key={item.label}
              className={cn(
                "group flex w-full items-center gap-3 rounded-xl px-3 py-3 transition-all duration-200",
                item.active
                  ? "bg-primary/20 text-primary neon-border"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              <span
                className={cn(
                  "whitespace-nowrap transition-all duration-200",
                  expanded ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
                )}
              >
                {item.label}
              </span>
              {expanded && (
                <ChevronRight className="ml-auto h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
              )}
            </button>
          ))}
        </nav>

        {/* AI Assistant Quick Access */}
        <div className="px-2">
          <div
            className={cn(
              "glass-panel rounded-xl p-3 transition-all duration-200",
              expanded ? "opacity-100" : "opacity-0"
            )}
          >
            <div className="flex items-center gap-2">
              <div className="relative h-8 w-8 shrink-0">
                <div className="absolute inset-0 animate-orb rounded-full bg-gradient-to-br from-accent to-primary" />
                <Bot className="relative z-10 m-1.5 h-5 w-5 text-foreground" />
              </div>
              {expanded && (
                <div className="min-w-0">
                  <p className="truncate text-xs font-medium text-foreground">AI Ready</p>
                  <p className="truncate text-xs text-muted-foreground">Ask anything...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
