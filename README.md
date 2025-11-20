<h1 align="center">📦 MERN Project</h1>
<p align="center"><i>A full-stack MERN application with authentication, dashboards, protected routes, and MongoDB integration.</i></p>

---

<h2 align="center">🚀 Tech Stack</h2>

<p align="center">
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black"/>
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white"/>
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white"/>
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white"/>
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white"/>
</p>

---

## ✨ Features

- 🔐 **User Authentication** (Login & Signup)
- 🧑‍💼 **User & Agent Dashboards**
- 🔒 **Protected Routes** (JWT Auth)
- 📦 **Order Tracking System**
- 🧭 Clean folder structure (MVC)
- ⚡ Fast React frontend using **Vite**
- 🌱 MongoDB auto-creates collections

---

### <h2 align="center">📂 Folder Structure Breakdown</h2>

```bash
server/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── middlewares/
│   ├── routes/
│   └── helpers/
├── package.json
└── .env

client/
 ├── src/
 │    ├── components/
 │    ├── assets/
 │    ├── App.jsx
 │    ├── main.jsx
 ├── package.json
 └── .env
```


---

<h2 align="center">⚙️ Backend Setup (server/)</h2>

### 📌 1. Navigate to backend
```bash
cd server
```
### 📌 2. Install dependencies
```bash
npm install
```
### 📌 3. Create .env file
```bash
PORT=5000
MONGO_URI=mongodb://localhost:27017/mern_project
JWT_SECRET=your_jwt_secret_key
```

<h2 align="center">💻 Frontend Setup (client/)</h2>

### 📌 1. Navigate to frontend
```bash
cd client
```

### 📌 2. Install dependencies
```bash
npm install
```

### 📌 3. Create .env file
```bash
VITE_API_URL=http://localhost:5000
```


<h2 align="center">🗄️ Database Setup (MongoDB)</h2>

###  Local MongoDB
Just install MongoDB and start the service.

<h2 align="center"> Run the Project</h2>

### ▶️ Start Backend
```bash
cd server
npm run dev
```
### ▶️ Start Frontend
```bash
cd client
npm run dev
```


