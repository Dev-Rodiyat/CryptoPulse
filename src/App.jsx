import { useState } from "react";
import TextToSpeech from "./components/TextToSpeech";
import SpeechToText from "./components/SpeechToText";
import Translator from "./components/Translator";

function App() {
  const [view, setView] = useState("tts");

  return (
    <div>
      <div className="fixed top-4 left-4 z-50 flex gap-2">
        {["tts", "stt", "translator"].map((tab) => (
          <button
            key={tab}
            onClick={() => setView(tab)}
            className={`px-3 py-1 rounded transition font-medium
          ${view === tab
                ? "bg-orange-700 text-white"
                : "bg-orange-500 text-white hover:bg-orange-600"}`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {view === "tts" && <TextToSpeech />}
      {view === "stt" && <SpeechToText />}
      {view === "translator" && <Translator />}
    </div>
  );
}

export default App;