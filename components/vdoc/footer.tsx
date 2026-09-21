"use client"

import { Twitter, Instagram, Youtube, Github, Sparkles } from "lucide-react"

const footerLinks = [
  {
    title: "Platform",
    links: ["Explore", "AI Worlds", "Games", "Comics"],
  },
  {
    title: "Create",
    links: ["Creator Studio", "Documentation", "API Access", "Partnerships"],
  },
  {
    title: "Community",
    links: ["Discord", "Forum", "Events", "Leaderboard"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Press", "Contact"],
  },
]

const socialLinks = [
  { icon: Twitter, href: "#" },
  { icon: Instagram, href: "#" },
  { icon: Youtube, href: "#" },
  { icon: Github, href: "#" },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/20 px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="relative flex h-10 w-10 items-center justify-center">
                <div className="absolute inset-0 animate-pulse-glow rounded-xl bg-gradient-to-br from-primary to-accent opacity-80" />
                <span className="relative z-10 text-xl font-bold text-foreground">V</span>
              </div>
              <span className="text-xl font-bold text-foreground">doc</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              The future of interactive entertainment, powered by AI.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary text-muted-foreground transition-all hover:bg-primary hover:text-foreground"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="mb-4 text-sm font-semibold text-foreground">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground transition-colors hover:text-primary"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © 2024 Vdoc. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="h-4 w-4 text-primary" />
            <span>Where imagination meets artificial intelligence</span>
          </div>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
            <a href="#" className="hover:text-primary transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
