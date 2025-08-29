# EPay — Digital Wallet Platform (BD)

EPay is a role-based digital wallet platform for Bangladesh that supports secure onboarding, wallet management, peer-to-peer transfers, cash-in/cash-out via agents, fees & commissions, and an admin back office.  

The stack is **TypeScript + React (Vite)** on the frontend and **Node.js + Express + Mongoose** on the backend, with cookie-based auth and JWT.

---

## 🚀 Live

- **Frontend (Web App):** [https://e-pay-bd.vercel.app](https://e-pay-bd.vercel.app)  
- **Backend (API):** [https://epay-backend.vercel.app](https://epay-backend.vercel.app)

---

## 📦 Repositories

- **Frontend:** [https://github.com/emon3455/EPay-Frontend](https://github.com/emon3455/EPay-Frontend)  
- **Backend:** [https://github.com/emon3455/Epay-Backend](https://github.com/emon3455/Epay-Backend)

Each repo contains a `.env.example` file — use it as the reference for your local `.env`.

---

## ✨ Core Features

- **Auth & Accounts**
  - Email/OTP verification (short-lived codes)
  - Cookie-based sessions with JWT
  - Roles: **Admin**, **Agent**, **User**
  - User verification flags: email/phone/address/document/emergency contact → auto-compute `isVerified`

- **Wallet**
  - Initialize wallet per user
  - Balance tracking & blocking logic (`isActive === "BLOCKED"` disables ops)
  - Daily IM updates (planned) and audit trails

- **Transactions**
  - Send money, cash-in, cash-out, top-up, withdraw
  - Fees & agent commission logic
  - Full transaction history & filters

- **Back Office**
  - Admin dashboards (users, agents, transactions, balances)
  - Agent approval workflows (planned)
  - System summaries and revenue snapshots

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
  - [Framer Motion](https://www.framer.com/motion/) — animations

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
  - Bcrypt — password hashing
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
- **Redis** (local or hosted, optional but recommended)

---

## 🔧 Local Setup — Frontend

1. **Clone & install**
   ```bash
   git clone https://github.com/emon3455/EPay-Frontend
   cd EPay-Frontend
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
   git clone https://github.com/emon3455/Epay-Backend
   cd Epay-Backend
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
Thank you for using **EPay** 🎉
