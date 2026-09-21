"use client"

import { cn } from "@/lib/utils"
import { Film, Gamepad2, BookOpen, Play, Hand, DoorOpen } from "lucide-react"

const contentTypes = [
  {
    title: "AI Movies",
    description: "Cinematic experiences with branching narratives",
    icon: Film,
    image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&h=300&fit=crop",
    actions: ["Play", "Make Choice"],
    color: "from-primary to-accent",
  },
  {
    title: "AI Games",
    description: "Procedurally generated adventures",
    icon: Gamepad2,
    image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=500&h=300&fit=crop",
    actions: ["Play", "Enter World"],
    color: "from-accent to-primary",
  },
  {
    title: "Comics",
    description: "AI-illustrated visual stories",
    icon: BookOpen,
    image: "https://images.unsplash.com/photo-1618519764620-7403abdbdfe9?w=500&h=300&fit=crop",
    actions: ["Read", "Make Choice"],
    color: "from-primary to-neon-cyan",
  },
  {
    title: "Shorts",
    description: "Quick interactive experiences",
    icon: Play,
    image: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=500&h=300&fit=crop",
    actions: ["Watch", "Enter World"],
    color: "from-neon-cyan to-accent",
  },
]

const actionIcons: Record<string, typeof Play> = {
  Play: Play,
  "Make Choice": Hand,
  "Enter World": DoorOpen,
  Read: BookOpen,
  Watch: Play,
}

export function InteractiveContent() {
  return (
    <section className="py-16 px-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground">Interactive Content</h2>
        <p className="text-sm text-muted-foreground">Choose your adventure style</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {contentTypes.map((content, index) => (
          <div
            key={index}
            className="group relative cursor-pointer overflow-hidden rounded-2xl glass-panel transition-all duration-300 hover:scale-[1.02]"
          >
            {/* Image */}
            <div className="relative h-40 overflow-hidden">
              <img
                src={content.image}
                alt={content.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
              
              {/* Icon */}
              <div className={cn(
                "absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br",
                content.color
              )}>
                <content.icon className="h-5 w-5 text-foreground" />
              </div>
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="mb-1 text-lg font-semibold text-foreground">{content.title}</h3>
              <p className="mb-4 text-sm text-muted-foreground">{content.description}</p>

              {/* Action Buttons */}
              <div className="flex gap-2 opacity-0 transition-all duration-300 group-hover:opacity-100">
                {content.actions.map((action) => {
                  const Icon = actionIcons[action]
                  return (
                    <button
                      key={action}
                      className="flex items-center gap-1.5 rounded-lg bg-primary/20 px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary hover:text-foreground"
                    >
                      <Icon className="h-3 w-3" />
                      {action}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Hover Border */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl border border-transparent transition-all duration-300 group-hover:border-primary/50" />
          </div>
        ))}
      </div>
    </section>
  )
}
