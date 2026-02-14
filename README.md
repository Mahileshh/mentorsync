# MentorSync

Lightweight mentor–mentee dashboard for tracking reward-points, meetings and placements.

This repository contains a React frontend and a Node/Express backend that reads student data from MongoDB. The project currently focuses on mentor dashboards, mentee views, meeting scheduling and placement tracking.

## Repository structure

- `frontend/` — React app (Vite). Key files:
  - `src/App.jsx` — routing and layouts
  - `src/pages/` — pages for Mentor and Mentee
  - `src/services/sheetApi.js` — axios API client
- `server/` — Express backend
  - `src/index.js` — API endpoints
  - `src/dbService.js` — MongoDB access helpers
  - `src/schemas/` — JSON schema files added for meetings/placements/metadata
  - `src/createSchemas.js` — helper script to create collections with validators

## Quickstart (development)

Prerequisites:

- Node.js 18+ and npm
- MongoDB running locally or accessible via `MONGODB_URI`

1. Install dependencies

```bash
# frontend
cd frontend
npm install

# server
cd ../server
npm install
```

3. Run backend and frontend

```bash
# start backend
cd server
npm run dev

# in a separate terminal: start frontend
cd frontend
npm run dev
```





---
Created on Feb 14, 2026. For questions or to request schema changes, ping the maintainers in the repo.
