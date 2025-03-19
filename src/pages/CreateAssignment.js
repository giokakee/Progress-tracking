import React, { useEffect, useState } from "react";
import "./CreateAssignment.css";
import { fetchSelectOptions } from "../api/axios";

const CreateAssignment = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status_id: "",
    priority_id: "",
    department_id: "",
    dueDate: "",
  });

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

  const baseApi = process.env.REACT_APP_BASE_API;
  const handleChange = (e) => {
    console.log(e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
  };

  return (
    <div className="assignment-container">
      <h2>შექმენი ახალი დავალება</h2>
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
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        <div>
          <div className="form-group">
            <label>პასუხისმგებელი თანამშრომელი*</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
          <div className="form-group">
            <label>პასუხისმგებელი თანამშრომელი*</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>
        <div className="form-group">
          <label>დედლაინი</label>
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="submit-btn">
          დავალების შექმნა
        </button>
      </form>
    </div>
  );
};

export default CreateAssignment;
