# 🚀 ReferHub – Frontend 

This is the **frontend application** for **ReferHub**, a Candidate Referral Management System.
It allows users to authenticate, refer candidates, manage candidate status, and view/edit candidate details in a clean dashboard interface.

Built with **React + Vite + Tailwind CSS** and integrated with a **Node.js + MongoDB backend** using JWT authentication.

---
# 🌐 Live APP - [ReferHub (Click Here👆🏻)](https://refer-hub-five.vercel.app/)
---

## 🛠 Tech Stack

* **React (Vite)**
* **Tailwind CSS**
* **React Router DOM**
* **Axios**
* **JWT Authentication**
* **Cloudinary (for resume viewing)**

---

## ✨ Features

### 🔐 Authentication

* User **Login** & **Signup**
* JWT-based authentication
* Protected routes
* Persistent login using `localStorage`

### 📊 Dashboard

* View all referred candidates
* Search candidates by **name or job title**
* Filter candidates by **status**
* Inline **status update** (Pending → Reviewed → Hired)

### ➕ Refer Candidate

* Modal-based referral form
* Fields:

  * Name
  * Email
  * Phone
  * Job Title
  * Resume upload (PDF)
* User-friendly resume upload UI with icon and guidance

### 👁️ Candidate Details

* Click on a candidate card to:

  * View full details
  * Edit candidate info
  * Delete candidate
  * Open resume (PDF)

### ⏳ UX Enhancements

* Global loading screen (handles backend cold start)
* Clean layout with Navbar & Footer
* Modals for better user flow
* Error handling & loading states

---

## 📁 Project Structure

```
src/
├── api/
│   └── axios.js
│
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── Loader.jsx
│   ├── CandidateCard.jsx
│   ├── CandidateForm.jsx
│   └── CandidateDetailsModal.jsx
│
├── context/
│   └── AuthContext.jsx
│
├── layouts/
│   └── MainLayout.jsx
│
├── pages/
│   ├── Login.jsx
│   ├── Register.jsx
│   └── Dashboard.jsx
│
├── routes/
│   └── ProtectedRoute.jsx
│
├── styles/
│   └── index.css
│
├── App.jsx
└── main.jsx
```

---

## ⚙️ Environment Variables

Create a `.env` file in the **frontend root**:

```env
VITE_BACKEND_URL=http://localhost:3000
```

> ⚠️ Note:
>
> * Vite requires environment variables to start with `VITE_`
> * Restart the dev server after changing `.env`

---

## 🚀 Getting Started (Local Setup)

### 1️⃣ Install Dependencies

```bash
npm install
```

### 2️⃣ Start Development Server

```bash
npm run dev
```

Frontend will run on:

```
http://localhost:5173
```

---

## 🔗 Backend Integration

This frontend expects the backend to expose the following APIs:

| Method | Endpoint                     | Description      |
| ------ | ---------------------------- | ---------------- |
| POST   | `/api/auth/register`         | Register user    |
| POST   | `/api/auth/login`            | Login user       |
| GET    | `/api/candidates`            | Fetch candidates |
| POST   | `/api/candidates`            | Refer candidate  |
| PUT    | `/api/candidates/:id`        | Update candidate |
| PUT    | `/api/candidates/:id/status` | Update status    |
| DELETE | `/api/candidates/:id`        | Delete candidate |

JWT token is automatically attached to requests via Axios interceptor.

---

## 🧠 Design Decisions

* **Modals instead of routes** for candidate details → faster UX
* **Client-side search & filtering** → better performance for small datasets
* **Global loader** → smooth cold-start experience after deployment
* **Single Axios instance** → centralized API & auth handling

---
