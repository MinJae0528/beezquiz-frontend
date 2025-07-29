// src/features/StudentQuizScreen.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import socket from "../socket";
import logoImage from "../assets/img/BeezQuiz.svg";
import bgbgbg from "../assets/img/quizbgbgbg.svg";

const API_BASE = process.env.REACT_APP_API_BASE_URL;

function normalizeType(type, options) {
  const optCount = Array.isArray(options) ? options.filter(o => o?.trim()).length : 0;
  if ((type === "objective" || type === "객관식") && optCount >= 2) return "objective";
  return "subjective";
}

export default function StudentQuizScreen() {
  const { roomId } = useParams();
  const navigate = useNavigate();

  const [quizList, setQuizList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [submittedAnswers, setSubmittedAnswers] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const currentQuiz = quizList[currentIndex];

  useEffect(() => {
    if (!roomId || !API_BASE) return;

    fetch(`${API_BASE}/room/${roomId}/questions`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.questions)) {
          const normalized = data.questions.map((q) => ({
            ...q,
            type: normalizeType(q.type, q.options),
          }));
          setQuizList(normalized);
        }
      });
  }, [roomId]);

  useEffect(() => {
    socket.on("next-question", (index) => {
      setCurrentIndex(index);
      setAnswer("");
      setSelectedOption("");
      setHasSubmitted(false);
    });

    socket.on("quiz-finished", () => {
      navigate(`/result/${roomId}`);
    });

    return () => {
      socket.off("next-question");
      socket.off("quiz-finished");
    };
  }, [navigate, roomId]);

  const handleSubmitAnswer = () => {
    const userAnswer =
      currentQuiz.type === "objective" ? selectedOption : answer.trim();

    if (!userAnswer) return alert("정답을 입력해주세요.");

    socket.emit("submit-answer", {
      roomCode: roomId,
      questionIndex: currentIndex,
    });

    setSubmittedAnswers((prev) => [...prev, userAnswer]);
    setHasSubmitted(true);
  };

  if (!currentQuiz) return <div>문제를 불러오는 중...</div>;

  return (
    <div className="quiz-screen">
      <img src={logoImage} alt="BeezQuiz" className="logo" />
      <div className="question-box">
        <h2>문제 {currentIndex + 1}</h2>
        <p>{currentQuiz.text}</p>

        {currentQuiz.type === "objective" ? (
          <div className="options">
            {currentQuiz.options.map((opt, index) => {
              const val = (index + 1).toString(); // 정답은 "1"~"4" 형식
              return (
                <button
                  key={index}
                  onClick={() => setSelectedOption(val)}
                  className={selectedOption === val ? "selected" : ""}
                >
                  {val}. {opt}
                </button>
              );
            })}
          </div>
        ) : (
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="정답 입력"
          />
        )}

        <button
          onClick={handleSubmitAnswer}
          disabled={hasSubmitted}
          className="submit-button"
        >
          제출
        </button>
      </div>
    </div>
  );
}
