import React, { useEffect, useState } from "react";
import EmployeeInformationForm from "../components/EmployeeInformationForm";
import { useLocation, useNavigate } from "react-router-dom";
import { getEmployee } from "../actions";

const EditEmployee = () => {
	const [employee, setEmployee] = useState({});
	const location = useLocation();
	const employeeId = location.pathname.split("/")[2];
	const navigate = useNavigate();

	useEffect(() => {
		async function fetchEmployee() {
			const employee = await getEmployee(employeeId);
			setEmployee(employee);
		}
		fetchEmployee();
	}, [employeeId]);

		useEffect(() => {
			if (!localStorage.getItem("token") && !localStorage.getItem("user")) {
				navigate("/");
				return;
			}
		}, [navigate]);

	return (
		<div className="flex items-center justify-center">
			<EmployeeInformationForm edit={true} employee={employee} />
		</div>
	);
};

export default EditEmployee;
