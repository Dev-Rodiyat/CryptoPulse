# 🎙️ VoiceVerse — TTS, STT & Translator App

VoiceVerse is a modern web app that integrates **Text-to-Speech**, **Speech-to-Text**, and **Language Translation** in one seamless experience. Designed with accessibility and usability in mind, this project is perfect for voice-enabled productivity, learning, or communication across languages.

## ✨ Features

- 🗣️ **Speech to Text (STT)**  
  Convert your spoken words into editable text using the Web Speech API.

- 🔊 **Text to Speech (TTS)**  
  Hear typed or translated text read aloud using the browser's native speech synthesis.

- 🌍 **Language Translator**  
  Translate text between multiple languages using the LibreTranslate public API.

## 🧠 Tech Stack

- **React** + **Vite** for fast and modern frontend development.
- **Tailwind CSS** for responsive and elegant styling.
- **React Icons** for interactive UI controls.
- **Web Speech API** for STT & TTS functionality.
- **LibreTranslate API** for real-time language translation.

## 🛠️ How It Works

### Speech to Text
- Click the microphone button to start listening.
- Your speech will be transcribed in real-time.
- Edit or copy the result as needed.

### Text to Speech
- Type or paste text in any language.
- Select a voice and click "Speak" to hear it read aloud.

### Translation
- Select source and target languages.
- Enter text and click "Translate".
- Copy or listen to the translated output.

## 🌐 Live Demo

> https://voice-verse-six.vercel.app/

## ⚠️ Note on API Usage

This project uses the public instance of [LibreTranslate](https://libretranslate.com), which is **open-source** and **free to use for non-commercial or demo purposes**. If you plan to scale this app or deploy it for production, consider:
- Self-hosting the LibreTranslate backend.
- Using a paid translation API (Google, DeepL, etc.).

## 📦 Installation

```bash
git clone https://github.com/Dev-Rodiyat/VoiceVerse.git
cd voiceverse
npm install
npm run dev