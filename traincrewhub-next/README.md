# TrainCrewHub Next

Next.js rewrite scaffold for TrainCrewHub.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- PostgreSQL
- Drizzle ORM
- Custom cookie sessions and password auth

## Getting Started

```bash
npm install
cp .env.example .env
npm run db:migrate
npm run dev
```

The current Vite/Supabase app remains untouched in the parent project. This folder is the new migration target.

## Auth Bootstrap

The first registered user is automatically activated and receives the `admin` role. Later users receive the `user` role and stay inactive until an admin flow activates them.
