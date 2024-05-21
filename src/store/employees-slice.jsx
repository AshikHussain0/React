import { createSlice } from "@reduxjs/toolkit";

const employeesSlice = createSlice({
  name: "employees",
  initialState: [],
  reducers: {
    // Reducer for add employee
    addEmployee: (state, action) => {
      state.push(action.payload);
    },
    // Reducer for delete employee
    deleteEmployee: (state, action) => {
      return state.filter((employee) => employee.id !== action.payload);
    },
    // Reducer for edit employee
    editEmployee: (state, action) => {
      const { id, name, birthDate, department, experience } = action.payload;
      const existingEmployee = state.find((employee) => employee.id === id);
      if (existingEmployee) {
        existingEmployee.name = name;
        existingEmployee.birthDate = birthDate;
        existingEmployee.department = department;
        existingEmployee.experience = experience;
      }
    },
  },
});

export const { addEmployee, deleteEmployee, editEmployee } =
  employeesSlice.actions;
export default employeesSlice.reducer;
