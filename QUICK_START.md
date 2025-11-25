# Quick Start Guide

## Installation

```bash
# Install dependencies
npm install

# Run in development mode (opens desktop app)
npm run tauri:dev

# Build for production
npm run tauri:build
```

## Project Overview

**Suno Prompt Architect** is a Tauri V2 desktop app that helps you build perfect prompts for Suno AI music generation.

### Architecture
- **Frontend**: React 18 + TypeScript + Vite + TailwindCSS
- **Backend**: Rust (Tauri v2)
- **State**: Zustand stores
- **Data**: Local JSON tag library (105+ tags)

## Key Files

```
suno-assistant/
├── src/
│   ├── App.tsx              # Main React app
│   ├── components/          # UI components (to be built)
│   ├── stores/              # State management
│   │   ├── useTagStore.ts   # Tag library state
│   │   └── usePromptStore.ts # Prompt CRUD state
│   ├── lib/
│   │   ├── tauri.ts         # Tauri API wrappers
│   │   └── utils.ts         # Helper functions
│   ├── types/
│   │   └── index.ts         # TypeScript types
│   └── assets/tags/
│       ├── style-personality.json  # Source data
│       └── full-library.json       # Generated library (105 tags)
├── src-tauri/
│   ├── src/
│   │   ├── main.rs          # Rust entry point
│   │   ├── commands/        # Tauri commands
│   │   └── models/          # Data models
│   └── tauri.conf.json      # App configuration
└── scripts/
    └── build-tag-library.js # Tag library builder
```

## Development Workflow

### 1. Run the app

```bash
npm run tauri:dev
```

This will:
- Start Vite dev server on `http://localhost:1420`
- Compile Rust backend
- Open the desktop app with hot reload

### 2. Make changes

**Frontend changes**: Edit files in `src/`, app reloads automatically

**Backend changes**: Edit files in `src-tauri/src/`, app restarts automatically

**Tag library changes**:
1. Edit `src/assets/tags/style-personality.json`
2. Run `npm run build:tags` to regenerate `full-library.json`

### 3. Add new components

```bash
# Example: Create a new tag browser component
touch src/components/tags/TagBrowser.tsx
```

Follow the existing structure in `src/components/`.

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Frontend only (no Tauri) |
| `npm run tauri:dev` | Full app in dev mode |
| `npm run tauri:build` | Production build |
| `npm run build:tags` | Rebuild tag library |
| `npm run build` | Build frontend |

## Tag Library

**105 tags** organized in 7 categories:

- **Genres (56)**: pop, rock, electronic, jazz, metal, hip hop, trap, etc.
- **Moods (24)**: upbeat, dark, dreamy, emotional, romantic, etc.
- **Instruments (11)**: guitar, synth, piano, drums, bass, etc.
- **Vocals (6)**: male/female voice/vocals, vocaloid, opera
- **Energy (4)**: aggressive, powerful, energetic, intense
- **Era (2)**: 80s, 90s
- **Tempo (2)**: slow, fast

Each tag includes:
- **Adjectives**: Descriptive words
- **Energy description**: How it feels
- **Vocal style**: Vocal characteristics
- **Co-occurrence**: What pairs well / what conflicts
- **Usage**: style | lyrics | both

## Using Tauri Commands

### Frontend

```typescript
import { getTags, savePrompt } from '@/lib/tauri'

// Get all tags
const tags = await getTags()

// Save a prompt
await savePrompt(promptData)
```

### Backend (adding new commands)

1. Add to `src-tauri/src/commands/mod.rs`:
```rust
#[tauri::command]
pub fn my_command(arg: String) -> Result<String, String> {
    Ok(format!("Got: {}", arg))
}
```

2. Register in `src-tauri/src/main.rs`:
```rust
.invoke_handler(tauri::generate_handler![
    greet,
    get_tags,
    my_command,  // Add here
])
```

3. Add TypeScript wrapper in `src/lib/tauri.ts`:
```typescript
export async function myCommand(arg: string): Promise<string> {
  return await invoke('my_command', { arg })
}
```

## State Management

### Tag Store

```typescript
import { useTagStore } from '@/stores/useTagStore'

function MyComponent() {
  const { tags, searchQuery, setSearchQuery, getFilteredTags } = useTagStore()

  const filtered = getFilteredTags()
  // ...
}
```

### Prompt Store

```typescript
import { usePromptStore } from '@/stores/usePromptStore'

function MyComponent() {
  const {
    currentPrompt,
    updateStyle,
    addTag,
    saveCurrentPrompt
  } = usePromptStore()

  // ...
}
```

## Styling with TailwindCSS

```tsx
<div className="bg-gray-900 text-white p-4 rounded-lg">
  <h1 className="text-2xl font-bold text-purple-400">
    Suno Prompt Architect
  </h1>
</div>
```

See [TailwindCSS docs](https://tailwindcss.com/docs) for all utilities.

## Building for Production

```bash
npm run tauri:build
```

Outputs:
- **macOS**: `src-tauri/target/release/bundle/dmg/`
- **Windows**: `src-tauri/target/release/bundle/msi/`
- **Linux**: `src-tauri/target/release/bundle/appimage/` or `/deb/`

## Next Steps

### Phase 1: Core Features
- [ ] Implement Tag Library UI
  - Tag browser with categories
  - Search and filter
  - Tag details panel
- [ ] Style Builder
  - Multi-step wizard
  - Tag selection interface
  - Live prompt preview
- [ ] Clipboard integration
  - Copy to clipboard button
  - Visual feedback

### Phase 2: Advanced Features
- [ ] Lyrics tools
  - Section tagging (`[Verse]`, `[Chorus]`)
  - Syllable counter
  - Instruction header generator
- [ ] Prompt Analyzer
  - Coverage scoring
  - Conflict detection
  - Optimization suggestions
- [ ] Storage
  - Save/load prompts
  - Templates system

### Phase 3: Polish
- [ ] Keyboard shortcuts
- [ ] Export to Markdown/JSON
- [ ] Settings panel
- [ ] App icon and branding

## Documentation

- **[TAURI_MIGRATION_PLAN.md](./TAURI_MIGRATION_PLAN.md)** - Migration strategy from Chrome extension
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - System architecture deep dive
- **[README.md](./README.md)** - Project overview
- **[src/assets/tags/README.md](./src/assets/tags/README.md)** - Tag library documentation

## Troubleshooting

**"Command not found: tauri"**
- Make sure you've run `npm install`
- Tauri CLI is installed as a dev dependency

**"Rust compiler not found"**
- Install Rust: https://rustup.rs/
- Make sure cargo is in your PATH

**"Frontend won't load"**
- Check that port 1420 is not in use
- Try `npm run dev` to test frontend independently

**Tags not showing up**
- Run `npm run build:tags` to regenerate tag library
- Check `src/assets/tags/full-library.json` exists

## Getting Help

- [Tauri Documentation](https://v2.tauri.app/)
- [React Documentation](https://react.dev/)
- [Zustand Documentation](https://zustand-demo.pmnd.rs/)
- [TailwindCSS Documentation](https://tailwindcss.com/)

---

Happy coding! 🚀
