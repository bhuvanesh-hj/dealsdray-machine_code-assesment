import axios from "axios";

let token = JSON.parse(localStorage.getItem("token"));
let api = "http://localhost:4000/api/admin";

const getEmployeeList = async () => {
	try {
		const response = await axios.get(`${api}/employees`, {
			headers: {
				Authorization: `Bearer ${token}`, // Attach token to request headers
			},
		});
		return response.data;
	} catch (error) {
		console.error("Error fetching employee list:", error);
	}
};

const createEmployee = async (data) => {
	try {
		const response = await axios.post(`${api}/employee`, data, {
			headers: {
				Authorization: `Bearer ${token}`, // Attach token to request headers
			},
		});
		return response.data;
	} catch (error) {
		return error;
	}
};

const deleteEmployee = async (id) => {
	try {
		const response = await axios.delete(`${api}/employee/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`, // Attach token to request headers
			},
		});
		return response.data;
	} catch (error) {
		return error;
	}
};

const editEmployee = async (data, id) => {
	try {
		const response = await axios.put(`${api}/employee/${id}`, data, {
			headers: {
				Authorization: `Bearer ${token}`, // Attach token to request headers
			},
		});
		return response.data;
	} catch (error) {
		return error;
	}
};

const getEmployee = async (id) => {
	try {
		const response = await axios.get(`${api}/employee/${id}`, {
			headers: {
				Authorization: `Bearer ${token}`, // Attach token to request headers
			},
		});
		return response.data;
	} catch (error) {
		return error;
	}
};

const searchEmployee = async (search) => {
	try {
		const response = await axios.get(`${api}/employee?search=${search}`, {
			headers: {
				Authorization: `Bearer ${token}`, // Attach token to request headers
			},
		});
		return response.data;
	} catch (error) {
		console.error("Error fetching employee list:", error);
	}
};

export {
	getEmployeeList,
	createEmployee,
	deleteEmployee,
	editEmployee,
	getEmployee,
	searchEmployee
};
