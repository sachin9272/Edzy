# Edzy Frontend

## 🚀 Setup

1. Install node (recommended LTS) and npm.
2. In the rontend folder, install dependencies:
   `ash
   npm install
   ` 
3. Start local development:
   `ash
   npm run dev
   `
4. Open http://localhost:3000 in your browser.

## 🧩 Build

`ash
npm run build
npm start
`

## 🛠️ Linters

`ash
npm run lint
`

## 📦 Libraries used

- 
ext (16.2.1)
- 
eact (19.2.4)
- 
eact-dom (19.2.4)
- @tanstack/react-query (data fetching, cache)
- 
eact-hook-form (forms and validation)
- 
eact-hot-toast (notifications)
- 	ailwindcss + @tailwindcss/postcss + postcss (CSS utility framework)
- lucide-react (icons)

## 🛠️ Dev dependencies

- 	ypescript
- eslint + eslint-config-next
- @types/node, @types/react, @types/react-dom

## 🧭 Project overview

- Backend API under ../backend
- Frontend source under src/app, src/components, src/lib
- Features: student lookup, snack menu, order flow, modal dialogs

## 🔗 Notes

- Ensure backend at http://localhost:4000 is running before placing orders (if configured this way).
- If path names or API URLs change, update src/lib/api.ts.
