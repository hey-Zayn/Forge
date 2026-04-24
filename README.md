# 🚀 Forge: The Golden Standard MERN Scaffolder

[![npm version](https://img.shields.io/badge/npm-v1.1.0-blue.svg)](https://www.npmjs.com/)
[![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](https://opensource.org/licenses/ISC)
[![Star on GitHub](https://img.shields.io/github/stars/hey-Zayn/Forge.svg?style=social)](https://github.com/hey-Zayn/Forge)

**Forge** is a premium CLI tool designed for developers who demand the best. It scaffolds production-ready MERN (MongoDB, Express, React, Node) backend projects using a modular, "Golden Standard" architecture that scales from MVP to Enterprise.

---

## 🌟 Why Forge?

Traditional scaffolders give you a mess of spaghetti code. **Forge** gives you a professional, layered architecture out of the box.

- **🏆 Golden Standard Architecture**: Service-oriented design with clear separation of concerns (Controllers, Services, Libs, Utils).
- **🎨 Fullstack EJS Mode**: Rapidly prototype with a pre-built EJS UI layer that's "easy-to-remove" when you're ready to go headless.
- **🛡️ Type-Safe by Design**: Full support for **TypeScript** with modern `tsx` execution and ESM.
- **🧩 Modular Features**: Add JWT Authentication, Winston Logging, Swagger Docs, Zod Validation, and Docker support with a single toggle.
- **⚡ Ultra Fast**: Built for speed and developer experience.

---

## 🚀 Quick Start

Generate your professional backend in seconds:

```bash
# Run via npx (coming soon to npm)
npx create-mern-api my-awesome-project

# Or run locally from this repo
git clone https://github.com/hey-Zayn/Forge.git
cd Forge
npm install
npm link

# Now you can use it anywhere!
create-mern-api
```

---

## 🏗️ The "Golden Standard" Structure

Forge generates a structure that senior engineers love:

```text
src/
├── controllers/    # Request & Response handling
├── services/       # Core Business Logic (The brain)
├── models/         # Database Schemas
├── routes/         # Express Route definitions
├── middlewares/    # Custom Middlewares (Auth, Error, Validation)
├── libs/           # 3rd party wrappers (JWT, Cloudinary, etc.)
├── utils/          # Shared Helpers (ApiError, ApiResponse)
├── views/          # EJS Templates (Optional)
└── public/         # Static Assets (Optional)
```

---

## 🛠️ Features & Commands

### Interactive Wizard
The beautiful CLI wizard guides you through:
- **Language**: Choose between **JavaScript (ESM)** or **TypeScript**.
- **Project Type**: Choose **Raw Backend** (API only) or **Fullstack (EJS)**.
- **Features**: Toggle JWT, Swagger, Zod, and Docker.

### Generated Project Scripts
- `npm run dev`: Start the server with instant hot-reload (`nodemon`/`tsx`).
- `npm run build`: Build the TypeScript project (if applicable).
- `npm start`: Production-ready server startup.

---

## 🐳 Docker Ready
Forge can generate a complete DevOps setup:
- `Dockerfile`: Multi-stage build for production.
- `docker-compose.yml`: Spawns your API and a MongoDB instance automatically.

---

## 🤝 Contributing

We love stars ⭐ and contributions! 
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git checkout -b feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

Distributed under the ISC License. See `LICENSE` for more information.

---

<p align="center">
  Built with ❤️ by <a href="https://github.com/hey-Zayn">hey-Zayn</a>
</p>
