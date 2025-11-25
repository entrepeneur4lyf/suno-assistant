# Tauri V2 Migration Plan

## Overview

Migrating Suno Prompt Architect from a Chrome Extension to a **Tauri V2 desktop application**.

---

## Key Architectural Changes

### Chrome Extension → Tauri V2 Desktop App

| Aspect | Chrome Extension | Tauri V2 Desktop App |
|--------|-----------------|---------------------|
| **Runtime** | Browser extension injected into suno.com | Standalone desktop application |
| **UI Integration** | Content script injecting side panel into Suno Studio | Standalone window with embedded browser OR side-by-side workflow |
| **Data Storage** | `chrome.storage` API | Tauri's store plugin + local filesystem |
| **Backend** | Background service worker | Rust backend with Tauri commands |
| **Distribution** | Chrome Web Store | Native installers (DMG, MSI, AppImage) |
| **OAuth Flow** | Extension callback URLs | Deep links or localhost callback server |
| **Auto-updates** | Chrome Web Store | Tauri updater plugin |

---

## Recommended Approach for Suno Integration

Since we can't inject into suno.com as a desktop app, we have **three options**:

### Option 1: Side-by-Side Workflow (RECOMMENDED for MVP)
- Standalone app window that sits alongside the user's browser
- User has Suno Studio open in their browser
- Prompt Architect provides:
  - Tag library and builders
  - Prompt analysis and optimization
  - One-click copy to clipboard
  - User pastes into Suno manually
- **Pros**: Clean, safe, works regardless of Suno UI changes
- **Cons**: Manual copy/paste step

### Option 2: Embedded WebView with Automation
- Embed suno.com in a Tauri webview
- Use webview2's JavaScript injection to interact with Suno's DOM
- **Pros**: Seamless integration like extension
- **Cons**:
  - Complex to maintain
  - May violate Suno ToS
  - Requires handling auth cookies/sessions
  - Brittle to Suno UI changes

### Option 3: Browser Extension + Desktop App Hybrid
- Keep a minimal Chrome extension for injection
- Desktop app communicates with extension via native messaging
- **Pros**: Best of both worlds
- **Cons**: Requires maintaining both extension and desktop app

**Decision: Start with Option 1** for MVP, evaluate Option 3 later if needed.

---

## Tech Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite (Tauri's default)
- **UI Library**: TailwindCSS + shadcn/ui (or similar)
- **State Management**: Zustand (lightweight) or Jotai
- **Forms**: React Hook Form + Zod validation

### Backend (Rust/Tauri)
- **Tauri Version**: v2.x (latest stable)
- **Plugins**:
  - `tauri-plugin-store` - Persistent storage
  - `tauri-plugin-clipboard-manager` - Clipboard operations
  - `tauri-plugin-dialog` - File dialogs for import/export
  - `tauri-plugin-shell` - Open URLs in default browser
  - `tauri-plugin-updater` - Auto-updates
  - `tauri-plugin-http` (if needed for AI backend calls)
- **Additional Crates**:
  - `serde` / `serde_json` - JSON handling
  - `tokio` - Async runtime (included with Tauri)

### Data Layer
- **Tag Library**: Static JSON bundled with app
- **User Data**: Tauri Store (JSON-based key-value store)
- **Export Formats**: JSON, Markdown

---

## Project Structure

```
suno-assistant/
├── src-tauri/              # Rust backend
│   ├── src/
│   │   ├── main.rs         # Entry point
│   │   ├── commands/       # Tauri command handlers
│   │   │   ├── mod.rs
│   │   │   ├── tags.rs     # Tag operations
│   │   │   ├── prompts.rs  # Prompt CRUD
│   │   │   └── ai.rs       # AI integration
│   │   ├── models/         # Data models
│   │   │   ├── mod.rs
│   │   │   ├── tag.rs
│   │   │   ├── prompt.rs
│   │   │   └── config.rs
│   │   └── utils/          # Helper functions
│   ├── Cargo.toml
│   ├── tauri.conf.json     # Tauri configuration
│   ├── build.rs
│   └── icons/              # App icons
├── src/                    # React frontend
│   ├── main.tsx            # Entry point
│   ├── App.tsx
│   ├── components/
│   │   ├── layout/
│   │   │   ├── MainLayout.tsx
│   │   │   └── Sidebar.tsx
│   │   ├── tags/
│   │   │   ├── TagLibrary.tsx
│   │   │   ├── TagSearch.tsx
│   │   │   └── TagDetails.tsx
│   │   ├── builders/
│   │   │   ├── StyleBuilder.tsx
│   │   │   ├── LyricsBuilder.tsx
│   │   │   └── AdvancedParams.tsx
│   │   ├── analysis/
│   │   │   ├── PromptAnalyzer.tsx
│   │   │   └── PRDExport.tsx
│   │   └── common/
│   │       ├── Button.tsx
│   │       └── Input.tsx
│   ├── stores/
│   │   ├── useTagStore.ts
│   │   ├── usePromptStore.ts
│   │   └── useSettingsStore.ts
│   ├── lib/
│   │   ├── tauri.ts        # Tauri API wrappers
│   │   └── utils.ts
│   ├── types/
│   │   ├── tag.ts
│   │   ├── prompt.ts
│   │   └── index.ts
│   ├── styles/
│   │   └── globals.css
│   └── assets/
│       └── tags/           # Tag library JSON
│           ├── genres.json
│           ├── moods.json
│           ├── instruments.json
│           └── full-library.json
├── public/                 # Static assets
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

---

## Data Models

### Tag Schema
```typescript
interface Tag {
  id: string;
  name: string;
  category: TagCategory;
  description: string;
  usage: 'style' | 'lyrics' | 'both';
  synonyms?: string[];
  examples?: string[];
  coOccurrence?: {
    strong: string[];      // Tag IDs that pair well
    avoid: string[];       // Conflicting tag IDs
  };
  metadata?: {
    energy?: number;       // 1-10
    complexity?: number;   // 1-10
    era?: string;
    region?: string;
  };
}

