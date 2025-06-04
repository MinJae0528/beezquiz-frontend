import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import socket from "../socket";
import logoImage from "../assets/img/BeezQuiz.svg";
import bgbgbg from "../assets/img/quizbgbgbg.svg";

const API_BASE = process.env.REACT_APP_API_BASE_URL;

export default function StudentQuizScreen() {
  const { roomId } = useParams();
  const [quizList, setQuizList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState([]);
  const navigate = useNavigate();
  const answersRef = useRef([]);

  useEffect(() => {
    socket.emit("join-room", { roomCode: roomId, role: "student" });

    fetch(`${API_BASE}/room/${roomId}/questions`)
      .then((res) => res.json())
      .then((data) => {
        const questions = data.questions || [];
        setQuizList(questions);
        setHasSubmitted(new Array(questions.length).fill(false)); // 초기화
      });

    socket.on("start-quiz", () => {
      setCurrentIndex(0);
    });

    socket.on("next-question", (nextIndex) => {
      setCurrentIndex(nextIndex);
      setAnswer("");
    });

    socket.on("quiz-finished", () => {
      fetch(`${API_BASE}/result`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          roomCode: roomId,
          nickname: localStorage.getItem("nickname") || "익명",
          answers: answersRef.current,
          role: "student",
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          alert(`제출 완료! 점수: ${data.score}`);
          navigate(`/result/${roomId}`);
        })
        .catch((err) => {
          console.error("결과 저장 실패:", err);
        });
    });

    return () => {
      socket.off("start-quiz");
      socket.off("next-question");
      socket.off("quiz-finished");
    };
  }, [roomId, navigate]);

  const currentQuiz = quizList[currentIndex];
  const totalQuestions = quizList.length;

  const handleSubmit = () => {
    if (!answer.trim()) return;

    answersRef.current[currentIndex] = answer;

    socket.emit("submit-answer", {
      roomCode: roomId,
      questionIndex: currentIndex,
    });

    setHasSubmitted((prev) => {
      const updated = [...prev];
      updated[currentIndex] = true;
      return updated;
    });

    setAnswer("");
  };

  return (
    <div className="relative w-screen h-screen flex flex-col items-center justify-start pt-20">
      {/* 좌상단 로고 */}
      <img src={logoImage} alt="Beez Quiz" className="absolute top-4 left-4 w-24" />

      {/* 상단 중앙 문제 번호 */}
      <div className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-40 text-white px-4 py-2 rounded text-xl">
        {totalQuestions > 0 ? `${currentIndex + 1} / ${totalQuestions}` : "로딩 중..."}
      </div>

      {/* 상단 우측 제출 여부 */}
      <div className="absolute top-6 right-6 bg-black bg-opacity-40 text-white px-4 py-2 rounded text-lg">
        제출: {hasSubmitted[currentIndex] ? "O" : "X"}
      </div>

      {/* 문제 영역 */}
      <div
        className="flex justify-center items-center w-[1000px] h-[500px] rounded-lg mt-8"
        style={{ backgroundImage: `url(${bgbgbg})` }}
      >
        <div className="w-[740px] h-[320px] text-3xl text-[#ffffff] text-center">
          {currentQuiz ? currentQuiz.question : "문제를 불러오는 중..."}
        </div>
      </div>

      {/* 입력창 */}
      <div className="mt-[24px] flex w-[1000px] h-[72px]">
        <input
          className="w-full h-full text-2xl px-4 border"
          placeholder="정답을 입력해주세요.."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        <button
          onClick={handleSubmit}
          className="w-[150px] h-full bg-yellow-400 text-xl font-semibold border-l border-gray-300"
        >
          제출
        </button>
      </div>
    </div>
  );
}
