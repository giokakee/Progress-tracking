import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  departmentColors,
  fetchOneAssignment,
  priorityColors,
  fetchComments,
} from "../api/axios";
import "./SingleAssignment.css";
import { PieChart, User, Calendar } from "lucide-react";

function SingleAssignment({}) {
  const { id } = useParams();
  const [assignment, setAssignment] = useState({});
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const [replyIsOpen, setReplyIsOpen] = useState(false);

  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        const commentsData = await fetchComments(id);
        const response = await fetchOneAssignment(id);

        setComments(commentsData);
        setAssignment(response);
      } catch (error) {
        throw error;
      }
    };

    fetchAssignment();
  }, [id]);

  const formatDate = (dateString) => {
    const days = [
      "კვირა",
      "ორშაბათი",
      "სამშაბათი",
      "ოთხშაბათი",
      "ხუთშაბათი",
      "პარასკევი",
      "შაბათი",
    ];

    const date = new Date(dateString);
    const dayIndex = date.getDay(); // 0 = Sunday, 1 = Monday, etc.

    return `${days[dayIndex]} - ${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
  };

  const handleComment = () => {
    console.log(newComment, " this should be a comment");
  };

  const handleReply = async () => {
    console.log("this is handle replyyy");
    setReplyIsOpen(false);
  };

  console.log(assignment);
  return (
    <div className="single-assignment-container">
      {assignment.id && (
        <div className="single-assignment">
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
                    backgroundColor: departmentColors[assignment.department.id],
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

                <span className="tag-hover">{assignment.department.name}</span>
              </div>
            </div>
            <h3 className="assignment-title">{assignment.name}</h3>
            <p className="assignment-description">{assignment.description}</p>
            <div className="assignment-footer">
              <p className="footer-title">დავალების დეტალები</p>

              <div>
                <div className="assignment-icons">
                  <PieChart size={24} />
                  <p>სტატუსი</p>
                </div>
                <select>
                  <option>აირჩიეთ სტატუსი</option>
                </select>
              </div>

              <div>
                <div className="assignment-icons">
                  <User size={24} />
                  <p>თანამშრომელი</p>
                </div>
                <img
                  src={assignment.employee.avatar}
                  alt="User"
                  className="profile-img"
                />
                <span>{assignment.department.name}</span>
                <span>
                  {assignment.employee.name} {assignment.employee.surname}
                </span>
              </div>

              <div>
                <div className="assignment-icons">
                  <Calendar size={24} />
                  <p>დავალების ვადა</p>
                </div>
                <div>{formatDate(assignment.due_date)}</div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="comment-section">
        <div>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="დაწერე კომენტარი"
          />
          <button onClick={handleComment}>კომენტარის დამატება</button>
        </div>

        <div>
          <h3>კომენტარები</h3>
          {comments.length &&
            comments.map((comment) => {
              return (
                <div key={comment.id} className="comment-box">
                  <div className="comment-header">
                    <img src={comment.author_avatar} />
                    <p>{comment.author_nickname}</p>
                  </div>

                  <div className="comment-main">
                    <p>{comment.text}</p>
                    <div className="reply">
                      {!replyIsOpen ? (
                        <button onClick={() => setReplyIsOpen(true)}>
                          უპასუხე
                        </button>
                      ) : (
                        <div>
                          <button onClick={() => setReplyIsOpen(false)}>
                            X
                          </button>
                          <textarea />

                          <button className="replyButton" onClick={handleReply}>
                            უპასუხე
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="comment-footer">
                    <div className="comment-subcomments">
                      {comment.sub_comments.length &&
                        comment.sub_comments.map((subComment) => {
                          return (
                            <div
                              key={subComment.id}
                              className="subcomments-box"
                            >
                              <div className="subcomments-header">
                                <img src={subComment.author_avatar} />
                                <p>{subComment.author_nickname}</p>
                              </div>
                              <div className="subcomments-main">
                                <p>{subComment.text}</p>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default SingleAssignment;
