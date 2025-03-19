import { useState } from "react";
import Header from "../components/Header";
import "./MainLayout.css";
import CreateEmployee from "../components/CreateEmployee";

function MainLayout({ children }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="app-container">
      <div className={`content ${isModalOpen ? "blurred" : ""}`}>
        <Header setIsModalOpen={setIsModalOpen} />

        <main>{children}</main>
      </div>

      {isModalOpen && (
        <CreateEmployee
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}

export default MainLayout;
