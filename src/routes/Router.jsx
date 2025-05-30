// src/routes/Router.jsx

import { Routes, Route } from "react-router-dom";
import Main from "../Main.jsx";
import QuizMainPage from "../pages/QuizMainPage.jsx";
import CreateQuizPage from "../pages/CreateQuizPage.jsx";
import WaitingRoomPage from "../pages/WaitingRoomPage.jsx";
import HostWaitingPage from "../pages/HostWaitingPage.jsx";
import HostQuizScreen from "../features/HostQuizScreen.jsx";
import StudentQuizScreen from "../features/QuizScreen.jsx";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/quiz" element={<QuizMainPage />} />
      <Route path="/createQuiz" element={<CreateQuizPage />} />
      <Route path="/room/:roomId" element={<WaitingRoomPage />} />
      <Route path="/host/room/:roomId" element={<HostWaitingPage />} />
      <Route path="/host/quiz/:roomId" element={<HostQuizScreen />} />
      <Route path="/students/quiz/:roomId" element={<StudentQuizScreen />} />
    </Routes>
  );
}
