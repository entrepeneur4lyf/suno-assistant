# Suno Prompt Architect - Development TODO

## Progress Overview

- ✅ **Phase 1: Core Setup** (100%)
- 🔄 **Phase 2: Tag Library UI** (0%)
- ⬜ **Phase 3: Style Builder** (0%)
- ⬜ **Phase 4: Lyrics Tools** (0%)
- ⬜ **Phase 5: Prompt Generation** (0%)
- ⬜ **Phase 6: Analysis & Storage** (0%)
- ⬜ **Phase 7: Export & Polish** (0%)
- ⬜ **Phase 8: AI Integration** (Future)

---

## Phase 1: Core Setup ✅ COMPLETE

### Project Structure
- [x] Initialize Tauri V2 project
- [x] Set up React + TypeScript + Vite
- [x] Configure TailwindCSS
- [x] Create directory structure (components, stores, types)
- [x] Set up Rust backend with Tauri commands
- [x] Configure Tauri plugins (store, clipboard, dialog, shell)

### Tag Library Data
- [x] Create tag data models (TypeScript)
- [x] Create tag data models (Rust)
- [x] Parse meta-tags.txt (508 tags across 13 categories)
- [x] Build style-personality.json integration
- [x] Generate comprehensive-library.json
- [x] Create build scripts for tag libraries

### Documentation
- [x] TAURI_MIGRATION_PLAN.md
- [x] ARCHITECTURE.md
- [x] README.md
- [x] QUICK_START.md
- [x] Tag library documentation

---

## Phase 2: Tag Library UI 🔄 IN PROGRESS

### Tag Browser Component
- [ ] Create `TagLibrary.tsx` main container
- [ ] Implement category filter sidebar
  - [ ] Display all 13 categories with counts
  - [ ] Active category highlighting
  - [ ] "All Tags" option
- [ ] Build tag grid/list view
  - [ ] Tag cards with name, category badge
  - [ ] Hover state showing description
  - [ ] Click to select/deselect
  - [ ] Visual indicator for selected tags
- [ ] Implement tag search
  - [ ] Search by tag name
  - [ ] Search by description
  - [ ] Search by synonyms
  - [ ] Debounced search (300ms)
  - [ ] Clear search button
- [ ] Add view toggles
  - [ ] Grid view
  - [ ] List view
  - [ ] Compact view

### Tag Details Panel
- [ ] Create `TagDetails.tsx` component
- [ ] Display selected tag information
  - [ ] Tag name and category
  - [ ] Full description
  - [ ] Usage type (Style/Lyrics/Both)
  - [ ] Subcategory (if applicable)
- [ ] Show style personality data (if available)
  - [ ] Adjectives list
  - [ ] Energy description
  - [ ] Vocal style description
- [ ] Display co-occurrence data
  - [ ] "Pairs well with" chips
  - [ ] "Conflicts with" chips
  - [ ] Clickable chips to add related tags
- [ ] Add to prompt buttons
  - [ ] "Add to Style"
  - [ ] "Add to Lyrics"
  - [ ] Visual feedback on add

### Tag Selection State
- [ ] Create `useTagSelectionStore.ts`
  - [ ] Selected tags array
  - [ ] Add/remove tag methods
  - [ ] Clear all selections
  - [ ] Get tags by category
  - [ ] Get tags by usage type
- [ ] Implement tag limits
  - [ ] Max 3 genres
  - [ ] Max 3 moods
  - [ ] Max 5 instruments
  - [ ] Visual warning when limit reached

### Integration
- [ ] Load comprehensive-library.json on app start
- [ ] Populate useTagStore with loaded tags
- [ ] Connect Tag Browser to useTagStore
- [ ] Connect Tag Selection to usePromptStore

---

## Phase 3: Style Builder 🎨

### Wizard Flow
- [ ] Create `StyleBuilder.tsx` container
- [ ] Implement multi-step wizard UI
  - [ ] Step progress indicator
  - [ ] Next/Previous buttons
  - [ ] Step validation
- [ ] Step 1: Objective
  - [ ] Song type selector (Full song, Hook, Loop, Bed)
  - [ ] Duration input/slider
  - [ ] Instrumental toggle
- [ ] Step 2: Genre Selection
  - [ ] Genre tag picker (max 3)
  - [ ] Subgenre suggestions based on main genre
  - [ ] Genre conflict warnings
