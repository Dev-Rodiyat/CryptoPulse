import { useState } from "react";
import TextToSpeech from "./components/TextToSpeech";
import SpeechToText from "./components/SpeechToText";

function App() {
  const [view, setView] = useState("tts");

  return (
    <div>
      <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-full shadow-md px-2 py-1 flex gap-1 sm:gap-2">
          {[
            { key: "tts", label: "Text to Speech", icon: "🗣️" },
            { key: "stt", label: "Speech to Text", icon: "🎤" },
          ].map(({ key, label, icon }) => (
            <button
              key={key}
              onClick={() => setView(key)}
              className={`px-4 sm:px-5 py-2 rounded-full text-sm sm:text-base font-medium flex items-center gap-2 transition-all
            ${view === key
                  ? "bg-orange-600 text-white shadow"
                  : "text-slate-700 dark:text-white hover:bg-orange-100 dark:hover:bg-orange-700/30"}`}
            >
              <span>{icon}</span>
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="pt-28 px-4 sm:px-6 lg:px-8">
        {view === "tts" && <TextToSpeech />}
        {view === "stt" && <SpeechToText />}
      </div>
    </div>
  );
}

export default App;