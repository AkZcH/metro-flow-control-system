frontend/
│
├── public/
│   └── index.html
│
├── src/
│   ├── api/
│   │   ├── axiosInstance.js
│   │   ├── userApi.js
│   │   ├── ticketApi.js
│   │   └── adminApi.js
│   │
│   ├── assets/
│   │   └── (images, logos, icons)
│   │
│   ├── components/
│   │   ├── common/
│   │   │   ├── Navbar.js
│   │   │   ├── PrivateRoute.js
│   │   │   └── QRCodeDisplay.js
│   │   ├── user/
│   │   │   ├── Wallet.js
│   │   │   ├── TripHistory.js
│   │   │   ├── TicketBooking.js
│   │   │   └── Profile.js
│   │   └── admin/
│   │       ├── UserList.js
│   │       ├── TripRecords.js
│   │       └── Dashboard.js
│   │
│   ├── contexts/
│   │   └── AuthContext.js
│   │
│   ├── hooks/
│   │   └── useAuth.js
│   │
│   ├── pages/
│   │   ├── Home.js
│   │   ├── Login.js
│   │   ├── Register.js
│   │   ├── UserDashboard.js
│   │   ├── AdminLogin.js
│   │   └── AdminPanel.js
│   │
│   ├── redux/
│   │   ├── store.js
│   │   ├── userSlice.js
│   │   ├── ticketSlice.js
│   │   └── adminSlice.js
│   │
│   ├── utils/
│   │   ├── fareCalculator.js
│   │   └── jwtUtils.js
│   │
│   ├── App.js
│   ├── index.js
│   └── theme.js
│
├── .env
├── package.json
└── README.md
