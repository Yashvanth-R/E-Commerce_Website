# E-Commerce Website

A full-stack e-commerce platform built with React, Node.js, Express, and MongoDB. Features secure authentication, product management, shopping cart, coupon system, Stripe payments, and admin analytics dashboard.

## Features

- **User Authentication & Authorization** - JWT-based auth with access/refresh tokens and bcrypt password hashing
- **Product Management** - Full CRUD operations for products with image uploads via Cloudinary
- **Shopping Cart** - Add, update, and remove items with real-time cart management
- **Coupon System** - Create and apply discount coupons to orders
- **Secure Payments** - Stripe integration for payment processing
- **Admin Dashboard** - Analytics and insights with data visualization
- **Session Management** - Redis-based session storage with Upstash
- **Responsive UI** - Modern React frontend with Tailwind CSS and Framer Motion animations

## Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Zustand** - State management
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Recharts** - Data visualization
- **Axios** - HTTP client
- **Stripe.js** - Payment integration
- **Lucide React** - Icons

### Backend
- **Node.js & Express** - Server framework
- **MongoDB & Mongoose** - Database
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Stripe API** - Payment processing
- **Cloudinary** - Image storage
- **Redis (ioredis)** - Session/cache management
- **cookie-parser** - Cookie handling

## Project Structure

```
├── backend/
│   ├── controllers/     # Route controllers
│   ├── lib/            # Database and utility functions
│   ├── middleware/     # Auth and validation middleware
│   ├── models/         # MongoDB schemas
│   ├── routes/         # API routes
│   └── server.js       # Express server entry point
├── frontend/
│   ├── src/
│   │   ├── components/ # React components
│   │   ├── lib/        # Utilities and helpers
│   │   ├── pages/      # Page components
│   │   ├── stores/     # Zustand stores
│   │   └── App.jsx     # Main app component
│   └── public/         # Static assets
└── .env                # Environment variables
```

## API Routes

- `/api/auth` - Authentication (signup, login, logout, refresh token)
- `/api/products` - Product management
- `/api/cart` - Shopping cart operations
- `/api/coupons` - Coupon management
- `/api/payments` - Stripe payment processing
- `/api/analytics` - Admin analytics data

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB database
- Redis instance (Upstash recommended)
- Cloudinary account
- Stripe account

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd e-commerce_website
```

2. Install backend dependencies
```bash
npm install
```

3. Install frontend dependencies
```bash
cd frontend
npm install
cd ..
```

4. Configure environment variables

Create a `.env` file in the root directory with the following variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
UPSTASH_REDIS_URL=your_redis_url
ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
CLIENT_URL=http://localhost:5173
```

### Running the Application

1. Start the backend server
```bash
npm run dev
```
The backend will run on `http://localhost:5000`

2. Start the frontend development server (in a new terminal)
```bash
cd frontend
npm run dev
```
The frontend will run on `http://localhost:5173`

### Building for Production

Build the frontend:
```bash
cd frontend
npm run build
```

Start the backend in production mode:
```bash
npm start
```

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.
