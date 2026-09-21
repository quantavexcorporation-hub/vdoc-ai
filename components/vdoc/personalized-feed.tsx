"use client"

import { useRef } from "react"
import { cn } from "@/lib/utils"
import { Sparkles, GitBranch, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const feedItems = [
  {
    title: "Echoes of Tomorrow",
    image: "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?w=400&h=600&fit=crop",
    tags: ["AI Generated", "Sci-Fi"],
    hasChoices: true,
  },
  {
    title: "The Last Garden",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=600&fit=crop",
    tags: ["Interactive", "Fantasy"],
    hasChoices: true,
  },
  {
    title: "Neon Shadows",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=600&fit=crop",
    tags: ["Story Mode", "Cyberpunk"],
    hasChoices: false,
  },
  {
    title: "Whispers in Code",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=600&fit=crop",
    tags: ["AI Generated", "Thriller"],
    hasChoices: true,
  },
  {
    title: "Beyond the Veil",
    image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=400&h=600&fit=crop",
    tags: ["Interactive", "Mystery"],
    hasChoices: true,
  },
  {
    title: "Digital Dreams",
    image: "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=400&h=600&fit=crop",
    tags: ["Story Mode", "Drama"],
    hasChoices: false,
  },
]

export function PersonalizedFeed() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 320
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <section className="relative py-16">
      <div className="mb-8 flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent">
            <Sparkles className="h-5 w-5 text-foreground" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">Generated For You</h2>
            <p className="text-sm text-muted-foreground">AI-curated content based on your preferences</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("left")}
            className="rounded-xl border-border bg-secondary/50 text-foreground hover:border-primary hover:bg-secondary"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => scroll("right")}
            className="rounded-xl border-border bg-secondary/50 text-foreground hover:border-primary hover:bg-secondary"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto px-6 pb-4 scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {feedItems.map((item, index) => (
          <div
            key={index}
            className="group relative min-w-[280px] cursor-pointer overflow-hidden rounded-2xl"
          >
            {/* Image */}
            <div className="relative aspect-[2/3] overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-background/60 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                <Button className="bg-gradient-to-r from-primary to-accent text-foreground">
                  Start Experience
                </Button>
              </div>
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="mb-2 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-primary/20 px-2 py-0.5 text-xs font-medium text-primary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
              {item.hasChoices && (
                <div className="mt-2 flex items-center gap-1 text-sm text-accent">
                  <GitBranch className="h-4 w-4" />
                  <span>Interactive Choices</span>
                </div>
              )}
            </div>

            {/* Neon Border on Hover */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl border border-transparent transition-all duration-300 group-hover:border-primary group-hover:shadow-lg group-hover:shadow-primary/20" />
          </div>
        ))}
      </div>
    </section>
  )
}
