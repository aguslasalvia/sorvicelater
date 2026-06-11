# 🎫 SorvisLater — React Client

The front-end for **SorvisLater**, an IT ticketing system for Minecraft servers inspired by ServiceNow. This is a single-page application built with **React 19**, **React Router 7** and **Vite 7**.

---

## 🧰 Tech Stack

- **React 19** + **React DOM 19**
- **React Router 7** — client-side routing
- **Vite 7** — dev server and bundler
- **TypeScript 5.9**
- **lucide-react** — icon set
- **Bun** — package manager (`bun.lock`)

---

## 📁 Project Structure

```
src/
├── app.tsx                 # Route definitions
├── main.tsx                # App entry point
├── assets/                 # Static assets (SVGs)
├── components/             # Reusable UI components
│   ├── Counters/           # Ticket state counters
│   ├── Knowledge/          # Knowledge base card + form
│   ├── Menu/               # Menu bar
│   ├── Navbar/             # Top navigation
│   └── Ticket/             # Ticket card + form
├── layouts/
│   └── user-layout.tsx     # Shared layout for authenticated views
├── lib/
│   ├── fetch.ts            # API client (calls the backend)
│   ├── forms.ts            # Form helpers
│   └── interfaces.ts       # Shared TypeScript types
├── pages/                  # Route-level views
│   ├── login.tsx
│   ├── backlog.tsx
│   ├── new-ticket.tsx
│   ├── new-knowledge.tsx
│   ├── knowledge-list.tsx
│   ├── my-tickets.tsx
│   └── incidents.tsx
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
| `/lists/allTickets`   | Incidents       | All tickets                       |
| `/lists/myTickets`    | My Tickets      | Tickets assigned to the user      |

All routes except `/` are rendered inside `UserLayout`.

---

## ⚙️ Configuration

Create a `.env` file at the project root:

```env
VITE_API_BASE_URL=http://localhost:5000
```

This base URL points to the backend API (see the `server/express` or `server/nest` projects).

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
