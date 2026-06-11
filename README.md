# 🎫 SorvisLater

**SorvisLater** is an IT ticketing system for **Minecraft** servers, inspired by **ServiceNow**.
It helps communities and technical servers manage support requests — tickets, incidents and a knowledge base.

---

## 👨‍💻 Authors

- 🎨 **Joaquín Gómez** – *Front-End*
- 🛠️ **Agustín Lasalvia** – *Back-End*

---

## 🗂️ Repository Structure

This is a monorepo containing one front-end and two interchangeable back-ends:

| Project | Path | Stack | README |
| ------- | ---- | ----- | ------ |
| **Web Client** | [`client/react`](client/react) | React 19 · React Router 7 · Vite · TypeScript | [README](client/react/README.md) |
| **API (legacy)** | [`server/express`](server/express) | Express 4 · TypeScript · MySQL | [README](server/express/README.md) |
| **API (current)** | [`server/nest`](server/nest) | NestJS 11 · TypeORM · SQLite | [README](server/nest/README.md) |
| **Database** | [`database`](database) | MySQL schema dump (`dump.sql`) | — |

> 🔄 **Migration in progress:** the API was **first built with Express** (MySQL) and is currently **being ported to NestJS** (SQLite + TypeORM). The Express version is the original, working implementation; the NestJS version is the ongoing rewrite that will eventually replace it.

---

## 🚀 Quick Start

### 1. Web Client

```bash
cd client/react
bun install
bun run dev          # http://localhost:5173
```

Set the API base URL in `client/react/.env`:

```env
VITE_API_BASE_URL=http://localhost:5000   # Express  (or http://localhost:3000 for Nest)
```

### 2a. Back-end — NestJS (recommended)

Uses a local SQLite database; no extra setup required.

```bash
cd server/nest
npm install
npm run start:dev    # http://localhost:3000
```

### 2b. Back-end — Express (legacy)

Requires a running **MySQL Server**.

```bash
# create the database and import the schema
sudo mysql
```
```sql
CREATE DATABASE SorvisLater;
CREATE USER 'sorvis_user'@'%' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON SorvisLater.* TO 'sorvis_user'@'%';
FLUSH PRIVILEGES;
EXIT;
```
```bash
cd database
mysql -u sorvis_user -p SorvisLater < dump.sql

cd ../server/express
npm install
npm test             # http://localhost:5000
```

Configure `server/express/.env`:

```env
SERVER_PORT=5000
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_NAME=SorvisLater
DATABASE_USER=sorvis_user
DATABASE_PASSWORD=your_password
JWT_SECRET=your_secret
```

> 🛑 If the database runs on a separate machine, make sure port **3306** is open.

---

## 🧩 Domain

The system revolves around three core resources:

- **Tickets / Incidents** — support requests with status, priority, urgency, impact and assignment.
- **Knowledge Base** — reference articles to help resolve tickets.
- **Users / Admins** — agents who handle and are assigned tickets.

See each project's README for endpoint and route details.
