# Sentinel-CareApp

PPE Inventory + Clients + Audit Log

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
- The frontend proxy is configured to `http://localhost:8080` in `frontend/package.json` for local API forwarding.

Run commands:
```bash
# Start backend
cd backend
mvn spring-boot:run

# Install and start frontend
cd ../frontend
npm install
npm start
```

Tests:
```bash
# Run backend tests
cd backend
mvn test

# Run frontend tests
cd ../frontend
npm install
npm test
```

Front-end manual smoke test:
```bash
# 1. Open http://localhost:1234
# 2. Login with admin/password
# 3. Add or edit PPE items
# 4. Add/edit clients and vitals
# 5. View the audit log
```

Notes:
- Backend APIs are under `/api/*`.
- Basic auth credentials (HTTP Basic): `admin`/`password`, `user`/`password`.
