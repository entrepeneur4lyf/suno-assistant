#!/usr/bin/env node

/**
 * Build Tag Library Script
 *
 * This script merges style personality data with structured tag metadata
 * to create a comprehensive tag library for the Suno Prompt Architect app.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const STYLE_PERSONALITY_PATH = path.join(__dirname, '../src/assets/tags/style-personality.json');
const OUTPUT_PATH = path.join(__dirname, '../src/assets/tags/full-library.json');

// Category mappings based on tag type
const CATEGORY_MAP = {
  // Genres
  'pop': 'genre',
  'rock': 'genre',
  'rap': 'genre',
  'metal': 'genre',
  'electronic': 'genre',
  'hip hop': 'genre',
  'acoustic': 'genre',
  'jazz': 'genre',
  'funk': 'genre',
  'country': 'genre',
  'r&b': 'genre',
  'soul': 'genre',
  'blues': 'genre',
  'trap': 'genre',
  'ballad': 'genre',
  'indie': 'genre',
  'hard rock': 'genre',
  'synthwave': 'genre',
  'dance': 'genre',
  'heavy metal': 'genre',
  'lo-fi': 'genre',
  'techno': 'genre',
  'punk': 'genre',
  'reggae': 'genre',
  'alternative rock': 'genre',
  'emo': 'genre',
  'grunge': 'genre',
  'house': 'genre',
  'k-pop': 'genre',
  'dubstep': 'genre',
  'disco': 'genre',
  'experimental': 'genre',
  'progressive': 'genre',
  'nu metal': 'genre',
  'pop rock': 'genre',
  'swing': 'genre',
  'electro': 'genre',
  'drum and bass': 'genre',
  'trance': 'genre',
  'indie pop': 'genre',
  'gospel': 'genre',
  'industrial': 'genre',
  'electropop': 'genre',
  'phonk': 'genre',
  'math rock': 'genre',
  'mutation funk': 'genre',
  'bounce drop': 'genre',
  'j-pop': 'genre',
  'japanese': 'genre',
  'anime': 'genre',
  'cantonese': 'genre',
  'edm': 'genre',
  'ambient': 'genre',
  'folk': 'genre',
  'classical': 'genre',
  'opera': 'genre',

  // Moods & Energy
  'upbeat': 'mood',
  'melodic': 'mood',
  'dark': 'mood',
  'epic': 'mood',
  'emotional': 'mood',
  'aggressive': 'energy',
  'atmospheric': 'mood',
  'catchy': 'mood',
  'sad': 'mood',
  'dreamy': 'mood',
  'powerful': 'energy',
  'uplifting': 'mood',
  'chill': 'mood',
  'romantic': 'mood',
  'energetic': 'energy',
  'melancholic': 'mood',
  'intense': 'energy',
  'smooth': 'mood',
  'psychedelic': 'mood',
  'mellow': 'mood',
  'groovy': 'mood',
  'anthemic': 'mood',
  'cinematic': 'mood',
  'heartfelt': 'mood',
  'ethereal': 'mood',
  'dramatic': 'mood',
  'deep': 'mood',
  'futuristic': 'mood',

  // Vocals
  'male voice': 'vocals',
  'female voice': 'vocals',
  'male vocals': 'vocals',
  'female vocals': 'vocals',
  'female singer': 'vocals',
  'vocaloid': 'vocals',

  // Tempo
  'slow': 'tempo',
  'fast': 'tempo',

  // Era
  '80s': 'era',
  '90s': 'era',

  // Instruments
  'piano': 'instruments',
  'guitar': 'instruments',
  'bass': 'instruments',
  'drum': 'instruments',
  'synth': 'instruments',
  'orchestral': 'instruments',
  'violin': 'instruments',
  'electric guitar': 'instruments',
  'acoustic guitar': 'instruments',
  'flute': 'instruments',
  'beat': 'instruments',
};

// Usage type based on category
const USAGE_MAP = {
  'genre': 'style',
  'mood': 'both',
  'energy': 'both',
  'vocals': 'both',
  'tempo': 'style',
  'era': 'style',
  'instruments': 'style',
  'production': 'style',
  'structure': 'lyrics',
};

// Manual co-occurrence rules (can be expanded)
const CO_OCCURRENCE = {
  'pop': {
    strong: ['upbeat', 'catchy', 'melodic', 'synth', 'female voice'],
    avoid: ['harsh', 'experimental', 'dark']
  },
  'rock': {
    strong: ['guitar', 'electric guitar', 'energetic', 'powerful', 'male voice'],
    avoid: ['electronic', 'synth', 'soft']
  },
  'metal': {
    strong: ['aggressive', 'powerful', 'distortion', 'electric guitar', 'intense'],
    avoid: ['soft', 'calm', 'acoustic']
  },
  'electronic': {
    strong: ['synth', 'edm', 'dance', 'futuristic', 'beat'],
    avoid: ['acoustic', 'organic']
  },
  'acoustic': {
    strong: ['acoustic guitar', 'intimate', 'organic', 'folk'],
    avoid: ['electronic', 'synth', 'distortion']
  },
  'upbeat': {
    strong: ['energetic', 'fast', 'positive', 'happy'],
    avoid: ['sad', 'melancholic', 'dark', 'slow']
  },
  'sad': {
    strong: ['melancholic', 'slow', 'emotional', 'ballad'],
    avoid: ['upbeat', 'energetic', 'happy']
  },
  'aggressive': {
    strong: ['intense', 'powerful', 'metal', 'nu metal'],
    avoid: ['calm', 'soft', 'gentle']
  },
  'chill': {
    strong: ['mellow', 'lo-fi', 'ambient', 'smooth'],
    avoid: ['aggressive', 'intense', 'fast']
  }
};

function buildTagLibrary() {
  console.log('Building comprehensive tag library...\n');

  // Load style personality data
  const styleData = JSON.parse(fs.readFileSync(STYLE_PERSONALITY_PATH, 'utf8'));

  const tags = [];
  let tagCount = 0;

  // Process each tag from style personality
  for (const [tagName, personality] of Object.entries(styleData.tags)) {
    const tagId = tagName.toLowerCase().replace(/\s+/g, '-');
    const category = CATEGORY_MAP[tagName] || 'other';
    const usage = USAGE_MAP[category] || 'style';

    // Build description from personality data
    let description = '';
    if (personality.energy && personality.vocal_style) {
      description = `${personality.energy.charAt(0).toUpperCase() + personality.energy.slice(1)}. ${personality.vocal_style.charAt(0).toUpperCase() + personality.vocal_style.slice(1)}.`;
    } else if (personality.energy) {
      description = personality.energy.charAt(0).toUpperCase() + personality.energy.slice(1);
    } else if (personality.vocal_style) {
      description = personality.vocal_style.charAt(0).toUpperCase() + personality.vocal_style.slice(1);
    } else {
      description = `A ${category} tag`;
    }

    const tag = {
      id: tagId,
      name: tagName,
      category,
      description,
      usage,
      synonyms: [],
      examples: personality.adjectives ? personality.adjectives.slice(0, 3) : [],
      co_occurrence: CO_OCCURRENCE[tagName] || null,
      metadata: {
        adjectives: personality.adjectives || [],
        energy_description: personality.energy || null,
        vocal_style: personality.vocal_style || null
      }
    };

    tags.push(tag);
    tagCount++;
  }

  // Sort tags by category, then name
  tags.sort((a, b) => {
    if (a.category !== b.category) {
      return a.category.localeCompare(b.category);
    }
    return a.name.localeCompare(b.name);
  });

  const library = {
    version: '0.1.0',
    generated_at: new Date().toISOString(),
    tag_count: tagCount,
    categories: [...new Set(tags.map(t => t.category))].sort(),
    tags
  };

  // Write to output file
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(library, null, 2));

  console.log(`✓ Generated ${tagCount} tags`);
  console.log(`✓ Categories: ${library.categories.join(', ')}`);
  console.log(`✓ Output: ${OUTPUT_PATH}\n`);

  // Print category breakdown
  const categoryCount = {};
  tags.forEach(tag => {
    categoryCount[tag.category] = (categoryCount[tag.category] || 0) + 1;
  });

  console.log('Category breakdown:');
  Object.entries(categoryCount)
    .sort((a, b) => b[1] - a[1])
    .forEach(([cat, count]) => {
      console.log(`  ${cat}: ${count}`);
    });
}

// Run the script
try {
  buildTagLibrary();
} catch (error) {
  console.error('Error building tag library:', error);
  process.exit(1);
}
