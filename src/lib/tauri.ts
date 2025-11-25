// Tauri API wrappers for type safety
import { invoke } from '@tauri-apps/api/core'
import type { Tag, Prompt } from '@/types'

export async function greet(name: string): Promise<string> {
  return await invoke('greet', { name })
}

export async function getTags(): Promise<Tag[]> {
  return await invoke('get_tags')
}

export async function savePrompt(prompt: Prompt): Promise<string> {
  return await invoke('save_prompt', { prompt })
}

export async function loadPrompt(id: string): Promise<Prompt> {
  return await invoke('load_prompt', { id })
}
