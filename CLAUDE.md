@AGENTS.md

# next-chat

A chat app prototype. Users can send, edit, and delete messages with toast notifications.

## Running locally

```bash
npm run dev   # Next.js on port 3000
npm run db    # json-server mock backend on port 4000
npm test      # Jest
npm run build # Production build
```

## Stack

- Next.js 16 (App Router), React 19, TypeScript 5
- Zustand 5 — state management
- Tailwind CSS 4 — styling
- Sonner — toast notifications
- nanoid — message ID generation
- json-server — mock REST backend (dev only)
- Jest 30 + Testing Library — tests

## Architecture

Feature Slice Design style:

```
src/
  app/              # Next.js routes, API handlers, root layout
  pages/            # Page-level components (Chat.tsx is the main one)
  entities/message/ # Message domain + API calls (messageApi.ts)
  widgets/          # messagePane, contextMenu
  shared/           # store, fetch client, error handling, reusable UI
```

## Key patterns

**State:** Zustand store in `src/shared/model/store/store.ts`. Actions are plain functions calling `setState` — no thunks or middleware. All async logic lives in `Chat.tsx` or `messageApi.ts`.

**Message model:**

```typescript
interface Message {
  id: string; // nanoid
  text: string;
  timeStamp: number; // ms since epoch
}
```

**ButtonedInput:** controlled input component with `value`, `onChange`, `onSubmit` props; supports Enter key to submit.

**Error handling:** `CustomError` class in `src/shared/lib/error/error.ts` with typed kinds: `'validation'`, `'server'`, `'network'`, `'noop'`, `'unknown'`.

**API base URL:** hardcoded to `http://localhost:4000` in `src/shared/api/fetchBase.ts` — should be moved to an env var.

**Click-outside detection:** uses CSS class selectors (`.message-pane`, `.context-menu`) instead of refs — fragile, worth refactoring.

## Known rough edges

- `debugger` statement left in `src/shared/api/fetchBase.ts`
- Base URL hardcoded instead of using `process.env`
- Thin test coverage — only `ButtonedInput` and date utils are tested

## Key files

| Purpose             | Path                                            |
| ------------------- | ----------------------------------------------- |
| Main page component | `src/pages/Chat.tsx`                            |
| Zustand store       | `src/shared/model/store/store.ts`               |
| Fetch client        | `src/shared/api/fetchBase.ts`                   |
| Message API         | `src/entities/message/api/messageApi.ts`        |
| Error class         | `src/shared/lib/error/error.ts`                 |
| Input component     | `src/shared/ui/ButtonedInput/ButtonedInput.tsx` |
| Message widget      | `src/widgets/messagePane/messagePane.tsx`       |
| Context menu        | `src/widgets/contextMenu/contextMenu.tsx`       |
