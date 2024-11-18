// import express from "express";
// import colors from "colors";
// import dotenv from "dotenv";
// import morgan from "morgan";
// import imageRoutes from './routes/imageRoutes.js'; 
// import connectDB from "./config/db.js";
// import authRoutes from "./routes/authRoute.js";
// import categoryRoutes from "./routes/categoryRoutes.js";
// import productRoutes from "./routes/productRoutes.js";
// import couponRoutes from './routes/couponRoutes.js';
// import cors from 'cors';
// import path from 'path';
// import { fileURLToPath } from 'url'; 


// const corsOptions = {
//   origin: ["https://your-netlify-app.netlify.app"],
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true,
// };

// app.use(cors(corsOptions));


// // Configure environment variables
// dotenv.config();

// // Database connection
// connectDB();

// // Get __dirname for ES module compatibility
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Initialize Express app
// const app = express();

// // Middleware setup
// app.use(cors());
// app.use(express.json());
// app.use(morgan("dev"));
// app.use(express.urlencoded({ extended: true }));

// // Static files
// app.use(express.static(path.join(__dirname, './client/build')));

// // API routes
// app.use("/api/v1/auth", authRoutes);
// app.use("/api/v1/category", categoryRoutes);
// app.use("/api/v1/product", productRoutes);
// app.use("/api/v1/coupon", couponRoutes);
// app.use('/api/v1/images', imageRoutes);

// // Catch-all route for serving the React frontend
// app.use('*', (req, res) => {
//   res.sendFile(path.join(__dirname, './client/build/index.html'));
// });

// // Set up server port
// const PORT = process.env.PORT || 8080;

// // Start the server
// app.listen(PORT, () => {
//   console.log(
//     `Server running in ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white
//   );
// });


import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Import routes
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import couponRoutes from "./routes/couponRoutes.js";
import imageRoutes from "./routes/imageRoutes.js";

// Configure environment variables
dotenv.config();

// Database connection
connectDB();

// Get __dirname for ES module compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Express app
const app = express();

// CORS options
const corsOptions = {
  origin: ["https://your-netlify-app.netlify.app"], // Replace with your front-end URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

// Apply CORS middleware with options
app.use(cors(corsOptions));

// Middleware setup
app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, './client/build')));

  // Catch-all route to serve the React frontend
  app.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, './client/build/index.html'));
  });
}

// API routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/coupon", couponRoutes);
app.use('/api/v1/images', imageRoutes);

// Centralized error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal Server Error", error: err.message });
});

// Set up server port
const PORT = process.env.PORT || 8080;

// Start the server
app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.bgCyan.white
  );
});
