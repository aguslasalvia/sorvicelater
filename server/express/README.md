# 🛠️ SorvisLater — Express API

The original back-end for **SorvisLater**, a REST API built with **Express 4**, **TypeScript** and **MySQL** (`mysql2`). It serves tickets, knowledge base articles and user data to the React client.

> ℹ️ This was the **first** implementation of the SorvisLater API. It is currently **being ported to NestJS** — see [`../nest`](../nest). Until that migration is complete, this Express version remains the reference, fully working backend.

---

## 🧰 Tech Stack

- **Express 4** + **TypeScript 5.7**
- **mysql2** — MySQL driver (promise API)
- **jsonwebtoken** — JWT helpers
- **cors**, **dotenv**
- **ts-node** + **nodemon** — dev runner

---

## 📁 Project Structure

```
.
├── index.ts                        # App bootstrap (Express setup + route mounting)
└── src/
    ├── config/dotenv.ts            # Loads environment variables
    ├── database.ts                 # MySQL connection (singleton)
    ├── lib/settings.ts             # Database settings from env
    ├── controllers/                # Request handlers
    │   ├── user.controller.ts
    │   ├── ticket.controller.ts
    │   └── knowledge.controller.ts
    ├── middlewares/
    │   └── authMiddleware.ts       # Auth middleware (currently a no-op TODO)
    ├── models/                     # Data-access models
    │   ├── user.model.ts
    │   ├── ticket.model.ts
    │   └── knowledge.model.ts
    ├── routes/                     # Route definitions
    │   ├── auth.routes.ts
    │   ├── user.routes.ts
    │   ├── ticket.routes.ts
    │   └── knowledge.routes.ts
    └── utils/jwt.ts                # generateToken / verifyToken
```

---

## 🔌 API Endpoints

All routes pass through `userAuthMiddelware` (authentication is not yet enforced — see the TODO in `authMiddleware.ts`).

### Auth — `/auth`
| Method | Path        | Description     |
| ------ | ----------- | --------------- |
| POST   | `/platform` | User login      |

### Users — `/user`
| Method | Path          | Description       |
| ------ | ------------- | ----------------- |
| GET    | `/all_users`  | List all admins   |

### Tickets — `/ticket`
| Method | Path        | Description                          |
| ------ | ----------- | ------------------------------------ |
| GET    | `/counters` | Ticket counts grouped by state       |
| GET    | `/open`     | Get a single ticket                  |
| GET    | `/list`     | List tickets for a user              |
| POST   | `/create`   | Create a ticket                      |
| POST   | `/update`   | Update a ticket                      |

### Knowledge — `/knowledge`
| Method | Path     | Description                    |
| ------ | -------- | ------------------------------ |
| GET    | `/count` | Total knowledge article count  |
| GET    | `/all`   | List all knowledge articles    |
| POST   | `/new`   | Create a knowledge article     |

---

## ⚙️ Configuration

The connection is configured through environment variables (`.env`):

```env
SERVER_PORT=5000

DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_NAME=SorvisLater
DATABASE_USER=sorvis_user
DATABASE_PASSWORD=your_password

JWT_SECRET=your_secret
```

The database schema is provided in [`../../database/dump.sql`](../../database/dump.sql).

---

## 🚀 Getting Started

```bash
# install dependencies
npm install

# run in development (nodemon + ts-node)
npm test
```

The API listens on `SERVER_PORT` (default `5000`).
