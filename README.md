# Dentist Appointment Booking Platform

A full-stack web application where users can browse dentists, book appointments, and admins can manage all bookings from a dashboard. Built with React, Express, and SQLite.

## Live Demo

Deployed on Render: _(add your Render URL here after deployment)_

## Project Structure

```
dentist-appointment/
├── backend/
│   ├── server.js          # Express server + serves frontend in production
│   ├── database.js        # Sequelize SQLite connection
│   ├── seed.js            # Manual database seeder
│   ├── seedData.js        # Sample dentist data (auto-seeds on first run)
│   ├── package.json
│   ├── models/
│   │   ├── Dentist.js
│   │   └── Appointment.js
│   └── routes/
│       ├── dentistRoutes.js
│       └── appointmentRoutes.js
├── src/
│   ├── App.jsx
│   ├── index.jsx
│   ├── index.css
│   ├── services/
│   │   └── api.js
│   └── components/
│       ├── DentistList.jsx
│       ├── DentistCard.jsx
│       ├── BookAppointment.jsx
│       ├── AppointmentForm.jsx
│       └── AdminPanel.jsx
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── eslint.config.js
```

## Tech Stack

**Frontend:** React 18, React Router, Axios, Tailwind CSS, Lucide React, Vite

**Backend:** Node.js, Express.js, SQLite, Sequelize, CORS, dotenv

## Prerequisites

- Node.js (v16+)

No external database server required — SQLite stores data in a local file.

## Getting Started

### 1. Clone and install

```bash
git clone https://github.com/Kondapaneni/Dentist-Appointment-Booking.git
cd Dentist-Appointment-Booking

# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### 2. Seed the database (optional)

The server auto-seeds 6 sample dentists on first run. To manually seed:

```bash
cd backend
npm run seed
```

### 3. Run the app

Open two terminals:

```bash
# Terminal 1 — backend
cd backend
npm run dev
```

```bash
# Terminal 2 — frontend
npm run dev
```

The frontend runs on `http://localhost:5173` and the backend on `http://localhost:5000`.

## API Endpoints

### Dentists

| Method | Endpoint          | Description          |
| ------ | ----------------- | -------------------- |
| GET    | /api/dentists     | List all dentists    |
| GET    | /api/dentists/:id | Get a single dentist |
| POST   | /api/dentists     | Add a new dentist    |
| PUT    | /api/dentists/:id | Update a dentist     |
| DELETE | /api/dentists/:id | Remove a dentist     |

### Appointments

| Method | Endpoint                             | Description                    |
| ------ | ------------------------------------ | ------------------------------ |
| GET    | /api/appointments                    | List all appointments          |
| GET    | /api/appointments/:id                | Get a single appointment       |
| GET    | /api/appointments/dentist/:dentistId | Get appointments for a dentist |
| POST   | /api/appointments                    | Book a new appointment         |
| POST   | /api/appointments/check-availability | Check if a slot is open        |
| PUT    | /api/appointments/:id                | Update an appointment          |
| DELETE | /api/appointments/:id                | Cancel an appointment          |

### Example — booking an appointment

```json
POST /api/appointments

{
  "dentist_id": 1,
  "patient_name": "Gowtham",
  "age": 22,
  "gender": "Male",
  "appointment_date": "2026-03-17T00:00:00.000Z"
}
```

## Database Models

**Dentist** — name, email (unique), specialty, qualification, experience, clinic_name, address, location, photo_url

**Appointment** — dentist_id (references Dentist), patient_name, age (1–120), gender (Male/Female/Other), appointment_date, status (Pending/Confirmed/Completed/Cancelled)

Both models include automatic timestamps. Data is stored in `backend/database.sqlite`.

## How It Works

- The home page loads all dentists from the API and displays them as cards with their photo, qualifications, clinic info, and a "Book Appointment" button.
- Clicking the button opens a booking form where you fill in the patient name, age, gender, and preferred date.
- After booking, you get a confirmation screen and are redirected back to the dentist list.
- The admin panel at `/admin` shows a table of every appointment with patient details, the dentist name, clinic name, and status.

## Deployment (Render)

This project is configured for one-click deployment on [Render](https://render.com):

| Setting       | Value                  |
| ------------- | ---------------------- |
| Build Command | `npm run render-build` |
| Start Command | `npm start`            |

The Express server serves both the API and the built React frontend in production.

## Available Scripts

```bash
# Frontend
npm run dev          # Start Vite dev server
npm run build        # Production build
npm run preview      # Preview the build
npm run lint         # Lint the code

# Backend (run from /backend)
npm start            # Start the server
npm run dev          # Start with auto-reload (nodemon)
npm run seed         # Seed sample dentists

# Deployment
npm run render-build # Install deps + build frontend
npm start            # Start production server
```

## Troubleshooting

**Dentists not showing** — Run `cd backend && node seed.js` to seed the database manually, or just restart the server (it auto-seeds on first run).

**CORS errors** — The backend has CORS enabled. In production, the frontend is served from the same origin so CORS is not an issue.

**Port conflict** — Set `PORT` in `backend/.env` or kill the process using port 5000.
