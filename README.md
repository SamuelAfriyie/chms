# 🕊️ Church Management System — Frontend

This is the **frontend** of the **Church Management System (ChMS)**, built with **React + Vite**.  
It provides an intuitive interface for managing members, volunteers, finances, services, departments, events, and other church operations.

---

## 🚀 Tech Stack

| Category | Tools / Libraries |
|-----------|------------------|
| **Framework** | [React](https://react.dev/) + [Vite](https://vitejs.dev/) |
| **State Management** | [Zustand](https://zustand-demo.pmnd.rs/) |
| **Routing** | [React Router v6+](https://reactrouter.com/) |
| **UI Components** | [shadcn/ui](https://ui.shadcn.com/) |
| **HTTP Client** | [Axios](https://axios-http.com/) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Form Handling (optional)** | [React Hook Form](https://react-hook-form.com/) |

---

## 📁 Folder Structure

````text
church-management-frontend/
├── public/                      # Static assets (images, favicon, etc.)
├── src/
│   ├── assets/                  # Images, fonts, static media
│   ├── components/              # Reusable UI components (ui/, layout, primitives)
│   ├── components/ui/           # shadcn/ui-wrapped components (Button, Input, etc.)
│   ├── features/                # Feature modules (members/, events/, finance/, etc.)
│   │   ├── members/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   └── members.service.ts
│   │   └── events/
│   ├── hooks/                   # Custom React hooks
│   ├── layouts/                 # Page layouts (DashboardLayout, AuthLayout)
│   ├── pages/                   # Route pages (Dashboard.tsx, Members.tsx, Login.tsx)
│   ├── routes/                  # Route definitions & protected route wrappers
│   ├── services/                # API clients, axios instances (api.ts)
│   ├── store/                   # Zustand stores
│   ├── utils/                   # Helpers, formatters, validators
│   ├── App.tsx                  # App entry point / route setup
│   └── main.tsx                 # Vite bootstrap file
├── .env.example                 # Environment variables sample
├── index.html
├── package.json
└── vite.config.ts

## 🚀 Features

- 👥 **Member & Volunteer Management** - Comprehensive member profiles and volunteer tracking
- 🎉 **Event & Service Scheduling** - Plan and manage church events and services
- 💰 **Financial Tracking** - Tithes, offerings, and expense management
- 🏢 **Department Organization** - Ministry and department structure management
- 📋 **Attendance & Visitors** - Track member attendance and new converts
- 📦 **Facility & Inventory** - Church resources and equipment management
- 📈 **Analytics Dashboard** - Reports and insights for church leadership
- 🔐 **Role-Based Access** - Secure authentication and authorization

### Prerequisites
- Node.js (version 24 or higher)
- npm or yarn

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/Samuel-Afriyie/church-management-frontend.git
   cd church-management-frontend

# 🧭 Summary by Module (Simplified)

Here’s how your features group up:

| Module | Features | Icon |
|--------|----------|------|
| **1. Member Management** | - Register church members<br>- Evangelism - new convert (integration into membership) | 👥 |
| **2. Event & Service Management** | - Register church service<br>- Church event register<br>- Order of service | 📅 |
| **3. Ministry & Group Management** | - Church department | 🏛️ |
| **4. Facility & Asset Management** | - Facility management<br>- Church inventory | 🏗️ |
| **5. Accounting & Finance** | - Record income<br>- Record expenses<br>- Balance sheet | 💰 |
| **6. Contribution Management** | - Tithes records | 💵 |
| **7. Visitor & Evangelism** | - Visitors form<br>- Evangelism - new convert | 🌱 |
| **8. User & Role Management** | - Register system user | 🔑 |
| **9. Reporting & Analytics** | - Generate report | 📊 |
| **10. System Administration** | - System settings | ⚙️ |