- [ ] Step 3: Mood & Energy
  - [ ] Mood tag picker
  - [ ] Energy level selector
  - [ ] Mood conflict detection
- [ ] Step 4: Instruments
  - [ ] Instrument tag picker (max 5)
  - [ ] Group by category (rhythm, melodic, orchestral)
  - [ ] Common instrument combos suggestions
- [ ] Step 5: Vocals
  - [ ] Vocal type selection
  - [ ] Vocal tone/character tags
  - [ ] Vocal technique tags
  - [ ] "No vocals" option
- [ ] Step 6: Production & FX
  - [ ] Production tag picker
  - [ ] Reverb/delay options
  - [ ] Mix style options
- [ ] Step 7: Advanced
  - [ ] Tempo selection (with tempo tags)
  - [ ] Harmony/key selection
  - [ ] Time signature selection
  - [ ] Weirdness slider
  - [ ] Style influence slider

### Live Preview
- [ ] Create `StylePromptPreview.tsx`
- [ ] Build style prompt from selected tags
- [ ] Display formatted prompt text
- [ ] Character count indicator
- [ ] Copy to clipboard button
- [ ] Prompt quality indicator (basic)

### Presets
- [ ] Create `StylePreset.tsx` component
- [ ] Built-in presets
  - [ ] Pop Anthem
  - [ ] EDM Drop
  - [ ] Indie Folk
  - [ ] Dark Electronic
  - [ ] Nu-Metal
  - [ ] Lo-fi Hip-Hop
- [ ] Load preset functionality
- [ ] Save custom preset
- [ ] Delete custom preset
- [ ] Export/import presets (JSON)

---

## Phase 4: Lyrics Tools 📝

### Lyrics Editor
- [ ] Create `LyricsBuilder.tsx` component
- [ ] Multi-line textarea with syntax highlighting
  - [ ] Highlight structure tags ([Verse], [Chorus])
  - [ ] Highlight performance cues ((breathy), (belt))
  - [ ] Line numbers
- [ ] Section detection
  - [ ] Auto-detect likely sections from line breaks
  - [ ] Manual section tagging buttons
  - [ ] Section reordering (drag-and-drop)
- [ ] Structure tags
  - [ ] Quick insert buttons for common tags
  - [ ] [Intro], [Verse], [Pre-Chorus], [Chorus], [Bridge], [Outro]
  - [ ] Numbered sections (Verse 1, Verse 2)
  - [ ] [Instrumental Break], [Solo Section]

### Syllable Counter
- [ ] Create `SyllableCounter.tsx` component
- [ ] Count syllables per line (use lib/utils.ts)
- [ ] Visual indicators
  - [ ] Green: within target range
  - [ ] Yellow: slightly off
  - [ ] Red: way off target
- [ ] Target syllable ranges
  - [ ] Verse: 7-9 syllables
  - [ ] Chorus: 9-11 syllables
  - [ ] Configurable ranges
- [ ] Syllable heatmap view

### Rhyme Scheme Helper
- [ ] Create `RhymeScheme.tsx` component
- [ ] Common rhyme scheme presets
  - [ ] ABAB
  - [ ] AABB
  - [ ] ABCB
  - [ ] Free verse
- [ ] Apply rhyme scheme to lyrics
- [ ] Highlight rhyming words
- [ ] Rhyme suggestions (optional, future)

### Instruction Header Generator
- [ ] Create `InstructionHeader.tsx` component
- [ ] Build header from selections
  - [ ] OBJECTIVE: [from style builder]
  - [ ] VOICE: [from vocal selections]
  - [ ] MOOD & STORY: [from mood tags]
  - [ ] TEMPO: [from tempo selection]
  - [ ] STRUCTURE: [from detected sections]
- [ ] Insert at top of lyrics
- [ ] Template variations
  - [ ] Minimal
  - [ ] Detailed
  - [ ] Custom

### Constraints & Directives
- [ ] Add constraint inputs
  - [ ] Syllable targets per section
  - [ ] Rhyme scheme enforcement
  - [ ] Phrasing style (natural, poetic, etc.)
  - [ ] Clichés to avoid
- [ ] Performance cue insertion
  - [ ] (breathy), (belt), (whispered)
  - [ ] (falsetto), (growl), (spoken)
  - [ ] Quick insert buttons

---

## Phase 5: Prompt Generation 🎯

