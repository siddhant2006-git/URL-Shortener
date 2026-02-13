# 📋 Quick Reference Guide

## 🚀 Quick Start (60 seconds)

```bash
# 1. Install dependencies
npm install

# 2. Setup environment
echo "VITE_SUPABASE_URL=your_url" > .env.local
echo "VITE_SUPABASE_ANON_KEY=your_key" >> .env.local

# 3. Start dev server
npm run dev

# 4. Open browser
# http://localhost:5173
```

---

## 📁 File Guide

### Creating New Components

**Filename Convention:**

```javascript
// Components go in src/components/
src/components/FeatureName.jsx

// NOT:
src/components/feature-name.jsx ❌ (inconsistent)
```

**Component Template:**

```jsx
import { useState, useEffect } from "react";
import { UrlState } from "@/Context";

const MyComponent = () => {
  const { user } = UrlState();
  const [state, setState] = useState(null);

  useEffect(() => {
    // Side effects here
  }, []); // ⚠️ Include all dependencies!

  return <div>{/* JSX */}</div>;
};

export default MyComponent;
```

### Creating API Functions

**Location:**

```javascript
// API functions go in src/db/
src / db / apiFeature.js;
```

**Template:**

```javascript
import supabase from "./supabase";

export async function getFeature(userId) {
  try {
    const { data, error } = await supabase
      .from("table_name")
      .select("*")
      .eq("user_id", userId);

    if (error) throw new Error(error.message);
    return data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
```

### Creating Custom Hooks

**Location:**

```javascript
// Hooks go in src/hooks/
src / hooks / useFeatureName.js;
```

**Template:**

```javascript
import { useState, useEffect, useCallback } from "react";

const useFeatureName = (initialValue) => {
  const [state, setState] = useState(initialValue);

  const updateState = useCallback((newValue) => {
    setState(newValue);
  }, []);

  return { state, updateState };
};

export default useFeatureName;
```

---

## 🔐 Auth Patterns

### Protecting Routes

```jsx
import RequireAuth from "@/components/RequireAuth";

<Route
  path="/dashboard"
  element={
    <RequireAuth>
      <Dashboard />
    </RequireAuth>
  }
/>;
```

### Using Auth Context

```jsx
const { user, isAuthenticated, loading } = UrlState();

if (loading) return <Spinner />;
if (!isAuthenticated) return <Navigate to="/auth" />;

return <div>{user.email}</div>;
```

### Login Flow

```jsx
import { UrlState } from '@/Context';
import { login } from '@/db/apiAuth';

const LoginForm = () => {
  const { fetchUser } = UrlState();

  const handleLogin = async (email, password) => {
    try {
      await login({ email, password });
      await fetchUser(); // Refresh user state
      navigate('/dashboard');
    } catch (error) {
      console.error(error.message);
    }
  };

  return (/* form JSX */);
};
```

---

## 🎣 Hook Patterns

### useFetch Pattern

```jsx
const { data, loading, error, fn } = useFetch(getUrls, userId);

useEffect(() => {
  fn(); // Call the async function
}, [fn]); // ⚠️ Include fn as dependency!
```

### Multiple useFetch Calls

```jsx
const { data: urls, fn: fetchUrls } = useFetch(getUrls, userId);

const { data: clicks, fn: fetchClicks } = useFetch(getClicksforUrls, urlIds);

useEffect(() => {
  fetchUrls();
}, []);

useEffect(() => {
  if (urls?.length) {
    fetchClicks();
  }
}, [urls?.length, fetchClicks]); // ⚠️ All dependencies!
```

### Form Handling with Validation

```jsx
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(6).required(),
});

const handleSubmit = async (formValues) => {
  try {
    await schema.validate(formValues);
    // Form is valid, proceed
  } catch (error) {
    setErrors({ [error.path]: error.message });
  }
};
```

---

## 🎨 Component Patterns

### Creating a Dialog Component

```jsx
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

const MyDialog = () => {
  return (
    <Dialog>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Title</DialogTitle>
        </DialogHeader>
        {/* Content */}
        <DialogFooter>
          <Button>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
```

