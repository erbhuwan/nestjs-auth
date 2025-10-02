# NestJS Auth

A **NestJS authentication starter project** with Git hooks, commit linting, and code formatting pre-configured.

---

## 🔧 Features

- 🚀 **NestJS** — scalable server-side framework  
- 🧹 **Prettier** — automatic code formatting
- 🛡️ **ESLint** — code linting for consistent style
- 📝 **Commitlint** — enforce [Conventional Commits](https://www.conventionalcommits.org/)
- 🪝 **Husky + lint-staged** — run linters & formatters on staged files before commit
- 🗄️ **TypeORM + PostgreSQL** — database integration with migrations
- ⚙️ **Environment-based configuration** — flexible config management

---

## ⚙️ Setup

1. Clone the repo:
   ```sh
   git clone https://github.com/your-username/nestjs-auth.git
   cd nestjs-auth
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Set up the database:
    ```sh
    # Copy environment variables
    cp .env.example .env

    # Edit .env with your database credentials
    # Make sure PostgreSQL is running locally
    ```

4. Run database migrations:
    ```sh
    npm run migration:run
    ```

5. Start development server:
    ```sh
    npm run start:dev
    ```

---

## 🪝 Git Hooks

This project uses **Husky** with the following hooks:

- `pre-commit`: runs Prettier/ESLint on staged files (`lint-staged`)
- `commit-msg`: runs Commitlint to check commit message format

---

## 🗄️ Database Setup

### PostgreSQL Installation

**macOS:**
```sh
# Using Homebrew
brew install postgresql

# Start PostgreSQL service
brew services start postgresql
```

**Ubuntu/Debian:**
```sh
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

**Docker (Alternative):**
```sh
# Run PostgreSQL in Docker
docker run --name postgres-nestjs \
  -e POSTGRES_PASSWORD=your_password \
  -e POSTGRES_DB=nestjs_auth \
  -p 5432:5432 \
  -d postgres:15
```

### Database Configuration

1. **Environment Variables:**
   ```sh
   cp .env.example .env
   ```

   Edit `.env` with your database credentials:
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=your_password
   DB_DATABASE=nestjs_auth
   DB_SYNCHRONIZE=false
   DB_LOGGING=true
   ```

2. **Database Creation:**
   ```sh
   # Connect to PostgreSQL
   psql -h localhost -U postgres

   # Create database
   CREATE DATABASE nestjs_auth;
   ```

### Database Migrations

This project uses **TypeORM** with migrations for database schema management:

```sh
# Generate new migration from entity changes
npm run migration:generate -- src/migrations/MigrationName

# Run pending migrations
npm run migration:run

# Revert last migration
npm run migration:revert

# Show migration status
npm run migration:show

# Create empty migration
npm run migration:create -- src/migrations/MigrationName
```

### Migration Scripts

All migration commands are available in `package.json`:

- `migration:generate` — generate migrations from entity changes
- `migration:run` — execute pending migrations
- `migration:revert` — rollback last migration
- `migration:show` — display migration status
- `migration:create` — create new empty migration

### Best Practices

- **Never enable `DB_SYNCHRONIZE=true` in production**
- **Always run migrations in a transaction**
- **Test migrations on a copy of production data first**
- **Keep migrations backward compatible**
- **Use descriptive migration names**

### Troubleshooting

**Connection Issues:**
```sh
# Check if PostgreSQL is running
pg_isready -h localhost -p 5432

# View PostgreSQL logs
tail -f /usr/local/var/log/postgres.log  # macOS
tail -f /var/log/postgresql/postgresql-*.log  # Linux
```

**Permission Issues:**
```sh
# Fix database permissions
psql -h localhost -U postgres
GRANT ALL PRIVILEGES ON DATABASE nestjs_auth TO your_username;
```

---

## 📝 Commit Convention

All commits follow [Conventional Commits](https://www.conventionalcommits.org/):

Examples:
```
feat(auth): add JWT strategy
fix(api): correct response format
chore(deps): bump dependency versions
```

---

## 📦 Scripts

### Application Scripts
- `npm run start:dev` — start NestJS in watch mode
- `npm run start:prod` — start NestJS in production mode
- `npm run build` — build the application
- `npm run lint` — run ESLint
- `npm run format` — run Prettier
- `npm test` — run tests (Jest, with `--passWithNoTests` enabled)

### Database Scripts
- `npm run migration:generate` — generate new migration from entity changes
- `npm run migration:run` — execute pending migrations
- `npm run migration:revert` — rollback last migration
- `npm run migration:show` — display migration status
- `npm run migration:create` — create new empty migration

---

## 📂 Project Structure

```
nestjs-auth/
├── src/                          # source code
│   ├── common/
│   │   └── configs/
│   │       └── database.config.ts # TypeORM configuration
│   ├── migrations/               # database migrations
│   ├── app.controller.ts
│   ├── app.module.ts
│   └── main.ts
├── .env.example                  # environment variables template
├── typeorm.config.ts             # TypeORM CLI configuration
├── test/                         # test files
├── commitlint.config.cjs
├── eslint.config.mjs
├── prettier.config.js
├── package.json
└── README.md
```

---

✨ Happy coding!
