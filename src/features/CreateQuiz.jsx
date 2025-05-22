import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CreateQuiz.css";
import honeyImage from "../assets/img/Honey.svg";
import logoImage from "../assets/img/BeezQuiz.svg";

const CreateQuiz = () => {
  const [questions, setQuestions] = useState([{ question: "", answer: "" }]);
  const navigate = useNavigate(); // ✅ 라우터 이동 훅

  const handleAddQuestion = () => {
    setQuestions([...questions, { question: "", answer: "" }]);
  };

  const handleChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const handleStartQuiz = async () => {
    console.log("퀴즈 시작:", questions);

    try {
      const response = await fetch(
        "https://beezquiz-f7gpc0fefpfzaph6.koreasouth-01.azurewebsites.net/rooms/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ questions }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("❌ 서버 응답 오류:", errorData);
        alert("방 생성 실패: " + (errorData.message || "서버 오류"));
        return;
      }

      const data = await response.json();
      const { roomCode } = data;

      console.log("✅ 방 생성 성공:", data);
      navigate(`/host/room/${roomCode}`); // ✅ 방 코드로 대기실 이동
    } catch (error) {
      console.error("❌ 네트워크 오류:", error);
      alert("방 생성 중 네트워크 오류 발생");
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
                value={q.question || ""}
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
                value={q.answer || ""}
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
