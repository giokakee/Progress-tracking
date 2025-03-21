import { Route, Routes } from "react-router-dom";
import Assignments from "./pages/Assignments";
import SingleAssignment from "./pages/SingleAssignment";
import CreateAssignment from "./pages/CreateAssignment";
import MainLayout from "./layout/MainLayout";

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Assignments />} />
        <Route path="/assignment/:id" element={<SingleAssignment />} />
        <Route path="/create-assignment" element={<CreateAssignment />} />
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </MainLayout>
  );
}

export default App;
