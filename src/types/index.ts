// Type definitions for the Suno Prompt Architect

export enum TagCategory {
  Genre = 'genre',
  Mood = 'mood',
  Energy = 'energy',
  Instruments = 'instruments',
  Vocals = 'vocals',
  Structure = 'structure',
  Tempo = 'tempo',
  Production = 'production',
  FX = 'fx',
  Advanced = 'advanced'
}

export interface CoOccurrence {
  strong: string[];      // Tag IDs that pair well
  avoid: string[];       // Conflicting tag IDs
}

export interface TagMetadata {
  energy?: number;       // 1-10
  complexity?: number;   // 1-10
  era?: string;
  region?: string;
  [key: string]: any;
}

export interface Tag {
  id: string;
  name: string;
  category: string;
  description: string;
  usage: 'style' | 'lyrics' | 'both';
  synonyms?: string[];
  examples?: string[];
  co_occurrence?: CoOccurrence;
  metadata?: TagMetadata;
}

export interface PromptStructure {
  objective: string;
  voice: string;
  mood: string;
  tempo?: string;
  duration?: string;
}

export interface AdvancedParams {
  weirdness?: number;
  styleInfluence?: number;
  vocalGender?: 'male' | 'female' | 'neutral';
  excludeStyles?: string[];
}

export interface Prompt {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;

  // Core fields
  style: string;
  lyrics: string;

  // Structured data
  tags: string[];          // Tag IDs
  structure: PromptStructure;

  // Advanced params
  advanced?: AdvancedParams;

  // Metadata
  template?: boolean;
  favorite?: boolean;
  notes?: string;
}

export interface PromptScore {
  total: number;           // 0-100
  coverage: number;        // 0-100
  brevity: number;         // 0-100
  coherence: number;       // 0-100
  issues: string[];
  suggestions: string[];
}
