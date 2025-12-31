# User Management System

A full-stack authentication and user management application built with **React** and **Express.js**, featuring JWT-based authentication, role-based access control, and a PostgreSQL database(supabase).

---


##  Features

- **User Authentication**: Secure login and signup with JWT tokens
- **Password Hashing**: bcryptjs for secure password storage
- **Role-Based Access Control**: Admin and user role differentiation
- **Protected Routes**: Frontend route protection with context-based authentication
- **User Profile Management**: View and update user information
- **Dashboard**: User-specific dashboard page
- **Input Validation**: Server-side and client-side validation
- **Toast Notifications**: Real-time feedback with react-hot-toast
- **Responsive Design**: Tailwind CSS styling for modern UI

---

## Project Demo
![Image](https://github.com/user-attachments/assets/e97b7c8b-6f8e-4098-bb16-ae09c920ae4d)

##  Tech Stack

### Backend
- **Framework**: Express.js (v5.2.1)
- **Database**: PostgreSQL (pg)
- **Authentication**: JWT (jsonwebtoken)
- **Password Security**: bcryptjs
- **Validation**: express-validator
- **CORS**: Cross-origin resource sharing support
- **Environment**: dotenv
- **Development**: Nodemon

### Frontend
- **Library**: React (v19.2.0)
- **Build Tool**: Vite (v7.2.4)
- **Routing**: react-router-dom (v7.11.0)
- **HTTP Client**: axios
- **Styling**: Tailwind CSS (v4.1.18)
- **UI Components**: lucide-react
- **Notifications**: react-hot-toast
- **JWT Decoding**: jwt-decode
- **Linting**: ESLint

---

## 📁 Project Structure

```
purple-merit/
│
├── backend/
│   ├── index.js                  # Entry point
│   ├── package.json              # Backend dependencies
│   └── src/
│       ├── server.js             # Express server setup
│       ├── controllers/
│       │   ├── authController.js # Authentication logic
│       │   └── userController.js # User operations
│       ├── db/
│       │   ├── index.js          # Database connection
│       │   ├── init.js           # Database initialization
│       │   └── schema.sql        # Database schema
│       ├── middleware/
│       │   └── auth.js           # JWT authentication middleware
│       ├── routes/
│       │   ├── authRoutes.js     # Auth endpoint definitions
│       │   └── userRoutes.js     # User endpoint definitions
│       └── utils/                # Utility functions
│
├── frontend/
│   ├── index.html                # HTML entry point
│   ├── package.json              # Frontend dependencies
│   ├── vite.config.js            # Vite configuration
│   ├── tailwind.config.js        # Tailwind CSS config
│   ├── eslint.config.js          # ESLint configuration
│   ├── postcss.config.js         # PostCSS configuration
│   ├── README.md                 # Frontend documentation
│   └── src/
│       ├── main.jsx              # React entry point
│       ├── App.jsx               # Root component
│       ├── App.css               # Global styles
│       ├── index.css             # CSS reset and base styles
│       ├── api/
│       │   └── apiClient.js      # Axios configuration
│       ├── assets/               # Static assets
│       ├── components/
│       │   ├── Navbar.jsx        # Navigation component
│       │   ├── ProtectedRoute.jsx # Route protection component
│       │   └── ui.jsx            # UI components
│       ├── context/
│       │   └── AuthContext.jsx   # Authentication state
│       ├── pages/
│       │   ├── Login.jsx         # Login page
│       │   ├── Signup.jsx        # Signup page
│       │   ├── Profile.jsx       # User profile page
│       │   └── Dashboard.jsx     # Dashboard page
│       └── utils/
│           └── validation.js     # Validation utilities
│
└── README.md                     # Project documentation
```

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14.0.0 or higher)
- **npm**
- **PostgreSQL**
- **Git**

---

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/upenderdeshaboina/user-management
```

### 2. Backend Setup

```bash
cd backend
npm install
```

### 3. Frontend Setup

```bash
cd frontend
npm install
```

### 4. Database Setup

Create a PostgreSQL database and user:

```sql
CREATE DATABASE purple_merit; #i took it from supabase (free tier)
```

Then initialize the database schema from `backend/src/db/schema.sql`.

---

## 🔐 Environment Variables

Create a `.env` file in the `backend` directory with the following variables:

```env
# Database Configuration
DATABASE_URL=postgresql://purple_user:your_password@localhost:5432/purple_merit #i used supabased postgresql

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here

# Admin Configuration
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=secure_admin_password

# Server Configuration
PORT=5000
NODE_ENV=development
```

Create a `.env` file in the `frontend` directory (if needed):

```env
VITE_API_BASE_URL=http://localhost:5000
```

---

## ▶️ Running the Application

### Backend

```bash
cd backend

# Run development server
npm run dev


```

The backend will run on `http://localhost:5000`

### Frontend

```bash
cd frontend

# Run Frontend
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

```

The frontend will run on `http://localhost:5173`

---

## 🔌 API Endpoints

### Authentication Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/signup` | Register a new user | No |
| POST | `/api/auth/login` | User login | No |
| GET | `/api/auth/check` | Verify auth status | Yes |

### User Routes

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/users/profile` | Get current user profile | Yes |
| PUT | `/api/users/profile` | Update user profile | Yes |
| GET | `/api/users` | Get all users (Admin only) | Yes |
| GET | `/api/users/:id` | Get specific user | Yes |

---

## 🎯 Features Overview

### Authentication Flow

1. **User Registration**: New users sign up with email and password
2. **Password Encryption**: Passwords are hashed using bcryptjs
3. **JWT Token Generation**: Upon successful login, JWT token is issued
4. **Token Storage**: Token is stored in localStorage on the client
5. **Protected Routes**: Routes are protected using AuthContext and ProtectedRoute component
6. **Token Verification**: Backend validates JWT on each protected request

### User Roles

- **User**: Regular user with access to personal profile and dashboard
- **Admin**: Administrative access to user management features

### Pages

- **Login Page**: Authenticate existing users
- **Signup Page**: Register new users
- **Dashboard**: User-specific dashboard with protected access
- **Profile Page**: View and manage user profile information

---

