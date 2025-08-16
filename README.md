# Campaign Tracker - Full Stack Assignment

Minimal full-stack microservice to track marketing campaign metrics.

## Project Structure
- **backend/** → Node.js + Express API
  - **config/db.js** → MySQL connection
  - **controllers/** → CRUD & auth logic
  - **models/** → DB query functions
  - **routes/** → API endpoints
  - **server.js** → Entry point
  - **.env** → Config (DB & JWT)
- **frontend/** → React + Tailwind dashboard
  - **components/** → Login, Signup, Dashboard
  - **App.js** → Routing
  - **index.js** → Entry point
- **README.md** → This file

## Setup Instructions

### Backend
1. `cd backend`
2. `npm install`
3. Configure `.env` (DB credentials, JWT secret)
4. `node server.js` or `nodemon server.js`

### Frontend
1. `cd frontend`
2. `npm install`
3. `npm start`

### Notes
- Login / Signup required to access dashboard
- CRUD operations for campaign metrics:
  - Create, Read, Update, Delete
  - Filter by campaign name
- Uses Tailwind for styling
- JWT-secured endpoints
- **Extra features:**
  - Password validation (min 6 chars, must include a number)
  - Input validation for campaign metrics
  - Responsive dashboard

