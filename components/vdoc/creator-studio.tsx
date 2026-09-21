"use client"

import { Wrench, BookOpen, User, Globe, ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

const creatorTools = [
  {
    title: "Create Story",
    description: "Write interactive narratives with AI assistance",
    icon: BookOpen,
    color: "from-primary to-accent",
  },
  {
    title: "Generate Character",
    description: "Design unique AI characters with personalities",
    icon: User,
    color: "from-accent to-primary",
  },
  {
    title: "Build World",
    description: "Create immersive environments and settings",
    icon: Globe,
    color: "from-primary to-neon-cyan",
  },
]

export function CreatorStudio() {
  return (
    <section className="py-16 px-6">
      <div className="mx-auto max-w-5xl">
        <div className="glass-panel overflow-hidden rounded-3xl neon-border">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary/20 to-accent/20 p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent">
                <Wrench className="h-6 w-6 text-foreground" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">Creator Studio</h2>
                <p className="text-sm text-muted-foreground">Build your own AI-powered experiences</p>
              </div>
            </div>
            <p className="text-muted-foreground max-w-2xl">
              Unleash your creativity with our powerful AI tools. Create stories, design characters, 
              and build entire worlds that others can explore and interact with.
            </p>
          </div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 gap-4 p-8 md:grid-cols-3">
            {creatorTools.map((tool, index) => (
              <button
                key={index}
                className="group flex flex-col items-start rounded-2xl border border-border bg-secondary/30 p-6 text-left transition-all duration-300 hover:border-primary hover:bg-secondary/50"
              >
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${tool.color}`}>
                  <tool.icon className="h-6 w-6 text-foreground" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  {tool.title}
                </h3>
                <p className="mb-4 text-sm text-muted-foreground">{tool.description}</p>
                <div className="mt-auto flex items-center gap-2 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  <span>Get Started</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </button>
            ))}
          </div>

          {/* CTA */}
          <div className="border-t border-border bg-secondary/20 p-8">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <div className="flex items-center gap-3">
                <Sparkles className="h-5 w-5 text-primary" />
                <span className="text-foreground">
                  <span className="font-semibold">500K+</span> creators have published their work
                </span>
              </div>
              <Button className="bg-gradient-to-r from-primary to-accent text-foreground">
                Start Creating
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
