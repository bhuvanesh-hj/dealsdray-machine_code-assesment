import Employee from "../model/employeeModel.mjs";

const createEmployee = async (req, res) => {
	try {
		const { name, email, mobile, courses, gender, designation } = req.body;
		const image = req.file
			? req.file.filename
			: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhVmk9--Huf3Y5QjGQ3Sw6_5dIjqZEoqSO6ctNk65gSw&s"; // Save image path

		const existEmployee = await Employee.findOne({ email });

		if (existEmployee) {
			return res
				.status(400)
				.json({ message: "Employee already exists with this email" });
		}

		const employee = await Employee.create({
			name,
			email,
			mobile,
			courses,
			gender,
			designation,
			image,
		});

		res
			.status(201)
			.json({ message: "Employee created successfully", employee });
	} catch (error) {
		res
			.status(400)
			.json({ message: "Employee creation failed", error: error.message });
	}
};

const getAllEmployees = async (req, res) => {
	try {
		const employees = await Employee.find();
		res.status(200).json(employees);
	} catch (error) {
		res
			.status(500)
			.json({ message: "Failed to retrieve employees", error: error.message });
	}
};

const editEmployee = async (req, res) => {
	try {
		const { id } = req.params;
		const updatedEmployee = await Employee.findByIdAndUpdate(id, req.body, {
			new: true,
		});
		if (!updatedEmployee) {
			return res.status(404).json({ message: "Employee not found" });
		}
		res.status(200).json({
			message: "Employee updated successfully",
			employee: updatedEmployee,
		});
	} catch (error) {
		res
			.status(400)
			.json({ message: "Failed to update employee", error: error.message });
	}
};

const deleteEmployee = async (req, res) => {
	try {
		const { id } = req.params;
		const deletedEmployee = await Employee.findByIdAndDelete(id);
		if (!deletedEmployee) {
			return res.status(404).json({ message: "Employee not found" });
		}
		res.status(200).json({
			message: "Employee deleted successfully",
			employee: deletedEmployee,
		});
	} catch (error) {
		res
			.status(400)
			.json({ message: "Failed to delete employee", error: error.message });
	}
};

const getEmployeeById = async (req, res) => {
	try {
		const { id } = req.params;
		const employee = await Employee.findById(id);
		if (!employee) {
			return res.status(404).json({ message: "Employee not found" });
		}
		res.status(200).json(employee);
	} catch (error) {
		res
			.status(400)
			.json({ message: "Failed to retrieve employee", error: error.message });
	}
};

const searchEmployees = async (req, res) => {
	try {
		const keyword = req.query.search
			? {
					$or: [
						{ name: { $regex: req.query.search, $options: "i" } },
						{ email: { $regex: req.query.search, $options: "i" } },
					],
			  }
			: {};
		const employees = await Employee.find(keyword);
		res.status(200).json(employees);
	} catch (error) {
		res
			.status(400)
			.json({ message: "Failed to search employees", error: error.message });
	}
};

export {
	createEmployee,
	getAllEmployees,
	deleteEmployee,
	editEmployee,
	getEmployeeById,
	searchEmployees,
};