### Template System
- [ ] Create `promptTemplates.ts`
- [ ] Style prompt template
  - [ ] Genre-first ordering
  - [ ] Mood integration
  - [ ] Instrument listing
  - [ ] Vocal description
  - [ ] Production notes
  - [ ] Natural language flow
- [ ] Lyrics prompt template
  - [ ] Instruction header
  - [ ] Section tags
  - [ ] Constraint directives
  - [ ] Performance cues
- [ ] Template variations
  - [ ] Compact vs. Descriptive
  - [ ] Tag-heavy vs. Natural language

### Prompt Builder Service
- [ ] Create `promptBuilder.ts`
- [ ] `buildStylePrompt(config: PromptConfig): string`
  - [ ] Combine genre tags
  - [ ] Add mood descriptors
  - [ ] List instruments naturally
  - [ ] Describe vocals
  - [ ] Add production notes
  - [ ] Insert tempo/harmony if specified
- [ ] `buildLyricsPrompt(config: PromptConfig): string`
  - [ ] Generate instruction header
  - [ ] Insert structure tags
  - [ ] Add constraint directives
  - [ ] Wrap user lyrics if provided
- [ ] `buildAdvancedParams(config: PromptConfig): object`
  - [ ] Weirdness value
  - [ ] Style influence
  - [ ] Vocal gender
  - [ ] Exclude styles list

### Prompt Preview & Export
- [ ] Create `PromptExport.tsx` component
- [ ] Live preview of generated prompts
  - [ ] Style field preview
  - [ ] Lyrics field preview
  - [ ] Advanced settings preview
- [ ] Copy buttons
  - [ ] Copy Style
  - [ ] Copy Lyrics
  - [ ] Copy All
  - [ ] Visual feedback (✓ Copied!)
- [ ] Character limits warning
  - [ ] Style field limit indicator
  - [ ] Lyrics field limit indicator

---

## Phase 6: Analysis & Storage 🔍

### Prompt Analyzer
- [ ] Create `PromptAnalyzer.tsx` component
- [ ] Coverage scoring (0-100)
  - [ ] Check for genre
  - [ ] Check for mood
  - [ ] Check for energy
  - [ ] Check for instruments
  - [ ] Check for vocals
  - [ ] Check for structure (lyrics)
- [ ] Conflict detection
  - [ ] Genre conflicts (e.g., jazz + metal)
  - [ ] Mood conflicts (e.g., happy + melancholic)
  - [ ] Energy conflicts (e.g., high energy + calm)
  - [ ] Display warnings with explanations
- [ ] Optimization suggestions
  - [ ] Remove redundant tags
  - [ ] Suggest missing elements
  - [ ] Tag ordering improvements
  - [ ] Compression suggestions

### Prompt Storage (Tauri Store)
- [ ] Create Tauri command: `save_prompt`
- [ ] Create Tauri command: `load_prompt`
- [ ] Create Tauri command: `list_prompts`
- [ ] Create Tauri command: `delete_prompt`
- [ ] Frontend integration
  - [ ] Save current prompt dialog
  - [ ] Load saved prompt picker
  - [ ] Prompt library view
  - [ ] Delete confirmation

### Templates System
- [ ] Create `TemplateManager.tsx`
- [ ] Built-in templates
  - [ ] Full Song (Verse/Chorus/Bridge)
  - [ ] Hook Only (30-40s)
  - [ ] Seamless Loop
  - [ ] Spoken Word
- [ ] Custom templates
  - [ ] Save current as template
  - [ ] Load template
  - [ ] Edit template
  - [ ] Delete template
- [ ] Template categories
  - [ ] By genre
  - [ ] By structure
  - [ ] By purpose

---

## Phase 7: Export & Polish ✨

### PRD Export
- [ ] Create `PRDExport.tsx` component
- [ ] Generate Suno Song Spec markdown
  - [ ] Objective section
  - [ ] Voice section
  - [ ] Mood & Story section
  - [ ] Structure section
  - [ ] Style descriptor
  - [ ] Technical constraints
- [ ] Export formats
  - [ ] Markdown (.md)
  - [ ] JSON (.json)
  - [ ] Plain text (.txt)
- [ ] Download functionality
- [ ] Copy to clipboard

### Settings & Preferences
- [ ] Create `Settings.tsx` component
- [ ] UI preferences
  - [ ] Theme (dark/light)
  - [ ] Tag view (grid/list)
  - [ ] Font size
