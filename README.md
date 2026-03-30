# 🛒 MERN-Ecommerce-Store

A production-grade, full-stack e-commerce platform built with the MERN stack, featuring a comprehensive Admin Dashboard and high-performance Redis caching.

[Live Demo Link](https://mern-ecommerce-store-pied.vercel.app)

---

## 🚀 Key Technical Highlights

- **Performance Optimization:** Implemented Redis as a caching layer for featured products, significantly reducing database load and improving response times.

- **Admin Dashboard:** Built a dedicated Admin Dashboard with full product management — create, delete, and toggle featured status on products.

- **Robust Security:** Developed custom authentication using JWT with HTTP-only cookies and Axios interceptors for automated token refreshing.

- **State Management:** Leveraged Zustand for efficient global state handling of complex cart logic and user sessions.

---

## 🛠️ Tech Stack

- **Frontend:** React.js, Tailwind CSS, Zustand
- **Backend:** Node.js, Express.js 
- **Database & Caching:** MongoDB (Mongoose), Redis
- **Services:** Cloudinary (Media Storage)

---

## ⚙️ Installation & Setup

### Clone the repo

```bash
git clone https://github.com/Piyush495/mern-ecommerce-store.git
```

## 🧪 .env Setup

### Backend (`/backend`)

```bash
PORT=3000
MONGO_URI=your_mongo_uri_here

NODE_ENV=development

JWT_SECRET=your_jwt_secret

CLIENT_URL=http://localhost:5173

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

UPSTASH_REDIS_URL=your_redis_url
ACCESS_TOKEN_SECRET=your_access_token
REFRESH_TOKEN_SECRET=your_refresh_token
```

---

## 🔧 Run the Backend

```bash
cd backend
npm install
npm run dev
```

## 💻 Run the Frontend

```bash
cd frontend
npm install
npm run dev
```