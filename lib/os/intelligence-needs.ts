/**
 * Audience intelligence — burning entertainment problems never solved by catalogs.
 */

export type IntelNeed = {
  id: string
  pain: string
  neverSolved: string
  name: string
  badge: string
  solve: string
  outcome: string
  prompt: string
}

export const INTEL_NEEDS: IntelNeed[] = [
  {
    id: 'top-rated',
    pain: 'Endless options. Mixed reviews. You burn an evening on something average and feel robbed.',
    neverSolved: 'Ratings are noisy, global, and not ranked for “only spend time on the best.”',
    name: 'Top Rated Only',
    badge: 'PEAK',
    solve: 'Surface peak-rated titles and cuts — ranked so you watch high-signal content, not filler.',
    outcome: 'Spend time only on what’s truly rated worth it.',
    prompt: 'Show me only top-rated content for tonight — highest rated, no time-wasters, peak quality only.',
  },
  {
    id: 'continue-watch',
    pain: 'You started something good, left it, and now hunting the thread feels harder than starting over.',
    neverSolved: 'Resume lists show titles — they don’t pull you back into watching with clarity and momentum.',
    name: 'Continue Watching',
    badge: 'RESUME',
    solve: 'Pick up exactly where you left — next scene, next episode, next beat — one tap back into the watch.',
    outcome: 'Keep going instead of restarting or abandoning.',
    prompt: 'Continue watching where I left off — resume my last title and get me back into it now.',
  },
  {
    id: 'unfinished',
    pain: 'A graveyard of half-watched titles. Guilt, noise, and decision debt every time you open the app.',
    neverSolved: 'Queues grew; nobody helped you release, finish, or transform unfinished weight.',
    name: 'Unfinished',
    badge: 'CLEAR',
    solve: 'Triage the pile: finish, soft-close, archive, or transmute into something lighter.',
    outcome: 'A clean slate — without pretending you failed.',
    prompt: 'Help me clear my unfinished list without guilt — what to finish, close, or let go.',
  },
  {
    id: 'favourite-upcoming',
    pain: 'You already love certain worlds and creators — but upcoming drops for *your* favourites get buried in general noise.',
    neverSolved: 'Coming-soon boards are global, not tuned to what you already care about.',
    name: 'Favourite Upcoming',
    badge: 'SOON',
    solve: 'Surface only upcoming releases tied to your favourites — titles, seasons, and worlds you already follow.',
    outcome: 'Never miss what you were waiting for.',
    prompt: 'Show my favourite upcoming releases — only what matches titles and worlds I already love.',
  },
  {
    id: 'mood-match',
    pain: 'You open the app with a feeling — restless, hollow, wired — and the catalog only offers genres.',
    neverSolved: 'Entertainment never mapped mood → experience. It mapped shelves.',
    name: 'Mood Match',
    badge: 'FEEL',
    solve: 'Speak or tap how you feel. Intelligence routes a fit — not a genre aisle.',
    outcome: 'Stop scrolling. Start feeling the right thing.',
    prompt: 'I feel restless and a little hollow — match me something that fits that mood tonight.',
  },
  {
    id: 'evening-intent',
    pain: 'You wanted one intentional night. You got forty minutes of deciding and a doomscroll.',
    neverSolved: 'Platforms optimize for session time, not for a night well spent.',
    name: 'Evening Intent',
    badge: 'NIGHT',
    solve: 'Design one arc for tonight: duration, intensity, ending — then protect it.',
    outcome: 'A complete evening instead of a drained one.',
    prompt: 'Design one intentional evening for me: 90 minutes, emotional, clean ending — no doomscroll.',
  },
]
