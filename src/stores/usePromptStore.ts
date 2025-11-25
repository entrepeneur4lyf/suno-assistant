import { create } from 'zustand'
import type { Prompt } from '@/types'
import { generateId } from '@/lib/utils'

interface PromptStore {
  currentPrompt: Prompt | null
  savedPrompts: Prompt[]

  // Actions
  setCurrentPrompt: (prompt: Prompt) => void
  updateStyle: (style: string) => void
  updateLyrics: (lyrics: string) => void
  addTag: (tagId: string) => void
  removeTag: (tagId: string) => void
  saveCurrentPrompt: () => void
  loadPrompt: (id: string) => void
  createNewPrompt: () => void
}

export const usePromptStore = create<PromptStore>((set, get) => ({
  currentPrompt: null,
  savedPrompts: [],

  setCurrentPrompt: (prompt) => set({ currentPrompt: prompt }),

  updateStyle: (style) => set((state) => ({
    currentPrompt: state.currentPrompt
      ? { ...state.currentPrompt, style, updatedAt: new Date().toISOString() }
      : null
  })),

  updateLyrics: (lyrics) => set((state) => ({
    currentPrompt: state.currentPrompt
      ? { ...state.currentPrompt, lyrics, updatedAt: new Date().toISOString() }
      : null
  })),

  addTag: (tagId) => set((state) => {
    if (!state.currentPrompt) return state
    if (state.currentPrompt.tags.includes(tagId)) return state

    return {
      currentPrompt: {
        ...state.currentPrompt,
        tags: [...state.currentPrompt.tags, tagId],
        updatedAt: new Date().toISOString()
      }
    }
  }),

  removeTag: (tagId) => set((state) => ({
    currentPrompt: state.currentPrompt
      ? {
          ...state.currentPrompt,
          tags: state.currentPrompt.tags.filter(id => id !== tagId),
          updatedAt: new Date().toISOString()
        }
      : null
  })),

  saveCurrentPrompt: () => set((state) => {
    if (!state.currentPrompt) return state

    const existingIndex = state.savedPrompts.findIndex(p => p.id === state.currentPrompt!.id)
    const updated = { ...state.currentPrompt, updatedAt: new Date().toISOString() }

    if (existingIndex >= 0) {
      const newSaved = [...state.savedPrompts]
      newSaved[existingIndex] = updated
      return { savedPrompts: newSaved }
    } else {
      return { savedPrompts: [...state.savedPrompts, updated] }
    }
  }),

  loadPrompt: (id) => set((state) => {
    const prompt = state.savedPrompts.find(p => p.id === id)
    return prompt ? { currentPrompt: prompt } : state
  }),

  createNewPrompt: () => set({
    currentPrompt: {
      id: generateId(),
      name: 'Untitled Prompt',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      style: '',
      lyrics: '',
      tags: [],
      structure: {
        objective: '',
        voice: '',
        mood: ''
      }
    }
  })
}))
