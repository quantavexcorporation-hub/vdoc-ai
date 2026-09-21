'use client'

import * as React from 'react'
import type {
  Attachment,
  Conversation,
  ConverseState,
  Folder,
  MemoryItem,
  Message,
  MessageVersion,
} from './types'
import {
  buildMedia,
  buildResponse,
  buildStory,
  detectMode,
  inferMemory,
  streamText,
  SUGGESTIONS,
} from './ai'

const STORAGE_KEY = 'vdoc-converse-v1'

function uid(prefix = 'id') {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}-${Date.now().toString(36)}`
}

function emptyConversation(): Conversation {
  const id = uid('c')
  const now = Date.now()
  return {
    id,
    title: 'New conversation',
    folderId: null,
    pinned: false,
    favorited: false,
    createdAt: now,
    updatedAt: now,
    rootIds: [],
    activeLeafId: null,
    messages: {},
  }
}

function loadState(): ConverseState {
  if (typeof window === 'undefined') return defaultState()
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultState()
    const parsed = { ...defaultState(), ...JSON.parse(raw) } as ConverseState
    const conversations: ConverseState['conversations'] = {}
    for (const [id, c] of Object.entries(parsed.conversations ?? {})) {
      conversations[id] = { ...c, favorited: c.favorited ?? false, pinned: c.pinned ?? false }
    }
    return { ...parsed, conversations }
  } catch {
    return defaultState()
  }
}

function defaultState(): ConverseState {
  const c = emptyConversation()
  return {
    conversations: { [c.id]: c },
    folders: [
      { id: 'folder-work', name: 'Work', createdAt: Date.now() },
      { id: 'folder-play', name: 'Play', createdAt: Date.now() },
    ],
    memory: [],
    activeConversationId: c.id,
    searchQuery: '',
    sidebarOpen: false,
    memoryOpen: false,
    voiceActive: false,
  }
}

type Action =
  | { type: 'HYDRATE'; state: ConverseState }
  | { type: 'SET_SEARCH'; query: string }
  | { type: 'TOGGLE_SIDEBAR' }
  | { type: 'TOGGLE_MEMORY' }
  | { type: 'SET_VOICE'; active: boolean }
  | { type: 'NEW_CHAT' }
  | { type: 'SELECT_CHAT'; id: string }
  | { type: 'PIN_CHAT'; id: string }
  | { type: 'FAVORITE_CHAT'; id: string }
  | { type: 'DELETE_CHAT'; id: string }
  | { type: 'RENAME_CHAT'; id: string; title: string }
  | { type: 'MOVE_TO_FOLDER'; id: string; folderId: string | null }
  | { type: 'ADD_FOLDER'; name: string }
  | { type: 'DELETE_FOLDER'; id: string }
  | { type: 'ADD_MEMORY'; item: MemoryItem }
  | { type: 'REMOVE_MEMORY'; id: string }
  | { type: 'UPSERT_MESSAGE'; conversationId: string; message: Message }
  | { type: 'PATCH_MESSAGE'; conversationId: string; messageId: string; patch: Partial<Message> }
  | { type: 'SET_LEAF'; conversationId: string; leafId: string }
  | { type: 'SET_ACTIVE_VERSION'; conversationId: string; messageId: string; index: number }
  | { type: 'TOUCH_CONVERSATION'; conversationId: string; title?: string; rootId?: string }

function reducer(state: ConverseState, action: Action): ConverseState {
  switch (action.type) {
    case 'HYDRATE':
      return action.state
    case 'SET_SEARCH':
      return { ...state, searchQuery: action.query }
    case 'TOGGLE_SIDEBAR':
      return { ...state, sidebarOpen: !state.sidebarOpen }
    case 'TOGGLE_MEMORY':
      return { ...state, memoryOpen: !state.memoryOpen }
    case 'SET_VOICE':
      return { ...state, voiceActive: action.active }
    case 'NEW_CHAT': {
      const c = emptyConversation()
      return {
        ...state,
        conversations: { ...state.conversations, [c.id]: c },
        activeConversationId: c.id,
      }
    }
    case 'SELECT_CHAT':
      return { ...state, activeConversationId: action.id }
    case 'PIN_CHAT': {
      const c = state.conversations[action.id]
      if (!c) return state
      return {
        ...state,
        conversations: {
          ...state.conversations,
          [action.id]: { ...c, pinned: !c.pinned, updatedAt: Date.now() },
        },
      }
    }
    case 'FAVORITE_CHAT': {
      const c = state.conversations[action.id]
      if (!c) return state
      return {
        ...state,
        conversations: {
          ...state.conversations,
          [action.id]: {
            ...c,
            favorited: !c.favorited,
            updatedAt: Date.now(),
          },
        },
      }
    }
    case 'DELETE_CHAT': {
      const next = { ...state.conversations }
      delete next[action.id]
      const ids = Object.keys(next)
      let active = state.activeConversationId
      if (active === action.id) {
        if (ids.length === 0) {
          const c = emptyConversation()
          next[c.id] = c
          active = c.id
        } else {
          active = ids[0]
        }
      }
      return { ...state, conversations: next, activeConversationId: active }
    }
    case 'RENAME_CHAT': {
      const c = state.conversations[action.id]
      if (!c) return state
      return {
        ...state,
        conversations: {
          ...state.conversations,
          [action.id]: { ...c, title: action.title, updatedAt: Date.now() },
        },
      }
    }
    case 'MOVE_TO_FOLDER': {
      const c = state.conversations[action.id]
      if (!c) return state
      return {
        ...state,
        conversations: {
          ...state.conversations,
          [action.id]: { ...c, folderId: action.folderId, updatedAt: Date.now() },
        },
      }
    }
    case 'ADD_FOLDER': {
      const f: Folder = { id: uid('folder'), name: action.name, createdAt: Date.now() }
      return { ...state, folders: [...state.folders, f] }
    }
    case 'DELETE_FOLDER': {
      const conversations = { ...state.conversations }
      for (const id of Object.keys(conversations)) {
        if (conversations[id].folderId === action.id) {
          conversations[id] = { ...conversations[id], folderId: null }
        }
      }
      return {
        ...state,
        folders: state.folders.filter((f) => f.id !== action.id),
        conversations,
      }
    }
    case 'ADD_MEMORY':
      return { ...state, memory: [action.item, ...state.memory].slice(0, 40) }
    case 'REMOVE_MEMORY':
      return { ...state, memory: state.memory.filter((m) => m.id !== action.id) }
    case 'UPSERT_MESSAGE': {
      const c = state.conversations[action.conversationId]
      if (!c) return state
      return {
        ...state,
        conversations: {
          ...state.conversations,
          [action.conversationId]: {
            ...c,
            messages: { ...c.messages, [action.message.id]: action.message },
            updatedAt: Date.now(),
          },
        },
      }
    }
    case 'PATCH_MESSAGE': {
      const c = state.conversations[action.conversationId]
      if (!c) return state
      const m = c.messages[action.messageId]
      if (!m) return state
      return {
        ...state,
        conversations: {
          ...state.conversations,
          [action.conversationId]: {
            ...c,
            messages: {
              ...c.messages,
              [action.messageId]: { ...m, ...action.patch },
            },
            updatedAt: Date.now(),
          },
        },
      }
    }
    case 'SET_LEAF': {
      const c = state.conversations[action.conversationId]
      if (!c) return state
      return {
        ...state,
        conversations: {
          ...state.conversations,
          [action.conversationId]: { ...c, activeLeafId: action.leafId },
        },
      }
    }
    case 'SET_ACTIVE_VERSION': {
      const c = state.conversations[action.conversationId]
      if (!c) return state
      const m = c.messages[action.messageId]
      if (!m || !m.versions[action.index]) return state
      const v = m.versions[action.index]
      return {
        ...state,
        conversations: {
          ...state.conversations,
          [action.conversationId]: {
            ...c,
            messages: {
              ...c.messages,
              [action.messageId]: {
                ...m,
                activeVersion: action.index,
                content: v.content,
                media: v.media,
                story: v.story,
              },
            },
          },
        },
      }
    }
    case 'TOUCH_CONVERSATION': {
      const c = state.conversations[action.conversationId]
      if (!c) return state
      const rootIds =
        action.rootId && !c.rootIds.includes(action.rootId)
          ? [...c.rootIds, action.rootId]
          : c.rootIds
      return {
        ...state,
        conversations: {
          ...state.conversations,
          [action.conversationId]: {
            ...c,
            title: action.title ?? c.title,
            updatedAt: Date.now(),
            rootIds,
            activeLeafId: action.rootId ?? c.activeLeafId,
          },
        },
      }
    }
    default:
      return state
  }
}

type ConverseContextValue = {
  state: ConverseState
  dispatch: React.Dispatch<Action>
  active: Conversation | null
  path: Message[]
  suggestions: string[]
  send: (text: string, opts?: { attachments?: Attachment[]; parentId?: string | null; editOf?: string }) => Promise<void>
  retry: (assistantId: string) => Promise<void>
  editAndResend: (userMessageId: string, newText: string) => Promise<void>
  navigateBranch: (messageId: string, direction: -1 | 1) => void
  abortRef: React.MutableRefObject<AbortController | null>
}

const ConverseContext = React.createContext<ConverseContextValue | null>(null)

export function ConverseProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = React.useReducer(reducer, undefined, defaultState)
  const [hydrated, setHydrated] = React.useState(false)
  const abortRef = React.useRef<AbortController | null>(null)

  React.useEffect(() => {
    dispatch({ type: 'HYDRATE', state: loadState() })
    setHydrated(true)
  }, [])

  React.useEffect(() => {
    if (!hydrated) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      /* quota */
    }
  }, [state, hydrated])

  const active = state.activeConversationId
    ? state.conversations[state.activeConversationId] ?? null
    : null

  const path = React.useMemo(() => {
    if (!active?.activeLeafId) return [] as Message[]
    const chain: Message[] = []
    let cur: string | null = active.activeLeafId
    const guard = new Set<string>()
    while (cur && !guard.has(cur)) {
      guard.add(cur)
      const msg: Message | undefined = active.messages[cur]
      if (!msg) break
      chain.unshift(msg)
      cur = msg.parentId
    }
    return chain
  }, [active])

  const runAssistant = React.useCallback(
    async (
      conversationId: string,
      userMessage: Message,
      assistantId: string
    ) => {
      abortRef.current?.abort()
      const controller = new AbortController()
      abortRef.current = controller

      const mode = detectMode(userMessage.content)
      const inferred = inferMemory(userMessage.content)
      if (inferred) dispatch({ type: 'ADD_MEMORY', item: inferred })

      const memorySnapshot = inferred
        ? [inferred, ...state.memory]
        : state.memory

      const text = buildResponse(userMessage.content, memorySnapshot, mode)
      const media =
        mode === 'image' || mode === 'video' || mode === 'movie'
          ? buildMedia(mode, userMessage.content)
          : undefined
      const story = mode === 'story' ? buildStory(userMessage.content) : undefined

      const version: MessageVersion = {
        id: uid('ver'),
        content: '',
        createdAt: Date.now(),
        media,
        story,
      }

      dispatch({
        type: 'UPSERT_MESSAGE',
        conversationId,
        message: {
          id: assistantId,
          role: 'assistant',
          content: '',
          createdAt: Date.now(),
          parentId: userMessage.id,
          streaming: true,
          media,
          story,
          versions: [version],
          activeVersion: 0,
        },
      })
      dispatch({ type: 'SET_LEAF', conversationId, leafId: assistantId })

      let accumulated = ''
      await streamText(text, {
        signal: controller.signal,
        onToken: (token) => {
          accumulated += token
          dispatch({
            type: 'PATCH_MESSAGE',
            conversationId,
            messageId: assistantId,
            patch: { content: accumulated },
          })
        },
        onDone: () => {
          dispatch({
            type: 'PATCH_MESSAGE',
            conversationId,
            messageId: assistantId,
            patch: {
              streaming: false,
              content: accumulated,
              versions: [{ ...version, content: accumulated }],
            },
          })
        },
      })
      if (controller.signal.aborted) {
        dispatch({
          type: 'PATCH_MESSAGE',
          conversationId,
          messageId: assistantId,
          patch: {
            streaming: false,
            content: accumulated || '—',
            versions: [{ ...version, content: accumulated || '—' }],
          },
        })
      }
    },
    [state.memory]
  )

  const send = React.useCallback(
    async (
      text: string,
      opts?: { attachments?: Attachment[]; parentId?: string | null; editOf?: string }
    ) => {
      const conversationId = state.activeConversationId
      if (!conversationId) return
      const conversation = state.conversations[conversationId]
      if (!conversation) return

      const parentId =
        opts?.parentId !== undefined
          ? opts.parentId
          : conversation.activeLeafId

      const userId = uid('u')
      const userMessage: Message = {
        id: userId,
        role: 'user',
        content: text.trim(),
        createdAt: Date.now(),
        parentId,
        attachments: opts?.attachments,
        versions: [
          {
            id: uid('ver'),
            content: text.trim(),
            createdAt: Date.now(),
          },
        ],
        activeVersion: 0,
      }

      const isRoot = parentId === null || conversation.rootIds.length === 0
      const title =
        conversation.rootIds.length === 0
          ? text.trim().slice(0, 48) || 'New conversation'
          : conversation.title

      dispatch({
        type: 'UPSERT_MESSAGE',
        conversationId,
        message: userMessage,
      })
      dispatch({
        type: 'TOUCH_CONVERSATION',
        conversationId,
        title,
        rootId: isRoot ? userId : undefined,
      })
      dispatch({ type: 'SET_LEAF', conversationId, leafId: userId })

      const assistantId = uid('a')
      await runAssistant(conversationId, userMessage, assistantId)
    },
    [state, runAssistant]
  )

  const retry = React.useCallback(
    async (assistantId: string) => {
      const conversationId = state.activeConversationId
      if (!conversationId) return
      const conversation = state.conversations[conversationId]
      if (!conversation) return
      const assistant = conversation.messages[assistantId]
      if (!assistant || assistant.role !== 'assistant' || !assistant.parentId) return
      const userMessage = conversation.messages[assistant.parentId]
      if (!userMessage) return

      abortRef.current?.abort()
      const controller = new AbortController()
      abortRef.current = controller

      const mode = detectMode(userMessage.content)
      const text = buildResponse(userMessage.content, state.memory, mode)
      const media =
        mode === 'image' || mode === 'video' || mode === 'movie'
          ? buildMedia(mode, userMessage.content + ' v' + (assistant.versions.length + 1))
          : undefined
      const story = mode === 'story' ? buildStory(userMessage.content) : undefined

      dispatch({
        type: 'PATCH_MESSAGE',
        conversationId,
        messageId: assistantId,
        patch: { streaming: true, content: '', media, story, error: undefined },
      })

      let accumulated = ''
      await streamText(text, {
        signal: controller.signal,
        onToken: (token) => {
          accumulated += token
          dispatch({
            type: 'PATCH_MESSAGE',
            conversationId,
            messageId: assistantId,
            patch: { content: accumulated },
          })
        },
        onDone: () => {
          const newVersion: MessageVersion = {
            id: uid('ver'),
            content: accumulated,
            createdAt: Date.now(),
            media,
            story,
          }
          const versions = [...assistant.versions, newVersion]
          dispatch({
            type: 'PATCH_MESSAGE',
            conversationId,
            messageId: assistantId,
            patch: {
              streaming: false,
              content: accumulated,
              media,
              story,
              versions,
              activeVersion: versions.length - 1,
            },
          })
        },
      })
    },
    [state]
  )

  const editAndResend = React.useCallback(
    async (userMessageId: string, newText: string) => {
      const conversationId = state.activeConversationId
      if (!conversationId) return
      const conversation = state.conversations[conversationId]
      if (!conversation) return
      const original = conversation.messages[userMessageId]
      if (!original) return

      // Branch: new user message as sibling under same parent
      await send(newText, {
        parentId: original.parentId,
        attachments: original.attachments,
      })
    },
    [state, send]
  )

  const navigateBranch = React.useCallback(
    (messageId: string, direction: -1 | 1) => {
      if (!active) return
      const msg = active.messages[messageId]
      if (!msg) return
      const siblings = Object.values(active.messages)
        .filter((m) => m.parentId === msg.parentId && m.role === msg.role)
        .sort((a, b) => a.createdAt - b.createdAt)
      const idx = siblings.findIndex((s) => s.id === messageId)
      const next = siblings[idx + direction]
      if (!next) return

      // Find leaf under this branch
      let leaf = next.id
      let safety = 0
      while (safety++ < 100) {
        const child = Object.values(active.messages)
          .filter((m) => m.parentId === leaf)
          .sort((a, b) => b.createdAt - a.createdAt)[0]
        if (!child) break
        leaf = child.id
      }
      dispatch({ type: 'SET_LEAF', conversationId: active.id, leafId: leaf })
    },
    [active]
  )

  const value: ConverseContextValue = {
    state,
    dispatch,
    active,
    path,
    suggestions: SUGGESTIONS,
    send,
    retry,
    editAndResend,
    navigateBranch,
    abortRef,
  }

  return (
    <ConverseContext.Provider value={value}>{children}</ConverseContext.Provider>
  )
}

export function useConverse() {
  const ctx = React.useContext(ConverseContext)
  if (!ctx) throw new Error('useConverse must be used within ConverseProvider')
  return ctx
}

export function getBranchMeta(
  conversation: Conversation,
  message: Message
): { index: number; total: number } {
  const siblings = Object.values(conversation.messages)
    .filter((m) => m.parentId === message.parentId && m.role === message.role)
    .sort((a, b) => a.createdAt - b.createdAt)
  const index = Math.max(0, siblings.findIndex((s) => s.id === message.id))
  return { index: index + 1, total: siblings.length }
}
