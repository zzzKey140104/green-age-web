# Backend (Node.js + TypeScript + Prisma)

## Quick start

```bash
cd Backend
npm i
copy .env.example .env
npm run prisma:migrate
npm run dev
```

## Endpoints

- `GET /health`: health check
- `GET /api/posts`: list posts
- `POST /api/posts`: create post `{ title, content }`
- `GET /api/search?q=...`: search posts by title/content

