# ☕ Smart QR Cafe Management System

A modern **QR Code Based Cafe Management System** built using the **MERN Stack**. Customers can scan a QR code placed on their table to access the digital menu, browse food items, add them to the cart, and place orders without waiting for a waiter.

The system also provides an **Admin Dashboard** to manage menu items, monitor orders, and maintain the cafe efficiently.

---

## 📌 Features

### Customer Features

- QR Code Based Menu Access
- Automatic Table Detection
- Browse Food Categories
- Search Food Items
- Add to Cart
- Place Orders
- User Registration & Login
- Responsive Design

### Admin Features

- Secure Admin Login
- Dashboard
- Add Menu Items
- Edit Menu Items
- Delete Menu Items
- View Customer Orders
- Manage Food Categories

---

## 🛠 Tech Stack

### Frontend

- React.js
- HTML5
- CSS3
- Tailwind CSS
- JavaScript (ES6)

### Backend

- Node.js
- Express.js

### Database

- MongoDB
- Mongoose

### Authentication

- JWT
- bcrypt

### Other Tools

- Git
- GitHub
- Axios
- QR Code Generator

---

## 🛒 Improved Cart & Payment Flow

- Login required before placing orders
- Dynamic quantity management
- Remove items from cart
- Order summary with total amount
- Payment method selection (Cash / Online)
- Order remains in cart until payment is completed
- Pending payment status after placing an order
- Pay Now functionality
- Cart clears only after successful payment

## 📂 Project Structure

```
Smart-QR-Cafe-Management-System
│
├── client/
│   ├── public/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── assets/
│   └── App.jsx
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   └── server.js
│
├── package.json
├── README.md
└── .gitignore
```

---

## 🚀 Installation

### Clone Repository

```bash
git clone https://github.com/yourusername/Smart-QR-Cafe-Management-System.git
```

Go into the project

```bash
cd Smart-QR-Cafe-Management-System
```

---

### Install Client

```bash
cd client
npm install
```

---

### Install Server

```bash
cd ../server
npm install
```

---

### Create Environment File

Create a `.env` file inside the **server** folder.

```env
PORT=5000

MONGO_URI=your_mongodb_connection

JWT_SECRET=your_secret_key
```

---

### Run Backend

```bash
npm run dev
```

---

### Run Frontend

```bash
cd client

npm start
```

---

## 📸 Screenshots

Add screenshots here.

Example:

```
Home Page

Menu Page

Cart

Admin Dashboard

QR Scanner

Order Page
```

---

## 📖 Workflow

1. Customer scans the QR Code.
2. Website opens automatically.
3. Table number is detected.
4. Customer browses the menu.
5. Adds items to cart.
6. Places order.
7. Order reaches Admin Dashboard.
8. Admin manages menu and orders.
9. Kitchen prepares and serves the order.

---

## 🔒 Security

- Password Hashing using bcrypt
- JWT Authentication
- Protected Routes
- Environment Variables
- MongoDB Validation

---

## 🎯 Future Improvements

- Online Payments
- Razorpay Integration
- UPI Payment
- Email Notifications
- Order Tracking
- Customer Reviews
- Loyalty Rewards
- Sales Analytics
- Inventory Management
- Real-Time Kitchen Dashboard

---

## 👥 Team Members

| Name | Responsibility |
|------|----------------|
| Member 1 | UI Design |
| Member 2 | Frontend Development |
| Member 3 | Backend APIs |
| Member 4 | Database |
| Member 5 | Authentication |
| Member 6 | Testing & Documentation |

---

## 🤝 Contribution

1. Fork the repository.

2. Create a new branch.

```bash
git checkout -b feature/your-feature
```

3. Commit your changes.

```bash
git commit -m "Add new feature"
```

4. Push your branch.

```bash
git push origin feature/your-feature
```

5. Open a Pull Request.

---

## 📜 License

This project is developed for educational and academic purposes.

---

## ⭐ If you like this project

Give it a ⭐ on GitHub.

It motivates us to build more awesome projects!
