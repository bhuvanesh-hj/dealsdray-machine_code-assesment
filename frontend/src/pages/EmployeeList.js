import React, { useEffect, useState } from "react";
import { getEmployeeList, deleteEmployee } from "../actions";
import { Link, useNavigate } from "react-router-dom";

const EmployeeList = () => {
	const [list, setList] = useState([]);
	const [search, setSearch] = useState("");
	const [sort, setSort] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [totalEmployees, setTotalEmployees] = useState(0);
	const navigate = useNavigate();
	let limit = 5;

	async function fetchData() {
		const response = await getEmployeeList(currentPage, limit, search);
		setList(response.employees);
		setTotalPages(response.pagination.totalPages);
		setTotalEmployees(response.pagination.totalEmployees);
	}

	const handleDeleteEmployee = async (id) => {
		await deleteEmployee(id);
		fetchData();
	};

	const handleEditEmployee = async (id) => {
		navigate(`/editEmployee/${id}`);
	};

	const handlesSearch = async (e) => {
		setSearch(e.target.value);
		setCurrentPage(1);
	};

	const handlePageChange = (page) => {
		setCurrentPage(page);
	};

	useEffect(() => {
		function fetchSort() {
			setList(
				list.slice().sort((a, b) => {
					if (sort === "name") {
						return a.name.localeCompare(b.name);
					} else if (sort === "email") {
						return a.email.localeCompare(b.email);
					} else if (sort === "id") {
						return a._id - b._id;
					} else {
						return new Date(b.createdDate) - new Date(a.createdDate);
					}
				})
			);
		}
		fetchSort();
	}, [sort]);

	useEffect(() => {
		if (!localStorage.getItem("token") && !localStorage.getItem("user")) {
			navigate("/");
			return;
		}

		fetchData();
	}, [navigate, currentPage, search]);

	return (
		<div className="md:w-[90%] w-[90%] mx-auto px-2 py-8">
			<div className="mb-4 flex justify-between">
				<div>
					<h1 className="text-2xl font-bold">Employee List</h1>
					<p className="text-gray-500">View and manage your team members.</p>
					<p>Total Employees: {totalEmployees}</p>
				</div>
				<div className="flex items-center space-x-4">
					<Link to="/createEmployee">
						<button className="rounded-md px-6 py-2 text-sm font-medium text-gray-800 border border-gray-800 shadow transition-colors hover:text-white hover:bg-gray-700">
							Create Employee
						</button>
					</Link>
					<div className="relative">
						<input
							className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pr-8"
							placeholder="Search employees..."
							type="search"
							onChange={handlesSearch}
						/>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
							className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400">
							<circle cx="11" cy="11" r="8"></circle>
							<path d="m21 21-4.3-4.3"></path>
						</svg>
					</div>
					<select
						className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
						type="button"
						id="sort"
						onChange={(e) => setSort(e.target.value)}>
						<option selected>Sort by</option>
						<option value={"name"}>Name</option>
						<option value={"email"}>Email</option>
						<option value={"id"}>Id</option>
						<option value={"date"}>Date (latest)</option>
					</select>
				</div>
			</div>
			<div className="border md:rounded-lg rounded-lg md:overflow-x-auto h-[350px] md:overflow-y-auto text-xs">
				<table className="w-full table-auto">
					<thead className="bg-gray-800 sticky top-0">
						<tr>
							<th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300">
								ID
							</th>
							<th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300">
								Image
							</th>
							<th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300">
								Name
							</th>
							<th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300">
								Designation
							</th>
							<th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300">
								Course
							</th>
							<th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300">
								Gender
							</th>
							<th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300">
								Email
							</th>
							<th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300">
								Created At
							</th>
							<th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300">
								Mobile
							</th>
							<th className="px-4 py-3 text-left font-medium text-gray-700 dark:text-gray-300">
								Actions
							</th>
						</tr>
					</thead>
					<tbody className="divide-y divide-gray-200 dark:divide-gray-700">
						{list.map((employee, idx) => (
							<tr key={employee._id}>
								<td className="px-4 py-3">
									<p>{idx + 1}</p>
								</td>
								<td className="px-4 py-3">
									<div className="flex items-center">
										<img
											alt="Employee Avatar"
											className="mr-3 h-10 w-10 rounded-full object-cover"
											height={40}
											src={employee.image}
											style={{
												aspectRatio: "40/40",
												objectFit: "cover",
											}}
											width={40}
										/>
									</div>
								</td>
								<td className="px-4 py-3">
									<p className="font-medium">{employee.name}</p>
								</td>
								<td className="px-4 py-3">
									<p>{employee.designation}</p>
								</td>
								<td className="px-4 py-3">
									<p>{employee.courses}</p>
								</td>
								<td className="px-4 py-3">
									<p>{employee.gender}</p>
								</td>
								<td className="px-4 py-3">
									<p>{employee.email}</p>
								</td>
								<td className="px-4 py-3">
									<p>{employee.createdDate}</p>
								</td>
								<td className="px-4 py-3">
									<p>{employee.mobile}</p>
								</td>
								<td className="px-4 py-3">
									<div className="flex items-center space-x-2">
										<button
											className="px-3 py-2 rounded-md border-2 border-yellow-400 font-semibold hover:bg-yellow-400"
											onClick={() => handleEditEmployee(employee._id)}>
											Edit
										</button>
										<button
											className="px-3 py-2 rounded-md border-2 border-red-600 font-semibold hover:bg-red-600"
											onClick={() => handleDeleteEmployee(employee._id)}>
											Delete
										</button>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<nav
				aria-label="Page navigation example"
				className="flex justify-center my-1">
				<ul className="inline-flex -space-x-px text-sm">
					<li>
						<button
							onClick={() => handlePageChange(currentPage - 1)}
							disabled={currentPage === 1}
							className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border ${
								currentPage === 1
									? "border-e-0"
									: "border-gray-300 hover:bg-gray-100 hover:text-gray-700"
							} rounded-s-lg `}>
							Previous
						</button>
					</li>
					{Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
						<li key={page}>
							<button
								onClick={() => handlePageChange(page)}
								className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border ${
									currentPage === page
										? "bg-gray-500 text-white"
										: "border-gray-300"
								} hover:bg-gray-100 hover:text-gray-700`}>
								{page}
							</button>
						</li>
					))}
					<li>
						<button
							onClick={() => handlePageChange(currentPage + 1)}
							disabled={currentPage === totalPages}
							className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border ${
								currentPage === totalPages
									? "border-e-0"
									: "border-gray-300 hover:bg-gray-100 hover:text-gray-700"
							} rounded-e-lg  `}>
							Next
						</button>
					</li>
				</ul>
			</nav>
		</div>
	);
};

export default EmployeeList;
