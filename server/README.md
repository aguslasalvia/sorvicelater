# 🪺 SorvisLater — NestJS API

The **SorvisLater** back-end, built with **NestJS 11**, **TypeORM** and **SQLite** (`better-sqlite3`). It exposes JWT-protected REST resources for users, tickets, categories and knowledge base articles, plus email notifications.

---

## 🧰 Tech Stack

- **NestJS 11** (`@nestjs/common`, `@nestjs/core`, `@nestjs/platform-express`)
- **TypeORM** (`@nestjs/typeorm`) + **better-sqlite3** — local `db.sqlite`
- **Auth:** `@nestjs/jwt` + `passport-jwt`, `bcrypt` for password hashing
- **Notifications:** `@nestjs-modules/mailer` + `nodemailer` + **Handlebars** templates
- **TypeScript 5.7**, **Jest**, **ESLint** + **Prettier**

The database connection is configured in `app.module.ts` with `synchronize: true`, so entities are auto-migrated into `db.sqlite` on startup (re-seed after schema changes).

---

## 📁 Project Structure

Each domain is a self-contained Nest module (controller + service + entity + DTOs):

```
src/
├── main.ts                 # Bootstraps the Nest app
├── app.module.ts          # Root module + TypeORM config
├── seed.ts                 # Seed script (npm run seed)
├── auth/                   # Login + JWT strategy + JwtAuthGuard
├── user/                   # Users
├── ticket/                 # Tickets / incidents
├── category/               # Incident categories
├── knowledge/              # Knowledge base
└── notifications/          # Email notifications
    ├── notifications.service.ts
    ├── templates/          # Handlebars email templates (.hbs)
    ├── assets/             # Embedded logo (CID)
    └── dto/
```

---

## 🗃️ Entities

- **User** (`users`) — `id`, `name`, `username`, `first_name`, `email`, `password`, timestamps
- **Category** (`categories`) — `id`, `name`
- **Ticket** (`tickets`) — `id`, `request_by`, `request_for`, `service_offering`, `item`, `contact_type`, `status`, `symptom`, `impact`, `urgency`, `priority`, `description`, `assigned_id` (→ **User**), `category_id` (→ **Category**), `kb` (→ **Knowledge**), timestamps, `resolved_at`
- **Knowledge** (`knowledge`) — `id`, `title`, `description`

> Assignment and category are **foreign keys**; list/detail queries load the related `assigned_user` and `category` objects.

---

## 🔐 Auth

- `POST /auth/platform` — login; returns `{ username, token }` (a JWT).
- Protected routes use `@UseGuards(JwtAuthGuard)`. The strategy puts `{ id, username }` on `request.user`; read it in a handler with `@Req() req` → `req.user.id`.

---

## 🔌 API Endpoints

Standard REST CRUD per resource (`user`, `ticket`, `category`, `knowledge`):

| Method | Path              | Description |
| ------ | ----------------- | ----------- |
| POST   | `/<resource>`     | Create      |
| GET    | `/<resource>`     | List all    |
| GET    | `/<resource>/:id` | Get one     |
| PATCH  | `/<resource>/:id` | Update      |
| DELETE | `/<resource>/:id` | Delete      |

Notable ticket routes: `GET /ticket/backlog`, `GET /ticket/last`, `GET /ticket/efficiency`, `GET /ticket/assigned` (tickets for the current user).

---

## ⚙️ Configuration

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

The SQLite database file (`db.sqlite`) is created automatically in the project root.

---

## 🚀 Getting Started

```bash
# install dependencies
npm install

# seed demo data (user, categories, KB, tickets)
npm run seed

# development (watch mode)
npm run start:dev

# production build + run
npm run build
npm run start:prod
```

## 🧪 Testing

```bash
npm run test       # unit tests
npm run test:e2e   # end-to-end tests
npm run test:cov   # coverage
```
