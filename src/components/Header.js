import { Link } from "react-router-dom";
import "./Header.css";

const Header = ({ setIsModalOpen }) => {
  return (
    <header className="header">
      <Link to="/" className="logo">
        Momentum <span>⏳</span>
      </Link>

      <nav className="buttons">
        <button className="add-employee" onClick={() => setIsModalOpen(true)}>
          თანამშრომლის შექმნა
        </button>
        <Link className="add-assignment" to={"/create-assignment"}>
          + დაამატე ახალი დავალება
        </Link>
      </nav>
    </header>
  );
};

export default Header;
