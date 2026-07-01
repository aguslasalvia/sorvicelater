# 🎫 SorvisLater

**SorvisLater** is an IT service-desk / incident-ticketing system inspired by **ServiceNow**.
It helps teams manage support requests — tickets, incidents, categories and a knowledge base — with JWT authentication and email notifications.

---

## 👨‍💻 Authors

- 🎨 **Joaquín Gómez** – *Front-End*
- 🛠️ **Agustín Lasalvia** – *Back-End*

---

## 🗂️ Repository Structure

Monorepo with one front-end and one back-end:

| Project | Path | Stack | README |
| ------- | ---- | ----- | ------ |
| **Web Client** | [`client`](client) | React 19 · React Router 7 · Vite · TypeScript | [README](client/README.md) |
| **API** | [`server`](server) | NestJS 11 · TypeORM · SQLite | [README](server/README.md) |

---

## 🚀 Quick Start

### 1. Back-end — NestJS

Uses a local SQLite database (`db.sqlite`); no external DB required.

```bash
cd server
npm install
npm run seed         # seed demo user, categories, KB articles and tickets
npm run start:dev    # http://localhost:3000
```

Environment (`server/.env`):

```env
PORT=3000
JWT_SECRET=your_secret
# Email notifications (optional)
MAIL_HOST=smtp.example.com
MAIL_PORT=587
MAIL_USER=your_user
MAIL_PASS=your_pass
MAIL_FROM=SorvisLater <no-reply@sorvicelater.com>
```

### 2. Web Client

```bash
cd client
bun install
bun run dev          # http://localhost:5173
```

Set the API base URL in `client/.env`:

```env
VITE_API_BASE_URL=http://localhost:3000
```

The seeded login is **`testing` / `testing`**.

---

## 🧩 Domain

The system revolves around these core resources:

- **Tickets / Incidents** — support requests with status, priority, urgency, impact, contact type, an **assigned user** and a **category** (both foreign keys).
- **Categories** — the catalog of incident categories (managed from the app).
- **Knowledge Base** — reference articles to help resolve tickets.
- **Users / Auth** — agents who handle tickets; login issues a **JWT** and protected routes require it.
- **Notifications** — Handlebars email templates rendered and sent via `@nestjs-modules/mailer`.

See each project's README for structure, routes and endpoint details.
