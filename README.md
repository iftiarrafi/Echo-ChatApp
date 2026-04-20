<div align="center">
  <h1>Echo</h1>
  <p><b>Return to your resonance.</b> A minimalist, high-performance real-time chat platform built for seamless digital communication.</p>

  ![Build Status](https://img.shields.io/badge/build-passing-brightgreen?style=flat-square)
  ![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)
  ![Version](https://img.shields.io/badge/version-v1.0.0-orange?style=flat-square)
  ![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)
</div>

---

## 📸 Overview

> [!NOTE] 
> This project embraces a hyper-minimalist, sleek design framework inspired by modern app aesthetics, ensuring a distraction-free user experience.

<div align="center">
  <img src="./docs/demo-placeholder.gif" alt="Echo Demo" width="800"/>
  <p><i>(Placeholder: Insert stunning GIF or screenshot here)</i></p>
</div>

## ✨ Key Features

- **Real-Time Synergy:** Instant messaging capabilities powered by WebSockets.
- **Sleek Aesthetic:** Pixel-perfect dark-mode UI customized via Tailwind CSS utility classes.
- **State Management:** Highly predictable client-side state handling via Redux Toolkit.
- **Secure Authentication:** Robust JWT-based authentication system preventing unauthorized data access.
- **Modern Architecture:** Built on the reliable MERN stack for scalable, enterprise-grade application deployment.

## 🛠️ Tech Stack

- **Frontend:** React, React Router Dom, Redux Toolkit, Tailwind CSS (Vite via Rollup)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JSON Web Tokens (JWT) & bcrypt

---

## 🚀 Quick Start

Get Echo running locally in less than two minutes.

### 1. Clone & Install Dependencies
```bash
# Clone the repository
git clone https://github.com/yourusername/Echo.git
cd Echo

# Install backend dependencies
cd backend && npm install

# Install frontend dependencies
cd ../frontend && npm install
```

### 2. Configure Environment
Copy the `.env.example` configurations to `.env` in both the `frontend` and `backend` directories. *See [Configuration](#-configuration) for the necessary keys.*

### 3. Spin Up the Development Servers
```bash
# Terminal 1: Start Backend (from /backend)
npm start

# Terminal 2: Start Frontend (from /frontend)
npm run start
```
> [!TIP]
> The frontend typically runs on `http://localhost:5173/` while the server runs on `http://localhost:3001/`. Make sure both ports are free.

---

## ⚙️ Configuration

Set up these required variables in your root `/backend/.env` file:

| Variable | Description | Example / Default |
| -------- | ----------- | ----------------- |
| `PORT` | API Server Port | `3001` |
| `MONGO_URI` | MongoDB Connection String | `mongodb+srv://...` |
| `JWT_SECRET` | Secret key for JWT hashing | `your_super_secret_key` |
| `NODE_ENV` | Application Environment | `development` |

---

## 🤝 Contributing

We love pull requests! If you'd like to improve Echo:

1. **Fork** the repository
2. **Create** your feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

Please ensure your code formatting generally aligns with our ESLint configuration. 

---

## ⚖️ License

Distributed under the **MIT License**. See `LICENSE` for more information.
