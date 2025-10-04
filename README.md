# nestjs-auth

A minimal, beginner-friendly authentication boilerplate for NestJS.

## What this is

A simple starting point for authentication in NestJS apps including JWT auth, refresh tokens, and role checks. Built to be easy to read and extend.

## Features

- User registration and login (JWT)
- Access / refresh tokens
- Basic role-based access control
- Clear, modular structure

## Prerequisites

- Node.js v16+  
- npm or yarn  
- A database (Postgres, MySQL, SQLite, etc.)

## Quick start

```bash
git clone https://github.com/erbhuwan/nestjs-auth.git
cd nestjs-auth
cp .env.example .env   # or copy manually on Windows
npm install
npm run start:dev
```

Server should start on the port in your `.env` (default `3000`).

## Configuration

Copy `.env.example` to `.env` and set the values:

| Variable             | Description                             | Example            |
|----------------------|-----------------------------------------|--------------------|
| `PORT`               | App port                                | `3000`             |
| `DATABASE_URL`       | Database connection string              | `postgres://...`   |
| `JWT_SECRET`         | Secret used to sign access tokens       | `a-very-secret`    |
| `JWT_EXPIRATION`     | Access token TTL                        | `1h`               |
| `REFRESH_TOKEN_SECRET`| Secret for refresh tokens               | `another-secret`   |

(Only set what your app requires; keep secrets out of source control.)

## Usage

Common endpoints (adjust to actual routes in the code):

- `POST /auth/register` — register a new user  
- `POST /auth/login` — obtain access + refresh tokens  
- `POST /auth/refresh` — exchange refresh token for access token  
- Protected routes use an auth guard and may check roles

Example request to login:

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"user","password":"pass"}'
```

## Testing

Use Postman, curl, or your preferred client. Add tests later as needed.

## Contributing

If you want to contribute:

1. Fork the repo  
2. Create a branch: `git checkout -b feature/short-description`  
3. Make changes, commit with a clear message  
4. Push and open a PR describing the change

See `CONTRIBUTING.md` for style and PR guidance.

## License

MIT — see `LICENSE`.

## Author / Maintainer

`erbhuwan` (check repo for contact details)
