import React, { useEffect, useState } from "react";
import "./CreateAssignment.css";
import {
  createAssignment,
  fetchAllEmployee,
  fetchSelectOptions,
} from "../api/axios";

const CreateAssignment = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status_id: "",
    priority_id: "",
    employee_id: "",
    department_id: "",
    due_date: "",
  });

  const [employees, setEmployees] = useState([]);

  const [options, setOptions] = useState({
    statusOptions: [],
    priorityOptions: [],
    departmentOptions: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadOptions = async () => {
      try {
        const data = await fetchSelectOptions();
        const employeeData = await fetchAllEmployee();

        setEmployees(employeeData);
        setOptions(data);

        setFormData({
          ...formData,
          status_id: data.statusOptions[0].id,
          priority_id: data.priorityOptions[0].id,
          department_id: data.departmentOptions[0].id,
        });
      } catch (err) {
        setError("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    loadOptions();
  }, []);

  console.log(employees);

  const baseApi = process.env.REACT_APP_BASE_API;
  const handleChange = (e) => {
    console.log(e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createAssignment(formData);

      setFormData({
        name: "",
        description: "",
        status_id: "",
        priority_id: "",
        employee_id: "",
        department_id: "",
        due_date: "",
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="create-assignment-container">
      <h2>შექმენი ახალი დავალება</h2>
      <div className="create-assignment-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>სათაური*</label>
            <input
              type="text"
              name="name"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>დეპარტამენტი*</label>
              <select
                name="department_id"
                value={Number(formData.department_id)}
                onChange={handleChange}
              >
                {options.departmentOptions.map((option) => {
                  return (
                    <option key={option.id} value={1} name={option.name}>
                      {option.name}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="form-group">
              <label>აღწერა</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
              ></textarea>
            </div>

            <div className="form-group">
              <label>პასუხისმგებელი თანამშრომელი*</label>
              <select
                name="employee_id"
                value={formData.status}
                onChange={handleChange}
              >
                {employees.map((employee) => {
                  return (
                    <option
                      key={employee.id}
                      value={employee.id}
                      name={employee.name}
                    >
                      {employee.name}
                      {employee.surname}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div>
            <div className="form-group">
              <label>პრიორიტეტი</label>
              <select
                name="priority_id"
                value={formData.status}
                onChange={handleChange}
              >
                {options.priorityOptions.map((option) => {
                  return (
                    <option
                      key={option.id}
                      value={option.id}
                      name={option.name}
                    >
                      {option.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="form-group">
              <label>სტატუსი</label>
              <select
                name="status_id"
                value={formData.status}
                onChange={handleChange}
              >
                {options.statusOptions.map((option) => {
                  return (
                    <option
                      key={option.id}
                      value={option.id}
                      name={option.name}
                    >
                      {option.name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>დედლაინი</label>
            <input
              type="date"
              name="due_date"
              value={formData.dueDate}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="submit-btn">
            დავალების შექმნა
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAssignment;
