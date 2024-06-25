import { Provider } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { store, persistor } from "./store/store";
import { PersistGate } from "redux-persist/integration/react";
import EmployeeList from "./components/employee-list";
import AddEmployee from "./components/add-employee";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="App">
          <Routes>
            <Route path="/" element={<Navigate to="/list" />} />
            <Route path="/list" element={<EmployeeList />} />
            <Route path="/add" element={<AddEmployee />} />
            <Route path="/edit/:id" element={<AddEmployee />} />
          </Routes>
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
