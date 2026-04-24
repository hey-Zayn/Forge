# Implementation Plan - Industrial MERN Backend Scaffolder (V2.0)

Upgrade the existing CLI to generate production-ready, enterprise-grade MERN backends. This version focuses on scalability, security, and developer experience.

## User Review Required

> [!IMPORTANT]
> I am proposing a shift to a **Layered Architecture** (Routes -> Controllers -> Services -> Models). This is the industry standard for scalable Node.js applications.

> [!NOTE]
> We will introduce **TypeScript** as an optional (but recommended) choice in the wizard.

## Proposed Changes

### 1. Architectural Overhaul (The Service Layer)
- Introduce a `services/` directory to separate business logic from HTTP handling.
- Controllers will now call Services and handle responses.
- Implement a `utils/ApiError.js` and `utils/ApiResponse.js` for consistent API communication.

### 2. New Industrial Features
- **Validation**: Integrate `Zod` for request schema validation.
- **Security**: Pre-configure `helmet`, `xss-clean`, and `express-rate-limit`.
- **Advanced Auth**: Implement Access/Refresh token rotation.
- **Documentation**: Add `swagger-jsdoc` and `swagger-ui-express`.
- **DevOps (Optional)**: Add `Dockerfile`, `docker-compose.yml`, and `.github/workflows/main.yml`.
- **Testing (Optional)**: Add a `tests/` folder with basic integration test setup (Jest/Supertest).

### 3. Template System Enhancements
- **TypeScript Support**: Create parallel templates for `.ts` files.
- **Handlebars/Template Logic**: Refactor `scaffold.js` to handle conditional injections more cleanly.

### 4. Updated Directory Structure (Generated Project)
```text
src/
├── config/         # Environment variables & DB config
├── controllers/    # Request handling & Response sending
├── services/       # Business logic (The core)
├── models/         # Database schemas
├── routes/         # API endpoints
├── middleware/     # Auth, error handling, validation
├── utils/          # Standardized helpers
├── app.ts/js       # Express app setup
└── server.ts/js    # Server entry point
```

## Verification Plan

### Automated Tests
- Build a sample project using the new CLI and run `npm run test` (Jest).
- Run `docker-compose up` to ensure the containerized environment works.

### Manual Verification
1. Generate a project with all "Industrial" options.
2. Verify Swagger UI is accessible at `/api-docs`.
3. Test a protected route using a Refresh Token flow.
4. Check that invalid inputs are caught by Zod validation.
