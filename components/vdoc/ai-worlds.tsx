"use client"

import { Globe, Users, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

const worlds = [
  {
    name: "Neo Tokyo 2099",
    description: "A cyberpunk megacity where AI and humans coexist",
    image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=600&h=400&fit=crop",
    users: "45.2K",
    type: "Cyberpunk",
  },
  {
    name: "Ethereal Gardens",
    description: "Mystical realms of floating islands and ancient magic",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&h=400&fit=crop",
    users: "32.1K",
    type: "Fantasy",
  },
  {
    name: "Stellar Frontier",
    description: "Explore uncharted galaxies and alien civilizations",
    image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=600&h=400&fit=crop",
    users: "28.7K",
    type: "Sci-Fi",
  },
]

export function AIWorlds() {
  return (
    <section className="py-16 px-6">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-primary">
            <Globe className="h-5 w-5 text-foreground" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">AI Worlds</h2>
            <p className="text-sm text-muted-foreground">Explore immersive virtual environments</p>
          </div>
        </div>
        <Button variant="outline" className="border-border bg-secondary/50 text-foreground hover:border-primary">
          View All Worlds
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {worlds.map((world, index) => (
          <div
            key={index}
            className="group relative cursor-pointer overflow-hidden rounded-2xl"
            style={{ perspective: "1000px" }}
          >
            {/* 3D Card Effect */}
            <div 
              className="relative transition-transform duration-500 group-hover:rotate-y-2"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Image with Parallax */}
              <div className="relative h-64 overflow-hidden rounded-2xl">
                <img
                  src={world.image}
                  alt={world.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                
                {/* Floating Elements */}
                <div className="absolute right-4 top-4 rounded-full bg-primary/20 px-3 py-1 text-xs font-medium text-primary backdrop-blur-sm">
                  {world.type}
                </div>
                
                {/* Depth Layers */}
                <div 
                  className="absolute inset-0 border border-primary/20 rounded-2xl transition-all duration-500 group-hover:scale-[1.02] group-hover:border-primary/40"
                  style={{ transform: "translateZ(10px)" }}
                />
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>{world.users} exploring</span>
                </div>
                <h3 className="mb-1 text-xl font-bold text-foreground">{world.name}</h3>
                <p className="mb-4 text-sm text-muted-foreground">{world.description}</p>
                
                <Button 
                  className="w-full bg-gradient-to-r from-primary to-accent text-foreground opacity-0 transition-all duration-300 group-hover:opacity-100"
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  Enter World
                </Button>
              </div>
            </div>

            {/* Glow Effect */}
            <div className="pointer-events-none absolute -inset-1 rounded-2xl bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
          </div>
        ))}
      </div>
    </section>
  )
}
