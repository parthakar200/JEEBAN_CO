# 🇮🇳 jeebanco Clone — MERN Stack

A full-featured clone of [jeebanco.com](https://www.jeebanco.com) — India's largest corporate compliance platform. Built with the MERN stack (MongoDB, Express, React, Node.js).

---

## 🚀 Features

### Frontend (React)
- **Homepage** — Hero with animated rotating text, popular services, category browser, testimonials, FAQs, CTA
- **Services Listing** — Filter by category, search, sort by price, sidebar navigation
- **Service Detail** — Tabs (Overview, Documents, Process, FAQs), sticky pricing card, order button
- **Checkout Flow** — 3-step wizard: Business Details → Document Upload → Payment
- **Authentication** — Login & Register with password strength indicator
- **Dashboard** — Orders tracking, quick actions, profile management, document vault
- **Contact Page** — Office locations, contact form with submission handling
- **About Page** — Company story, team, timeline, certifications
- **Static Pages** — Terms & Conditions, Privacy Policy, 404

### Backend (Node.js + Express)
- **Auth API** — Register, Login, Get Me, Update Profile, Change Password (JWT)
- **Services API** — CRUD, filter by category, search, pagination
- **Orders API** — Create, track, update payment/status, admin view all
- **Documents API** — Upload records, list, delete
- **Users API** — Admin list/delete users
- **Contact API** — Form submission handler

### Database (MongoDB + Mongoose)
- **User** model with bcrypt password hashing
- **Service** model with price calculation, ratings, process steps
- **Order** model with status timeline, payment tracking
- **Document** model for KYC document management

---

## 📁 Project Structure

```
jeebanco-clone/
├── server/                    # Node.js + Express backend
│   ├── index.js               # Server entry point
│   ├── seed.js                # Database seeder
│   ├── models/
│   │   ├── User.js
│   │   ├── Service.js
│   │   ├── Order.js
│   │   └── Document.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── services.js
│   │   ├── orders.js
│   │   ├── users.js
│   │   ├── documents.js
│   │   └── contact.js
│   └── middleware/
│       └── auth.js            # JWT middleware
│
├── client/                    # React frontend
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── App.js             # Routes
│       ├── index.js
│       ├── context/
│       │   └── AuthContext.js # Global auth state
│       ├── components/
│       │   ├── layout/
│       │   │   ├── Navbar.js
│       │   │   └── Footer.js
│       │   ├── sections/
│       │   │   └── Hero.js
│       │   └── ui/
│       │       └── ServiceCard.js
│       ├── pages/
│       │   ├── HomePage.js
│       │   ├── ServicesPage.js
│       │   ├── ServiceDetailPage.js
│       │   ├── LoginPage.js
│       │   ├── RegisterPage.js
│       │   ├── DashboardPage.js
│       │   ├── CheckoutPage.js
│       │   ├── ContactPage.js
│       │   ├── AboutPage.js
│       │   └── StaticPages.js
│       ├── utils/
│       │   └── servicesData.js  # Mock data for 12 services
│       └── styles/
│           └── globals.css
│
├── .env.example               # Environment variables template
├── package.json               # Root with concurrently
└── README.md
```

---

## ⚙️ Setup Instructions

### 1. Prerequisites
- Node.js v18+
- MongoDB (local) or MongoDB Atlas URI
- npm or yarn

### 2. Clone & Install

```bash
# Install root + server dependencies
npm install

# Install client dependencies
cd client && npm install && cd ..
```

### 3. Environment Variables

```bash
cp .env.example .env
# Edit .env with your MongoDB URI, JWT secret, etc.
```

### 4. Seed the Database (optional)

```bash
node server/seed.js
# Creates admin user: admin@jeebanco.com / admin@123
# Seeds 5 sample services
```

### 5. Run Development

```bash
# Run both server (port 5000) and client (port 3000) concurrently
npm run dev

# Or run separately:
# Server: node server/index.js
# Client: cd client && npm start
```

### 6. Production Build

```bash
cd client && npm run build
cd ..
NODE_ENV=production npm start
```

---

## 🔑 API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get current user (protected) |
| PUT | `/api/auth/update-profile` | Update profile (protected) |
| POST | `/api/auth/change-password` | Change password (protected) |

### Services
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/services` | List all services (with filters) |
| GET | `/api/services/:slug` | Get service by slug |
| POST | `/api/services` | Create service (admin) |
| PUT | `/api/services/:id` | Update service (admin) |
| GET | `/api/services/category/:cat` | Get by category |

### Orders
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/orders` | Create order (protected) |
| GET | `/api/orders` | Get user's orders (protected) |
| GET | `/api/orders/:id` | Get order detail (protected) |
| PUT | `/api/orders/:id/payment` | Update payment (protected) |
| PUT | `/api/orders/:id/status` | Update status (admin) |
| GET | `/api/orders/admin/all` | All orders (admin) |

---

## 🎨 Design System

- **Primary**: `#1a56db` (jeebanco Blue)
- **Orange**: `#f97316`
- **Green**: `#16a34a`
- **Heading Font**: Syne (Google Fonts)
- **Body Font**: DM Sans (Google Fonts)

---

## 🚢 Deployment

### Frontend (Vercel)
```bash
cd client
vercel deploy
```

### Backend (Railway / Render)
- Set environment variables in dashboard
- Deploy the root folder
- Set start command: `npm start`

### Full Stack (Single server)
```bash
npm run build:client  # Builds React into client/build
npm start             # Serves both API and static files
```

---

## 📦 Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React 18, React Router 6 |
| State | Context API + Axios |
| Styling | Custom CSS with CSS Variables |
| Backend | Node.js, Express 4 |
| Database | MongoDB, Mongoose |
| Auth | JWT, bcryptjs |
| Payments | Razorpay, Stripe (ready to integrate) |
| Email | Nodemailer (configured) |
| Dev | Concurrently, Nodemon |

---

## 📝 License

MIT — for educational purposes. Not affiliated with jeebanco Pvt. Ltd.
