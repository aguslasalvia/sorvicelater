# 🪺 SorvisLater — NestJS API

A modern rewrite of the **SorvisLater** back-end using **NestJS 11**, **TypeORM** and **SQLite** (`better-sqlite3`). It exposes RESTful CRUD resources for users, tickets and knowledge base articles.

> 🔄 **Work in progress.** The API was originally built with Express (see [`../express`](../express)) and is currently **being ported to NestJS**. This rewrite will eventually replace the Express implementation.

---

## 🧰 Tech Stack

- **NestJS 11** (`@nestjs/common`, `@nestjs/core`, `@nestjs/platform-express`)
- **TypeORM** (`@nestjs/typeorm`)
- **better-sqlite3** — local `db.sqlite` database
- **TypeScript 5.7**
- **Jest** — unit + e2e tests
- **ESLint** + **Prettier**

The database connection is configured in `app.module.ts` with `synchronize: true`, so entities are auto-migrated into `db.sqlite` on startup.

---

## 📁 Project Structure

Each domain is a self-contained Nest module (controller + service + entity + DTOs):

```
src/
├── main.ts                 # Bootstraps the Nest app
├── app.module.ts          # Root module + TypeORM config
├── app.controller.ts
├── app.service.ts
├── user/
│   ├── user.module.ts
│   ├── user.controller.ts
│   ├── user.service.ts
│   ├── dto/
│   └── entities/user.entity.ts
├── ticket/
│   ├── ticket.module.ts
│   ├── ticket.controller.ts
│   ├── ticket.service.ts
│   ├── dto/
│   └── entities/ticket.entity.ts
└── knowledge/
    ├── knowledge.module.ts
    ├── knowledge.controller.ts
    ├── knowledge.service.ts
    ├── dto/
    └── entities/knowledge.entity.ts
```

---

## 🗃️ Entities

- **User** (`users`) — `id`, `name`, `username`, `first_name`, `email`, `password`, timestamps
- **Ticket** (`tickets`) — `id`, `request_by`, `request_for`, `service_offering`, `item`, `contact_type`, `status`, `assigned` (→ User), `category`, `symptom`, `impact`, `urgency`, `priority`, timestamps
- **Knowledge** (`knowledge`) — `id`, `title`, `description`

---

## 🔌 API Endpoints

Each resource exposes the standard REST CRUD surface:

| Method | Path             | Description        |
| ------ | ---------------- | ------------------ |
| POST   | `/<resource>`    | Create             |
| GET    | `/<resource>`    | List all           |
| GET    | `/<resource>/:id`| Get one            |
| PATCH  | `/<resource>/:id`| Update             |
| DELETE | `/<resource>/:id`| Delete             |

Available resources: **`user`**, **`ticket`**, **`knowledge`**.

---

## ⚙️ Configuration

```env
PORT=3000
```

Defaults to port `3000`. The SQLite database file (`db.sqlite`) is created automatically in the project root.

---

## 🚀 Getting Started

```bash
# install dependencies
npm install

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
