# 🔗 React Link Shortener

A modern, minimalistic frontend built with **React**, **TypeScript**, and **Tailwind CSS** that connects to a custom backend to shorten URLs using the [CleanURI API](https://cleanuri.com/).

## ✨ Features

- 📥 Submit URLs to be shortened
- ⚡ Loading spinner while shortening
- 📜 View the shortened URL with clickable link
- 🕘 Keeps a history of links (in-memory, per session)
- 🎨 Beautiful and responsive UI with Tailwind CSS

## 🚀 Getting Started

### ✅ Requirements

- [Node.js](https://nodejs.org/) (v18+ recommended)
- npm or yarn

### 📥 Installation

```
git clone https://github.com/guibbers/react-link-shortener.git
cd react-link-shortener
npm install
```

## ▶️ Run the project
```
npm run dev
```
The app will be running at http://localhost:3000

## ⚙️ Configuration
Make sure your [backend server](https://github.com/guibbers/link-shortener-server) is running locally at:
```
http://localhost:3333/
```
This app sends a POST request to that endpoint with a JSON body like:
```
{
  "url": "https://example.com"
}
```

## 🧱 Project Structure

```
react-link-shortener/
├── src/
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── ShortenerForm.tsx
│   │   └── HistoryList.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
├── tailwind.config.ts
├── postcss.config.js
├── tsconfig.json
├── vite.config.ts
└── README.md
```

##📦 Technologies

*  ⚛️ React + TypeScript
*  💨 Tailwind CSS
* ⚡ Vite for blazing fast dev server
* 🧠 Modular and component-based architecture

##🧪 Future Improvements

* 💾 Persist history in localStorage
* 📋 Copy-to-clipboard button
* 🧪 Add unit and integration tests
* 🌍 Internationalization support

## 🔗 Related
🔙 [Backend](https://github.com/guibbers/link-shortener-server) — Express server that handles URL shortening via CleanURI.

🧾 License
This project is licensed under the MIT License.

