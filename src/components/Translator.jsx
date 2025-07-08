import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdEdit, MdDone, MdSwapHoriz } from "react-icons/md";
import { IoCopyOutline } from "react-icons/io5";

export default function Translator() {
    const [langs, setLangs] = useState([]);
    const [srcLang, setSrcLang] = useState("en");
    const [tgtLang, setTgtLang] = useState("es");
    const [inputText, setInputText] = useState("");
    const [outputText, setOutputText] = useState("");
    const [inEdit, setInEdit] = useState(false);
    const [copyClicked, setCopyClicked] = useState(false);
    const [editClicked, setEditClicked] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        axios.get("https://libretranslate.com/languages")
            .then((res) => setLangs(res.data))
            .catch(console.error);
    }, []);

    const translate = async () => {
        if (!inputText.trim() || srcLang === tgtLang) return;
        setLoading(true);
        try {
            const params = new URLSearchParams();
            params.append("q", inputText);
            params.append("source", srcLang);
            params.append("target", tgtLang);
            const res = await axios.post("https://translate.argosopentech.com/translate", params, {
                headers: { "content-type": "application/x-www-form-urlencoded" }
            });
            console.log({ res })
            setOutputText(res.data.translatedText);
        } catch (err) {
            console.error(err);
            alert("Translation failed");
        } finally {
            setLoading(false);
            setInEdit(false);
        }
    };

    const swapLangs = () => {
        setSrcLang(tgtLang);
        setTgtLang(srcLang);
        setOutputText("");
        setInEdit(false);
    };

    const toggleEdit = () => {
        setEditClicked(true);
        setInEdit(!inEdit);
        setTimeout(() => setEditClicked(false), 200);
    };

    const copyOutput = () => {
        setCopyClicked(true);
        navigator.clipboard.writeText(outputText);
        setTimeout(() => setCopyClicked(false), 200);
    };

    return (
        <div className="max-w-2xl mx-auto mt-12 p-6 bg-white dark:bg-slate-800 rounded-2xl shadow-xl transition-colors">
            <h2 className="text-3xl font-semibold text-center mb-6 text-slate-800 dark:text-white">
                🌍 Translator
            </h2>

            <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <select
                    className="flex-1 p-2 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-white"
                    value={srcLang}
                    onChange={(e) => setSrcLang(e.target.value)}
                >
                    {langs.map((l) => (
                        <option key={l.code} value={l.code}>{l.name}</option>
                    ))}
                </select>

                <button
                    onClick={swapLangs}
                    className="self-center text-2xl text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition"
                    title="Swap Languages"
                >
                    <MdSwapHoriz />
                </button>

                <select
                    className="flex-1 p-2 rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-white"
                    value={tgtLang}
                    onChange={(e) => setTgtLang(e.target.value)}
                >
                    {langs.map((l) => (
                        <option key={l.code} value={l.code}>{l.name}</option>
                    ))}
                </select>
            </div>

            <textarea
                className="w-full h-32 p-4 mb-4 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-white resize-none focus:ring-2 focus:ring-orange-500 transition"
                placeholder="Enter text..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
            />

            <button
                onClick={translate}
                disabled={loading || !inputText.trim() || srcLang === tgtLang}
                className={`w-full py-2 mb-6 text-white rounded-md shadow-md transition ${loading || !inputText.trim() || srcLang === tgtLang
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-500 hover:bg-blue-600"
                    }`}
            >
                {loading ? "Translating…" : "Translate"}
            </button>

            <div className="relative">
                <textarea
                    className="w-full h-32 p-4 pr-20 rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-white resize-none"
                    placeholder="Translated text..."
                    value={outputText}
                    readOnly={!inEdit}
                    onChange={(e) => setOutputText(e.target.value)}
                />

                {outputText && (
                    <div className="absolute top-2 right-2 flex gap-2">
                        <button
                            onClick={toggleEdit}
                            className={`text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 text-xl transition-transform duration-150 ${editClicked ? "scale-110" : ""}`}
                        >
                            {inEdit ? <MdDone /> : <MdEdit />}
                        </button>
                        <button
                            onClick={copyOutput}
                            className={`text-purple-500 hover:text-purple-600 dark:text-purple-400 dark:hover:text-purple-300 text-xl transition-transform duration-150 ${copyClicked ? "scale-110" : ""}`}
                        >
                            <IoCopyOutline />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}