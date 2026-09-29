# 🌱 Eco-Sorter

![Eco-Sorter Hero](https://img.shields.io/badge/Status-Published-success?style=for-the-badge)
![Platform](https://img.shields.io/badge/Platform-Android_&_Web-blue?style=for-the-badge&logo=android)
![Tech Stack](https://img.shields.io/badge/Tech-React_%7C_Vite_%7C_Capacitor-20232A?style=for-the-badge&logo=react)

**Eco-Sorter** is a beautifully designed, hyper-casual educational mobile game built to teach kids and families how to properly manage waste and save the planet.

Through fast-paced, satisfying gameplay, players must quickly sort over 100+ unique trash items into the correct bins before time runs out. The game dynamically teaches real-world environmental skills without feeling like a classroom.

---

## ✨ Key Features

*   **🎮 Addicting Gameplay Loop:** Drag, drop, and build combos! Fast-paced sorting mechanics paired with deeply satisfying audio and visual feedback (confetti, screen shake, and bouncy physics).
*   **🌍 Fully Bilingual (EN / FR):** The entire app, including UI and educational popups, can be instantly toggled between English and French.
*   **🦸‍♂️ Hero Mode:** Break your High Score to activate "Super Earth Hero Mode", featuring dynamic background animations, pulsing lights, and a massive confetti celebration!
*   **📚 Educational 'Eco-Facts':** When a player sorts an item incorrectly, the game pauses to deliver a beautifully formatted, bilingual fact explaining *why* the item belongs in a specific bin and *how* it impacts the Earth.
*   **🧩 Smart Compound Items:** Some items (like a Coffee Cup) must be tapped to separate into recyclable and landfill parts before they can be sorted.
*   **🎶 Relaxing Audio System:** Custom-synthesized, royalty-free, soft ambient background music combined with satisfying pop and buzzer sound effects.
*   **🎚️ Adaptive Difficulty:** Easy, Normal, and Hard modes that dynamically adjust the clock and item spawn rates.

---

## 🛠️ Technology Stack

*   **Frontend Framework:** React 18
*   **Build Tool:** Vite
*   **Mobile Compilation:** Ionic Capacitor (Android Native)
*   **Animations:** Framer Motion & Canvas Confetti
*   **Icons:** Lucide-React
*   **Styling:** Custom Vanilla CSS with modern Glassmorphism & Micro-animations

---

## 🚀 Running Locally

To run the game locally in your web browser:

```bash
# Install dependencies
npm install

# Start the Vite development server
npm run dev
```

## 📱 Building for Android

This project uses Capacitor to compile the React web app into a native Android `.aab` or `.apk` file.

```bash
# 1. Build the production web bundle
npm run build

# 2. Sync the web assets to the native Android project
npx cap sync android

# 3. Open Android Studio (Optional)
npx cap open android
```
*(Note: Requires JDK 17 for compilation)*

---
*Created with love to protect our planet by The Eco Sorter Team! 🌍*
