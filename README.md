# Ship Health Tracker (MERN) — Health Officer + Emergency Officer

## Quick Start
1) Backend
```
cd backend
cp .env.example .env
# edit MONGO_URI, JWT_SECRET, CLIENT_URL
npm i
npm run dev
```
Seed users (temporary):
```
# Use Postman or curl to register two users
# Health Officer
curl -X POST http://localhost:5000/api/auth/register -H "Content-Type: application/json" -d '{ "name":"Dr. Lee","email":"health@example.com","password":"Pass@1234","role":"HEALTH_OFFICER" }'
# Emergency Officer
curl -X POST http://localhost:5000/api/auth/register -H "Content-Type: application/json" -d '{ "name":"EO","email":"emergency@example.com","password":"Pass@1234","role":"EMERGENCY_OFFICER" }'
```

2) Frontend
```
cd ../frontend
echo 'VITE_API_URL=http://localhost:5000' > .env
npm i
npm run dev
```
Login using the seeded accounts.

## What’s implemented
- Secure login (JWT) + optional 2FA stub.
- Role-based navigation & access.
- Health Officer:
  - Crew list & detail
  - Add exams, chronic logs, vaccinations
  - Medical records with versioning & uploads
- Emergency Officer:
  - Real-time alerts (Socket.IO)
  - Acknowledge / close alerts
  - Incident logging with attachments
  - Emergency messaging (to roles)
- Exports:
  - PDF health summary (backend /api/reports/summary)
  - Excel incident report (backend /api/reports/incidents)

## Next steps
- Add graphs (e.g., Chart.js) for chronic trends and vitals.
- Implement vaccination auto-block logic and reminders cron.
- Connect real SMS/email providers.
- Add ship map with live location (beacons/GPS integration).
- Add audit logging UI and offline-first PWA data sync.
