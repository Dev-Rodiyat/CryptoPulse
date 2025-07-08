import React, { useEffect, useState } from "react";

const TextToSpeech = () => {
  const [text, setText] = useState("");
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        setVoices(voices);
        const savedVoiceName = localStorage.getItem("selectedVoice");
        const selected = voices.find(v => v.name === savedVoiceName);
        setSelectedVoice(selected || voices[0]);
      } else {
        setTimeout(loadVoices, 100);
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const speak = () => {
    if (!text.trim()) return;

    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = selectedVoice;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };
    utterance.onerror = (e) => {
      console.error("Speech error:", e.error);
      setIsSpeaking(false);
      setIsPaused(false);
    };

    window.speechSynthesis.speak(utterance);
  };

  const pauseSpeech = () => {
    window.speechSynthesis.pause();
    setIsPaused(true);
  };

  const resumeSpeech = () => {
    if (!window.speechSynthesis.speaking || !isPaused) {
      console.warn("Can't resume — either not speaking or not paused.");
      return;
    }

    window.speechSynthesis.resume();
    setIsPaused(false);
  };

  const stopSpeech = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 mt-12 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md rounded-3xl shadow-xl transition-colors duration-300">
      <div className="w-full">
        <div className="flex justify-between items-center w-full px-2">
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            🗣️ Text to Speech
          </h2>

          {text.trim() && (
            <button
              onClick={() => setText("")}
              className="px-4 py-1.5 bg-red-500 hover:bg-red-600 text-white text-sm rounded-md shadow transition-all"
            >
              Clear
            </button>
          )}
        </div>

        <textarea
          className="w-full h-36 sm:h-48 p-4 text-base rounded-xl border border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none transition-all"
          placeholder="Type something for the system to speak aloud..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div className="mt-6 flex flex-col sm:flex-row sm:flex-wrap gap-4 items-stretch sm:items-center">
          <select
            className="w-full sm:flex-1 p-3 rounded-lg border border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-white transition-all"
            value={selectedVoice?.name || ""}
            onChange={(e) => {
              const voice = voices.find((v) => v.name === e.target.value);
              setSelectedVoice(voice);
              localStorage.setItem("selectedVoice", voice?.name);
            }}
          >
            {voices.map((voice, idx) => (
              <option key={idx} value={voice.name}>
                {voice.name} ({voice.lang})
              </option>
            ))}
          </select>

          {!isSpeaking && (
            <button
              onClick={speak}
              className="flex-1 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg shadow-md transition-all"
            >
              🔊 Speak
            </button>
          )}

          {isSpeaking && !isPaused && (
            <>
              <button
                onClick={pauseSpeech}
                className="flex-1 px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg shadow-md transition-all"
              >
                ⏸️ Pause
              </button>
              <button
                onClick={stopSpeech}
                className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-md transition-all"
              >
                🔴 Stop
              </button>
            </>
          )}

          {isSpeaking && isPaused && (
            <>
              <button
                onClick={resumeSpeech}
                className="flex-1 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-md transition-all"
              >
                ▶️ Resume
              </button>
              <button
                onClick={stopSpeech}
                className="flex-1 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-md transition-all"
              >
                🔴 Stop
              </button>
            </>
          )}
        </div>

        {isSpeaking && (
          <div className="mt-6 flex justify-center">
            <div className="flex items-center space-x-2 text-orange-500 animate-pulse">
              <span className="text-2xl">🔊</span>
              <span className="text-base font-semibold">Speaking...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TextToSpeech;