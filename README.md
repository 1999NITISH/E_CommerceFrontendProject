# SmartCart - Advanced E-Commerce Platform 🛒

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)

A fully responsive, modern, and high-performance Amazon-like E-Commerce frontend web application built from scratch using React (Vite), Tailwind CSS, and the DummyJSON API.

## ✨ Features

- **Modern UI/UX:** Premium glassmorphic design, smooth Framer Motion animations, and custom Amazon-inspired styling.
- **Dynamic Product Fetching:** Real-time integration with `DummyJSON` for products, categories, and robust search functionality.
- **Advanced State Management:** Uses React Context API (`AuthContext`, `CartContext`, `WishlistContext`, `ThemeContext`) combined with LocalStorage persistence.
- **Full E-Commerce Flow:**
  - Product Browsing & Filtering
  - Detailed Product Pages with Image Galleries
  - Add to Cart & Update Quantity Logic
  - Wishlist Management
  - Mock Multi-step Checkout Process
- **Authentication:** Mocked User Registration and Login flow with comprehensive validation and secure routing.
- **User Dashboard:** Dedicated user profile area and mock order history.
- **Responsive & Accessible:** 100% mobile, tablet, and desktop responsive with a dedicated mobile hamburger menu.
- **Theming:** Full Dark Mode / Light Mode toggle functionality.

## 🛠️ Technologies Used

- **Core:** HTML5, CSS3, JavaScript (ES6+), React 18
- **Build Tool:** Vite
- **Styling:** Tailwind CSS, PostCSS
- **Routing:** React Router v6
- **API Requests:** Axios
- **Icons & Animations:** Lucide React, Framer Motion
- **Notifications:** React Hot Toast

## 📂 Project Structure

```text
src/
├── assets/         # Static images and SVGs
├── components/     # Reusable components (Navbar, Footer, ProductCard)
├── context/        # Global state managers (Auth, Cart, Wishlist, Theme)
├── pages/          # Full page layouts (Home, Products, Checkout, etc.)
├── services/       # Axios API integration (api.js)
├── styles/         # Global Tailwind configuration (index.css)
├── App.jsx         # Main routing file
└── main.jsx        # Entry point
```

## 🚀 Getting Started

Follow these steps to run the project locally on your machine.

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your computer.

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/1999NITISH/SmartCart-Ecommerce-React.git
   cd SmartCart-Ecommerce-React
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **View the Application**
   Open your browser and navigate to `http://localhost:5173` (or the port specified in your terminal).

## 💡 Author
Developed by **Nitish** ([1999NITISH](https://github.com/1999NITISH))
