import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editEmployee } from "../store/employees-slice";
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EditEmployee = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({}); // State for tracking validation errors
  const employee = useSelector((state) =>
    state.employees.find((employee) => employee.id === parseInt(id))
  );

  // Function to parse string into date object
  const parseDate = (dateString) => {
    const [day, month, year] = dateString.split("-");
    return new Date(year, month - 1, day); // Months are 0-based in JS
  };

  // Sets the value of exixting employee
  const [name, setName] = useState(employee ? employee.name : "");
  const [birthDate, setBirthDate] = useState(
    employee ? parseDate(employee.birthDate) : null
  );
  const [department, setDepatment] = useState(
    employee ? employee.department : ""
  );
  const [experience, setExperience] = useState(
    employee ? employee.experience : ""
  );

  useEffect(() => {
    if (!employee) navigate("/list");
  }, [employee, navigate]);

  // Function to parse date into string format.
  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  // Function to edit employee
  const handleEditEmployee = () => {
    const newErrors = {};
    if (!name) newErrors.name = "Name is required";
    if (!birthDate) newErrors.birthDate = "Birth Date is required";
    if (!department) newErrors.department = "Department is required";
    if (!experience) newErrors.experience = "Experience is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors); // Set errors if validation fails
      return;
    }
    setErrors({});
    if (name && birthDate && department && experience) {
      const formattedBirthDate = formatDate(birthDate);
      dispatch(
        editEmployee({
          id: parseInt(id),
          name,
          birthDate: formattedBirthDate,
          department,
          experience,
        })
      );
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
      <h2>Edit Employee</h2>
      <form>
        {/* Field for name input */}
        <div>
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
        <div>
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
        <div>
          <label htmlFor="name">Department</label>
          <input
            type="text"
            placeholder="Department"
            value={department}
            onChange={(e) => setDepatment(e.target.value)}
          />
          {errors.department && (
            <span className="error">{errors.department}</span>
          )}
        </div>
        {/* Field for experience input */}
        <div>
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
        <button onClick={handleEditEmployee}>Save</button>
        <button onClick={() => navigate("/list")}>Cancel</button>
      </form>
    </div>
  );
};

export default EditEmployee;
