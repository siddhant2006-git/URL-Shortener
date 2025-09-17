
# URL Shortener — Track & Manage Your Links

A minimal, fast, and fully functional URL shortener built using **React**, **Supabase**, and **Vite**.  
Shorten long URLs, get analytics, and manage your links through a clean dashboard — all in one place.

---

## Preview

**Live Site** → [https://clippyurl.vercel.app/](https://clippyurl.vercel.app/)  
**Repo** → [https://github.com/kartikey2004-git/URL-Shortener](https://github.com/kartikey2004-git/URL-Shortener)

---

## Tech Stack

| Layer       | Tools Used                               |
|-------------|----------------------------------        |
| Frontend    | React.js, Vite, JavaScript, Tailwind CSS |
| Backend     | Supabase (PostgreSQL, Auth, Realtime)    |
| Utilities   |                                          |

---

## Key Features

- 🔗 **Instant URL Shortening**  
  Cleanly shorten long and messy URLs to compact links.

- 📊 **Analytics Dashboard**  
  Track clicks, device types, timestamps, and more for each shortened URL.

- 🔐 **User Auth with Supabase**  
  Only authenticated users can create, view, and manage their links.

- 🧾 **Link Management System**  
  Edit or delete your links from a personalized dashboard.

- 📱 **Responsive Design**  
  Fully functional across mobile, tablet, and desktop.



## Project Overview

The project follows a frontend-first architecture with Supabase acting as the backend for authentication, real-time database handling, and analytics.

**Supabase Handles:**
- Row-level security for users
- Realtime tracking for click counts
- User session management

**Frontend Handles:**
- Link input + validation
- Client-side routing (React Router)
- Auth state and protected pages
- Responsive UI and animations

---

## Getting Started Locally

### Clone the repo:
```bash
git clone https://github.com/your-username/url-shortener.git
cd url-shortener
```

### Install dependencies
```bash
npm install
```

### Add your Supabase keys

```bash
.env

VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### Run locally
```bash
npm run dev
```


🗂️ Folder Structure
```php

SHORTENX
├── .git
├── dist
├── node_modules
├── public
├── src
│   ├── assets
│   │   └── react.svg
│   ├── components
│   │   └── ui
│   │       ├── Create-link.jsx
│   │       ├── Device-stats.jsx
│   │       ├── Error.jsx
│   │       ├── Header.jsx
│   │       ├── Link-card.jsx
│   │       ├── Location-stats.jsx
│   │       ├── Login.jsx
│   │       ├── Require-auth.jsx
│   │       └── SignUp.jsx
│   ├── db
│   │   ├── apiAuth.js
│   │   ├── apiClicks.js
│   │   ├── apiUrls.js
│   │   └── supabase.js
│   ├── hooks
│   │   └── Use-fetch.jsx
│   ├── layouts
│   │   └── App.layout.jsx
│   ├── lib
│   │   └── utils.js
│   ├── pages
│   │   ├── Auth.jsx
│   │   ├── Dashboard.jsx
│   │   ├── LandingPage.jsx
│   │   ├── Link.jsx
│   │   └── RedirectLinkPage.jsx
│   ├── App.css
│   ├── App.jsx
│   ├── Context.jsx
│   ├── index.css
│   ├── main.jsx
├──.env
├──.gitignore
├──.htaccess
├──component.json
├──eslint.config.js
├──index.html
├──jsconfig.json
├──package-lock.json
├──package.json
├──postcss.config.js
├──README.md
├──tailwind.config.js
├──vercel.json
├──vite.config.js

```

---

## License: This project is open-source. Feel free to explore, use, and contribute!

