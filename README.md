# 🚀 ReferHub – Candidate Referral Platform

ReferHub is a **FullStack Candidate Referral Management System** inspired by platforms like Worko.
It allows authenticated users to **refer candidates**, **upload resumes**, **track candidate status**, and **manage candidate data** through a clean dashboard interface.

---

## 🌐 Live Demo

* **Frontend (Vercel):**
  👉 [ReferHub App](https://refer-hub-five.vercel.app)

* **Backend (Render):**
  👉 [ReferHub-Backend](https://referhub-kng8.onrender.com)

> ⚠️ Note:
> The backend is deployed on **Render**, which may take a few seconds to wake up on the first request (cold start).
> A global loading screen is implemented in the frontend to handle this smoothly.

---

<img width="1130" height="659" alt="pro-referHub" src="https://github.com/user-attachments/assets/bc28aa6e-befc-4b97-ada3-7ce8ff59a95d" />

---
## 🏗 Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* React Router DOM
* Axios
* JWT Authentication

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT (Authentication & Authorization)
* Multer (file handling)
* Cloudinary (resume storage)

### Deployment

* **Frontend:** Vercel
* **Backend:** Render
* **Database:** MongoDB Atlas
* **File Storage:** Cloudinary

---

## ✨ Key Features

### 🔐 Authentication

* User registration & login
* JWT-based authentication
* Protected routes
* Persistent login using localStorage

### 📊 Dashboard

* View all referred candidates
* Search candidates by **name or job title**
* Filter candidates by **status**
* Inline status update:

  * Pending → Reviewed → Hired

### ➕ Refer Candidate

* Modal-based referral form
* Upload resume (PDF only)
* User-friendly resume upload UI
* Resume stored securely on Cloudinary

### 👁️ Candidate Management

* Click on a candidate card to:

  * View full candidate details
  * Edit candidate information
  * Delete candidate
  * Open resume PDF in browser

### ⏳ UX Enhancements

* Global loading screen (handles backend cold start)
* Clean layout with Navbar & Footer
* Modal-based workflows
* Proper error & loading states

---

## 📁 Project Structure

```
ReferHub/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── db.js
│   │   │   └── cloudinary.js
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── middleware/
│   │   ├── utils/
│   │   └── server.js
│   └── README.md
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── routes/
│   │   └── styles/
│   └── README.md
│
└── README.md  
```

---

## 🔌 API Overview

### Auth APIs

| Method | Endpoint             | Description         |
| ------ | -------------------- | ------------------- |
| POST   | `/api/auth/register` | Register a new user |
| POST   | `/api/auth/login`    | Login user          |

### Candidate APIs

| Method | Endpoint                     | Description              |
| ------ | ---------------------------- | ------------------------ |
| POST   | `/api/candidates`            | Refer a new candidate    |
| GET    | `/api/candidates`            | Get all candidates       |
| PUT    | `/api/candidates/:id`        | Update candidate details |
| PUT    | `/api/candidates/:id/status` | Update candidate status  |
| DELETE | `/api/candidates/:id`        | Delete candidate         |

> All candidate APIs are **protected** using JWT middleware.

---

## ⚙️ Environment Variables

### Backend (`backend/.env`)

```env
PORT=3000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Frontend (`frontend/.env`)

```env
VITE_BACKEND_URL=http://localhost:3000
```

---

## 🚀 Running Locally

### 1️⃣ Backend

```bash
cd backend
npm install
npm run dev
```

Backend runs on:

```
http://localhost:3000
```

---

### 2️⃣ Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## 🧠 Design Decisions & Architecture

* **Modal-based candidate management** instead of route-based pages for faster UX
* **Client-side filtering & search** for responsiveness
* **Separate status update endpoint** for clean API design
* **Cloudinary for resumes** to avoid filesystem issues on deployment
* **Central Axios instance** with JWT interceptor
* **Global loading screen** to handle Render cold starts gracefully

---

## 🧪 Testing Strategy

* Backend APIs tested using **Postman**
* Authentication flow manually tested via browser & Network tab
* Frontend state and API integration tested end-to-end

---

## 🎯 Assignment Coverage

✔ All required features implemented

✔ Bonus features included (JWT, Cloudinary, deployment)

✔ Clean UI & UX

✔ Production-ready architecture

---
