function validateEmployee(req, res, next) {
	
	const { name, email, mobile, courses, gender, designation } = req.body;

	const errors = [];

	if (!name) {
		errors.push("Name is required");
	}

	if (!email || !validateEmail(email)) {
		errors.push("Valid email is required");
	}

	if (!mobile || !validateMobile(mobile)) {
		errors.push("Valid mobile number is required");
	}

	if (!gender || !["male", "female", "other"].includes(gender)) {
		errors.push("Valid gender is required");
	}

	if (errors.length > 0) {
		return res.status(400).json({ message: "Validation error", errors });
	}

	next();
}

function validateEmail(email) {
	// Email validation logic, you can use regex or any other validation method
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateMobile(mobile) {
	// Mobile validation logic, you can use regex or any other validation method
	return /^\d{10}$/.test(mobile);
}


export default validateEmployee;
