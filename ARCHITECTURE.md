# Suno Prompt Architect - Architecture Documentation

## System Architecture

This document describes the technical architecture of the Suno Prompt Architect Tauri V2 application.

---

## Overview

**Suno Prompt Architect** is a cross-platform desktop application built with Tauri V2, combining a React frontend with a Rust backend. It operates as a standalone companion tool to Suno Studio, running side-by-side with the user's web browser.

### Design Philosophy

1. **Local-First**: All data processing happens locally; no server dependencies for core features
2. **Type-Safe**: Full TypeScript coverage on frontend, strong typing in Rust backend
3. **Modular**: Clean separation of concerns with dedicated stores, commands, and models
4. **Extensible**: Plugin architecture ready for AI integration in future versions

---

## Technology Stack

### Frontend Layer

```
React 18.3
├── TypeScript 5.7
├── Vite 6.0 (build tool)
├── TailwindCSS 3.4 (styling)
└── Zustand 5.0 (state management)
```

**Key Libraries:**
- `@tauri-apps/api` - Tauri frontend bindings
- `react`, `react-dom` - UI framework
- `zustand` - Lightweight state management
- `tailwindcss` - Utility-first CSS

### Backend Layer

```
Tauri 2.2 (Rust)
├── Serde (JSON serialization)
├── tauri-plugin-store (persistent storage)
├── tauri-plugin-clipboard-manager (clipboard ops)
├── tauri-plugin-dialog (file dialogs)
└── tauri-plugin-shell (shell operations)
```

---

## Application Architecture

### High-Level Component Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                      User Interface (React)                  │
│  ┌────────────┬────────────┬────────────┬────────────┐     │
│  │  Overview  │   Style    │   Lyrics   │  Analysis  │     │
│  │            │  Builder   │  & Struct  │   & PRD    │     │
│  └────────────┴────────────┴────────────┴────────────┘     │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │          State Management (Zustand)                   │  │
│  │  • useTagStore      • usePromptStore                 │  │
│  │  • useSettingsStore (future)                         │  │
│  └──────────────────────────────────────────────────────┘  │
└──────────────────────┬──────────────────────────────────────┘
                       │ Tauri IPC (invoke/emit)
┌──────────────────────┴──────────────────────────────────────┐
│                   Tauri Core (Rust)                          │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Command Handlers                         │  │
│  │  • get_tags()      • save_prompt()                   │  │
│  │  • load_prompt()   • analyze_prompt()                │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Data Models (Rust)                       │  │
│  │  • Tag        • Prompt                                │  │
│  │  • CoOccurrence  • PromptStructure                   │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │              Tauri Plugins                            │  │
│  │  • Store (persistent data)                            │  │
│  │  • Clipboard (copy/paste)                             │  │
│  │  • Dialog (file import/export)                        │  │
│  │  • Shell (open browser)                               │  │
│  └──────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
                       │
                       ▼
            ┌──────────────────────┐
            │  Local File System   │
            │  • Tag Library JSON  │
            │  • User Settings     │
            │  • Saved Prompts     │
            └──────────────────────┘
```

---

## Data Flow

### 1. Tag Library Loading

```
App Start
    │
    ├─> Frontend: useEffect() calls getTags()
    │
    ├─> Tauri IPC: invoke('get_tags')
    │
    ├─> Backend: get_tags() command
    │      │
    │      ├─> Load from bundled JSON (src-tauri/assets/tags.json)
    │      │
    │      └─> Return Vec<Tag>
    │
    └─> Frontend: useTagStore.setTags(tags)
```

### 2. Prompt Creation & Storage

```
User creates prompt in UI
    │
    ├─> Frontend: usePromptStore.createNewPrompt()
    │      │
    │      └─> Generate ID, timestamp, initialize structure
    │
    ├─> User builds prompt (tags, style, lyrics)
    │      │
    │      └─> State updates in Zustand store
    │
    ├─> User clicks "Save"
    │
    ├─> Frontend: savePrompt(prompt)
    │
    ├─> Tauri IPC: invoke('save_prompt', { prompt })
    │
    ├─> Backend: save_prompt() command
    │      │
    │      ├─> Serialize to JSON (serde)
    │      │
    │      └─> Write to Tauri Store
    │
    └─> Frontend: Update savedPrompts list