### Conditional Rendering

```jsx
// Do NOT use conditional rendering inside JSX
{loading && <Spinner />} ✅

// Instead, return early
if (loading) return <Spinner />;
if (error) return <Error message={error} />;
if (!data) return <Empty />;

return <Content data={data} />; ✅
```

### Handling Array Data

```jsx
const urls = [
  { id: 1, title: 'Link 1' },
  { id: 2, title: 'Link 2' },
];

// ✅ Good - Extract map to function
const renderUrls = (urls) => urls.map(url => (
  <LinkCard key={url.id} url={url} />
));

return <div>{renderUrls(urls)}</div>;

// ❌ Avoid - Inline complex logic
{urls.map(url => (
  <div key={url.id}>
    {url.title}
    {url.clicks && url.clicks.map(...)} // Nested loops
  </div>
))}
```

---

## 📊 Styling Patterns

### Tailwind CSS Classes

```jsx
// ✅ Use utility classes
<div className="flex gap-4 p-4 rounded-lg bg-white shadow">
  <h1 className="text-2xl font-bold text-gray-900">
    Heading
  </h1>
</div>

// ❌ Avoid inline styles
<div style={{ display: 'flex', gap: '16px' }}>
```

### Responsive Design

```jsx
// Mobile-first approach
<div className="
  text-sm sm:text-base md:text-lg lg:text-xl
  p-2 sm:p-4 md:p-6 lg:p-8
  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3
">
```

### Dark Mode (if applicable)

```jsx
<div className="
  bg-white dark:bg-gray-900
  text-gray-900 dark:text-white
">
```

---

## 🔄 Data Fetching Patterns

### Fetching Data on Component Mount

```jsx
const Dashboard = () => {
  const { data: urls, fn: fetchUrls, loading } = useFetch(getUrls, userId);

  useEffect(() => {
    fetchUrls();
  }, [fetchUrls]); // ⚠️ Include dependency!

  return (
    <div>
      {loading && <Spinner />}
      {urls?.map((url) => (
        <LinkCard key={url.id} url={url} />
      ))}
    </div>
  );
};
```

### Refetching on Dependency Change

```jsx
useEffect(() => {
  if (searchQuery) {
    // Refetch with new search query
    fetchUrls(searchQuery);
  }
}, [searchQuery, fetchUrls]); // ⚠️ Both dependencies!
```

### Parallel Requests

```jsx
const { data: urls, fn: fetchUrls } = useFetch(getUrls, userId);

const { data: clicks, fn: fetchClicks } = useFetch(getClicksforUrls, []); // Separate calls

useEffect(() => {
  fetchUrls();
  fetchClicks();
}, []);
```

---

## ❌ Common Mistakes to Avoid

### ❌ Missing Dependencies in useEffect

```javascript
// Wrong - fn gets stale reference
useEffect(() => {
  fn();
}, []); // fn not included!

// Right
useEffect(() => {
  fn();
}, [fn]); // Dependency included
```

### ❌ Creating New Objects in JSX

```javascript
// Wrong - new object created on every render
const MyComponent = () => {
  const config = { color: "red" };
  return <Icon config={config} />; // Re-creates every render
};

// Right
const MyComponent = () => {
  const config = useMemo(() => ({ color: "red" }), []);
  return <Icon config={config} />;
};
```

### ❌ Component Props Not Validated

```javascript
// Wrong - no prop validation
const LinkCard = (props) => {
  return <div>{props.url.title}</div>; // Could be undefined!
};

// Right - add PropTypes
import PropTypes from "prop-types";

const LinkCard = ({ url }) => {
  return <div>{url.title}</div>;
};

LinkCard.propTypes = {
  url: PropTypes.shape({
    id: PropTypes.string.required(),
    title: PropTypes.string.required(),
  }).required(),
};
```

### ❌ Async Code in useEffect Without Cleanup

