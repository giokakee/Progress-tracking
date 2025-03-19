import React from "react";
import "./SingleAssignment.css";
import { priorityColors, departmentColors } from "../api/axios";

export default function SingleAssignment({ assignments, category }) {
  return (
    <>
      {assignments
        .filter((assignment) => assignment.status.id === category.id)
        .map((assignment) => (
          <div className="assignment-card" key={assignment.id}>
            <div className="assignment-content">
              <div className="assignment-tags">
                <div className="tag-container">
                  <span
                    className="tag"
                    style={{ color: priorityColors[assignment.priority.name] }}
                  >
                    <img src={assignment.priority.icon} alt="Priority" />
                    <span className="priority">{assignment.priority.name}</span>
                  </span>
                  <span
                    className="department"
                    style={{
                      backgroundColor:
                        departmentColors[assignment.department.id],
                      color: "white",
                      padding: "5px",
                    }}
                  >
                    {assignment.department.name.split(" ").length > 1
                      ? assignment.department.name.split(" ").map((word) => {
                          return (
                            <span key={word} style={{ marginRight: "3px" }}>
                              {`${word.slice(0, 3)}.`}{" "}
                            </span>
                          );
                        })
                      : "short name"}
                  </span>

                  <span className="tag-hover">
                    {assignment.department.name}
                  </span>
                </div>
                <span className="assignment-date">22 იან, 2022</span>
              </div>
              <h3 className="assignment-title">{assignment.name}</h3>
              <p className="assignment-description">{assignment.description}</p>
              <div className="assignment-footer">
                <img
                  src={assignment.employee.avatar}
                  alt="User"
                  className="profile-img"
                />
                <span className="comment-count">
                  💬 {assignment.total_comments}
                </span>
              </div>
            </div>
          </div>
        ))}
    </>
  );
}
