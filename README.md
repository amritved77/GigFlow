# GigFlow – Mini Freelance Marketplace Platform

GigFlow is a mini freelance marketplace where users can post jobs (Gigs) and freelancers can bid on them. The platform supports secure authentication, hiring logic with transactional integrity, and real-time notifications using Socket.io.

---

## 🚀 Features

### 🔐 Authentication
- User Registration & Login
- JWT Authentication using HttpOnly Cookies
- Secure Logout

### 🧑‍💼 Roles (Fluid)
- Any user can act as a **Client** (post jobs)
- Any user can act as a **Freelancer** (bid on jobs)
- Roles are determined dynamically by user actions

### 📄 Gig Management
- Browse all gigs
- Search gigs by title
- Post a new gig (logged-in users)
- Gig status: `open` → `assigned`

### 💬 Bidding & Hiring (Core Logic)
- Freelancers submit bids (message + price)
- Only the job owner can view bids
- Client can hire one freelancer
- On hiring:
  - Selected bid → `hired`
  - Other bids → `rejected`
  - Gig → `assigned`
- Implemented using MongoDB transactions (race-condition safe)

### ⚡ Real-time Notifications (Bonus)
- Integrated Socket.io
- When a freelancer is hired, they receive an instant notification:
  > “You have been hired for [Project Name]!”

---

## 🛠 Tech Stack

**Frontend**
- React (Vite)
- Tailwind CSS
- Redux Toolkit
- Socket.io Client

**Backend**
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Socket.io

---

