import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { deleteEmployee } from "../store/employees-slice";
import { useNavigate } from "react-router-dom";
import DeleteConfirmationModal from '../modal/delete-confirmation-modal/delete-confirmation-modal'; 

const EmployeeList = () => {
  const employees = useSelector((state) => state.employees);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [itemIdToDelete, setItemIdToDelete] = useState(null);

  // Function to open delete confirmation modal.
  const handleDeleteButtonClick = (id) => {
    setItemIdToDelete(id);
    setShowModal(true);
  };

  // Function to delete an employee.
  const handleDelete = () => {
    dispatch(deleteEmployee(itemIdToDelete))
    setShowModal(false); // Close modal after delete
    alert("Employee deleted successfully!");
  };
  
  return (
    <div>
      <div className="header">
        <h2>Employee List</h2>
        <button onClick={() => navigate("/add")}>Add Employee</button>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Birth Date</th>
              <th>Department</th>
              <th>Experience (In Years)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.name}</td>
                <td>{employee.birthDate}</td>
                <td>{employee.department}</td>
                <td>{employee.experience}</td>
                <td>
                  <button onClick={() => navigate(`/edit/${employee.id}`)}>
                    Edit
                  </button>
                  <button onClick={() => handleDeleteButtonClick(employee.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Confirmation modal to delete an employee. */}
      <DeleteConfirmationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default EmployeeList;
