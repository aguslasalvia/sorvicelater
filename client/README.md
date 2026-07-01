# 🎫 SorvisLater — React Client

The front-end for **SorvisLater**, an IT service-desk / ticketing system inspired by ServiceNow. A single-page application built with **React 19**, **React Router 7** and **Vite**.

---

## 🧰 Tech Stack

- **React 19** + **React DOM 19**
- **React Router 7** — client-side routing
- **Vite** — dev server and bundler
- **TypeScript 5.9**
- **lucide-react** — icon set
- **react-hot-toast** — toasts
- **Bun** — package manager (`bun.lock`)

---

## 📁 Project Structure

```
src/
├── app.tsx                 # Route definitions
├── main.tsx                # App entry point
├── assets/                 # Static assets (favicon, SVGs)
├── components/             # Reusable UI components
│   ├── Counters/           # Ticket state counters
│   ├── Knowledge/          # Knowledge base card + form
│   ├── Menu/               # Sidebar (nav links live here)
│   ├── Modal/              # Modal dialog
│   ├── LoadingState/       # Loading placeholder
│   ├── RequireAuth/        # Auth guard for routes
│   ├── SearchBar/          # Search input
│   └── Ticket/             # Ticket card + form
├── layouts/
│   └── user-layout.tsx     # Shared layout for authenticated views
├── lib/
│   ├── fetch.ts            # API client (authHeaders() attaches the JWT)
│   ├── forms.ts            # Empty form defaults
│   ├── interfaces.ts       # Shared TypeScript types
│   ├── search.ts           # Client-side ticket search
│   └── storage.ts          # localStorage helpers
├── pages/                  # Route-level views
│   ├── login.tsx
│   ├── backlog.tsx
│   ├── new-ticket.tsx
│   ├── new-knowledge.tsx
│   ├── knowledge-list.tsx
│   ├── my-tickets.tsx
│   ├── incidents.tsx
│   ├── ticket-detail.tsx
│   ├── categories.tsx
│   └── not-found.tsx
└── styles/                 # CSS files (imported via the `styles/` alias)
```

> **Conventions:** component/page files use **kebab-case** names; CSS lives in `src/styles` and is imported through the `styles/` path alias.

---

## 🗺️ Routes

| Path                  | View            | Description                       |
| --------------------- | --------------- | --------------------------------- |
| `/`                   | Login           | Authentication screen             |
| `/backlog`            | Backlog         | Ticket backlog dashboard          |
| `/new/ticket`         | New Ticket      | Create a ticket                   |
| `/new/knowledge`      | New Knowledge   | Create a knowledge base article   |
| `/lists/knowledge`    | Knowledge List  | Browse knowledge base articles    |
| `/lists/all-tickets`  | Incidents       | All incidents                     |
| `/lists/my-tickets`   | My Tickets      | Incidents you reported or own     |
| `/categories`         | Categories      | Manage incident categories        |
| `/ticket/:id`         | Ticket Detail   | View a single incident            |
| `*`                   | Not Found       | 404 page                          |

All routes except `/` are gated by `RequireAuth` and rendered inside `UserLayout`.

---

## 🔐 Auth

Login stores the JWT in `localStorage`. Every authenticated request goes through the `authHeaders()` helper in `lib/fetch.ts`, which sends `Authorization: Bearer <token>`.

---

## ⚙️ Configuration

Create a `.env` file at the project root:

```env
VITE_API_BASE_URL=http://localhost:3000
```

### Path aliases (configured in `vite.config.ts`)

| Alias      | Resolves to   |
| ---------- | ------------- |
| `@`        | `src`         |
| `styles`   | `src/styles`  |

---

## 🚀 Getting Started

```bash
# install dependencies
bun install

# start the dev server
bun run dev

# type-check and build for production
bun run build

# preview the production build
bun run preview
```

The dev server runs on Vite's default port (`http://localhost:5173`).
