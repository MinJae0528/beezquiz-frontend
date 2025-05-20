// src/Router.jsx

import { Routes, Route } from "react-router-dom";
import Main from "./Main.jsx";
import QuizMainPage from "./pages/QuizMainPage.jsx";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/quiz" element={<QuizMainPage />} />
    </Routes>
  );
}
