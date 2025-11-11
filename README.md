# 🕊️ Church Management System — Frontend

This is the **frontend** of the **Church Management System (ChMS)** built with **React + Vite**.  
It provides a modern, fast, and responsive interface for managing church members, volunteers, events, finances, and ministries.

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
| **Linting** | ESLint + Prettier |

---

## 📁 Folder Structure

church-management-frontend/
├── public/ # Static assets
├── src/
│ ├── assets/ # Images, fonts, icons, etc.
│ ├── components/ # Shared UI components
│ ├── features/ # Feature-based modules (Members, Events, etc.)
│ ├── hooks/ # Custom React hooks
│ ├── layouts/ # Reusable page layouts (Dashboard, Auth)
│ ├── pages/ # Page components
│ ├── routes/ # Route definitions and guards
│ ├── services/ # API calls, Axios setup
│ ├── store/ # Zustand stores
│ ├── utils/ # Helper functions and constants
│ ├── App.tsx # Root component
│ └── main.tsx # Vite bootstrap file
├── .env.example # Environment variables template
├── index.html
├── package.json
└── vite.config.ts