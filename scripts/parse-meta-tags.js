#!/usr/bin/env node

/**
 * Parse Meta Tags Script
 *
 * Parses the comprehensive meta-tags.txt file and converts it into
 * a structured JSON tag library.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const META_TAGS_PATH = path.join(__dirname, '../meta-tags.txt');
const OUTPUT_PATH = path.join(__dirname, '../src/assets/tags/comprehensive-library.json');

// Category mapping based on section headers
const CATEGORY_MAP = {
  'STRUCTURE TAGS': 'structure',
  'TEMPO, METER & FEEL TAGS': 'tempo',
  'MOOD & ATMOSPHERE TAGS': 'mood',
  'ENERGY & INTENSITY TAGS': 'energy',
  'GENRE & STYLE TAGS': 'genre',
  'INSTRUMENT & ENSEMBLE TAGS': 'instruments',
  'VOCAL & VOICE TAGS': 'vocals',
  'PRODUCTION, MIX & FX TAGS': 'production',
  'HARMONY, KEY & PROGRESSION TAGS': 'harmony',
  'ARRANGEMENT & TEXTURE TECHNIQUE TAGS': 'arrangement',
  'AMBIENCE / SFX TAGS': 'ambience',
  'LYRIC-LEVEL DIRECTIVE TAGS / PHRASES': 'directive',
  'UTILITY / NEGATIVE TAGS & PHRASES': 'utility'
};

// Usage type mapping from legend
const USAGE_MAP = {
  'S': 'style',
  'L': 'lyrics',
  'B': 'both'
};

function parseMetaTags() {
  console.log('Parsing meta-tags.txt...\n');

  const content = fs.readFileSync(META_TAGS_PATH, 'utf8');
  const lines = content.split('\n');

  let currentCategory = null;
  let currentSubcategory = null;
  let currentUsage = 'style'; // default
  const tags = [];
  let tagCount = 0;

  // Track which sections specify usage type
  const sectionUsage = {
    'STRUCTURE TAGS': 'lyrics',
    'TEMPO, METER & FEEL TAGS': 'both',
    'MOOD & ATMOSPHERE TAGS': 'both',
    'ENERGY & INTENSITY TAGS': 'both',
    'GENRE & STYLE TAGS': 'style',
    'INSTRUMENT & ENSEMBLE TAGS': 'both',
    'VOCAL & VOICE TAGS': 'both',
    'PRODUCTION, MIX & FX TAGS': 'both',
    'HARMONY, KEY & PROGRESSION TAGS': 'style',
    'ARRANGEMENT & TEXTURE TECHNIQUE TAGS': 'both',
    'AMBIENCE / SFX TAGS': 'both',
    'LYRIC-LEVEL DIRECTIVE TAGS': 'lyrics',
    'UTILITY / NEGATIVE TAGS': 'both'
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Skip empty lines
    if (!line || line.startsWith('---') || line.startsWith('```')) {
      continue;
    }

    // Detect section headers (all caps with TAGS)
    // Format: ### 1. STRUCTURE TAGS (L) or ### 6. INSTRUMENT & ENSEMBLE TAGS (S/B)
    const sectionMatch = line.match(/^###\s+\d+\.\s+(.+?)\s*\(([SLB\/]+)\)/);
    if (sectionMatch) {
      const sectionName = sectionMatch[1].trim();
      const usageLetters = sectionMatch[2];
      // If usage is S/B, treat as 'both'
      let usage = 'both';
      if (usageLetters === 'S') usage = 'style';
      else if (usageLetters === 'L') usage = 'lyrics';
      else usage = 'both';

      currentCategory = CATEGORY_MAP[sectionName] || 'other';
      currentUsage = sectionUsage[sectionName] || usage;
      currentSubcategory = null;
      console.log(`Processing section: ${sectionName} (category: ${currentCategory}, usage: ${currentUsage})`);
      continue;
    }

    // Detect subcategory headers (bolded)
    const subcategoryMatch = line.match(/^\*\*(.+)\*\*$/);
    if (subcategoryMatch) {
      currentSubcategory = subcategoryMatch[1].trim();
      continue;
    }

    // Extract tag from bullet point
    const tagMatch = line.match(/^\*\s+`([^`]+)`/);
    if (tagMatch) {
      let tagName = tagMatch[1].trim();

      // Remove parenthetical notes
      tagName = tagName.replace(/\s*\([^)]+\)\s*$/, '').trim();

      // Skip example patterns and directive-style entries
      if (tagName.includes(':') || tagName.includes('...') || tagName.includes('/')) {
        continue;
      }

      const tagId = tagName.toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '')
        .replace(/--+/g, '-')
        .replace(/^-|-$/g, '');

      // Skip if we already have this tag
      if (tags.find(t => t.id === tagId)) {
        continue;
      }

      // Build description
      let description = `${tagName}`;
      if (currentSubcategory) {
        description += ` - ${currentSubcategory}`;
      }

      const tag = {
        id: tagId,
        name: tagName,
        category: currentCategory || 'other',
        subcategory: currentSubcategory || null,
        description,
        usage: currentUsage,
        examples: [],
        metadata: {}
      };

      tags.push(tag);
      tagCount++;
    }
  }

  // Sort tags by category, then name
  tags.sort((a, b) => {
    if (a.category !== b.category) {
      return a.category.localeCompare(b.category);
    }
    return a.name.localeCompare(b.name);
  });

  const library = {
    version: '1.0.0',
    source: 'meta-tags.txt',
    generated_at: new Date().toISOString(),
    tag_count: tagCount,
    categories: [...new Set(tags.map(t => t.category))].sort(),
    tags
  };

  // Write to output file
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(library, null, 2));

  console.log(`\n✓ Generated ${tagCount} tags`);
  console.log(`✓ Categories: ${library.categories.join(', ')}`);
  console.log(`✓ Output: ${OUTPUT_PATH}\n`);

  // Print category breakdown
  const categoryCount = {};
  const usageCount = { style: 0, lyrics: 0, both: 0 };

  tags.forEach(tag => {
    categoryCount[tag.category] = (categoryCount[tag.category] || 0) + 1;
    usageCount[tag.usage] = (usageCount[tag.usage] || 0) + 1;
  });

  console.log('Category breakdown:');
  Object.entries(categoryCount)
    .sort((a, b) => b[1] - a[1])
    .forEach(([cat, count]) => {
      console.log(`  ${cat}: ${count}`);
    });

  console.log('\nUsage breakdown:');
  Object.entries(usageCount).forEach(([usage, count]) => {
    console.log(`  ${usage}: ${count}`);
  });

  return library;
}

// Run the script
try {
  parseMetaTags();
} catch (error) {
  console.error('Error parsing meta tags:', error);
  process.exit(1);
}
