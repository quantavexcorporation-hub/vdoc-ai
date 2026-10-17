import { BrandLogo } from '@/components/brand/logo'

export function HomeFooter() {
  return (
    <footer className="vdoc-safe-x relative border-t border-white/[0.06] px-3 py-8 sm:px-6 sm:py-10 md:px-10">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-5 sm:gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <BrandLogo size="sm" />
          <div>
            <p className="text-sm text-white/40">AI native entertainment OS</p>
            <p className="mt-0.5 font-mono text-[9px] tracking-[0.16em] text-white/22">
              AI ENGINE · DATA LAYER
            </p>
          </div>
        </div>
        <nav
          className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-white/40 sm:gap-x-5"
          aria-label="Footer"
        >
          <a href="#trending" className="min-h-10 inline-flex items-center transition-colors hover:text-white/80">
            Trending
          </a>
          <a href="/universe?c=movies" className="min-h-10 inline-flex items-center transition-colors hover:text-white/80">
            Movies
          </a>
          <a href="/economy" className="min-h-10 inline-flex items-center transition-colors hover:text-white/80">
            Virtual Universe
          </a>
          <a href="/live" className="min-h-10 inline-flex items-center transition-colors hover:text-white/80">
            Vyra
          </a>
          <a href="/universe" className="min-h-10 inline-flex items-center transition-colors hover:text-white/80">
            Universe
          </a>
        </nav>
        <p className="text-xs text-white/25">© {new Date().getFullYear()} vdoc</p>
      </div>
    </footer>
  )
}
