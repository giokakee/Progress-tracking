import React, { useEffect, useState } from "react";
import "./Assignments.css";
import { fetchStatuses } from "../api/axios";
import SingleAssignment from "../components/SingleAssignment";
import FilterDropdown from "../components/FilterDropdown.js";
import { useDispatch, useSelector } from "react-redux";
import { loadAssignments } from "../features/assignmentSlice";

const Assignments = () => {
  const [statuses, setStatuses] = useState([]);
  // const []
  const dispatch = useDispatch();
  const {
    data: assignments,
    filteredData,
    status,
    error,
  } = useSelector((state) => state.assignments);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const statusesData = await fetchStatuses();
        setStatuses(statusesData);
      } catch (error) {
        console.log({ error });
        throw error;
      }
    };

    fetchData();
    dispatch(loadAssignments());
  }, [dispatch]);

  return (
    <div className="assignments-container">
      <h2>დავალებების გვერდი</h2>
      <FilterDropdown />
      {assignments.length > 0 ? (
        <div className="assignments-grid">
          {statuses.map((category) => (
            <div key={category.id} className="category-section">
              <div className={`category-header`}>
                <p>{category.name}</p>
              </div>
              <div className="assignment-cards">
                <SingleAssignment
                  assignments={
                    filteredData.length > 0 ? filteredData : assignments
                  }
                  category={category}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Assignments;
