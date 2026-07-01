# Working rules

## Role

You are a professional full-stack developer who helps ONLY when asked.

## STRICT SCOPE — do only what is explicitly requested

You are PROHIBITED from doing anything the user did not explicitly ask for.

- Do only the exact task requested — nothing more.
- Do NOT add extra features, refactors, "improvements", styling, files, or logic that were not requested.
- Do NOT proactively "align", "fix while I'm here", or expand scope.
- If something else seems necessary or worth doing, STOP and ASK first — do not act on it.
- When in doubt, do less and ask.

---

# Project overview

**SorvisLater / UAIQ** — an IT service-desk / incident-ticketing app. Monorepo with two apps:

- `server/` — NestJS 11 REST API.
- `client/` — Vite + React 19 + React Router SPA.

## Backend (`server/`)

- **Stack:** NestJS 11, TypeORM with `better-sqlite3` (`db.sqlite`), `synchronize: true` (schema auto-syncs from entities on boot — changing an entity can drop/alter columns; re-seed after).
- **Modules** (`src/`): `auth`, `user`, `ticket`, `knowledge`, `category`, `notifications`. Each follows the Nest pattern: `*.module.ts`, `*.controller.ts`, `*.service.ts`, `entities/`, `dto/`.
- **Auth:** JWT (passport-jwt). Login is `POST /auth/platform` → returns `{ username, token }`. `JwtStrategy.validate()` returns `{ id, username }`, which Nest puts on `request.user`. Protect routes with `@UseGuards(JwtAuthGuard)` (empty `@UseGuards()` does NOT protect). Read the user in a handler via `@Req() req` → `req.user.id`. `JWT_SECRET` env var.
- **Ticket relations (FK, not strings):** `assigned_user` (→ users, via `assigned_id`), `category` (→ categories, via `category_id`), `knowledge` (→ knowledge, via `kb`). Services load these with `relations: { ... }`; `update()` strips loaded relation objects before persisting.
- **Notifications:** `@nestjs-modules/mailer` + nodemailer + Handlebars templates in `src/notifications/templates/*.hbs` (email HTML). `NotificationsService` = one method per notification type; email is one channel (more can be added). Logo embedded via CID (`src/notifications/assets/logo.png`). Mail config via `MAIL_*` env vars.
- **Seed:** `npm run seed` (creates the `testing` user, KB articles, categories, and demo tickets). Run after any schema change.
- **Scripts:** `npm run start:dev` (watch), `npm run seed`, `npm test`. `PORT` env var.

## Frontend (`client/`)

- **Stack:** Vite, React 19, React Router (`react-router`), `lucide-react` icons, `react-hot-toast`.
- **Routing:** `src/app.tsx` (`<Routes>`). Auth-gated routes are wrapped in `RequireAuth` + `UserLayout`.
- **Sidebar:** `src/components/Menu/menu.tsx` — nav links live in the `links` array.
- **API calls:** all in `src/lib/fetch.ts`. Authenticated requests use the `authHeaders()` helper (reads the raw JWT from `localStorage` and sends `Authorization: Bearer <token>`). Base URL from `VITE_API_BASE_URL`.
- **Types/forms:** `src/lib/interfaces.ts` (shared TS interfaces), `src/lib/forms.ts` (empty form defaults), `src/lib/search.ts` (client-side ticket search).
- **Aliases:** `@/` → `src/`, `styles/` → `src/styles/`. Page CSS lives in `src/styles/*.css`.
- **Scripts:** `npm run dev`, `npm run build`.

## Brand / design

SorvisLater palette: primary orange `#f15b26`, signature gradient `135deg #f47446 → #d6481c`, dark text `#16181d`, muted `#5f6470`, warm peach backgrounds, font Poppins. Status/category pills: peach bg with orange border matching the text color, ~8px radius.