- [ ] Default limits
  - [ ] Max genres
  - [ ] Max moods
  - [ ] Max instruments
- [ ] Syllable counter settings
  - [ ] Target ranges per section
  - [ ] Enable/disable
- [ ] Auto-save prompts toggle
- [ ] Clear all data button

### Keyboard Shortcuts
- [ ] Implement global shortcuts
  - [ ] Ctrl/Cmd + S: Save prompt
  - [ ] Ctrl/Cmd + C: Copy style
  - [ ] Ctrl/Cmd + Shift + C: Copy lyrics
  - [ ] Ctrl/Cmd + N: New prompt
  - [ ] Ctrl/Cmd + O: Open prompt
  - [ ] Ctrl/Cmd + F: Focus search
- [ ] Shortcuts help dialog (?)

### UI Polish
- [ ] Loading states for all async operations
- [ ] Error handling and user-friendly messages
- [ ] Empty states (no tags selected, no prompts saved)
- [ ] Tooltips for all buttons and controls
- [ ] Animations and transitions
  - [ ] Page transitions
  - [ ] Tag selection animations
  - [ ] Success/error notifications
- [ ] Responsive layout (handle window resizing)
- [ ] Accessibility
  - [ ] Keyboard navigation
  - [ ] ARIA labels
  - [ ] Focus indicators

### App Icons & Branding
- [ ] Design app icon
- [ ] Generate icon variants (32x32, 128x128, etc.)
- [ ] Create macOS .icns
- [ ] Create Windows .ico
- [ ] Update tauri.conf.json with icons
- [ ] Splash screen (optional)

---

## Phase 8: AI Integration (Future) 🤖

### Backend Setup
- [ ] Design OAuth flow for desktop
  - [ ] Localhost callback server
  - [ ] Token storage in Tauri Store
  - [ ] Token refresh logic
- [ ] Create AI service endpoints
  - [ ] `/ai/style-from-description`
  - [ ] `/ai/refine-style-prompt`
  - [ ] `/ai/lyric-refine`
  - [ ] `/ai/suggest-lyric-section`
  - [ ] `/ai/review-prompt`
  - [ ] `/ai/generate-prd`

### Frontend Integration
- [ ] AI connection status indicator
- [ ] "Connect AI Assistant" button
- [ ] AI-enhanced features
  - [ ] "Generate style from description"
  - [ ] "Refine style prompt" (alternatives)
  - [ ] "Tighten lyrics (keep meaning)"
  - [ ] "Suggest 2nd verse/bridge"
  - [ ] "AI review" (analysis)
  - [ ] "Generate PRD from prompt"
- [ ] Privacy controls
  - [ ] "Send full lyrics to AI" toggle
  - [ ] Clear data sent indicator

---

## Testing & QA

### Manual Testing
- [ ] Test on macOS
- [ ] Test on Windows
- [ ] Test on Linux
- [ ] Test with large tag libraries (500+ tags)
- [ ] Test with complex prompts
- [ ] Test prompt storage/retrieval
- [ ] Test export functionality
- [ ] Test clipboard operations

### Bug Fixes
- [ ] Track bugs in GitHub Issues
- [ ] Fix critical bugs before release
- [ ] Fix UI/UX issues

---

## Release

### Documentation
- [ ] User guide / tutorial
- [ ] Video walkthrough (optional)
- [ ] FAQ
- [ ] Changelog

### Distribution
- [ ] Build macOS installer (.dmg)
- [ ] Build Windows installer (.msi)
- [ ] Build Linux installer (.AppImage / .deb)
- [ ] Code signing (macOS, Windows)
- [ ] Upload to GitHub Releases
- [ ] Create release notes

### Marketing
- [ ] Create landing page (optional)
- [ ] Share on Reddit (r/suno, r/AIMusic)
- [ ] Share on Twitter/X
- [ ] Share on Discord communities

---

## Notes

- Focus on **Core Features First**: Tag Library UI → Style Builder → Lyrics Tools → Prompt Generation
- **Test Frequently**: Generate real prompts and test in Suno after each phase
- **Keep It Simple**: Don't over-engineer, ship v1 with core features working well
- **User Feedback**: Get early users to test and provide feedback
- **Iterate**: Use feedback to prioritize next features

---

**Last Updated**: 2025-11-25
**Current Phase**: Phase 2 - Tag Library UI