enum TagCategory {
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
```

### Prompt Schema
```typescript
interface Prompt {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;

  // Core fields
  style: string;
  lyrics: string;

  // Structured data
  tags: string[];          // Tag IDs
  structure: {
    objective: string;
    voice: string;
    mood: string;
    tempo?: string;
    duration?: string;
  };

  // Advanced params
  advanced?: {
    weirdness?: number;
    styleInfluence?: number;
    vocalGender?: 'male' | 'female' | 'neutral';
    excludeStyles?: string[];
  };

  // Metadata
  template?: boolean;
  favorite?: boolean;
  notes?: string;
}
```

---

## Implementation Phases

### Phase 1: Core Setup (Week 1)
- [x] Initialize Tauri project
- [ ] Set up React + TypeScript + Vite
- [ ] Configure TailwindCSS
- [ ] Create basic UI layout (tabs, panels)
- [ ] Implement Tag Library data loading
- [ ] Basic tag search and display

### Phase 2: Style Builder (Week 2)
- [ ] Style wizard flow
- [ ] Tag selection UI
- [ ] Live prompt assembly
- [ ] Co-occurrence suggestions
- [ ] Clipboard copy functionality

### Phase 3: Lyrics Tools (Week 3)
- [ ] Lyrics editor with syntax highlighting
- [ ] Section tagging (Verse, Chorus, etc.)
- [ ] Syllable counter
- [ ] Instruction header generator

### Phase 4: Analysis & Storage (Week 4)
- [ ] Prompt scoring algorithm
- [ ] Conflict detection
- [ ] Optimization suggestions
- [ ] Save/load prompts (Tauri store)
- [ ] Templates system

### Phase 5: Export & Polish (Week 5)
- [ ] PRD export (Markdown, JSON)
- [ ] Import existing prompts
- [ ] Settings panel
- [ ] Keyboard shortcuts
- [ ] Polish UI/UX

### Phase 6: AI Integration (Future)
- [ ] OAuth flow for desktop (localhost callback server)
- [ ] AI backend integration
- [ ] Natural language → tags
- [ ] Prompt refinement
- [ ] PRD generation

---

## Key Differences from Extension Design

### 1. No DOM Injection
- **Extension**: Injects UI into Suno's page
- **Tauri**: Standalone window
- **Solution**: Focus on excellent prompt generation + easy clipboard workflow

### 2. Storage
- **Extension**: `chrome.storage.local`
- **Tauri**: `tauri-plugin-store` (JSON file in app data dir)
- **Migration Path**: Export/import if users ever need to switch

### 3. OAuth Flow
- **Extension**: `chrome-extension://` redirect URLs
- **Tauri**:
  - Option A: Deep links (`suno-assistant://auth/callback`)
  - Option B: Localhost callback server (`http://localhost:PORT/callback`)
  - Option C: Manual token paste
- **Recommended**: Option B (localhost server) for best UX

### 4. Updates
- **Extension**: Auto-update via Chrome Web Store
- **Tauri**: Built-in updater plugin with GitHub releases or custom server

### 5. Performance
- **Extension**: Runs in browser context, limited by web APIs
- **Tauri**: Native performance, full system access, but larger bundle size

---

## Migration Checklist

- [ ] Initialize Tauri v2 project
- [ ] Set up development environment
- [ ] Create tag library JSON datasets
- [ ] Implement frontend UI components
- [ ] Build Tauri commands for data operations
- [ ] Implement prompt storage
- [ ] Create export functionality
- [ ] Add clipboard operations
- [ ] Design app icons and branding
- [ ] Set up CI/CD for builds
- [ ] Create installers for macOS, Windows, Linux
- [ ] Write user documentation
- [ ] Plan AI backend architecture (separate from app)
- [ ] Beta testing
- [ ] Production release

---

## Open Questions

1. **AI Backend Hosting**: Where to host? (Vercel, Railway, fly.io?)
2. **Monetization**: Free app + paid AI features? Subscription?
3. **Tag Library Updates**: How to deliver updates? (App update vs. online fetch?)
4. **Browser Integration**: Do we eventually build a companion extension for Option 3?
5. **Cross-Platform Testing**: Priority order? (macOS → Windows → Linux?)

---

## Next Steps

1. Run `npm create tauri-app@latest` to scaffold project
2. Set up React + TypeScript + Vite
3. Install and configure Tauri plugins
4. Create basic UI layout
5. Start with Tag Library implementation
