import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import Home from "./pages/Home";
import CreateEmployee from "./pages/CreateEmployee";
import EmployeeList from "./pages/EmployeeList";
import EditEmployee from "./pages/EditEmployee";
import { MyContext } from "./MyContext";
import { useState } from "react";
import NotFound from "./pages/NotFound";

function App() {
	// State to manage the reference
	const [ref, setRef] = useState(true);

	return (
		<MyContext.Provider value={{ ref, setRef }}>
			<div className="App">
				{/* Header component */}
				<Header />

				{/* Routes for navigation */}
				<Routes>
					{/* Route for Login page */}
					<Route path="/" element={<Login />} />

					{/* Route for Home page */}
					<Route path="/home" element={<Home />} />

					{/* Route for creating a new employee */}
					<Route path="/createEmployee" element={<CreateEmployee />} />

					{/* Route for displaying list of employees */}
					<Route path="/employeeList" element={<EmployeeList />} />

					{/* Route for editing an employee */}
					<Route path="/editEmployee/:id" element={<EditEmployee />} />

					{/* Route for Not Found page */}
					<Route path="*" element={<NotFound />} />
				</Routes>
			</div>
		</MyContext.Provider>
	);
}

export default App;
