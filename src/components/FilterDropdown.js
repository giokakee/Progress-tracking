import React, { useEffect, useRef, useState } from "react";
import "./FilterDropdown.css";
import { useDispatch, useSelector } from "react-redux";
import { loadFilters } from "../features/filterSlice";
import { applyFilters } from "../features/assignmentSlice";

export default function AssignmentFilter() {
  const dispatch = useDispatch();
  const [selectedFilters, setSelectedFilters] = useState({
    departments: [],
    priorities: [],
    employees: [],
  });
  const { data: filters, status } = useSelector((state) => state.filters);

  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    dispatch(loadFilters()); // Fetch filters on mount
  }, [dispatch]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = (type) => {
    setOpenDropdown(openDropdown === type ? null : type);
  };

  const handleCheckboxChange = (type, value) => {
    setSelectedFilters((prev) => {
      const newSelected = prev[type].includes(value)
        ? prev[type].filter((v) => v !== value) // Remove if already selected
        : [...prev[type], value]; // Add if not selected

      return { ...prev, [type]: newSelected };
    });
  };

  if (status === "loading") return <p>Loading filters...</p>;
  if (status === "failed") return <p>Error loading filters</p>;

  return (
    <div ref={dropdownRef} className="assignment-filter">
      <div>
        <button
          className="filter-button"
          onClick={() => toggleDropdown("departments")}
        >
          დეპარტამენტი{" "}
          {selectedFilters.departments.length > 0 &&
            `(${selectedFilters.departments.length})`}
        </button>
        {openDropdown === "departments" && (
          <div className="dropdown">
            {filters.departments.map((dep) => (
              <label key={dep.id}>
                <input
                  type="checkbox"
                  checked={selectedFilters.departments.includes(dep.name)}
                  onChange={() => handleCheckboxChange("departments", dep.name)}
                />
                {dep.name}
              </label>
            ))}
            <div className="apply-filters">
              <button
                onClick={() => {
                  dispatch(applyFilters(selectedFilters));
                  setOpenDropdown(null);
                }}
              >
                არჩევა
              </button>
            </div>
          </div>
        )}
      </div>

      <div>
        <button
          className="filter-button"
          onClick={() => toggleDropdown("priorities")}
        >
          პრიორიტეტი{" "}
          {selectedFilters.priorities.length > 0 &&
            `(${selectedFilters.priorities.length})`}
        </button>
        {openDropdown === "priorities" && (
          <div className="dropdown">
            {filters.priorities.map((prio) => (
              <label key={prio.id}>
                <input
                  type="checkbox"
                  checked={selectedFilters.priorities.includes(prio.name)}
                  onChange={() => handleCheckboxChange("priorities", prio.name)}
                />
                {prio.name}
              </label>
            ))}

            <div className="apply-filters">
              <button
                onClick={() => {
                  dispatch(applyFilters(selectedFilters));
                  setOpenDropdown(null);
                }}
              >
                არჩევა
              </button>
            </div>
          </div>
        )}
      </div>

      <div>
        <button
          className="filter-button"
          onClick={() => toggleDropdown("employees")}
        >
          თანამშრომელი{" "}
          {selectedFilters.employees.length > 0 &&
            `(${selectedFilters.employees.length})`}
        </button>
        {openDropdown === "employees" && (
          <div className="dropdown">
            {filters.employees.map((emp) => (
              <label key={emp.id}>
                <input
                  type="checkbox"
                  checked={selectedFilters.employees.includes(emp.id)}
                  onChange={() => handleCheckboxChange("employees", emp.id)}
                />
                <img src={emp.avatar} alt="Avatar" className="profile-img" />
                {emp.name} {emp.surname}
              </label>
            ))}

            <div className="apply-filters">
              <button
                onClick={() => {
                  dispatch(applyFilters(selectedFilters));
                  setOpenDropdown(null);
                }}
              >
                არჩევა
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
