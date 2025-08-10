import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CreateQuiz.css";
import honeyImage from "../assets/img/Honey.svg";
import logoImage from "../assets/img/BeezQuiz.svg";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const defaultQuestion = () => ({
  question: "",
  answer: "",
  type: "subjective",            // 기본: 서술형
  options: ["", "", "", ""],     // 객관식 4지선다 고정
});

const CreateQuiz = () => {
  const [questions, setQuestions] = useState([defaultQuestion()]);
  const navigate = useNavigate();

  const handleAddQuestion = () => {
    setQuestions([...questions, defaultQuestion()]);
  };

  const handleChange = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;

    if (field === "type") {
      updated[index].options = ["", "", "", ""];
      updated[index].answer = "";
    }
    setQuestions(updated);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[oIndex] = value;
    setQuestions(updated);
  };

  // 유효성
  const isObjectiveValid = (q) => {
    const filled = q.options.filter((o) => o.trim() !== "");
    return q.type === "objective" && filled.length === 4 && q.answer;
  };
  const isSubjectiveValid = (q) => q.question.trim() && q.answer.trim();
  const canSubmit = questions.every((q) =>
    q.type === "multiple" ? isObjectiveValid(q) : isSubjectiveValid(q)
  );

  const handleStartQuiz = async () => {
    if (!API_BASE_URL) {
      alert("❌ API 주소가 설정되지 않았습니다.");
      return;
    }

    try {
      // 1) 방 생성
      const roomRes = await fetch(`${API_BASE_URL}/rooms/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questions: [] }),
      });
      if (!roomRes.ok) {
        const err = await roomRes.json();
        alert("❌ 방 생성 실패: " + (err.message || "서버 오류"));
        return;
      }
      const { roomCode } = await roomRes.json();

      // 2) 문제 저장용 포맷
      const formattedQuestions = questions.map((q) => {
        if (q.type === "objective") {
          return {
            text: q.question,
            correctAnswer: q.answer, // "1"~"4"
            type: "objective",
            options: q.options.map((opt) => opt.trim()),
          };
        }
        return {
          text: q.question,
          correctAnswer: q.answer, // 텍스트
          type: "subjective",
          options: [],
        };
      });

      // 디버깅을 위한 로그 추가
      console.log("🔍 백엔드로 전송할 문제 데이터:", formattedQuestions);
      console.log("🔍 객관식 문제 개수:", formattedQuestions.filter(q => q.type === "objective").length);
      console.log("🔍 서술형 문제 개수:", formattedQuestions.filter(q => q.type === "subjective").length);

      // 3) 문제 저장
      const saveRes = await fetch(`${API_BASE_URL}/room/${roomCode}/questions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questions: formattedQuestions }),
      });
      if (!saveRes.ok) {
        const err = await saveRes.json();
        alert("❌ 문제 저장 실패: " + (err.message || "서버 오류"));
        return;
      }

      // 4) 진행 화면
      navigate(`/host/room/${roomCode}`);
    } catch (error) {
      console.error("❌ 네트워크 오류:", error);
      alert("퀴즈 시작 중 네트워크 오류가 발생했습니다.");
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
                onChange={(e) => handleChange(index, "question", e.target.value)}
                className="question-input"
                placeholder="문제를 입력하세요"
              />
            </div>

            <div className="form-group">
              <label>문제 타입</label>
              <div className="type-selector">
                <label>
                  <input
                    type="radio"
                    name={`type-${index}`}
                    value="subjective"
                    checked={q.type === "subjective"}
                    onChange={(e) => handleChange(index, "type", e.target.value)}
                  />
                  서술형
                </label>
                <label>
                  <input
                    type="radio"
                    name={`type-${index}`}
                    value="objective"
                    checked={q.type === "objective"}
                    onChange={(e) => handleChange(index, "type", e.target.value)}
                  />
                  객관식
                </label>
              </div>
            </div>

            {q.type === "objective" && (
              <div className="form-group">
                <label>보기</label>
                <div className="option-grid">
                  {q.options.map((opt, oIndex) => (
                    <div key={oIndex} className="option-item">
                      <span className="option-label">{oIndex + 1}.</span>
                      <input
                        type="text"
                        value={opt}
                        onChange={(e) =>
                          handleOptionChange(index, oIndex, e.target.value)
                        }
                        placeholder={`보기 ${oIndex + 1}`}
                        className="option-text"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="form-group">
              <label>정답</label>
              {q.type === "objective" ? (
                <select
                  value={q.answer}
                  onChange={(e) => handleChange(index, "answer", e.target.value)}
                  className="answer-select"
                >
                  <option value="">정답을 선택하세요</option>
                  {q.options.map((opt, oIndex) =>
                    opt.trim() ? (
                      <option key={oIndex} value={(oIndex + 1).toString()}>
                        {oIndex + 1}. {opt}
                      </option>
                    ) : null
                  )}
                </select>
              ) : (
                <input
                  value={q.answer}
                  onChange={(e) => handleChange(index, "answer", e.target.value)}
                  className="answer-input"
                  placeholder="정답을 입력하세요"
                />
              )}
            </div>
          </div>
        </div>
      ))}

      <div className="quiz-buttons">
        <button onClick={handleAddQuestion} className="add-question-btn">
          문제 추가
        </button>
        <button onClick={handleStartQuiz} className="start-btn" disabled={!canSubmit}>
          시작
        </button>
      </div>
    </div>
  );
};

export default CreateQuiz;
