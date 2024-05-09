// Import necessary modules and functions
import UserAdmin from "../model/adminModel.mjs";
import bcrypt from "bcryptjs";
import generatorToken from "../config/generatorToken.mjs";

// Define a function to handle user signup
const signup = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            res.status(400);
            throw new Error("Please enter all the fields");
        }

        const userExists = await UserAdmin.findOne({ username });

        if (userExists) {
            res.status(400);
            throw new Error("User already exists");
        }

        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password

        const user = await UserAdmin.create({ username, password: hashedPassword });

        res.status(201).json({ message: "User created successfully", user });
    } catch (error) {
        res.status(400).json({ message: "Sign up failed", error: error.message });
    }
};

// Define a function to handle user signin
const signin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await UserAdmin.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }
        // If password is valid, user is authenticated
        res
            .status(200)
            .json({
                message: "Sign in successful",
                user,
                token: generatorToken(user._id),
            });
    } catch (error) {
        res.status(400).json({ message: "Sign in failed", error: error.message });
    }
};

// Export the signup and signin functions
export { signup, signin };