```javascript
// Wrong - possible memory leaks
useEffect(() => {
  fetchData().then((data) => setState(data));
}, []); // No cleanup

// Right - wrap in async function or use AbortController
useEffect(() => {
  const controller = new AbortController();

  fetchData().then((data) => {
    if (!controller.signal.aborted) {
      setState(data);
    }
  });

  return () => controller.abort();
}, []);
```

### ❌ Keys in Lists

```javascript
// Wrong - using index as key
{
  urls.map((url, i) => <LinkCard key={i} url={url} />);
}

// Right - use unique ID
{
  urls.map((url) => <LinkCard key={url.id} url={url} />);
}
```

---

## 🐛 Debugging Tips

### Console Logging

```javascript
// Log component renders
console.log("Dashboard rendered", { user, loading });

// Log state changes
console.log("State updated:", { before: prevState, after: newState });

// Log API responses
console.log("API Response:", { status: 200, data });
```

### React DevTools

```
1. Install React DevTools browser extension
2. Open DevTools (F12)
3. Find "Components" or "Profiler" tab
4. Inspect component props and state
5. Check render times in Profiler
```

### Error Handling

```javascript
try {
  const result = await fetchData();
  setState(result);
} catch (error) {
  console.error("Error details:", {
    message: error.message,
    code: error.code,
    stack: error.stack,
  });
  setError(error.message);
}
```

### Network Inspection

```
1. Open DevTools (F12)
2. Go to "Network" tab
3. Filter by API calls
4. Check request/response headers
5. Verify status codes (200, 401, 500, etc.)
```

---

## 📦 Useful Commands

```bash
# Development
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run lint -- --fix # Fix ESLint issues

# Testing (when setup)
npm test            # Run tests
npm run test:watch  # Watch mode

# Utilities
npm outdated        # Check outdated packages
npm update          # Update packages
npm audit           # Security audit
npm install pkg     # Add new package
npm uninstall pkg   # Remove package
```

---

## 🔗 Useful Links

- **React Docs**: https://react.dev
- **Vite Docs**: https://vitejs.dev
- **Supabase Docs**: https://supabase.com/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Radix UI**: https://www.radix-ui.com/docs
- **React Router**: https://reactrouter.com/
- **Recharts**: https://recharts.org/
- **Yup Validation**: https://github.com/jquense/yup

---

## 🎯 Before Pushing Code

- [ ] Run `npm run lint` and fix warnings
- [ ] Test authentication flow (login/signup/logout)
- [ ] Test all forms and validations
- [ ] Check responsive design on mobile
- [ ] Verify all links work
- [ ] Test error scenarios (no internet, API errors)
- [ ] Check console for errors/warnings
- [ ] Commit with clear messages

---

## 🚀 Performance Checklist

- [ ] Components use `React.memo` if needed
- [ ] Expensive operations use `useMemo`
- [ ] Callbacks use `useCallback`
- [ ] Images are optimized
- [ ] Code splitting is implemented
- [ ] Unused dependencies removed
- [ ] Network requests are batched
- [ ] Infinite loops prevented
- [ ] Memory leaks cleaned up
- [ ] Build size is reasonable

---

## 📝 Code Review Checklist

- [ ] Code is readable and self-explanatory
- [ ] Functions have single responsibility
- [ ] No hardcoded values (use constants)
- [ ] Error handling is present
- [ ] Security best practices followed
- [ ] Naming conventions consistent
- [ ] No console.logs in production code
- [ ] Comments explain WHY, not WHAT
- [ ] Tests are passing
- [ ] No ESLint warnings

---

## 🆘 Getting Help

If stuck:

1. **Check Documentation** - React/Vite/Supabase docs
2. **Search GitHub Issues** - Similar problems might be solved
3. **Check Stack Overflow** - Tag: [reactjs], [javascript], [supabase]
4. **Read Error Messages** - Often they tell you exactly what's wrong
5. **Use DevTools** - Console, Network, React DevTools tabs
6. **Minimal Reproduction** - Create smallest example that breaks
7. **Ask in Communities** - Reddit r/reactjs, Discord servers

---

**Last Updated**: February 2026  
**Next Review**: Monitor for dependency updates and security patches
