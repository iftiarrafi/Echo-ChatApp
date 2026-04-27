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
  <img src="./assets/home.png" alt="Echo Demo" width="800"/>
  
</div>

## ✨ Key Features

- **Real-Time Synergy:** Instant messaging capabilities powered by WebSockets.
- **Sleek Aesthetic:** Pixel-perfect dark-mode UI customized via Tailwind CSS utility classes.
- **State Management:** Highly predictable client-side state handling via Redux Toolkit.
- **Secure Authentication:** Robust JWT-based authentication system preventing unauthorized data access.
- **Modern Architecture:** Built on the reliable MERN stack for scalable, enterprise-grade application deployment.

## 🛠️ Tech Stack

- **Frontend:** React, React Router Dom, Redux Toolkit, Tailwind CSS 
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JSON Web Tokens (JWT) & bcrypt

---

## 🚀 Quick Start

Get Echo running locally in less than two minutes.

### 1. Clone & Install Dependencies
```bash
# Clone the repository
git clone https://github.com/iftiarrafi/Echo-ChatApp.git
cd Echo

# Install backend dependencies
cd backend && npm install

# Install frontend dependencies
cd ../frontend && npm install
```


> [!TIP]
> The frontend typically runs on `http://localhost:5173/` while the server runs on `http://localhost:3001/`. Make sure both ports are free.

---

## 🐳 Docker

The backend includes a **multistage Dockerfile** for optimized production builds.

### Build & Run

```bash
# Build the image
cd backend
docker build -t echo-backend .

# Run the container
docker run -d \
  --name echo-api \
  -p 3001:3001 \
  --env-file .env \
  echo-backend
```

> [!NOTE]
> The Dockerfile uses a two-stage build: the first stage installs all dependencies, the second stage copies only production dependencies onto a minimal `node:20-alpine` image — resulting in a significantly smaller final image. A non-root user is configured for security.

| Stage | Purpose | Base Image |
| ----- | ------- | ---------- |
| `builder` | Install all dependencies | `node:20-alpine` |
| `production` | Copy production deps & source, run app | `node:20-alpine` |

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


## ⚖️ License

Distributed under the **MIT License**. See `LICENSE` for more information.
