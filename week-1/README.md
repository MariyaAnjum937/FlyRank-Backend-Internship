# 🚀 FlyRank Task 1 — Minimal Node.js Backend

A simple backend server built with **Node.js** and **Express.js** as part of my **FlyRank Backend AI Engineering Internship**.

## ✨ Overview

This project demonstrates the fundamentals of creating a backend server with two JSON API endpoints.

### Endpoints

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/` | Returns a welcome message |
| GET | `/about` | Returns the authors information |

---

## 🛠️ Tech Stack

- Node.js
- Express.js
- JavaScript

---

## 📂 Project Structure

```
.
├── node_modules/
├── .gitignore
├── package.json
├── package-lock.json
└── server.js
```

---

## ⚡ Getting Started

### Clone the repository

```bash
git clone <repository-url>
cd flyrank-task-1-minimal-backend
```

### Install dependencies

```bash
npm install
```

### Start the server

```bash
node server.js
```

The server will run on:

```
http://localhost:3000
```

---

## 📡 API Responses

### `GET /`

```json
{
  "message": "Hello from FlyRank!"
}
```

### `GET /about`

```json
{
  "name" : 'Mariya',
  "role" : 'Backend AI Engineering Intern'
}
```

---

## 🎯 Internship Task

- ✅ Create a minimal backend server
- ✅ Build two JSON endpoints
- ✅ Test using browser and curl
- ✅ Publish the project on GitHub

---

## 👩‍💻 Author

**Mariya Anjum**

Backend AI Engineering Intern @ FlyRank
