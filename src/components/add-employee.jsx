import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addEmployee, editEmployee } from "../store/employees-slice";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const AddEmployee = () => {
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState(null);
  const [department, setDepartment] = useState("");
  const [experience, setExperience] = useState("");
  const { id } = useParams();
  const [errors, setErrors] = useState({}); // State for tracking validation errors
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const existingEmployee = useSelector((state) =>
    state.employees.find((employee) => employee.id === parseInt(id))
  );
  useEffect(() => {
    if (existingEmployee) {
      setName(existingEmployee.name);
      setBirthDate(parseDate(existingEmployee.birthDate));
      setDepartment(existingEmployee.department);
      setExperience(existingEmployee.experience);
    }
  }, [existingEmployee]);
  // Function to parse string into date object
  const parseDate = (dateString) => {
    const [day, month, year] = dateString.split("-");
    return new Date(year, month - 1, day);
  };

  // Function to parse date into string format.
  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Function to add employee
  const handleAddEmployee = (e) => {
    e.preventDefault();
    // Validate inputs
    const newErrors = {};
    if (!name) newErrors.name = "Name is required";
    if (!birthDate) newErrors.birthDate = "Birth Date is required";
    if (!department) newErrors.department = "Department is required";
    if (!experience) newErrors.experience = "Experience is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors); // Set errors if validation fails
      return;
    }

    const formattedBirthDate = formatDate(birthDate);
    setErrors({});
    if (name && birthDate && department && experience) {
      if (existingEmployee) {
        dispatch(
          editEmployee({
            id: existingEmployee.id,
            name,
            birthDate: formattedBirthDate,
            department,
            experience,
          })
        );
        alert("Employee updated successfully!");
      } else {
        dispatch(
          addEmployee({
            id: Date.now(),
            name,
            birthDate: formattedBirthDate,
            department,
            experience,
          })
        );
        alert("Employee added successfully!");
      }

      setName("");
      setBirthDate(null);
      setDepartment("");
      setExperience("");
      navigate("/list");
    }
  };

  // Function to check alphabet validation for name
  const handleNameChange = (e) => {
    const value = e.target.value;
    const regex = /^[A-Za-z ]*$/;

    if (regex.test(value)) {
      setName(value);
      setErrors((prevErrors) => ({ ...prevErrors, name: "" }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: "Only alphabetic characters are allowed",
      }));
    }
  };

  return (
    <div className="form-container">
      {existingEmployee ? <h2> Edit Employee </h2> : <h2> Add Employee </h2>}
      <form>
        {/* Field for name input */}
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={handleNameChange}
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>
        {/* Datepicker for date input */}
        <div className="form-group">
          <label htmlFor="birthDate">Birth Date</label>
          <div>
            <DatePicker
              className="date"
              selected={birthDate}
              onChange={(date) => setBirthDate(date)}
              placeholderText="Select Birth Date"
              dateFormat="yyyy/MM/dd"
            />
          </div>
          {errors.birthDate && (
            <span className="error">{errors.birthDate}</span>
          )}
        </div>
        {/* Field for department input */}
        <div className="form-group">
          <label htmlFor="name">Department</label>
          <input
            type="text"
            placeholder="Department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          />
          {errors.department && (
            <span className="error">{errors.department}</span>
          )}
        </div>
        {/* Field for experience input */}
        <div className="form-group">
          <label htmlFor="name">Experience (In years)</label>
          <input
            type="number"
            placeholder="Experience"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
          />
          {errors.experience && (
            <span className="error">{errors.experience}</span>
          )}
        </div>
        <button onClick={handleAddEmployee}>
          {existingEmployee ? "Update Employee" : "Add Employee"}
        </button>
        <button onClick={() => navigate("/list")}>Back to List</button>
      </form>
    </div>
  );
};

export default AddEmployee;
