import React, { useState } from "react";
import LoginInput from "./LoginInput";
import LoginButton from "./LoginButton";
import { createEmployee, editEmployee } from "../actions/index";
import { useNavigate } from "react-router-dom";

const EmployeeInformationForm = ({ edit, employee }) => {
	const [formData, setFormData] = useState({});
	const [courses, setCourses] = useState([]);
	const [errors, setErrors] = useState({});
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleChange = (e) => {
		setErrors({});
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleCourseChange = (e) => {
		if (e.target.checked) {
			setErrors({});
			setCourses([...courses, ([e.target.name] = e.target.value)]);
		} else {
			setCourses(courses.filter((c) => c !== e.target.value));
		}
	};

	const handleAddEmployee = async (e) => {
		e.preventDefault();
		try {
			setErrors({});
			setLoading(true);
			const employee = await createEmployee({ ...formData, courses: courses });
			if (employee.response && employee.response.status !== 201) {
				setErrors(employee.response.data);
			} else {
				navigate("/employeeList");
				e.target.reset();
			}

			setLoading(false);
		} catch (error) {
			setLoading(false);
			alert(error.message);
		}
	};

	const handleEditEmployee = async (e) => {
		e.preventDefault();
		try {
			setErrors({});
			setLoading(true);
			const editedData = {
				name: formData.name || employee.name,
				email: formData.email || employee.email,
				mobile: formData.mobile || employee.mobile,
				designation: formData.designation || employee.designation,
				gender: formData.gender,
				courses,
			};
			const updatedEmployee = await editEmployee(editedData, employee._id);
			if (updatedEmployee.response && updatedEmployee.response.status !== 200) {
				setErrors(updatedEmployee.response.data);
				setLoading(false);
			} else {
				setLoading(false);
				navigate("/employeeList");
				e.target.reset();
			}
		} catch (error) {
			setLoading(false);
			setErrors(error.message);
			alert(error.message);
		}
	};

	return (
		<form
			className="rounded-lg border my-2 w-full max-w-2xl"
			onSubmit={edit ? handleEditEmployee : handleAddEmployee}
			method="POST">
			<div className="flex flex-col items-center space-y-1.5 p-6">
				<h3 className="text-3xl font-semibold">Employee Details</h3>
				<p className="text-sm text-muted-foreground">
					{edit ? "Update" : "Add"} your employee information.
				</p>
			</div>
			<div className="p-6 space-y-4">
				<div className="grid grid-cols-2 gap-4">
					<div className="space-y-2">
						<label
							className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
							htmlFor="name">
							Name
						</label>
						<LoginInput
							id="name"
							name="name"
							placeholder="Enter your name"
							onChange={handleChange}
							value={edit && employee.name}
						/>
					</div>
					<div className="space-y-2">
						<label
							className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
							htmlFor="email">
							Email
						</label>
						<LoginInput
							id="email"
							name="email"
							placeholder="Enter your email"
							type="email"
							onChange={handleChange}
							value={edit && employee.email}
						/>
					</div>
				</div>
				<div className="grid grid-cols-2 gap-4">
					<div className="space-y-2">
						<label
							className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
							htmlFor="mobile">
							Mobile Number
						</label>
						<LoginInput
							type="number"
							id="mobile"
							name="mobile"
							placeholder="Enter your mobile number"
							onChange={handleChange}
							value={edit && employee.mobile}
						/>
					</div>
					<div className="space-y-2">
						<label
							className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
							htmlFor="designation">
							Designation
						</label>
						<select
							id="designation"
							name="designation"
							className="border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
							onChange={handleChange}
							defaultValue={edit && employee.designation}>
							{!edit && <option selected>Select designation</option>}
							<option value="manager">Manager</option>
							<option value="developer">Developer</option>
							<option value="designer">Designer</option>
							<option value="other">Other</option>
						</select>
					</div>
				</div>
				<div className="space-y-2">
					<label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
						Gender
					</label>
					<div className="flex items-center space-x-4">
						<input
							id="default-radio-1"
							type="radio"
							value="male"
							name="gender"
							className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
							onChange={handleChange}
							defaultChecked={edit && employee.gender === "male"}
						/>
						<label
							htmlFor="default-radio-1"
							className="ms-2 text-sm font-medium text-gray-900">
							Male
						</label>
						<input
							id="default-radio-2"
							type="radio"
							value="female"
							name="gender"
							className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
							onChange={handleChange}
							defaultChecked={edit && employee.gender === "female"}
						/>
						<label
							htmlFor="default-radio-2"
							className="ms-2 text-sm font-medium text-gray-900">
							Female
						</label>
						<input
							id="default-radio-3"
							type="radio"
							value="others"
							name="gender"
							className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
							onChange={handleChange}
							defaultChecked={edit && employee.gender === "others"}
						/>
						<label
							htmlFor="default-radio-3"
							className="ms-2 text-sm font-medium text-gray-900">
							Others
						</label>
					</div>
				</div>
				<div className="space-y-2">
					<label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
						Course
					</label>
					<div className="grid grid-cols-2 gap-2">
						<div className="flex items-center justify-start">
							<input
								id="default-checkbox"
								type="checkbox"
								name="courses"
								value="MCA"
								className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
								onChange={handleCourseChange}
							/>
							<label
								htmlFor="default-checkbox"
								className="ms-2 text-sm font-medium select-none text-gray-900">
								MCA
							</label>
						</div>
						<div className="flex items-center justify-start">
							<input
								id="default-checkbox"
								type="checkbox"
								value="BCA"
								name="courses"
								className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
								onChange={handleCourseChange}
							/>
							<label
								htmlFor="default-checkbox"
								className="ms-2 text-sm font-medium select-none text-gray-900">
								BCA
							</label>
						</div>
						<div className="flex items-center justify-start">
							<input
								id="default-checkbox"
								type="checkbox"
								value="BSC"
								name="courses"
								className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 "
								onChange={handleCourseChange}
							/>
							<label
								htmlFor="default-checkbox"
								className="ms-2 text-sm font-medium select-none text-gray-900">
								BSC
							</label>
						</div>
					</div>
				</div>
				<div className="space-y-2">
					<label
						className="block mb-2 text-sm font-medium text-gray-900"
						htmlFor="file_input">
						Image upload
					</label>
					<input
						className="block w-full text-sm text-gray-900 border p-1 border-gray-300 rounded-lg cursor-pointer"
						id="file_input"
						name="file"
						type="file"
						accept="image/png, image/jpeg"
						onChange={handleChange}
					/>
					<p className="mt-1 text-sm text-gray-400" id="file_input_help">
						SVG, PNG, JPG or GIF (MAX. 800x400px).
					</p>
				</div>
			</div>
			<div className="flex items-start flex-col p-6">
				{errors && (
					<i className="text-red-500 flex flex-col gap-1">
						{errors.message}{" "}
						{errors.errors &&
							errors.errors.map((error, idx) => <i key={idx}>{error}</i>)}
					</i>
				)}
				<LoginButton type={"submit"}>
					{loading ? "Loading..." : `${edit ? "Update" : "Add"} Employee`}
				</LoginButton>
			</div>
		</form>
	);
};

export default EmployeeInformationForm;
