# Nexus TI — Frontend AV2

> Academic frontend project — React SPA with a REST API backend, rebuilt from a vanilla HTML/CSS/JS codebase (AV1).

**Authors**
- Maria Julia Pessoa
- Julia Botor

---

## Overview

Nexus TI is a fictional IT company portal. This second version migrates the original static site into a full-stack application: a React SPA on the front end communicating with a Node.js/Express REST API backed by a SQLite database.

The visual identity and layout are kept identical to AV1. What changed is everything underneath.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, plain CSS (no UI library) |
| State management | React Hooks only (`useState`, `useEffect`, `useCallback`, custom hooks) |
| Routing | State-based SPA (no React Router) |
| Backend | Node.js, Express |
| Database | SQLite via `sql.js` |
| Auth | bcrypt password hashing |

---

## Project Structure

```
nexus-ti/
├── backend/
│   ├── server.js        # Express REST API + SQLite
│   ├── package.json
│   └── nexus.db         # auto-created on first run
│
└── frontend/
    ├── public/
    │   └── index.html
    ├── package.json
    └── src/
        ├── App.js                      # page state router
        ├── App.css                     # global styles
        ├── hooks/
        │   └── useAuth.js              # session management hook
        ├── services/
        │   ├── api.js                  # REST API client
        │   └── validar.js              # pure validation helpers
        ├── components/
        │   ├── Header.jsx              # navigation bar
        │   ├── Footer.jsx              # site footer
        │   └── FormGroup.jsx           # reusable form field
        └── pages/
            ├── HomePage.jsx            # institutional landing page
            ├── LoginPage.jsx           # login form
            ├── CadastroPage.jsx        # user registration form
            ├── TrocaSenhaPage.jsx      # password change form
            ├── ServicosPage.jsx        # authenticated services panel
            └── CadastroServicoPage.jsx # register a new IT service (new in AV2)
```

---

## Getting Started

You need two terminals — one for the backend, one for the frontend.

**Backend**

```bash
cd backend
npm install
node server.js
# API running at http://localhost:3001
```

**Frontend**

```bash
cd frontend
npm install
npm start
# App running at http://localhost:3000
```

The database file (`nexus.db`) is created automatically on first run. Six default IT services are seeded on startup if the table is empty.

---

## REST API

| Method | Route | Description |
|--------|-------|-------------|
| `POST` | `/api/auth/login` | Authenticate with email and password |
| `POST` | `/api/auth/troca-senha` | Change password (requires current password) |
| `POST` | `/api/clientes` | Register a new client |
| `GET` | `/api/servicos` | List all IT services |
| `POST` | `/api/servicos` | Create a new IT service |
| `GET` | `/api/solicitacoes/:login` | Get all service requests for a user |
| `PUT` | `/api/solicitacoes/:login` | Replace all service requests for a user |

All responses follow the shape `{ sucesso: boolean, mensagem?: string, data?: ... }`.

---

## Database Schema

**`cliente`**
```
login         TEXT  PRIMARY KEY
senha         TEXT  NOT NULL        -- bcrypt hash
nome          TEXT  NOT NULL
email         TEXT  NOT NULL
cpf           TEXT  NOT NULL
nascimento    TEXT  NOT NULL
telefone      TEXT
estado_civil  TEXT
escolaridade  TEXT
```

**`servico_ti`**
```
id        INTEGER  PRIMARY KEY AUTOINCREMENT
nome      TEXT     NOT NULL
descricao TEXT     NOT NULL
preco     REAL     NOT NULL
prazo     INTEGER  NOT NULL
icone     TEXT     DEFAULT '💻'
```

**`solicitacao`**
```
id              INTEGER  PRIMARY KEY AUTOINCREMENT
login_cliente   TEXT     NOT NULL  -- FK → cliente.login
id_servico      INTEGER  NOT NULL  -- FK → servico_ti.id
data_pedido     TEXT     NOT NULL
status          TEXT     DEFAULT 'EM ELABORAÇÃO'
```

---

## Features

- **Authentication** — real login against the database; passwords stored as bcrypt hashes
- **Registration** — full client signup with CPF validation, minimum age check, password strength rules, and field masks
- **Password change** — requires current password verification; visual strength meter
- **Services panel** — loads available services from the API; add/remove requests locally, then save all at once
- **Register IT service** — new page (added in AV2) with live card preview as you type
- **Dynamic navigation** — header adapts based on login state

---

## Key Technical Decisions

**No DOM manipulation.** The project uses zero direct DOM access (`document.getElementById`, `querySelector`, etc.). All UI state is driven by React hooks and JSX conditional rendering.

**State-based routing.** Instead of React Router, a single `page` state string in `App.js` determines which page component renders. This keeps the setup minimal while satisfying the single-page requirement.

**One component per page.** Each route maps to exactly one top-level page component. Shared UI (header, footer, form fields) lives in smaller reusable components.

**Custom `useAuth` hook.** Wraps `localStorage` read/write behind a clean hook interface, exposing `usuario`, `login()`, and `logout()` — consumed by `App.js` and passed down as props.

**Pure validation functions.** `validar.js` exports stateless functions that receive a value and return an error string or `null`. No side effects, easy to test.

---

## Validation Rules

| Field | Rules |
|-------|-------|
| Email | Required, regex format check |
| Password | Min 6 chars, at least one number, one uppercase, one special character |
| Full name | At least two words, no numbers or special characters |
| CPF | Format mask, check digit verification |
| Date of birth | Required, minimum age of 18 |
| Phone | Optional, 10–11 digits |
| Education | Required (select) |

---

## Notes

This is an academic project. No data leaves `localhost`. The SQLite database is a local file and is not shared between machines.