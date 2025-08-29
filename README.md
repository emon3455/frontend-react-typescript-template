# Frontend Typescript based React Template

A modern platform built to make your life easier. Fast, reliable, and designed for your needs.

---

## 📦 Repositories

- **Frontend:** [https://github.com/emon3455/frontend-react-typescript-template.git](https://github.com/emon3455/frontend-react-typescript-template.git)  
- **Backend:** [https://github.com/emon3455/backend-typescript-template.git](https://github.com/emon3455/backend-typescript-template.git)

Each repo contains a `.env.example` file — use it as the reference for your local `.env`.

---

## 🛠️ Tech Stack

### **Frontend**
- **Language & Framework**
  - [TypeScript](https://www.typescriptlang.org/) — type-safe JavaScript
  - [React](https://react.dev/) — component-based UI
  - [Vite](https://vitejs.dev/) — fast build tool

- **Routing & State**
  - [React Router DOM](https://reactrouter.com/) — client-side routing
  - [Redux Toolkit](https://redux-toolkit.js.org/) — predictable state management
  - [RTK Query](https://redux-toolkit.js.org/rtk-query/overview) — API data fetching

- **UI & Styling**
  - [Tailwind CSS](https://tailwindcss.com/) — utility-first CSS framework
  - [shadcn/ui](https://ui.shadcn.com/) — accessible UI components built on Radix + Tailwind
  - [Lucide Icons](https://lucide.dev/) — clean icon library

- **Forms & Validation**
  - [React Hook Form](https://react-hook-form.com/) — form handling
  - [Zod](https://zod.dev/) — runtime validation & type inference

- **Utilities**
  - [Axios](https://axios-http.com/) — API requests
  - [Sonner](https://sonner.emilkowal.ski/) — toast notifications

---

### **Backend**
- **Language & Framework**
  - [Node.js](https://nodejs.org/) — JavaScript runtime
  - [Express.js](https://expressjs.com/) — web framework
  - [TypeScript](https://www.typescriptlang.org/) — type safety

- **Database & Caching**
  - [MongoDB](https://www.mongodb.com/) — NoSQL database
  - [Mongoose](https://mongoosejs.com/) — ODM for MongoDB
  - [Redis](https://redis.io/) — caching and session management

- **Authentication & Security**
  - [Passport.js](http://www.passportjs.org/) — authentication middleware
  - [JWT](https://jwt.io/) — JSON Web Tokens for access & refresh tokens
  - Cookie-based sessions (httpOnly, secure)
  - OTP verification system with expiry
  - CORS & Helmet — security headers

- **Communication**
  - [Nodemailer](https://nodemailer.com/) — email service for OTP & notifications
  - SMTP integration for transactional emails

- **Validation & Error Handling**
  - [Zod](https://zod.dev/) — schema validation
  - Custom error handling middleware
  - Global AppError utility

- **Developer Tools**
  - [ESLint](https://eslint.org/) + [Prettier](https://prettier.io/) — linting & formatting
  - [Nodemon](https://nodemon.io/) — auto-reload in dev
  - Modular architecture (controllers, services, routes)

---

## 🧰 Prerequisites

- **Node.js** v22+ (LTS recommended)  
- **npm**, **pnpm**, or **yarn** (examples below use `npm`)  
- **MongoDB** (Atlas or local)

---

## 🔧 Local Setup — Frontend

1. **Clone & install**
   ```bash
   git clone https://github.com/emon3455/frontend-react-typescript-template.git
   cd frontend-react-typescript-template
   npm install
    ```
2. **Setup Environment**
    ```bash
   Copy `.env.example` → `.env`
   Fill in your values
    ```
3. **Run the app**
   ```bash
   npm run dev
   ```

   Visit: [http://localhost:5173](http://localhost:5173)

---

## 🔧 Local Setup — Backend

1. **Clone & install**
   ```bash
   git clone https://github.com/emon3455/backend-typescript-template.git
   cd backend-typescript-template
   npm install
   ```
---
2. **Setup Environment**
    ```bash
     Copy `.env.example` → `.env`
     Fill in your values
    ```
3. **Run the app**
   ```bash
   npm run dev
   ```

   API runs at: [http://localhost:5000](http://localhost:5000)

---

## 🆘 Troubleshooting

* **Env not working?**
  Make sure you created `.env` in the project root (copied from `.env.example`).

* **Frontend not connecting to API?**
  Check `VITE_API_BASE_URL` in frontend `.env` matches your backend URL.

* **Cookies not persisting in browser?**
  Ensure backend CORS allows your frontend origin and `credentials: true` is set.

---

---

## 📧 Contact

If you face any difficulties while setting up or running the application, feel free to reach out to me via email.
Thank you for using **Our Template** 🎉
