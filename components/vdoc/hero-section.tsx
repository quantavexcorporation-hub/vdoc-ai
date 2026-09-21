"use client"

import { Play, Globe, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative min-h-[85vh] w-full overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/20 to-background" />
        <div className="absolute inset-0 animate-gradient bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10" />
        
        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute h-1 w-1 rounded-full bg-primary/30"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              }}
            />
          ))}
        </div>
        
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(oklch(0.7 0.2 280 / 0.1) 1px, transparent 1px),
                              linear-gradient(90deg, oklch(0.7 0.2 280 / 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-[85vh] flex-col items-center justify-center px-6 text-center">
        {/* AI Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-primary">AI-Powered Experience</span>
        </div>

        {/* Main Title */}
        <h1 className="mb-4 max-w-4xl text-balance text-5xl font-bold leading-tight tracking-tight text-foreground md:text-7xl lg:text-8xl">
          <span className="neon-text">Your Story.</span>
          <br />
          <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            Your Choices.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mb-10 max-w-2xl text-pretty text-lg text-muted-foreground md:text-xl">
          Enter a new era of entertainment. Create, explore, and shape AI-generated worlds 
          where every decision writes your unique story.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button 
            size="lg" 
            className="group relative overflow-hidden bg-gradient-to-r from-primary to-accent px-8 py-6 text-lg font-semibold text-foreground transition-all hover:scale-105 hover:shadow-lg hover:shadow-primary/25"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 transition-opacity group-hover:opacity-100" />
            <Play className="relative z-10 mr-2 h-5 w-5" />
            <span className="relative z-10">Start Experience</span>
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="border-border bg-secondary/50 px-8 py-6 text-lg font-semibold text-foreground backdrop-blur transition-all hover:border-primary hover:bg-secondary hover:text-primary"
          >
            <Globe className="mr-2 h-5 w-5" />
            Explore Worlds
          </Button>
        </div>

        {/* AI Orb */}
        <div className="absolute bottom-20 right-10 hidden lg:block">
          <div className="relative">
            <div className="animate-orb h-20 w-20 rounded-full bg-gradient-to-br from-primary via-accent to-primary opacity-80 blur-sm" />
            <div className="absolute inset-2 animate-orb rounded-full bg-gradient-to-br from-primary to-accent" style={{ animationDelay: '0.5s' }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles className="h-8 w-8 text-foreground" />
            </div>
          </div>
          <p className="mt-3 text-center text-xs text-muted-foreground">AI Assistant</p>
        </div>

        {/* Stats */}
        <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 gap-8 md:gap-16">
          {[
            { value: "10M+", label: "Stories Created" },
            { value: "500K", label: "AI Worlds" },
            { value: "2M+", label: "Active Users" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-bold text-foreground md:text-3xl">{stat.value}</p>
              <p className="text-xs text-muted-foreground md:text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
