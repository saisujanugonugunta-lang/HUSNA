# HS LAST — combined frontend and backend

This project contains the React/Vite frontend (`frontend/`) and Express/MongoDB backend (`backend/`). The backend serves the built frontend, so both can run from one Node service.

## Before running or deploying
- This package intentionally does **not** include your private `.env` file or database credentials.
- Set `MONGODB_URI` as a private environment variable in the hosting dashboard. The server currently requires MongoDB to start, matching the supplied backend's behavior.
- Never put database credentials or secret keys in frontend variables such as `VITE_*`.

## Local setup (Node.js installed)
From the project root:

1. Install backend dependencies: `npm install --prefix backend`
2. Install frontend dependencies: `npm install --prefix frontend`
3. Build frontend: `npm run build`
4. Set `MONGODB_URI` in the environment for the terminal session, then run `npm start`.

On Windows PowerShell, for the current terminal only, set the URI with `$env:MONGODB_URI="your-real-mongodb-connection-string"` before `npm start`. Do not paste that value into chat or commit it to Git.

## One-service Render deployment
- Root Directory: leave blank (repository/project root)
- Build Command: `npm install --prefix backend && npm install --prefix frontend && npm run build`
- Start Command: `npm start`
- Add `MONGODB_URI` in Render's Environment settings using your real connection string.

The same service will serve the website and API. The frontend calls `/api/analyze` on the same origin by default. If you continue hosting the frontend separately, set `VITE_API_BASE_URL` to your backend URL during frontend build.

## API checks
- `GET /api/health` — backend health
- `GET /db-status` — database connection state
- `POST /api/analyze` with JSON `{ "text": "...job offer..." }` — risk analysis

Important: creating this ZIP does not change your existing live website or deployment. Test this new project separately before replacing anything. The risk analysis is a basic rule-based screening tool, not proof that an offer is safe or fraudulent.
