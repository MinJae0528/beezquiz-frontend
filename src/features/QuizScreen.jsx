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
  const navigate = useNavigate();

  const answersRef = useRef([]); // ✅ answers 상태 useRef로 대체

  useEffect(() => {
    socket.emit("join-room", { roomCode: roomId, role: "student" });

    fetch(`${API_BASE}/room/${roomId}/questions`)
      .then((res) => res.json())
      .then((data) => setQuizList(data.questions || []));

    socket.on("start-quiz", () => {
      setCurrentIndex(0);
    });

    socket.on("next-question", (nextIndex) => {
      setCurrentIndex(nextIndex);
      setAnswer("");
    });

    socket.on("quiz-finished", () => {
      // ✅ 퀴즈 종료 시 최신 answers 전송
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

  const handleSubmit = () => {
    if (!answer.trim()) return;

    // ✅ answersRef 업데이트
    answersRef.current[currentIndex] = answer;

    socket.emit("submit-answer", {
      roomCode: roomId,
      questionIndex: currentIndex,
    });

    setAnswer("");
  };

  return (
    <div className="relative w-screen h-screen flex items-center justify-center">
      <img src={logoImage} alt="Beez Quiz" className="absolute top-4 left-4 w-24" />

      <div className="flex flex-col items-center">
        <div
          className="flex justify-center items-center w-[1000px] h-[500px] rounded-lg"
          style={{ backgroundImage: `url(${bgbgbg})` }}
        >
          <div className="w-[740px] h-[320px] text-3xl text-black text-center">
            {currentQuiz ? currentQuiz.question : "문제를 불러오는 중..."}
          </div>
        </div>

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
    </div>
  );
}
