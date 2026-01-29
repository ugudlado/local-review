# Template Project

Multi-package monorepo template with full-stack TypeScript setup.

## Project Structure

```
apps/
├── server/      - Backend server (Express + Awilix DI)
├── ui/          - Frontend UI application (React + Vite)
└── mobile/      - Mobile app (Expo + React Native)

packages/
├── components/  - Shared React components library
└── schema/      - Database schema and types (Drizzle ORM)
```

## Setup

1. Install dependencies:
```bash
pnpm install
```

2. Configure environment:
```bash
# Copy .env.example files in each package
cp apps/server/.env.example apps/server/.env
cp packages/schema/.env.example packages/schema/.env
# Edit with your database credentials
```

3. Generate and run database migrations:
```bash
cd packages/schema
pnpm db:generate
pnpm db:migrate
```

## Development

### Web (Server + UI)

Start server and UI concurrently:
```bash
pnpm dev
```

Or run individual packages:
```bash
# Server only
pnpm --filter @todos/server dev

# UI only
pnpm --filter @todos/ui dev
```

Access at http://localhost:3000 (UI) and http://localhost:3001 (API).

### Mobile (Expo)

Mobile runs separately from web development:

```bash
# Start Expo dev server
pnpm dev:mobile
```

This displays a QR code in the terminal. To test on your device:
1. Install **Expo Go** app on your phone (iOS App Store / Google Play)
2. Scan the QR code:
   - **iOS**: Use the Camera app
   - **Android**: Use the Expo Go app
3. The app will load on your device

**Note**: Ensure the server is running (`pnpm --filter @todos/server dev`) and your device is on the same network.

For simulators:
```bash
cd apps/mobile
pnpm ios      # iOS Simulator
pnpm android  # Android Emulator
```

## Testing

```bash
# Run all unit tests
pnpm test:unit

# Run tests for changed packages only (Nx smart testing)
pnpm test:changed

# Run all tests including e2e
pnpm test

# Run specific package tests
cd apps/server
pnpm test:unit
```

## Building

```bash
# Build all packages
pnpm build

# Build specific package
pnpm --filter @todos/server build
```

## Tech Stack

- **Frontend (Web)**: React 18, Vite, Tailwind CSS, Zustand
- **Frontend (Mobile)**: Expo SDK 54, React Native, Zustand
- **Backend**: Express, Awilix (DI), Drizzle ORM
- **Testing**: Vitest, Testing Library, Supertest
- **Build**: Nx, esbuild, TypeScript
- **Database**: PostgreSQL with Drizzle ORM

## API Endpoints

- `GET /api/todos` - List all todos
- `GET /api/todos/:id` - Get todo by ID
- `POST /api/todos` - Create new todo
- `PUT /api/todos/:id` - Update todo
- `PATCH /api/todos/:id/toggle` - Toggle todo completion
- `DELETE /api/todos/:id` - Delete todo

## Demo

The project includes a demo Todo List application showcasing:
- Full CRUD operations with toggle functionality
- Multi-layer architecture (Repository → Service → Controller)
- Unit tests at all layers (26 server tests, 16 UI tests)
- Integration tests for API endpoints
- React components with Zustand state management
- Form validation with Zod schemas
- Checkbox-based completion tracking
- Mobile app with offline support and optimistic updates
