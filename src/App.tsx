import { useState } from 'react'

function App() {
  const [activeTab, setActiveTab] = useState<'overview' | 'style' | 'lyrics' | 'library' | 'analysis'>('overview')

  return (
    <div className="h-screen bg-gray-900 text-white flex flex-col">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 p-4">
        <h1 className="text-2xl font-bold text-purple-400">Suno Prompt Architect</h1>
        <p className="text-sm text-gray-400">Build perfect prompts for Suno AI</p>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Navigation */}
        <nav className="w-48 bg-gray-800 border-r border-gray-700 p-4">
          <ul className="space-y-2">
            {[
              { id: 'overview', label: 'Overview', icon: '📊' },
              { id: 'style', label: 'Style Builder', icon: '🎨' },
              { id: 'lyrics', label: 'Lyrics & Structure', icon: '📝' },
              { id: 'library', label: 'Tag Library', icon: '📚' },
              { id: 'analysis', label: 'Analysis & PRD', icon: '🔍' },
            ].map((tab) => (
              <li key={tab.id}>
                <button
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full text-left px-4 py-2 rounded transition-colors ${
                    activeTab === tab.id
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Content Area */}
        <main className="flex-1 overflow-auto p-6">
          {activeTab === 'overview' && (
            <div>
              <h2 className="text-3xl font-bold mb-4">Welcome to Suno Prompt Architect</h2>
              <div className="bg-gray-800 rounded-lg p-6 space-y-4">
                <p className="text-gray-300">
                  This is a Tauri V2 desktop app that helps you build perfect prompts for Suno AI.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-700 rounded p-4">
                    <h3 className="font-bold text-purple-400 mb-2">🎨 Style Builder</h3>
                    <p className="text-sm text-gray-400">
                      Build rich style prompts from genre, mood, instruments, and more.
                    </p>
                  </div>
                  <div className="bg-gray-700 rounded p-4">
                    <h3 className="font-bold text-purple-400 mb-2">📝 Lyrics Tools</h3>
                    <p className="text-sm text-gray-400">
                      Tag sections, check syllables, and structure your lyrics.
                    </p>
                  </div>
                  <div className="bg-gray-700 rounded p-4">
                    <h3 className="font-bold text-purple-400 mb-2">📚 Tag Library</h3>
                    <p className="text-sm text-gray-400">
                      Browse and search all Suno tags with descriptions.
                    </p>
                  </div>
                  <div className="bg-gray-700 rounded p-4">
                    <h3 className="font-bold text-purple-400 mb-2">🔍 Analysis</h3>
                    <p className="text-sm text-gray-400">
                      Optimize prompts and export PRD specs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'style' && (
            <div>
              <h2 className="text-3xl font-bold mb-4">Style Prompt Builder</h2>
              <div className="bg-gray-800 rounded-lg p-6">
                <p className="text-gray-400">Style builder coming soon...</p>
              </div>
            </div>
          )}
          {activeTab === 'lyrics' && (
            <div>
              <h2 className="text-3xl font-bold mb-4">Lyrics & Structure</h2>
              <div className="bg-gray-800 rounded-lg p-6">
                <p className="text-gray-400">Lyrics tools coming soon...</p>
              </div>
            </div>
          )}
          {activeTab === 'library' && (
            <div>
              <h2 className="text-3xl font-bold mb-4">Tag Library</h2>
              <div className="bg-gray-800 rounded-lg p-6">
                <p className="text-gray-400">Tag library coming soon...</p>
              </div>
            </div>
          )}
          {activeTab === 'analysis' && (
            <div>
              <h2 className="text-3xl font-bold mb-4">Prompt Analysis & PRD Export</h2>
              <div className="bg-gray-800 rounded-lg p-6">
                <p className="text-gray-400">Analysis tools coming soon...</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

export default App
