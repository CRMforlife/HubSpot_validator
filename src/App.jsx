
import Questionnaire from './components/Questionnaire';
import ResultsDashboard from './components/ResultsDashboard';
import { useState } from 'react';
import { translations } from './data/translations';

function App() {
  const [complete, setComplete] = useState(false);
  const [results, setResults] = useState(null);
  const [language, setLanguage] = useState('fi');

  const t = translations[language];

  const handleComplete = (answers) => {
    console.log("Survey completed:", answers);
    setResults(answers);
    setComplete(true);
  };

  return (
    <div className="min-h-screen bg-hubspot-ice text-hubspot-obsidian flex flex-col font-sans">
      <header className="bg-white border-b border-gray-200 py-4 px-6 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-hubspot-orange rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 22h20L12 2zm0 3.5L18.5 20H5.5L12 5.5z" />
              </svg>
            </div>
            <span className="font-bold text-xl text-hubspot-obsidian tracking-tight">{t.appTitle}</span>
          </div>
          <div className="flex items-center gap-4">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="text-sm font-medium text-gray-500 bg-transparent border-none focus:ring-0 cursor-pointer hover:text-hubspot-orange"
            >
              <option value="fi">🇫🇮 Suomi</option>
              <option value="en">🇬🇧 English</option>
            </select>
            <a
              href="https://help.hubspot.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-gray-500 hover:text-hubspot-orange transition-colors"
            >
              {t.help}
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-4">
        {!complete ? (
          <Questionnaire onComplete={handleComplete} language={language} t={t} />
        ) : (
          <ResultsDashboard answers={results} onRestart={() => window.location.reload()} language={language} t={t} />
        )}
      </main>

      <footer className="py-6 text-center text-sm text-gray-400">
        <p>© {new Date().getFullYear()} {t.appTitle}</p>
      </footer>
    </div>
  )
}

export default App