```

### 3. Clipboard Copy

```
User clicks "Copy to Clipboard"
    │
    ├─> Frontend: copyToClipboard(promptText)
    │
    ├─> Tauri Plugin: clipboard-manager.writeText()
    │
    └─> System Clipboard updated
         │
         └─> User pastes into Suno Studio
```

---

## Module Breakdown

### Frontend Modules

#### `/src/components/`

**Purpose**: React UI components

| Component | Responsibility |
|-----------|---------------|
| `layout/MainLayout` | App shell, navigation |
| `tags/TagLibrary` | Browse all tags |
| `tags/TagSearch` | Search and filter tags |
| `tags/TagDetails` | Display tag info, co-occurrence |
| `builders/StyleBuilder` | Wizard for building style prompts |
| `builders/LyricsBuilder` | Lyrics editor with structure tools |
| `analysis/PromptAnalyzer` | Score and analyze prompts |
| `analysis/PRDExport` | Export Suno Song Spec |

#### `/src/stores/`

**Purpose**: Zustand state management

| Store | State Managed |
|-------|--------------|
| `useTagStore` | Tag library, search, filters, selected tag |
| `usePromptStore` | Current prompt, saved prompts, CRUD operations |
| `useSettingsStore` | (Future) User preferences, AI connection |

#### `/src/lib/`

**Purpose**: Utilities and API wrappers

- `tauri.ts` - Type-safe wrappers for Tauri commands
- `utils.ts` - Helpers (syllable counting, formatting, etc.)

#### `/src/types/`

**Purpose**: TypeScript type definitions

- Shared types matching Rust models (Tag, Prompt, etc.)

---

### Backend Modules

#### `/src-tauri/src/commands/`

**Purpose**: Tauri command handlers (exposed to frontend)

**Commands:**
```rust
#[tauri::command]
fn get_tags() -> Result<Vec<Tag>, String>

#[tauri::command]
fn save_prompt(prompt: Prompt) -> Result<String, String>

#[tauri::command]
fn load_prompt(id: String) -> Result<Prompt, String>

