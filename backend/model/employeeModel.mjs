import mongoose from "mongoose";

const employeeSchema = mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		mobile: { type: String, required: true },
		courses: [String],
		createdDate: { type: Date, default: Date.now },
		gender: { type: String, enum: ["male", "female", "other"] },
		designation: { type: String },
		image: { type: String },
	},
	{
		timestamps: true,
	}
);

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;
