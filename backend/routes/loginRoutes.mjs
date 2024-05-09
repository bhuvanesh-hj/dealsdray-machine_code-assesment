// Import the Router from the express library
import { Router } from "express";

// Import the signin and signup functions from the userAdminController.mjs file
import { signin, signup } from "../controllers/userAdminController.mjs";

// Create a new router instance
const router = Router();

// Define the routes for signup and signin
router.post("/signup", signup);
router.post("/signin", signin);

// Export the router instance
export default router;