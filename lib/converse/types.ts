export type MessageRole = 'user' | 'assistant' | 'system'

export type MediaKind = 'image' | 'video' | 'movie'

export type Attachment = {
  id: string
  name: string
  type: string
  size: number
  url: string
}

export type MediaPayload = {
  kind: MediaKind
  title: string
  prompt: string
  /** CSS gradient / procedural visual seed */
  seed: string
  durationLabel?: string
  scenes?: { title: string; description: string }[]
}

export type StoryChoice = {
  id: string
  label: string
  next: string
}

export type StoryNode = {
  id: string
  text: string
  choices?: StoryChoice[]
}

export type StoryPayload = {
  title: string
  nodes: Record<string, StoryNode>
  startId: string
}

export type MessageVersion = {
  id: string
  content: string
  createdAt: number
  media?: MediaPayload
  story?: StoryPayload
}

export type Message = {
  id: string
  role: MessageRole
  content: string
  createdAt: number
  parentId: string | null
  /** Sibling branch index among children of parent */
  branchIndex?: number
  streaming?: boolean
  attachments?: Attachment[]
  media?: MediaPayload
  story?: StoryPayload
  /** Edited / regenerated versions of this message */
  versions: MessageVersion[]
  activeVersion: number
  error?: string
}

export type Conversation = {
  id: string
  title: string
  folderId: string | null
  pinned: boolean
  favorited: boolean
  createdAt: number
  updatedAt: number
  /** Root message ids (usually one user message start) */
  rootIds: string[]
  /** Currently viewed leaf path tip */
  activeLeafId: string | null
  messages: Record<string, Message>
}

export type Folder = {
  id: string
  name: string
  createdAt: number
}

export type MemoryItem = {
  id: string
  content: string
  source: 'explicit' | 'inferred'
  createdAt: number
  tags: string[]
}

export type ConverseState = {
  conversations: Record<string, Conversation>
  folders: Folder[]
  memory: MemoryItem[]
  activeConversationId: string | null
  searchQuery: string
  sidebarOpen: boolean
  memoryOpen: boolean
  voiceActive: boolean
}

export type GenerationMode =
  | 'chat'
  | 'image'
  | 'video'
  | 'movie'
  | 'story'
  | 'code'
