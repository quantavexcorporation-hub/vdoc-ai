import { ExperienceRail, type RailItem } from '@/components/home/experience-rail'

const trending: RailItem[] = [
  { id: 't1', title: 'Neon Tribunal', meta: 'Trending · Movie', hue: 295, href: '/universe?c=movies' },
  { id: 't2', title: 'Glass Empire', meta: 'Trending · Game', hue: 200, href: '/universe?c=games' },
  { id: 't3', title: 'The Listening Forest', meta: 'Trending · Story', hue: 155, href: '/universe?c=stories' },
  { id: 't4', title: 'Orbital Quiet', meta: 'Trending · Universe', hue: 255, href: '/universe?c=worlds' },
  { id: 't5', title: 'Night Circuit', meta: 'Trending · Novel', hue: 18, href: '/universe?c=novels' },
]

const movies: RailItem[] = [
  { id: 'm1', title: 'Afterlight', meta: 'AI Movie · 118 min', hue: 280, href: '/universe?c=movies' },
  { id: 'm2', title: 'Static Bloom', meta: 'AI Movie · Interactive', hue: 320, href: '/universe?c=movies' },
  { id: 'm3', title: 'Harbor Protocol', meta: 'AI Movie · Choice cut', hue: 210, href: '/universe?c=movies' },
  { id: 'm4', title: 'Soft Apocalypse', meta: 'AI Movie · Premiere', hue: 25, href: '/universe?c=movies' },
]

const games: RailItem[] = [
  { id: 'g1', title: 'Driftline Arena', meta: 'AI Game · Multiplayer', hue: 250, href: '/universe?c=games' },
  { id: 'g2', title: 'Echo Heist', meta: 'AI Game · Stealth', hue: 190, href: '/universe?c=games' },
  { id: 'g3', title: 'Lumen Run', meta: 'AI Game · Co-op', hue: 75, href: '/universe?c=games' },
  { id: 'g4', title: 'Null Garden', meta: 'AI Game · Exploration', hue: 145, href: '/universe?c=games' },
]

const stories: RailItem[] = [
  { id: 's1', title: 'Doors Without Names', meta: 'Interactive Story', hue: 270, href: '/universe?c=stories' },
  { id: 's2', title: 'Letters from Tomorrow', meta: 'Branching · Romance', hue: 350, href: '/universe?c=stories' },
  { id: 's3', title: 'The Last Broadcast', meta: 'Interactive · Thriller', hue: 30, href: '/universe?c=stories' },
  { id: 's4', title: 'Whisper Protocol', meta: 'Story · Live choices', hue: 220, href: '/universe?c=stories' },
]

const continueWatching: RailItem[] = [
  { id: 'c1', title: 'Rain District — Ch. 7', meta: 'Continue · 62%', progress: 62, hue: 200, href: '/universe?c=stories' },
  { id: 'c2', title: 'Afterlight', meta: 'Continue · 28%', progress: 28, hue: 280, href: '/universe?c=movies' },
  { id: 'c3', title: 'Null Garden', meta: 'Continue · 81%', progress: 81, hue: 145, href: '/universe?c=games' },
]

const forYou: RailItem[] = [
  { id: 'f1', title: 'Your Midnight Cut', meta: 'Generated for you', hue: 255, href: '/converse' },
  { id: 'f2', title: 'Companion Route B', meta: 'Personal thread', hue: 310, href: '/converse' },
  { id: 'f3', title: 'City That Remembers You', meta: 'Adaptive world', hue: 205, href: '/universe?c=worlds' },
  { id: 'f4', title: 'Harbor Desk', meta: 'Mood match', hue: 18, href: '/universe?c=novels' },
]

const recent: RailItem[] = [
  { id: 'r1', title: 'Pale Constellation', meta: 'Created 2h ago', hue: 265, href: '/universe?c=worlds' },
  { id: 'r2', title: 'Studio Seven', meta: 'Created 5h ago', hue: 18, href: '/universe?c=novels' },
  { id: 'r3', title: 'Ash & Aurora', meta: 'Created today', hue: 40, href: '/universe?c=movies' },
  { id: 'r4', title: 'Mirror Market', meta: 'Created yesterday', hue: 185, href: '/universe?c=games' },
]

const teaserTrailer: RailItem[] = [
  { id: 'tt1', title: 'Neo Harbor — Official Trailer', meta: 'Trailer · Favourite', hue: 210, href: '/converse' },
  { id: 'tt2', title: 'Rain District — Season Teaser', meta: 'Teaser · Series', hue: 200, href: '/converse' },
  { id: 'tt3', title: 'Afterlight — Final Trailer', meta: 'Trailer · Movie', hue: 280, href: '/universe?c=movies' },
  { id: 'tt4', title: 'Null Garden — World Teaser', meta: 'Teaser · Game', hue: 145, href: '/universe?c=games' },
]

export function HomeRails() {
  return (
    <>
      <ExperienceRail
        id="trending"
        eyebrow="Trending"
        title="AI experiences rising now"
        items={trending}
      />
      <ExperienceRail id="movies" eyebrow="Cinema" title="AI Movies" items={movies} />
      <ExperienceRail id="games" eyebrow="Play" title="AI Games" items={games} />
      <ExperienceRail
        id="stories"
        eyebrow="Narrative"
        title="Interactive Stories"
        items={stories}
      />
      <ExperienceRail
        id="continue"
        eyebrow="Resume"
        title="Continue watching"
        items={continueWatching}
      />
      <ExperienceRail
        id="for-you"
        eyebrow="Personal"
        title="Picked for this floor"
        items={forYou}
      />
      <ExperienceRail
        id="recent"
        eyebrow="Fresh"
        title="Just release"
        items={recent}
      />
      <ExperienceRail
        id="teaser-trailer"
        eyebrow="Preview"
        title="Teaser & Trailer"
        items={teaserTrailer}
      />
    </>
  )
}