#[tauri::command]
fn analyze_prompt(prompt: Prompt) -> Result<PromptScore, String>
```

#### `/src-tauri/src/models/`

**Purpose**: Data structures

- `Tag` - Tag definition
- `Prompt` - User prompt with metadata
- `CoOccurrence` - Tag relationships
- `PromptStructure` - Structured prompt metadata

#### `/src-tauri/src/utils/`

**Purpose**: Helper functions

- (Future) Syllable counting (Rust implementation)
- (Future) Conflict detection algorithms
- (Future) PRD generation logic

---

## Data Storage

### Tag Library (Static)

**Location**: `src/assets/tags/sample-tags.json`

**Format**: JSON array of Tag objects

**Loading**: Bundled with app at build time, loaded into memory at startup

**Updates**: Versioned with app releases

### User Data (Dynamic)

**Location**: OS-specific app data directory via `tauri-plugin-store`

- **macOS**: `~/Library/Application Support/com.sunoassistant.app/`
- **Windows**: `%APPDATA%\com.sunoassistant.app\`
- **Linux**: `~/.config/com.sunoassistant.app/`

**Stores:**
- `prompts.dat` - Saved prompts (JSON)
- `settings.dat` - User preferences (JSON)
- `templates.dat` - Saved templates (JSON)

---

## Security Considerations

### 1. Content Security Policy (CSP)

Tauri enforces CSP by default. Currently set to `null` for development flexibility.

**Production**: Should tighten CSP to prevent XSS:
```json
"csp": "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'"
```

### 2. IPC Security

- All Tauri commands are whitelisted in `invoke_handler`
- No arbitrary command execution
- Input validation on all command parameters

### 3. File System Access

- Limited to app data directory via Tauri Store
- File dialogs for user-initiated import/export only
- No arbitrary file reads/writes

### 4. Network Access (Future AI Features)

- HTTPS only for AI backend
- OAuth tokens stored in Tauri Store (encrypted)
- No raw API keys in frontend code

---

## Build & Distribution

### Development

```bash
npm run tauri:dev
```

- Frontend runs on http://localhost:1420 (Vite dev server)
- Backend compiled in debug mode
- Hot reload for frontend changes

### Production Build

```bash
npm run tauri:build
```

**Outputs:**
- **macOS**: `.dmg` installer in `src-tauri/target/release/bundle/dmg/`
- **Windows**: `.msi` installer in `src-tauri/target/release/bundle/msi/`
- **Linux**: `.AppImage` or `.deb` in `src-tauri/target/release/bundle/`

### Code Signing (Future)

- **macOS**: Requires Apple Developer certificate
- **Windows**: Requires code signing certificate
- Configure in `tauri.conf.json` under `bundle.macOS` / `bundle.windows`

---

## Performance Considerations

### Frontend

1. **Lazy Loading**: Components loaded on-demand
2. **Memoization**: React.memo() for expensive renders
3. **Virtual Scrolling**: For large tag lists (future)
4. **Debounced Search**: 300ms debounce on tag search

### Backend

1. **Tag Library**: Load once at startup, keep in memory
2. **Async I/O**: All file operations use Tokio async
3. **Serialization**: Efficient JSON with serde
4. **Store Caching**: Tauri Store handles caching internally

### Bundle Size

- **Frontend**: ~500KB (gzipped)
- **Backend**: ~5MB (Rust binary)
- **Total App**: ~15MB (with assets and dependencies)

---

## Testing Strategy

### Frontend

- **Unit Tests**: Vitest for utilities and stores
- **Component Tests**: React Testing Library
- **E2E Tests**: (Future) Playwright

### Backend

- **Unit Tests**: Rust `#[cfg(test)]` modules
- **Integration Tests**: Tauri command testing

### Manual Testing

- **Cross-Platform**: Test on macOS, Windows, Linux
- **Accessibility**: Keyboard navigation, screen reader support
- **Performance**: Large tag libraries, many saved prompts

---

## Future Enhancements

### 1. AI Integration

**Backend Service** (separate from desktop app):
- FastAPI or Express server
- OAuth provider integration
- LLM API calls (OpenAI, Anthropic, etc.)

**Desktop App Changes**:
- Add AI connection status UI
- Implement OAuth flow (localhost callback)
- New commands: `ai_refine_prompt()`, `ai_generate_tags()`, etc.

### 2. Cloud Sync (Optional)

- Backend API for prompt storage
- Sync saved prompts across devices
- Requires user account system

### 3. Plugin System

- Allow community-contributed tag packs
- Installable via JSON files
- Merged with core tag library

### 4. Advanced Analytics

- Usage tracking (local only, privacy-preserving)
- Prompt success metrics (user feedback)
- Tag popularity charts

---

## Troubleshooting

### Common Issues

**Issue**: "Tauri commands not found"
**Solution**: Ensure commands are registered in `invoke_handler` in `main.rs`

**Issue**: "Type mismatch between frontend and backend"
**Solution**: Ensure TypeScript types match Rust models exactly

**Issue**: "App won't build on Linux"
**Solution**: Install webkit2gtk and other prerequisites (see Tauri docs)

**Issue**: "Icons not showing"
**Solution**: Generate icons with `tauri icon` command

---

## References

- [Tauri V2 Documentation](https://v2.tauri.app/)
- [React Documentation](https://react.dev/)
- [Zustand Documentation](https://zustand-demo.pmnd.rs/)
- [TailwindCSS Documentation](https://tailwindcss.com/)
- [Serde Documentation](https://serde.rs/)

---

**Last Updated**: 2025-11-25
**Version**: 0.1.0
