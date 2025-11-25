# Suno Prompt Architect

A powerful Tauri V2 desktop application for building perfect prompts for Suno AI music generation.

## Overview

Suno Prompt Architect helps you create sophisticated, well-structured prompts for Suno AI by providing:

- **Tag Library**: Complete, categorized database of Suno tags with descriptions and usage guidelines
- **Style Builder**: Wizard-based interface for constructing rich style prompts from genres, moods, instruments, and production elements
- **Lyrics Tools**: Section tagging, syllable counting, structure planning, and instruction header generation
- **Prompt Analysis**: Smart detection of contradictions, gaps, and optimization suggestions
- **PRD Export**: Generate comprehensive "Suno Song Spec" documents in Markdown or JSON

## Architecture

This is a **Tauri V2 desktop application**, not a Chrome extension. Key differences:

- Standalone native app for macOS, Windows, and Linux
- Side-by-side workflow: use alongside your browser with Suno Studio
- One-click copy to clipboard for easy prompt transfer
- Local data storage with Tauri Store
- No DOM injection concerns or ToS violations

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite (build tool)
- TailwindCSS (styling)
- Zustand (state management)

### Backend
- Tauri v2 (Rust)
- Tauri plugins:
  - `tauri-plugin-store` - Persistent storage
  - `tauri-plugin-clipboard-manager` - Clipboard operations
  - `tauri-plugin-dialog` - File dialogs
  - `tauri-plugin-shell` - Shell operations

## Project Structure

```
suno-assistant/
├── src/                    # React frontend
│   ├── components/         # UI components
│   ├── stores/            # Zustand state stores
│   ├── lib/               # Utilities and API wrappers
│   ├── types/             # TypeScript types
│   ├── styles/            # CSS files
│   └── assets/            # Static assets and tag library
├── src-tauri/             # Rust backend
│   ├── src/
│   │   ├── commands/      # Tauri command handlers
│   │   ├── models/        # Data models
│   │   └── utils/         # Helper functions
│   └── tauri.conf.json    # Tauri configuration
└── public/                # Static public assets
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Rust and Cargo (for Tauri)
- Platform-specific dependencies:
  - **macOS**: Xcode Command Line Tools
  - **Windows**: Microsoft Visual Studio C++ Build Tools
  - **Linux**: See [Tauri prerequisites](https://v2.tauri.app/start/prerequisites/)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/suno-assistant.git
cd suno-assistant
```

2. Install dependencies:
```bash
npm install
```

3. Run in development mode:
```bash
npm run tauri:dev
```

4. Build for production:
```bash
npm run tauri:build
```

Installers will be created in `src-tauri/target/release/bundle/`.

## Development

### Running the Frontend Only
```bash
npm run dev
```
Visit http://localhost:1420

### Running the Full Tauri App
```bash
npm run tauri:dev
```

### Building
```bash
npm run tauri:build
```

## Workflow

1. **Open Suno Studio** in your browser
2. **Launch Suno Prompt Architect** desktop app
3. **Build your prompt** using the Tag Library and Style Builder
4. **Analyze and optimize** your prompt
5. **Copy to clipboard** with one click
6. **Paste into Suno Studio** and generate!

## Tag Library

The app includes a comprehensive tag library in `src/assets/tags/sample-tags.json` with:

- Genres (pop, rock, electronic, hip-hop, etc.)
- Moods (upbeat, melancholic, aggressive, etc.)
- Instruments (guitar, synth, drums, etc.)
- Vocals (male, female, choir, rap, etc.)
- Structure tags (verse, chorus, bridge, etc.)
- Tempo descriptors (fast, slow, uptempo, etc.)
- Production effects (reverb, distortion, clean, etc.)

Each tag includes:
- Description and usage guidelines
- Synonyms and examples
- Co-occurrence recommendations (what pairs well / what conflicts)
- Metadata (energy level, complexity, era, etc.)

## Roadmap

### Phase 1: Core Features (Current)
- [x] Project setup and architecture
- [x] Basic UI layout
- [ ] Tag library loading and display
- [ ] Tag search and filtering
- [ ] Style builder wizard
- [ ] Clipboard integration

### Phase 2: Advanced Features
- [ ] Lyrics tools (section tagging, syllable counter)
- [ ] Prompt analyzer with scoring
- [ ] Saved prompts and templates
- [ ] PRD export (Markdown/JSON)

### Phase 3: AI Integration
- [ ] OAuth flow for desktop
- [ ] Natural language → tags conversion
- [ ] Prompt refinement and optimization
- [ ] AI-powered PRD generation

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

See [LICENSE](LICENSE) for details.

## Resources

- [Tauri Documentation](https://v2.tauri.app/)
- [React Documentation](https://react.dev/)
- [Suno AI](https://suno.com/)

---

**Note**: This is a community tool and is not affiliated with or endorsed by Suno AI.