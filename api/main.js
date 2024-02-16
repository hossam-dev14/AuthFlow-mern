// Importing required modules
import express from "express";
import mongoose from 'mongoose';
import cors from "cors";
import dotenv from 'dotenv';

// Loading environment variables from .env file
dotenv.config();

// Importing route handlers
import authRoutes from './routes/auth.router.js';
import rolesRoutes from './routes/role.router.js';
import permissionsRoutes from './routes/permission.router.js';
import userRoutes from './routes/user.router.js';


// Initializing Express app
const app = express();

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));


// Extracting necessary environment variables
const api = process.env.API;
const connectDB = process.env.MONGO_URI;

// Middleware for parsing JSON bodies
app.use(express.json());

// Middleware for parsing URL encoded bodies
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB AtlasS
// "mongodb://localhost:27017"
const mongoURI = 'mongodb://localhost:27017';

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    autoIndex: false, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
}
mongoose.connect(mongoURI, options)
  .then(() => console.log('Connected to MongoDB (^_-)!'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use(`${api}/auth`, authRoutes);
app.use(`${api}/roles`, rolesRoutes); // Apply authentication middleware to protected routes
app.use(`${api}/permissions`, permissionsRoutes); // Apply authentication middleware to protected routes
app.use(`${api}/user`, userRoutes); 



//  Test
// import User from "./models/user.model.js";
// app.use(`${api}/`, async (req, res, next) => {
//   const userList = await User.find().select('-password');
//     if(!userList)
//     { res.status(500).json({ message:'The users was not found!' }) }
//     res.status(200).json({ userList })
// }); // test


// Starting the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
