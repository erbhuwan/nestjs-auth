# Contributing

Thanks for your interest in improving **nestjs-auth**.  
This project is meant to be clear and easy to extend — contributions that improve documentation, structure, or examples are always welcome.

## Before you start

- Make sure you've read the [README](./README.md).  
- Check open [issues](https://github.com/erbhuwan/nestjs-auth/issues) before starting new work.  
- If you're unsure about something, open a small discussion in the issue first.

## How to contribute

1. **Fork** this repository.  
2. **Create a branch** for your change:

   ```bash
   git checkout -b feature/short-description
   ```

3. **Make your changes** — keep commits focused and easy to review.  
4. **Run and test locally** to confirm everything works.  
5. **Commit** using a clear message:

   ```text
   docs: update README for clarity
   feat: add refresh token route
   fix: correct JWT expiry handling
   ```

6. **Push** your branch and open a **Pull Request** against the `main` branch.

## Code style

- Follow the existing formatting and structure.  
- Use consistent naming (camelCase for JS/TS).  
- Keep functions small and readable.  
- Avoid unnecessary dependencies.

## Commit messages

Follow a short, descriptive format:

```text
type: short summary
```

**Types:** `feat`, `fix`, `docs`, `refactor`, `chore`, `test`.

Examples:

```text
feat: add role-based guard
fix: update token expiry logic
docs: clarify setup steps
```

## Review process

- Maintainers review all PRs before merging.  
- Small, focused PRs are easier to review and get merged faster.  
- If changes are requested, update your branch and push again — no need to open a new PR.

## Reporting issues

If you find a bug or something unclear:

- Check existing issues to avoid duplicates.  
- Provide a short description and steps to reproduce.  
- Add logs or screenshots if helpful.

## License

By contributing, you agree that your contributions will be licensed under the same MIT License as the project.
