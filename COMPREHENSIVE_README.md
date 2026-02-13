# 🔗 URL Shortener - ClippyURL

A **production-ready URL shortening service** built with modern React, Supabase, and Vite. Shorten long URLs, track analytics, and manage your links through an intuitive dashboard.

![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-Latest-646CFF?logo=vite)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?logo=supabase)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-Latest-38B2AC?logo=tailwindcss)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript)

---

## ✨ Live Demo & Links

- **🌐 Live Application**: [https://clippyurl.vercel.app/](https://clippyurl.vercel.app/)
- **📚 Repository**: [GitHub](https://github.com/kartikey2004-git/URL-Shortener)
- **📋 Project Analysis**: [PROJECT_ANALYSIS.md](./PROJECT_ANALYSIS.md)

---

## 🎯 Key Features

### 🔗 Instant URL Shortening

- Convert long, messy URLs into clean, shareable links
- Custom URL aliases (optional)
- Automatic QR code generation
- One-click copy to clipboard

### 📊 Advanced Analytics Dashboard

- **Click Tracking**: Real-time click counts for each link
- **Device Analytics**: Breakdown by device type (mobile, desktop, tablet)
- **Location Insights**: Geographic data visualization
- **Timestamp Tracking**: Detailed click history
- **Search & Filter**: Find links by title or custom URL

### 🔐 Secure User Authentication

- Email/password authentication via Supabase
- Role-based access control (authenticated users only)
- Session persistence across browser refreshes
- Secure logout functionality

### 🧾 Link Management

- Create, edit, and delete shortened links
- Bulk update titles
- View detailed link statistics
- Personal dashboard for link organization

### 📱 Responsive Design

- **Mobile-first** approach
- Fully functional on mobile, tablet, and desktop
- Smooth animations and transitions
- Touch-friendly UI components

### ⚡ Performance Optimized

- Fast load times with Vite
- Code splitting for efficient bundling
- Lazy loading for route components
- Optimized API calls with Supabase Realtime

---

## 🏗️ Architecture Overview

### System Design

```
┌─────────────────┐
│  React Frontend │
│  (React Router) │
└────────┬────────┘
         │
    ┌────▼────────────────────────┐
    │   State Management          │
    │   (Context API + Hooks)     │
    └────┬───────────────────────┬┘
         │                       │
    ┌────▼──────┐        ┌─────▼─────┐
    │ UI Layer  │        │ Auth Core │
    │(Components)│        │ (UrlState)│
    └────┬──────┘        └─────┬─────┘
         │                     │
    ┌────▼─────────────────────▼──┐
    │   API Service Layer         │
    │  (db/apiAuth,              │
    │   db/apiUrls,              │
    │   db/apiClicks)            │
    └────┬─────────────────────────┘
         │
    ┌────▼──────────────────────────────┐
    │  Supabase Backend                 │
    │  ├─ PostgreSQL DB                 │
    │  ├─ Auth System                   │
    │  ├─ Realtime Subscriptions        │
    │  └─ Row-Level Security (RLS)      │
    └───────────────────────────────────┘
```

### Data Flow

```
User Input → Component → useFetch Hook → API Service → Supabase
                                            ↓
                                    Response → State Update
                                            ↓
                                    Component Re-render
```

### Technology Stack

| Layer                  | Technology           | Purpose                    |
| ---------------------- | -------------------- | -------------------------- |
| **Frontend Framework** | React 18.3           | UI rendering with hooks    |
| **Bundler**            | Vite 5+              | Fast development & build   |
| **Routing**            | React Router v7      | Client-side navigation     |
| **Styling**            | Tailwind CSS         | Utility-first CSS          |
| **UI Components**      | Radix UI             | Headless component library |
| **State Management**   | React Context API    | Global state (auth, user)  |
| **Data Fetching**      | Custom useFetch Hook | Async operations           |
| **Icons**              | Lucide React         | SVG icons                  |
| **Charts**             | Recharts             | Data visualization         |
| **QR Codes**           | react-qrcode-logo    | QR code generation         |
| **Form Validation**    | Yup                  | Schema validation          |
| **Backend**            | Supabase             | BaaS (Auth, DB, Realtime)  |
| **Database**           | PostgreSQL           | Relational DB on Supabase  |
| **Authentication**     | Supabase Auth        | OAuth & Email/Password     |
| **User Agent**         | ua-parser-js         | Device detection           |

---

## 📁 Project Structure

```
url-shortener/
├── src/
│   ├── components/                 # React components
│   │   ├── Create-link.jsx        # Link creation form
│   │   ├── Link-card.jsx          # Link display card
│   │   ├── Device-stats.jsx       # Device analytics
│   │   ├── Location-stats.jsx     # Location analytics
│   │   ├── Header.jsx             # Navigation header
│   │   ├── Login.jsx              # Login form
│   │   ├── SignUp.jsx             # Signup form
│   │   ├── Error.jsx              # Error display
│   │   ├── Require-auth.jsx       # Route protection HOC
│   │   └── ui/                    # Radix UI wrapped components
│   │       ├── accordion.jsx
│   │       ├── avatar.jsx
│   │       ├── Button.jsx
│   │       ├── card.jsx
│   │       ├── dialog.jsx
│   │       ├── dropdown-menu.jsx
│   │       ├── input.jsx
│   │       ├── tabs.jsx
│   │       └── spotlight-new.jsx
│   ├── pages/                     # Route pages
│   │   ├── Auth.jsx               # Authentication page
│   │   ├── Dashboard.jsx          # Main dashboard
│   │   ├── LandingPage.jsx        # Home page
│   │   ├── Link.jsx               # Link details page
│   │   └── RedirectLinkPage.jsx   # Redirect handler
│   ├── hooks/                     # Custom React hooks
│   │   └── Use-fetch.jsx          # Data fetching hook
│   ├── db/                        # Supabase service layer
│   │   ├── supabase.js            # Supabase client init
│   │   ├── apiAuth.js             # Authentication APIs
│   │   ├── apiUrls.js             # URL management APIs
│   │   └── apiClicks.js           # Analytics APIs
│   ├── layouts/                   # Layout components
│   │   └── App.layout.jsx         # Main app layout
│   ├── lib/                       # Utilities
│   │   └── utils.js               # Helper functions
│   ├── assets/                    # Static assets
│   ├── App.jsx                    # Root component
│   ├── Context.jsx                # Global context provider
│   ├── main.jsx                   # React DOM render
│   ├── App.css                    # Global styles
│   └── index.css                  # Base styles
├── public/                        # Static files
├── package.json                   # Dependencies
├── vite.config.js                 # Vite configuration
├── tailwind.config.js             # Tailwind CSS config
├── jsconfig.json                  # JS path aliases
├── eslint.config.js               # ESLint rules
├── postcss.config.js              # PostCSS config
├── .env.example                   # Environment template
├── vercel.json                    # Vercel deployment config
├── components.json                # UI components config
└── README.md                      # This file
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Supabase account (free tier available)
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/kartikey2004-git/URL-Shortener.git
cd url-shortener
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Setup Supabase

#### Option A: Create New Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up and create a new project
3. Get your API credentials from **Settings → API**

#### Option B: Database Schema

Once you have Supabase credentials, create these tables:

**urls table:**

```sql
CREATE TABLE urls (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  long_url TEXT NOT NULL,
  custom_url TEXT UNIQUE,
  short_url TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX urls_user_id_idx ON urls(user_id);
CREATE INDEX urls_custom_url_idx ON urls(custom_url);
```

**clicks table:**

```sql
CREATE TABLE clicks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  url_id UUID NOT NULL REFERENCES urls(id) ON DELETE CASCADE,
  user_agent TEXT,
  ip_address TEXT,
  timestamp TIMESTAMP DEFAULT NOW()
);

CREATE INDEX clicks_url_id_idx ON clicks(url_id);
```

### 4. Configure Environment Variables

Create `.env.local` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

Get these values from Supabase Dashboard:

- Settings → API → Project URL (SUPABASE_URL)
- Settings → API → Project API Keys → anon public (SUPABASE_ANON_KEY)

### 5. Start Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### 6. Build for Production

```bash
npm run build
```

Output will be in the `dist/` folder.

### 7. Preview Production Build

```bash
npm run preview
```

---

## 🎨 Component Guide

### Core Components

#### `RequireAuth` (HOC)

Protects routes by checking authentication status.

```jsx
<RequireAuth>
  <Dashboard />
</RequireAuth>
```

#### `CreateLink`

Modal form to create new shortened links with:

- Title input
- Long URL input
- Custom URL option
- QR code generation
- Real-time validation

#### `LinkCard`

Displays individual shortened link with:

- Link preview
- Click count
- Copy to clipboard
- Edit/Delete buttons
- QR code view

#### `DeviceStats`

Analytics breakdown showing:

- Desktop vs Mobile vs Tablet usage
- Percentage distribution
- Visual charts (Recharts)

#### `LocationStats`

Geographic analytics showing:

- Click origin by location
- Country/City breakdown
- Heat map visualization

---

## 🔄 API Reference

### Authentication (`db/apiAuth.js`)

#### `login(credentials)`

```javascript
import { login } from "@/db/apiAuth";

const response = await login({
  email: "user@example.com",
  password: "password123",
});
```

#### `signup(credentials)`

```javascript
import { signup } from "@/db/apiAuth";

const response = await signup({
  email: "user@example.com",
  password: "password123",
  fullName: "John Doe",
});
```

#### `getCurrentUser()`

```javascript
import { getCurrentUser } from "@/db/apiAuth";

const user = await getCurrentUser();
```

#### `logout()`

```javascript
import { logout } from "@/db/apiAuth";

await logout();
```

### URL Management (`db/apiUrls.js`)

#### `getUrls(userId)`

Fetch all URLs for a user

```javascript
const urls = await getUrls(userId);
```

#### `CreateUrl(data)`

Create a new shortened URL

```javascript
const newUrl = await CreateUrl({
  title: "My Link",
  longUrl: "https://example.com/very/long/url",
  customUrl: "mylink", // optional
  userId: "user-id",
});
```

#### `deleteUrl(urlId)`

Delete a shortened URL

```javascript
await deleteUrl(urlId);
```

### Analytics (`db/apiClicks.js`)

#### `getClicks(urlId)`

Get click data for a specific URL

```javascript
const clicks = await getClicks(urlId);
// Returns: [{ timestamp, device, location, ... }]
```

#### `getClicksforUrls(urlIds)`

Get click data for multiple URLs

```javascript
const clicks = await getClicksforUrls([url1, url2, url3]);
```

---

## 🪝 Custom Hooks

### `useFetch`

Generic data fetching hook with loading/error states.

```javascript
import useFetch from "@/hooks/Use-fetch";

const { data, loading, error, fn } = useFetch(apiFunction, options);

// Usage
useEffect(() => {
  fn(); // Call the function
}, []);
```

**Parameters:**

- `cb` - Callback function to execute
- `options` - Options to pass to the callback
- Returns: `{ data, loading, error, fn }`

---

## 🎯 State Management

### Global Context: `UrlState`

```javascript
import { UrlState } from "@/Context";

const Component = () => {
  const { user, loading, isAuthenticated, fetchUser } = UrlState();

  return <>{loading ? "Loading..." : user?.email}</>;
};
```

**Context Shape:**

```javascript
{
  user: {
    id: "uuid",
    email: "user@example.com",
    role: "authenticated",
    ...supabaseUserData
  },
  loading: boolean,
  isAuthenticated: boolean,
  fetchUser: () => Promise<void>
}
```

---

## 🔐 Security Practices

### Authentication Flow

1. User enters credentials on Auth page
2. Supabase validates and creates session
3. Session stored in browser localStorage
4. On app load, current user is fetched
5. RequireAuth HOC checks authentication status
6. Unauthenticated users redirected to `/auth`

### Row-Level Security (RLS)

All database queries are scoped to the authenticated user:

```sql
-- Users can only see their own URLs
ALTER TABLE urls ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own URLs"
  ON urls FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create URLs"
  ON urls FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

### Best Practices

✅ Store sensitive data in environment variables  
✅ Use HTTPS for all external links  
✅ Validate all user inputs with Yup  
✅ Implement rate limiting on API routes  
✅ Monitor suspicious activity with analytics  
✅ Regularly update dependencies  
✅ Use strong password requirements

---

## 📊 Database Schema

### URLs Table

```javascript
{
  id: UUID,              // Primary key
  user_id: UUID,         // Foreign key to auth.users
  title: string,         // User-friendly title
  long_url: string,      // Original long URL
  custom_url: string,    // Optional custom short URL
  short_url: string,     // Generated short code
  created_at: timestamp,
  updated_at: timestamp
}
```

### Clicks Table

```javascript
{
  id: UUID,              // Primary key
  url_id: UUID,          // Foreign key to urls
  user_agent: string,    // Browser/device info
  ip_address: string,    // Click origin IP
  timestamp: timestamp   // When click occurred
}
```

---

## 📈 Performance Optimizations

### Current Optimizations

✅ Code splitting with React Router  
✅ Lazy loading route components  
✅ Optimized bundle with Vite  
✅ Tailwind CSS purging unused styles  
✅ Image optimization with compression

### Recommended Future Optimizations

- [ ] Add React.memo() for expensive components
- [ ] Implement useMemo() for expensive computations
- [ ] Use useCallback() for function references
- [ ] Enable gzip compression on server
- [ ] Implement service workers for offline support
- [ ] Add image lazy loading
- [ ] Implement virtual scrolling for large lists

---

## 🧪 Testing

To add tests (setup required):

```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom vitest
```

**Example test:**

```javascript
import { render, screen } from "@testing-library/react";
import { RequireAuth } from "@/components/RequireAuth";

test("redirects to auth when not authenticated", () => {
  const { getByText } = render(
    <RequireAuth>
      <div>Protected Content</div>
    </RequireAuth>,
  );
  // Assert redirect happens
});
```

---

## 📝 Linting & Code Quality

Run ESLint:

```bash
npm run lint
```

Fix issues automatically:

```bash
npm run lint -- --fix
```

---

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import repository
4. Add environment variables
5. Deploy

**Vercel Config** (`vercel.json`):

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "env": ["VITE_SUPABASE_URL", "VITE_SUPABASE_ANON_KEY"]
}
```

### Deploy to Netlify

1. Connect repository
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Add environment variables
5. Deploy

### Deploy to Self-Hosted Server

```bash
# Build
npm run build

# Upload dist folder to server
scp -r dist/* user@server:/var/www/url-shortener/

# Setup reverse proxy (NGINX example)
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/url-shortener;

    location / {
        try_files $uri /index.html;
    }
}
```

---

## 🐛 Troubleshooting

### Issue: "Cannot find module '@/components/...'"

**Solution**: Check `jsconfig.json` path aliases are configured correctly

### Issue: "Supabase authentication failing"

**Solution**: Verify environment variables are set correctly and Supabase project is active

### Issue: "QR code not generating"

**Solution**: Check `react-qrcode-logo` package is installed: `npm install react-qrcode-logo`

### Issue: "Styles not loading"

**Solution**: Ensure `tailwind.config.js` includes correct template paths

### Issue: "CORS errors"

**Solution**: Check Supabase project settings allow your domain

---

## 📚 Learning Resources

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev/guide/)
- [Supabase Docs](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React Router v7](https://reactrouter.com/)
- [Radix UI](https://www.radix-ui.com/)

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Kartikey** - [GitHub Profile](https://github.com/kartikey2004-git)

---

## 🙏 Acknowledgments

- React team for amazing UI library
- Supabase for backend infrastructure
- Vercel for hosting and deployment
- Radix UI for accessible components
- Tailwind CSS for styling utilities

---

## 📞 Support

- 💬 Open an issue on GitHub
- 📧 Email: [your-email@example.com]
- 🐦 Twitter: [@yourhandle]

---

## 🎯 Roadmap

### v1.0 (Current)

- ✅ URL shortening
- ✅ Click analytics
- ✅ User authentication
- ✅ Link management

### v1.1 (Planned)

- [ ] Browser extension
- [ ] API endpoints for third-party apps
- [ ] Team/Organization support
- [ ] Custom domains
- [ ] Link expiration

### v2.0 (Future)

- [ ] Mobile app (React Native)
- [ ] Advanced analytics (heatmaps, funnel tracking)
- [ ] A/B testing support
- [ ] Link drafts and scheduling
- [ ] Webhooks and integrations

---

**Made with ❤️ using React + Supabase**
