# Dentist Appointment Booking Platform

This is a full-stack web application where users can browse dentists, book appointments, and admins can manage all bookings from a dashboard. Built with the MERN stack (MongoDB, Express, React, Node.js).

## Project Structure

```
dentist-appointment/
├── backend/
│   ├── server.js
│   ├── seed.js
│   ├── .env
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

**Backend:** Node.js, Express.js, MongoDB, Mongoose, CORS, dotenv

## Prerequisites

- Node.js (v16+)
- MongoDB (running locally or a connection string to a hosted instance)

## Getting Started

### 1. Clone and install

```bash
git clone <repository-url>
cd dentist-appointment

# Install frontend dependencies
npm install

# Install backend dependencies
cd backend
npm install
cd ..
```

### 2. Configure environment

Create `backend/.env`:

```
MONGODB_URI=mongodb://localhost:27017/dentistAppointments
PORT=5000
```

### 3. Seed the database (optional)

This populates the database with 6 sample dentists so you have data to work with right away.

```bash
cd backend
npm run seed
```

### 4. Run the app

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

```
POST /api/appointments
Content-Type: application/json

{
  "_id": {
    "$oid": "69b7c9286baa39bb0bfcc8c5"
  },
  "dentist_id": {
    "$oid": "69b7c4692f636a2d132307f1"
  },
  "patient_name": "Gowtham",
  "age": 22,
  "gender": "Male",
  "appointment_date": {
    "$date": "2026-03-17T00:00:00.000Z"
  },
  "status": "Confirmed",
  "createdAt": {
    "$date": "2026-03-16T09:11:04.779Z"
  },
  "updatedAt": {
    "$date": "2026-03-16T09:11:04.779Z"
  },
  "__v": 0
}
```

## Database Models

**Dentist** — name, email (unique), specialty, qualification, experience, clinic_name, address, location, photo_url

**Appointment** — dentist_id (references Dentist), patient_name, age (1–120), gender (Male/Female/Other), appointment_date, status (Pending/Confirmed/Completed/Cancelled)

Both models include automatic timestamps.

## How It Works

- The home page loads all dentists from the API and displays them as cards with their photo, qualifications, clinic info, and a "Book Appointment" button.
- Clicking the button opens a booking form where you fill in the patient name, age, gender, and preferred date.
- After booking, you get a confirmation screen and are redirected back to the dentist list.
- The admin panel at `/admin` shows a table of every appointment with patient details, the dentist name, clinic name, and status.

## Available Scripts

```bash
# Frontend
npm run dev        # Start dev server
npm run build      # Production build
npm run preview    # Preview the build
npm run lint       # Lint the code

# Backend (run from /backend)
npm start          # Start the server
npm run dev        # Start with auto-reload (nodemon)
npm run seed       # Seed sample dentists
```

## Troubleshooting

**MongoDB won't connect** — Make sure `mongod` is running and the connection string in `backend/.env` is correct.

**CORS errors** — The backend already has CORS enabled. Double-check that the frontend is hitting `http://localhost:5000/api`.

**Port conflict** — Change the port in `backend/.env` or kill the process using it.
