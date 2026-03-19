# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start Vite dev server with HMR
npm run build      # Type-check (tsc -b) then Vite production build
npm run lint       # ESLint checks
npm run preview    # Preview production build locally
```

No test runner is configured.

## Architecture Overview

This is a **React 19 SPA** (Church Management System) using Vite + TypeScript. Key libraries:

- **Routing:** React Router v7 with `createBrowserRouter` — routes defined in [src/config/router/route.tsx](src/config/router/route.tsx)
- **State:** Zustand stores — auth state in [src/lib/store/useAuthStore.ts](src/lib/store/useAuthStore.ts), UI stores in [src/store/](src/store/)
- **Data fetching:** TanStack React Query + Axios — wrapped in [src/lib/api/config/axios.ts](src/lib/api/config/axios.ts) via `configFn<T>(ServiceDefinition)`
- **Forms:** React Hook Form + Zod schemas from [src/lib/schema/zodSchema.ts](src/lib/schema/zodSchema.ts)
- **UI:** shadcn/ui (Radix UI + Tailwind CSS v4) with reusable form field components in [src/components/](src/components/)
- **Tables:** TanStack Table via the shared [src/components/data-table.tsx](src/components/data-table.tsx) wrapper

## Key Patterns

**API layer:** Service files (e.g., [src/lib/api/services/auth-service.ts](src/lib/api/services/auth-service.ts)) return `ServiceDefinition` objects. Hooks call `configFn<ResponseType>(service.method(data))` inside `useMutation` or `useQuery`. Add new API services by following this pattern.

**Protected routes:** [src/features/auth/middleware.tsx](src/features/auth/middleware.tsx) checks the Zustand auth store for a token; unauthenticated users are redirected to `/`. All dashboard routes are wrapped in this guard.

**Auth persistence:** Tokens are AES-encrypted (via CryptoJS, key from `VITE_ENCRYPT_KEY`) before writing to localStorage, and also set as a cookie (7-day, `samesite=strict`). Logout clears both.

**Feature modules:** Self-contained under [src/features/dashboard/](src/features/dashboard/) — each module contains its page components, forms, column definitions, and sample data. Current modules: `member_mgmt`, `family_group_mgmt`, `contribution_mgmt`. Placeholder modules: `accounting_finance`, `event_service`, `asset_mgmt`.

**Path alias:** `@/` maps to `src/` — use this for all imports.

## Environment

Requires a `.env` file with:
```
VITE_PUBLIC_BASE_URL=<API base URL>
VITE_ENCRYPT_KEY=<AES encryption key>
```

The API is hosted separately (currently `https://Chms-api.onrender.com/api/v1`). Many pages still use local sample data arrays while API integration is in progress.
