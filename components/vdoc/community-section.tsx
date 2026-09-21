"use client"

import { Users, ThumbsUp, MessageCircle, GitBranch } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const communityPosts = [
  {
    author: "StoryWeaver",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    title: "My AI-generated epic: The Last Algorithm",
    preview: "After 50 hours of choices, I finally reached the hidden ending...",
    likes: 1234,
    comments: 89,
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=200&fit=crop",
  },
  {
    author: "PixelDreamer",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    title: "Created my first AI world - Neon Gardens",
    preview: "Used the Creator Studio to build this cyberpunk botanical garden...",
    likes: 892,
    comments: 45,
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=200&fit=crop",
  },
]

const storyChoices = [
  { option: "The hero confronts the AI overlord", votes: 67 },
  { option: "The hero joins the resistance underground", votes: 23 },
  { option: "The hero seeks the ancient technology", votes: 10 },
]

export function CommunitySection() {
  const totalVotes = storyChoices.reduce((acc, c) => acc + c.votes, 0)

  return (
    <section className="py-16 px-6">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-primary">
            <Users className="h-5 w-5 text-foreground" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">Community</h2>
            <p className="text-sm text-muted-foreground">User-generated content and collective stories</p>
          </div>
        </div>
        <Button variant="outline" className="border-border bg-secondary/50 text-foreground hover:border-primary">
          Join Community
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Community Posts */}
        <div className="space-y-4 lg:col-span-2">
          {communityPosts.map((post, index) => (
            <div
              key={index}
              className="glass-panel group cursor-pointer overflow-hidden rounded-2xl transition-all duration-300 hover:border-primary/50"
            >
              <div className="flex gap-4 p-4">
                <img
                  src={post.avatar}
                  alt={post.author}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="mb-1 flex items-center gap-2">
                    <span className="font-medium text-foreground">{post.author}</span>
                    <span className="text-xs text-muted-foreground">• 2h ago</span>
                  </div>
                  <h3 className="mb-1 font-semibold text-foreground group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{post.preview}</p>
                </div>
              </div>
              <div className="relative h-40 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
              </div>
              <div className="flex items-center gap-6 border-t border-border p-4">
                <button className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary">
                  <ThumbsUp className="h-4 w-4" />
                  {post.likes.toLocaleString()}
                </button>
                <button className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary">
                  <MessageCircle className="h-4 w-4" />
                  {post.comments}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Story Direction Voting */}
        <div className="glass-panel rounded-2xl p-5 neon-border">
          <div className="mb-4 flex items-center gap-2">
            <GitBranch className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-foreground">Choose Next Story Direction</h3>
          </div>
          <p className="mb-4 text-sm text-muted-foreground">
            The community is writing &quot;Digital Uprising&quot; together. Vote for what happens next!
          </p>
          
          <div className="space-y-3">
            {storyChoices.map((choice, index) => {
              const percentage = Math.round((choice.votes / totalVotes) * 100)
              return (
                <button
                  key={index}
                  className="group relative w-full overflow-hidden rounded-xl border border-border bg-secondary/30 p-3 text-left transition-all hover:border-primary"
                >
                  <div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary/20 to-transparent transition-all"
                    style={{ width: `${percentage}%` }}
                  />
                  <div className="relative flex items-center justify-between">
                    <span className="text-sm text-foreground">{choice.option}</span>
                    <span className="text-sm font-medium text-primary">{percentage}%</span>
                  </div>
                </button>
              )
            })}
          </div>

          <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
            <span>{totalVotes.toLocaleString()} votes</span>
            <span>Ends in 12h</span>
          </div>
        </div>
      </div>
    </section>
  )
}
