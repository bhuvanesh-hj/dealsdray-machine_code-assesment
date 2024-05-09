import React, { useEffect } from "react";
import EmployeeInformationForm from "../components/EmployeeInformationForm";
import { useNavigate } from "react-router-dom";

const CreateEmployee = () => {
	const navigate = useNavigate();

	useEffect(() => {
		if (!localStorage.getItem("token") && !localStorage.getItem("user")) {
			navigate("/");
			return;
		}
	}, [navigate]);

	return (
		<div className="flex items-center justify-center">
			<EmployeeInformationForm />
		</div>
	);
};

export default CreateEmployee;
