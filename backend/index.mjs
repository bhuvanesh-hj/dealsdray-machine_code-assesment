// Import necessary modules and functions
import express from "express";
import { config } from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";

import connectDb from "./config/db.mjs";

import loginRoutes from "./routes/loginRoutes.mjs";
import employeeRoutes from "./routes/employeeRoutes.mjs";

// Create an instance of the express application
const app = express();

// Define the port number to listen on
const PORT = process.env.PORT || 4000;

// Configure dotenv
config();

// Connect to the database
connectDb();

// Use middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Define routes for login and employee operations
app.use("/api/admin", loginRoutes);
app.use("/api/admin", employeeRoutes);

// Start the server and listen on the specified port
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});