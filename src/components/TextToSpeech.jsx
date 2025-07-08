import React, { useEffect, useState } from "react";

const TextToSpeech = () => {
  const [text, setText] = useState("");
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Fetch voices on load
  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);

      // Load previously selected voice
      const savedVoiceName = localStorage.getItem("selectedVoice");
      if (savedVoiceName) {
        const saved = availableVoices.find(v => v.name === savedVoiceName);
        if (saved) setSelectedVoice(saved);
      } else if (availableVoices.length) {
        setSelectedVoice(availableVoices[0]);
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const speak = () => {
    if (!text.trim()) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = selectedVoice;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
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
    window.speechSynthesis.resume();
    setIsPaused(false);
  };

  const stopSpeech = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
  };

  return (
    <div className="max-w-xl mx-auto p-6 mt-10 bg-white dark:bg-slate-800 rounded-2xl shadow-lg transition-colors duration-300 flex items-center justify-center">
      <div className="w-full">
        <h2 className="text-2xl font-semibold text-slate-800 dark:text-white mb-4">
          🗣️ Text to Speech
        </h2>

        <textarea
          className="w-full lg:h-60 h-32 p-4 text-base rounded-lg border border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
          placeholder="Enter text to speak..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <div className="mt-2 flex justify-end">
          <button
            onClick={() => setText("")}
            className="px-4 py-1 bg-red-500 hover:bg-red-600 text-white text-sm rounded shadow-sm"
          >
            Clear
          </button>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
          <select
            className="w-full sm:w-auto flex-1 p-2 rounded-md border border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
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
              className="px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md shadow-md transition-colors"
            >
              🔊 Speak
            </button>
          )}

          {isSpeaking && !isPaused && (
            <>
              <button
                onClick={pauseSpeech}
                className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md shadow-md transition-colors"
              >
                ⏸️ Pause
              </button>
              <button
                onClick={stopSpeech}
                className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md shadow-md transition-colors"
              >
                🔴 Stop
              </button>
            </>
          )}

          {isSpeaking && isPaused && (
            <>
              <button
                onClick={resumeSpeech}
                className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md shadow-md transition-colors"
              >
                ▶️ Resume
              </button>
              <button
                onClick={stopSpeech}
                className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md shadow-md transition-colors"
              >
                🔴 Stop
              </button>
            </>
          )}
        </div>

        {isSpeaking && (
          <div className="mt-4 flex justify-center">
            <div className="flex items-center space-x-2 text-orange-500 animate-pulse">
              <span className="text-2xl">🔊</span>
              <span className="text-sm font-medium">Speaking...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TextToSpeech;