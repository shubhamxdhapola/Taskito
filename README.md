# ✅ Taskito - Full Stack Task Manager Application

**Taskito** is a role-based task management platform built with the MERN stack. It provides a seamless experience for both admins and members to manage and track tasks, view analytics, and stay organized. Admins can create, assign, and prioritize tasks, while members can track and update their task statuses in real-time.

---

## 🚀 Features

### 🧑‍💼 Member Features:

* Secure login and registration using JWT
* View tasks assigned by the admin
* Update task progress (Pending → In Progress → Completed)
* View personal task analytics via **Pie Chart** and **Bar Chart**
* Access personalized member dashboard

Thanks, Shubham! Based on this new feature, here's the updated section for your README's **Admin Features**, integrating this progress-tracking functionality:

---

### 🔧 Admin Features:

* Admin dashboard with task statistics and visual analytics (charts)
* Create, update, and delete tasks
* Assign tasks to specific members
* Set task priorities: Low, Medium, High
* **Track individual member progress**:

  * Total tasks assigned
  * Tasks completed
  * Tasks in progress
  * Pending tasks
    
---

## 🛠️ Tech Stack

### Frontend

* **React.js** – UI library
* **Redux** – State management
* **Tailwind CSS** – Utility-first styling

### Backend

* **Node.js** – Runtime environment
* **Express.js** – Web framework
* **MongoDB** – NoSQL database
* **JWT** – Authentication

---

## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/shubhamxdhapola/Taskito
cd Taskito
```

### 2. Install dependencies

**Frontend:**

```bash
cd frontend
npm install
```

**Backend:**

```bash
cd backend
npm install
```

---

### 3. Environment Variables

Create `.env` files in both `frontend` and `backend` directories.

#### 🔐 Backend `.env`

```
PORT=your_port_number
CLIENT_URL=your_frontend_url
MONGO_ATLAS_URI=your_mongodb_connection_uri
JWT_SECRET=your_jwt_secret_key
ADMIN_INVITE_TOKEN=your_admin_invite_token
CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

```

#### 🌐 Frontend `.env`

```
VITE_BACKEND_URL=your_backend_url
VITE_ADMIN_INVITE_TOKEN=your_admin_invite_token
```

---

### ▶️ Run the App

**Backend:**

```bash
cd backend
npm run dev
```

**Frontend:**

```bash
cd frontend
npm run dev
```

---

## 📁 Folder Structure

```
taskito/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   └── ...
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── ...
└── README.md
```

---

## ✨ Future Enhancements

* Email notifications for assigned/completed tasks
* Comment section for task discussions
* Deadline reminders and overdue notifications
* Filter and sort options for tasks
* Activity logs for audit trails

---

## 🤝 Contributing

Pull requests are welcome! Feel free to fork the project, make changes, and submit improvements.

---

## 📃 License

This project is licensed under the **MIT License**.
