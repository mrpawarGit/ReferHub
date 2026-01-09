# 📌 ReferHub – Backend

This is the **backend service** for the Candidate Referral Management System.
It provides secure REST APIs for user authentication, candidate referrals, resume uploads, and candidate status management.

---
# 🌐 Live Backend API - [ReferHub (Click Here👆🏻)](https://referhub-kng8.onrender.com)
---

## 🚀 Tech Stack

* **Node.js**
* **Express.js**
* **MongoDB (Mongoose)**
* **JWT Authentication**
* **Cloudinary** (Resume storage)
* **Multer** (File handling)

---

## ✨ Features Implemented

### 🔐 Authentication

* User Registration
* User Login
* JWT-based authentication
* Protected routes using middleware

### 👥 Candidate Management

* Refer a candidate
* Fetch all candidates
* Update candidate status (Pending → Reviewed → Hired)
* Delete candidate (optional)
* Track who referred each candidate

### 📄 Resume Upload

* Upload resumes in **PDF format only**
* Files stored securely on **Cloudinary**
* Resume URL saved in MongoDB
* Deployment-safe (no local storage dependency)

### 🛡️ Validation & Security

* JWT verification middleware
* PDF-only upload restriction
* Secure password hashing using bcrypt

---

## 🏗️ Project Structure

```
backend/
│
├── .env
├── package.json
│
└── src/
    ├── server.js
    ├── config/
    │   ├── db.js
    │   └── cloudinary.js
    │
    ├── models/
    │   ├── User.model.js
    │   └── Candidate.model.js
    │
    ├── controllers/
    │   ├── auth.controller.js
    │   └── candidate.controller.js
    │
    ├── routes/
    │   ├── auth.routes.js
    │   └── candidate.routes.js
    │
    ├── middleware/
    │   ├── auth.middleware.js
    │   └── upload.middleware.js
    │
    └── utils/
        └── cloudinaryUpload.js
```

---

## ⚙️ Environment Variables

Create a `.env` file in the backend root:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

⚠️ Make sure **PDF / ZIP delivery is enabled** in Cloudinary settings.

---

## ▶️ How to Run Locally

### 1️⃣ Install dependencies

```bash
npm install
```

### 2️⃣ Start the server

```bash
npm run dev
```

Server will run on:

```
http://localhost:3000
```

---

## 📡 API Endpoints

### 🔐 Authentication

#### Register User

```
POST /api/auth/register
```

```json
{
  "name": "First Last",
  "email": "user@gmail.com",
  "password": "Pass@123"
}
```

#### Login User

```
POST /api/auth/login
```

Response:

```json
{
  "token": "<JWT_TOKEN>"
}
```

---

### 👥 Candidate APIs (JWT Protected)

> Add this header for all requests:

```
Authorization: Bearer <JWT_TOKEN>
```

#### Refer Candidate (with optional resume)

```
POST /api/candidates
```

**Body → form-data**

| Key      | Type        |
| -------- | ----------- |
| name     | Text        |
| email    | Text        |
| phone    | Text        |
| jobTitle | Text        |
| resume   | File (.pdf) |

---

#### Get All Candidates

```
GET /api/candidates
```

---

#### Update Candidate Status

```
PUT /api/candidates/:id/status
```

```json
{
  "status": "Reviewed"
}
```

---

#### Delete Candidate (Optional)

```
DELETE /api/candidates/:id
```

---

## 🧠 Design Decisions

* **JWT Authentication** for stateless security
* **Cloudinary** used instead of local storage to handle server restarts and deployment environments
* **Multer memory storage** to avoid file system dependency
* Modular MVC-style folder structure for scalability

---

## 📈 Possible Enhancements

* Role-based access (Recruiter / User)
* Metrics API (total candidates, status count)
* Pagination & filtering
* Resume preview permissions
* Email notifications

---

## 🧪 API Testing

* APIs tested using **Postman**
* Resume upload tested using `multipart/form-data`
* JWT-protected routes validated

---

