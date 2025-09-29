# NestJS Auth

A **NestJS authentication starter project** with Git hooks, commit linting, and code formatting pre-configured.

---

## 🔧 Features

- 🚀 **NestJS** — scalable server-side framework  
- 🧹 **Prettier** — automatic code formatting  
- 🛡️ **ESLint** — code linting for consistent style  
- 📝 **Commitlint** — enforce [Conventional Commits](https://www.conventionalcommits.org/)  
- 🪝 **Husky + lint-staged** — run linters & formatters on staged files before commit  

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

3. Start development server:
   ```sh
   npm run start:dev
   ```

---

## 🪝 Git Hooks

This project uses **Husky** with the following hooks:

- `pre-commit`: runs Prettier/ESLint on staged files (`lint-staged`)  
- `commit-msg`: runs Commitlint to check commit message format  

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

- `npm run start:dev` — start NestJS in watch mode  
- `npm run lint` — run ESLint  
- `npm run format` — run Prettier  
- `npm test` — run tests (Jest, with `--passWithNoTests` enabled)  

---

## 📂 Project Structure

```
nestjs-auth/
 ├── src/               # source code
 ├── test/              # test files
 ├── commitlint.config.cjs
 ├── .eslintrc.js
 ├── .prettierrc.json
 ├── package.json
 └── README.md
```

---

✨ Happy coding!
