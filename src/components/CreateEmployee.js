import { useEffect, useRef, useState } from "react";
import "./CreateEmployee.css";
import { useDispatch, useSelector } from "react-redux";
import { loadFilters } from "../features/filterSlice";

import { createEmployee } from "../api/axios";

const CreateEmployee = ({ isOpen, onClose }) => {
  const [visible, setVisible] = useState(isOpen);
  const [employee, setEmployee] = useState({
    name: "",
    surname: "",
    department: "",
    avatar: null,
  });
  const [avatarToShow, setAvatarToShow] = useState(null);

  const dispatch = useDispatch();

  const {
    data: { departments },
    status,
  } = useSelector((state) => state.filters);

  useEffect(() => {
    dispatch(loadFilters());
  }, [dispatch]);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
    } else {
      setTimeout(() => setVisible(false), 300);
    }
  }, [isOpen]);

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarToShow(reader.result);
        setEmployee({ ...employee, avatar: event.target.files[0] });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e, name) => {
    setEmployee({ ...employee, [name]: e.target.value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const formdata = new FormData();
    formdata.append("name", employee.name);
    formdata.append("surname", employee.surname);
    formdata.append("department_id", employee.department);
    formdata.append("avatar", employee.avatar);
    try {
      const response = await createEmployee(formdata);

      console.log(response);
      // console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    visible && (
      <div className={`modal-overlay ${isOpen ? "fade-in" : "fade-out"}`}>
        <div className="modal-content">
          <button className="close-btn" onClick={onClose}>
            ✖
          </button>

          <h2 className="modal-title">თანამშრომლის დამატება</h2>

          <div className="form-group">
            <div className="input-wrapper">
              <label>სახელი*</label>
              <input
                type="text"
                placeholder="სახელი"
                min={2}
                max={255}
                onChange={(e) =>
                  handleChange(e, "name", employee.name, setEmployee)
                }
                value={employee.name}
                required
              />
              <small>✔ მინიმუმ 2 სიმბოლო | ✔ მაქსიმუმ 255 სიმბოლო</small>
            </div>

            <div className="input-wrapper">
              <label>გვარი*</label>
              <input
                type="text"
                placeholder="გვარი"
                min={2}
                max={255}
                value={employee.surname}
                onChange={(e) =>
                  handleChange(e, "surname", employee.surname, setEmployee)
                }
                required
              />
              <small>✔ მინიმუმ 2 სიმბოლო | ✔ მაქსიმუმ 255 სიმბოლო</small>
            </div>
          </div>

          <div className="avatar-upload">
            <label>ავატარი*</label>
            <div className="avatar-box">
              {avatarToShow ? (
                <div className="avatar-preview">
                  <img src={avatarToShow} alt="Avatar Preview" />
                  <button
                    className="delete-btn"
                    onClick={() => setAvatarToShow(null)}
                  >
                    🗑
                  </button>
                </div>
              ) : (
                <input type="file" onChange={handleAvatarChange} />
              )}
            </div>
          </div>

          <div className="input-wrapper">
            <label>დეპარტამენტი*</label>
            <select
              onChange={(e) =>
                setEmployee({ ...employee, department: e.target.value })
              }
            >
              <option value=""></option>
              {departments.map((department) => (
                <option value={department.id} key={department.id}>
                  {department.name}
                </option>
              ))}
            </select>
          </div>

          <div className="modal-footer">
            <button className="cancel-btn" onClick={onClose}>
              გაუქმება
            </button>
            <button
              className="submit-btn"
              onClick={() => {
                handleFormSubmit();
                onClose();
              }}
            >
              დამატე თანამშრომელი
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default CreateEmployee;
