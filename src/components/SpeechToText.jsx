import React, { useState, useRef } from "react";
import { IoCopyOutline } from "react-icons/io5";
import { MdDone, MdEdit } from "react-icons/md";
import { toast } from "react-toastify";

const SpeechToText = () => {
    const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

    const recognitionRef = useRef(null);
    const [listening, setListening] = useState(false);
    const [transcript, setTranscript] = useState("");
    const [isEditable, setIsEditable] = useState(false);

    const startListening = () => {
        if (!SpeechRecognition) {
            toast.error("Speech Recognition not supported in this browser.");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.lang = "en-US";

        recognition.onstart = () => setListening(true);
        recognition.onend = () => setListening(false);
        recognition.onerror = (event) => {
            console.error("Recognition error:", event.error);
            setListening(false);
        };

        recognition.onresult = (event) => {
            let finalTranscript = "";
            for (let i = event.resultIndex; i < event.results.length; i++) {
                if (event.results[i].isFinal) {
                    finalTranscript += event.results[i][0].transcript;
                }
            }
            setTranscript((prev) => prev + finalTranscript);
        };

        recognition.start();
        recognitionRef.current = recognition;
    };

    const stopListening = () => {
        recognitionRef.current?.stop();
        setListening(false);
    };

    const clearTranscript = () => setTranscript("");

    const toggleEditable = () => setIsEditable(!isEditable);

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(transcript);
            toast.success("Copied to clipboard!");
        } catch (err) {
            console.error("Failed to copy: ", err);
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-xl transition-colors duration-300">
            <div className="w-full">
                <h2 className="sm:text-3xl text-2xl font-semibold text-slate-800 dark:text-white mb-6 text-center">
                    🎤 Speech to Text
                </h2>

                <div className="relative w-full">
                    <textarea
                        className="w-full min-h-[12rem] p-4 pr-20 text-base rounded-lg border border-slate-300 dark:border-slate-700 dark:bg-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                        placeholder="Start speaking or click start..."
                        value={transcript}
                        readOnly={!isEditable}
                        onChange={(e) => setTranscript(e.target.value)}
                    />

                    {transcript && (
                        <div className="absolute top-3 right-3 flex gap-2">
                            <button
                                onClick={toggleEditable}
                                className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 text-xl transition"
                                title={isEditable ? 'Lock Editing' : 'Edit Text'}
                            >
                                {isEditable ? <MdDone /> : <MdEdit />}
                            </button>
                            <button
                                onClick={copyToClipboard}
                                className="text-purple-500 hover:text-purple-600 dark:text-purple-400 dark:hover:text-purple-300 text-xl transition"
                                title="Copy to Clipboard"
                            >
                                <IoCopyOutline />
                            </button>
                        </div>
                    )}
                </div>

                <div className="mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    {!listening ? (
                        <button
                            onClick={startListening}
                            className="w-full sm:w-auto px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md shadow-md transition"
                        >
                            🎙️ Start Listening
                        </button>
                    ) : (
                        <button
                            onClick={stopListening}
                            className="w-full sm:w-auto px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md shadow-md transition"
                        >
                            ⏹️ Stop Listening
                        </button>
                    )}

                    {transcript && (
                        <button
                            onClick={clearTranscript}
                            className="w-full sm:w-auto px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md shadow-md transition"
                        >
                            🧹 Clear
                        </button>
                    )}
                </div>

                {listening && (
                    <div className="mt-6 flex justify-center">
                        <div className="flex items-center space-x-2 text-green-500 animate-pulse">
                            <span className="text-2xl">🎙️</span>
                            <span className="text-sm font-medium">Listening...</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SpeechToText;