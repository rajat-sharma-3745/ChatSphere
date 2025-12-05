# 🗨️ MERN Real-Time Chat Application

A real-time chat application built using the **MERN** stack with **Socket.io** for instant messaging, typing indicators, presence tracking, and channel-based communication.

---

## 🚀 Features

### **Core Requirements**
- 🔐 User authentication (login, signup, logout)
- 💬 Real-time messaging across channels
- 🛰️ Real-time presence (online / offline users)
- 👥 Create, join, and leave channels
- 💾 Paginated messages (infinite scroll supported)
- 📡 Socket.io rooms for per-channel message isolation

### **Optional Enhancements**
- 🎯 Typing indicators per channel
- ✔ Clean UI with Tailwind CSS

---

## 🛠️ Tech Stack

### **Frontend**
- React (Vite)
- React Router
- Context API for global state
- Socket.io client
- Tailwind CSS
- Axios

### **Backend**
- Node.js + Express
- MongoDB + Mongoose
- Socket.io (real-time engine)
- JWT Authentication
- CORS + Cookie Parser

---
## Setup & run (step-by-step)

> Follow both backend and frontend steps to run the app locally.
## Clone the repository
```bash
git clone https://github.com/rajat-sharma-3745/ChatSphere.git
cd ChatSphere
```

### Backend

1. Open a terminal and `cd` into the backend folder:

```bash
cd Backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in `Backend/` (see **Environment variables** below). Example:

```
PORT=3000
MONGO_URI=your_onnection_string
JWT_SECRET=your_secret_key
CLIENT_URL = http://localhost:5173
```

4. Run the server in development (common scripts):

* If the repository has a `start` script :

```bash
npm start
```

* Otherwise start directly with Node:

```bash
node server.js
```

The backend typically listens on port `3000` (or the port set in `.env`).

### Frontend

1. Open a separate terminal and `cd` into the frontend folder:

```bash
cd Frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the Vite dev server:

```bash
npm run dev
```

By default Vite serves the app on `http://localhost:5173/` (or the port shown in the terminal). Ensure the frontend's `axiosInstance.js` uses the backend base URL (e.g., `http://localhost:3000/api`) 


## Assumptions
## 1. Avatar Handling

User avatars are automatically generated using the first letter of the username; the system does not support file/image uploads.

## 2. Channel-Based Messaging Only

The application supports only channel-based messaging, as required by the assignment; direct 1-to-1 private chats (DMs) are intentionally excluded.

## 3. Presence Based on Socket Connections

User online/offline status is determined purely by active Socket.io connections, not persisted in any database.
Presence resets on page refresh or browser close.

## 4. Typing Indicator Assumption

Typing indicators are per channel, and a user is considered typing only while sending continuous keystrokes (2-second timeout resets).

## 5. Pagination Behavior

Message pagination uses a page + limit approach rather than cursor, ensuring consistent ordering and avoiding duplication when switching channels.


## Optional Features Implemented
```bash
Online indicator next to usernames
Online member count per channel
Typing indicators per channel
```




