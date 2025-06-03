import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "../styles/CreateQuiz.css";
import honeyImage from "../assets/img/Honey.svg";
import logoImage from "../assets/img/BeezQuiz.svg";

// 🔗 배포된 백엔드 API 주소
const API_BASE =
  "https://beezquiz-f7gpc0fefpfzaph6.koreasouth-01.azurewebsites.net";

const CreateQuiz = () => {
  const [questions, setQuestions] = useState([{ question: "", answer: "" }]);
  const navigate = useNavigate();

  const handleAddQuestion = () => {
    setQuestions([...questions, { question: "", answer: "" }]);
  };

  const handleChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const handleStartQuiz = async () => {
    try {
      // 백엔드가 요구하는 포맷으로 변환
      const formattedQuestions = questions.map((q) => ({
        question_text: q.question.trim(),
        correct_answer: q.answer.trim(),
      }));

      // 방 생성 요청
      const res = await axios.post(`${API_BASE}/rooms/create`, {
        questions: formattedQuestions,
      });

      const { roomCode } = res.data;

      // 퀴즈 화면으로 이동
      navigate(`/quiz/${roomCode}`);
    } catch (err) {
      console.error("퀴즈 생성 실패:", err);
      alert("퀴즈 생성 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="quiz-container">
      <img src={logoImage} alt="BeezQuiz Logo" className="logo" />

      {questions.map((q, index) => (
        <div
          className="quiz-box"
          style={{ backgroundImage: `url(${honeyImage})` }}
          key={index}
        >
          <div className="quiz-inputs">
            <div className="form-group">
              <label>{`문제 ${index + 1}`}</label>
              <textarea
                value={q.question}
                onChange={(e) =>
                  handleChange(index, "question", e.target.value)
                }
                className="question-input"
                placeholder="문제를 입력하세요"
              />
            </div>
            <div className="form-group">
              <label>정답</label>
              <input
                value={q.answer}
                onChange={(e) => handleChange(index, "answer", e.target.value)}
                className="answer-input"
                placeholder="정답을 입력하세요"
              />
            </div>
          </div>
        </div>
      ))}

      <div className="quiz-buttons">
        <button onClick={handleAddQuestion} className="add-question-btn">
          문제 추가
        </button>
        <button onClick={handleStartQuiz} className="start-btn">
          시작
        </button>
      </div>
    </div>
  );
};

export default CreateQuiz;
