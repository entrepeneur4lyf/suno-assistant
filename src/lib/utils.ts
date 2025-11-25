// Utility functions

/**
 * Generate a unique ID
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

/**
 * Format a date for display
 */
export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (err) {
    console.error('Failed to copy to clipboard:', err)
    return false
  }
}

/**
 * Simple syllable counter (heuristic)
 */
export function countSyllables(text: string): number {
  const word = text.toLowerCase().trim()
  if (word.length <= 3) return 1

  // Remove silent 'e' at the end
  const cleanWord = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '')

  // Count vowel groups
  const matches = cleanWord.match(/[aeiouy]{1,2}/g)
  return matches ? matches.length : 1
}

/**
 * Count syllables in a line of text
 */
export function countLineSyllables(line: string): number {
  const words = line.split(/\s+/).filter(w => w.length > 0)
  return words.reduce((sum, word) => sum + countSyllables(word), 0)
}
