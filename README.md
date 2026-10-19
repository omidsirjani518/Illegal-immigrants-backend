Markdown
# 🚀 Sapra Beta Backend API

A robust Node.js & Express backend built for enterprise applications, featuring JWT authentication, MongoDB data storage, Real-time WebSockets via Socket.IO, and GraphQL support.

---

## 📋 Table of Contents
1. [Tech Stack](#-tech-stack)
2. [Getting Started & Installation](#-getting-started--installation)
3. [Environment Variables](#-environment-variables)
4. [Authentication](#-authentication)
5. [API Endpoints](#-api-endpoints)
   - [Auth Routes](#1-auth-routes-apiapianth)
   - [User Routes](#2-user-routes-apiusers)
   - [CRM & Dashboard](#3-crm--dashboard-apicrm)
   - [Messages](#4-messages-apimessages)
   - [Upload & Profile](#5-upload--profile-apiprofile--apiupload)
   - [Notifications](#6-notifications-apinotification)
6. [Real-time & GraphQL](#-real-time--graphql)

---

## 🧰 Tech Stack
* **Runtime:** Node.js
* **Framework:** Express.js
* **Database:** MongoDB / Mongoose
* **Authentication:** JSON Web Tokens (JWT) & Bcryptjs
* **Real-time:** Socket.IO
* **API Query Language:** GraphQL (Apollo Server)
* **File Upload:** Multer

---

## ⚙️ Getting Started & Installation

### Prerequisites
* Node.js (v18+ recommended)
* MongoDB running locally or via cloud (Atlas)

### Installation Steps
1. Clone the repository:
   ```bash
   git clone [https://github.com/omidsirjani518/Illegal-immigrants-backend.git](https://github.com/omidsirjani518/Illegal-immigrants-backend.git)
   cd Illegal-immigrants-backend
Install dependencies:

Bash
npm install
Create a .env file in the root directory (see Environment Variables).

Run the server:

Development mode (with Nodemon):

Bash
npm run dev
Production mode:

Bash
npm start
Build Windows Executable (.exe):

Bash
npm run pack
🔑 Environment Variables
Create a .env file in the root path with the following variables:

Code snippet
HTTP_PORT=4000
HTTPS_PORT=4443
MONGO_URI=mongodb://localhost:27017/your_database_name
SECRET_KEY=your_super_secret_jwt_key
(Note: For HTTPS and Socket.IO secure connections, ensure ssl/key.pem and ssl/cert.pem exist in the root folder).

🔒 Authentication
Protected endpoints require a Bearer token passed in the HTTP request headers:

HTTP
Authorization: Bearer <your_jwt_token>
📡 API Endpoints
1. Auth Routes (/api/auth)
POST /api/auth/sign-in - User login ({ username, password })

POST /api/auth/sign-up - Register a new user ({ username, email, mobile, password, cityCode, roleId })

POST /api/auth/forgot-password - Request password recovery code ({ email })

POST /api/auth/verify-code - Verify reset code and receive temporary reset token ({ email, vCode })

POST /api/auth/reset-password - Reset final password ({ newPassword, resetToken })

2. User Routes (/api/users) - 🔒 Protected
GET /api/users/all - Get all system users (excluding current user)

GET /api/users/me - Get current authenticated user profile

POST /api/users/update-profile - Update profile data ({ id, email, mobile, title, avatar, roleId })

3. CRM & Dashboard (/api/crm)
GET /api/crm/dashboard - Get general CRM statistics, regional stats, and recent leads

POST /api/crm/customers - Get paginated, filtered, and sorted customer list

GET /api/crm/customers-statistic - Get global counts of active, total, and new customers

GET /api/crm/customer-details?id=... - Get deep details and order history for a specific customer

DELETE /api/crm/customer/delete - Remove customer by ID ({ id })

4. Messages (/api/messages) - 🔒 Protected
GET /api/messages/older - Fetch older chat messages (supports pagination with skip, limit, and targetUser)

5. Upload & Profile (/api/profile & /api/upload)
POST /api/upload - Upload a single file (Form-data key: file)

POST /api/profile/avatar - Upload and update current user avatar (🔒 Protected - Form-data key: avatar)

6. Notifications (/api/notification)
GET /api/notification/count - Get unread notification counts

GET /api/notification/list - Get full list of system notifications

⚡ Real-time & GraphQL
Socket.IO: Runs over HTTP/HTTPS servers for real-time bi-directional messaging.

GraphQL Playground: Available at https://localhost:4443/graphql (introspection enabled).