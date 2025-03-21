import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  departmentColors,
  fetchOneAssignment,
  priorityColors,
  fetchComments,
  commentAssignment,
  fetchStatuses,
  updateStatus,
} from "../api/axios";
import "./SingleAssignment.css";
import { PieChart, User, Calendar, CornerUpLeft } from "lucide-react";

function SingleAssignment({}) {
  const { id } = useParams();
  const [assignment, setAssignment] = useState({});
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const [replyIsOpen, setReplyIsOpen] = useState(false);
  const [replies, setReplies] = useState({});
  const [statuses, setStatuses] = useState([]);
  const [newStatus, setNewStatus] = useState({});

  const [error, setError] = useState(true);

  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        const commentsData = await fetchComments(id);
        const response = await fetchOneAssignment(id);

        const statusesData = await fetchStatuses();
        setStatuses(statusesData);
        setComments(commentsData);
        setAssignment(response);
        setError(false);
      } catch (error) {
        setError(true);
        console.log(error);
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

  const handleComment = async () => {
    try {
      const addComment = await commentAssignment(id, {
        text: newComment,
        task_id: id,
      });
      console.log(addComment, " this shoould be an comment");
      const newComments = [addComment, ...comments];
      setComments(newComments);
      setNewComment("");
    } catch (error) {
      console.log(error);
      setError("errorrrrr");
    }
  };

  const handleReplyChange = (commentId, value) => {
    setReplies((prev) => ({
      ...prev,
      [commentId]: value, // Store reply text based on comment ID
    }));
  };

  const handleReply = async (commentId) => {
    try {
      const addReply = await commentAssignment(id, {
        text: replies[commentId],
        task_id: id,
        parent_id: commentId,
      });

      const newReply = comments.map((comment) => {
        if (
          comment.id === commentId &&
          comment.hasOwnProperty("sub_comments")
        ) {
          comment.sub_comments.push(addReply);
        } else {
          comment["sub_comments"] = [addReply];
        }

        return comment;
      });

      setComments(newReply);
    } catch (error) {
      throw error;
    }
    setReplyIsOpen(false);
  };

  const handleStatusChange = async (e) => {
    try {
      await updateStatus(id, e.target.value);
    } catch (err) {
      console.log(err);
    }
  };

  if (error) return <h2>{"There is no task lik this"}</h2>; // Show error if data is not found

  return (
    <div className="single-assignment-container">
      {assignment && (
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
                <select onChange={handleStatusChange}>
                  <option>{assignment.status.name}</option>
                  {statuses.map((status) => {
                    return (
                      <option key={status.id} value={status.id}>
                        {status.name}
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="single-assignment-employee">
                <div className="assignment-icons">
                  <User size={24} />
                  <p>თანამშრომელი</p>
                </div>
                <div className="single-assignment-employee-avatar">
                  <img
                    src={assignment.employee.avatar}
                    alt="User"
                    className="profile-img"
                  />
                  <span>
                    {assignment.employee.name} {assignment.employee.surname}
                  </span>
                </div>
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

      {assignment && (
        <div className="comment-section">
          <div className="comment-input">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="დაწერე კომენტარი"
            />
            <button onClick={handleComment}>დააკომენტარე</button>
          </div>

          <div>
            <h3>
              კომენტარები <span>{comments.length}</span>
            </h3>
            {comments.length &&
              comments.map((comment) => {
                return (
                  <div key={comment.id} className="comment-box">
                    <div className="comment-main">
                      <div className="comment-header">
                        <img src={comment.author_avatar} />
                        <p className="comment-author">
                          {comment.author_nickname}
                        </p>
                      </div>
                      <div className="comment-content">
                        <p>{comment.text}</p>
                        <div className="reply">
                          {!replyIsOpen ? (
                            <button onClick={() => setReplyIsOpen(true)}>
                              <CornerUpLeft />
                              უპასუხე
                            </button>
                          ) : (
                            <div className="reply-input">
                              <textarea
                                value={replies[comment.id] || ""}
                                onChange={(e) =>
                                  handleReplyChange(comment.id, e.target.value)
                                }
                              />
                              <div>
                                <button
                                  onClick={() => setReplyIsOpen(false)}
                                  className="close-button"
                                  style={{ color: "red" }}
                                >
                                  გაუქმება
                                </button>

                                <button
                                  className="replyButton"
                                  onClick={() => handleReply(comment.id)}
                                >
                                  დააკომენტარე
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="comment-footer">
                      <div className="comment-subcomments">
                        {comment.sub_comments &&
                          comment.sub_comments.length > 0 &&
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
                                <p className="subcomment-text">
                                  {subComment.text}
                                </p>
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
      )}
    </div>
  );
}

export default SingleAssignment;
