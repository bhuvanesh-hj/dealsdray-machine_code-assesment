// Import necessary modules and functions
import { Router } from "express";

import {
    createEmployee,
    deleteEmployee,
    editEmployee,
    getAllEmployees,
    getEmployeeById,
    searchEmployees,
} from "../controllers/employeeController.mjs";

import protect from "../middleware/authMiddleware.mjs";
import validateEmployee from "../middleware/validationMiddleware.mjs";

import multer from "multer";

// Define storage for uploaded files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Set the destination folder where files will be stored
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        // Set the filename to be unique
        cb(null, Date.now() + "-" + file.originalname);
    },
});

// Create the Multer instance
const upload = multer({ storage: storage });

const router = Router();

// Define routes for employee operations
router.post("/employee", protect, validateEmployee, createEmployee);
router.get("/employees", protect, getAllEmployees);
router.get("/employee/:id", protect, getEmployeeById);
router.put("/employee/:id", protect, validateEmployee, editEmployee);
router.delete("/employee/:id", protect, deleteEmployee);
// router.get("/employee", protect, searchEmployees);

// Export the router
export default router;