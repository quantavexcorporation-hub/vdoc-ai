"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Search, Bell, User, Sparkles } from "lucide-react"

const navItems = [
  { label: "Home", active: true },
  { label: "Explore" },
  { label: "AI Worlds" },
  { label: "Games" },
  { label: "Community" },
  { label: "Creator Studio" },
]

export function TopNav() {
  const [searchFocused, setSearchFocused] = useState(false)

  return (
    <header className="fixed left-16 right-0 top-0 z-40 glass-panel">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Navigation Links */}
        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <button
              key={item.label}
              className={cn(
                "text-sm font-medium transition-all duration-200",
                item.active
                  ? "neon-text text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Search Bar */}
        <div className="flex flex-1 items-center justify-center px-4 md:px-8">
          <div
            className={cn(
              "relative w-full max-w-md transition-all duration-300",
              searchFocused && "max-w-lg"
            )}
          >
            <div
              className={cn(
                "absolute inset-0 rounded-xl bg-gradient-to-r from-primary/20 to-accent/20 blur-md transition-opacity duration-300",
                searchFocused ? "opacity-100" : "opacity-0"
              )}
            />
            <div className="relative flex items-center">
              <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search AI worlds, stories, games..."
                className="h-10 w-full rounded-xl border border-border bg-secondary/50 pl-10 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
              />
              <div className="absolute right-3 flex items-center gap-1">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-xs text-muted-foreground">AI</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <button className="relative rounded-xl p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground">
            <Bell className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-accent" />
          </button>
          <button className="flex items-center gap-2 rounded-xl border border-border bg-secondary/50 p-1.5 pr-3 transition-all hover:border-primary hover:bg-secondary">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
              <User className="h-4 w-4 text-foreground" />
            </div>
            <span className="hidden text-sm font-medium text-foreground md:block">Profile</span>
          </button>
        </div>
      </div>
    </header>
  )
}
