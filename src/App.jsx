import { Provider } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import store from "./store";
import EmployeeList from "./components/employee-list";
import AddEmployee from "./components/add-employee";
import EditEmployee from "./components/edit-employee";

function App() {
  return (
    <Provider store={store}>
        <div className="App">
          <Routes>
            <Route path="/" element={<Navigate to="/list" />} />
            <Route path="/list" element={<EmployeeList />} />
            <Route path="/add" element={<AddEmployee />} />
            <Route path="/edit/:id" element={<EditEmployee />} />
          </Routes>
        </div>
    </Provider>
  );
}

export default App;
