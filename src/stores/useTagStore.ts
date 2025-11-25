import { create } from 'zustand'
import type { Tag } from '@/types'

interface TagStore {
  tags: Tag[]
  selectedTag: Tag | null
  searchQuery: string
  categoryFilter: string | null

  // Actions
  setTags: (tags: Tag[]) => void
  setSelectedTag: (tag: Tag | null) => void
  setSearchQuery: (query: string) => void
  setCategoryFilter: (category: string | null) => void
  getFilteredTags: () => Tag[]
}

export const useTagStore = create<TagStore>((set, get) => ({
  tags: [],
  selectedTag: null,
  searchQuery: '',
  categoryFilter: null,

  setTags: (tags) => set({ tags }),

  setSelectedTag: (tag) => set({ selectedTag: tag }),

  setSearchQuery: (query) => set({ searchQuery: query }),

  setCategoryFilter: (category) => set({ categoryFilter: category }),

  getFilteredTags: () => {
    const { tags, searchQuery, categoryFilter } = get()

    let filtered = tags

    // Filter by category
    if (categoryFilter) {
      filtered = filtered.filter(tag => tag.category === categoryFilter)
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(tag =>
        tag.name.toLowerCase().includes(query) ||
        tag.description.toLowerCase().includes(query) ||
        tag.synonyms?.some(s => s.toLowerCase().includes(query))
      )
    }

    return filtered
  }
}))
