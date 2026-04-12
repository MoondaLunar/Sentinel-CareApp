# Sentinel-CareApp

PPE Inventory + Clients + Audit Log

🛡️ GDPR-Aligned Data Governance
Immutable Audit Trails: Integrated Hibernate Envers to maintain a permanent, versioned history of all client vitals and sensitive records.

Mandatory Justification Logic: Implemented Reason Codes for every data modification. This ensures that every change to a client’s health record is backed by a documented clinical or administrative reason, satisfying GDPR Article 5 (Accountability).

Data Minimization: Engineered the backend to use UUIDs for internal logging, ensuring that logs remain useful for debugging without exposing PII (Personally Identifiable Information) in the event of a breach.

🏗️ Full-Stack Architecture
Backend: Built with Java 21 and Spring Boot 3, utilizing Spring Data JPA for robust database management and H2 for a zero-configuration, lightning-fast development environment.

Frontend: Developed a reactive UI using React + Vite, focusing on high-contrast accessibility and low-latency updates—critical for fast-paced caregiving environments.

Automated Versioning: Used @Audited entity listeners to automate the capture of "Before/After" snapshots of data, providing a complete "Time Machine" view of client history.

Backend (Spring Boot + H2 / PostgreSQL):
- Location: backend/
- Build: `mvn package`
- Run: `mvn spring-boot:run`
- Default DB: in-memory H2 (configured in `backend/src/main/resources/application-h2.properties`)
- To use PostgreSQL instead, run with `--spring.profiles.active=postgresql`

Frontend (React + Vite):
- Location: frontend/
- Install: `npm install`
- Run: `npm start`

Frontend dev proxy / CORS:
- Backend enables CORS for local dev origins in `backend/src/main/java/com/example/ppeinventory/config/CorsConfig.java`.
- The frontend proxy is configured to `http://localhost:1234` in `frontend/package.json` for local API forwarding.

Run commands:
```bash
# Start backend
cd backend
mvn spring-boot:run

# Install and start frontend
cd ../frontend
npm install
npm start