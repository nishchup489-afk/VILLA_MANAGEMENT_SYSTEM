# Villa Management System (MVP v1) ☕

A modern full-stack café and restaurant management system built for handling daily business operations including orders, menu management, inventory tracking, waste monitoring, and staff workflow management.

Built with a scalable backend architecture using FastAPI + PostgreSQL and a responsive frontend powered by Next.js.

---

# ✨ Features

## 🧾 Order Management

* Create customer orders
* Generate unique receipt numbers
* Daily order tracking
* Order history management
* Real-time total calculations

## 🍽️ Menu Management

* Add, update, and manage menu items
* Categorize products
* Availability management
* Item detail & ingredient tracking
* Price and weight management

## 📦 Inventory System

* Track inventory items
* Inventory category system
* Daily stock management
* Operational supply tracking

## 🗑️ Waste Management

* Log waste entries
* Track product loss
* Waste reason recording
* Daily waste analytics foundation

## 🔐 Authentication Ready

* Clerk integration architecture prepared
* Protected dashboard workflow
* Scalable organization-based access design

## 🌐 Production Deployment

* Frontend deployed on Vercel
* Backend deployed on Render
* PostgreSQL hosted on Neon

---

# 🛠️ Tech Stack

## Frontend

* Next.js 14
* TypeScript
* Tailwind CSS
* Axios
* Lucide React

## Backend

* FastAPI
* SQLAlchemy (Async)
* PostgreSQL
* Alembic
* Pydantic

## Database & Hosting

* Neon PostgreSQL
* Render
* Vercel

---

# 🧠 Architecture

The backend follows a layered architecture pattern:

```txt
Frontend
   ↓
API Routers
   ↓
Service Layer
   ↓
SQLAlchemy ORM
   ↓
PostgreSQL Database
```

Project structure:

```txt
backend/
│
├── app/
│   ├── core/
│   ├── models/
│   ├── routers/
│   ├── schemas/
│   ├── services/
│   └── utils/
```

---

# ⚡ API Design

The backend uses:

* RESTful API structure
* Async database sessions
* Service-layer business logic
* Pydantic schema validation
* Separation of models and API contracts

Example flow:

```txt
Request → Router → Service → Database → Response
```

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/villa-management-system.git
cd villa-management-system
```

---

# 🔧 Backend Setup

## Install Dependencies

```bash
poetry install
```

## Configure Environment Variables

Create `.env`

```env
DATABASE_URL=your_database_url
```

## Run Migrations

```bash
alembic upgrade head
```

## Start Backend Server

```bash
poetry run uvicorn app.main:app --reload
```

Backend runs on:

```txt
http://127.0.0.1:8000
```

---

# 💻 Frontend Setup

```bash
pnpm install
```

## Configure Environment Variables

Create `.env.local`

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

## Run Frontend

```bash
pnpm dev
```

Frontend runs on:

```txt
http://localhost:3000
```

---

# 🗃️ Database Features

* UUID-based entities
* PostgreSQL ENUM support
* JSONB dynamic fields
* Async query support
* Receipt sequence generation
* Relationship management

---

# 📚 Lessons Learned

This project involved solving real-world full-stack engineering problems including:

* CORS configuration
* Production deployment
* Async SQLAlchemy patterns
* API contract handling
* PostgreSQL migrations
* Sequence management
* Frontend/backend integration
* Render/Vercel deployment debugging

---

# 🔮 Future Improvements (V2)

* Responsive mobile dashboard
* Analytics & reporting
* WebSocket live updates
* Docker containerization
* Role-based permissions
* Advanced receipt printing
* Real-time kitchen workflow
* Caching layer
* Background task queue
* AI-powered forecasting

---

# 📸 Screenshots

*Add project screenshots here*

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Developer

Built by Nish ⚡

A full-stack systems project focused on practical software engineering, scalable backend architecture, and real-world business workflow management.
