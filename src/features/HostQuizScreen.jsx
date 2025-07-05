import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import logoImage from "../assets/img/BeezQuiz.svg";
import bgbgbg from "../assets/img/quizbgbgbg.svg";
import socket from "../socket";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default function HostQuizScreen() {
  const navigate = useNavigate();
  const { roomId: roomCode } = useParams();

  const [quizList, setQuizList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [submitCount, setSubmitCount] = useState(0);

  useEffect(() => {
    if (!roomCode || !API_BASE_URL) return;

    fetch(`${API_BASE_URL}/room/${roomCode}/questions`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data.questions)) {
          setQuizList(data.questions);
        } else {
          console.error("문제 형식이 올바르지 않습니다:", data);
          setQuizList([]);
        }
      });

    socket.on("submit-count", (count) => {
      setSubmitCount(count);
    });

    return () => {
      socket.off("submit-count");
    };
  }, [roomCode]);

  const handleNext = () => {
    const nextIndex = currentIndex + 1;
    if (nextIndex < quizList.length) {
      setCurrentIndex(nextIndex);
      socket.emit("next-question", { roomCode, nextIndex });
    } else {
      socket.emit("quiz-finished", roomCode);
      navigate(`/result/${roomCode}`);
    }
  };

  const currentQuiz = quizList[currentIndex];

  return (
    <div className="relative w-screen h-screen flex flex-col items-center justify-start pt-20">
      {/* 로고 (크기만 20vh로) */}
      <img
        src={logoImage}
        alt="Beez Quiz"
        className="absolute top-4 left-4 h-[20vh] select-none pointer-events-none"
      />

      {/* 문제 번호 (폰트 크기만 조정) */}
      <p className="absolute top-6 left-1/2 transform -translate-x-1/2 bg-black/40 text-white px-4 py-2 rounded text-[2rem] leading-[2rem] font-extrabold">
        {quizList.length > 0
          ? `${currentIndex + 1} / ${quizList.length}`
          : "문제 로딩 중..."}
      </p>

      {/* 제출 인원 (폰트 크기만 조정) */}
      <p className="absolute top-6 right-6 bg-black/40 text-white px-4 py-2 rounded text-[2rem] leading-[2rem] font-extrabold">
        제출: {submitCount}명
      </p>

      {/* 나머지 UI는 기존대로 유지 */}
      <div
        className="flex justify-center items-center w-[1000px] h-[500px] rounded-lg mt-[15vh]"
        style={{ backgroundImage: `url(${bgbgbg})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="w-[90%] h-[80%] text-3xl text-white text-left flex items-start justify-center pt-4">
          {currentQuiz ? currentQuiz.question : "문제를 불러오는 중..."}
        </div>
      </div>

      {quizList.length > 0 && (
        <button
          onClick={handleNext}
          className="mt-10 py-3 px-8 bg-yellow-400 rounded-lg text-xl font-semibold"
        >
          {currentIndex === quizList.length - 1
            ? "결과 확인하기"
            : "다음 문제"}
        </button>
      )}
    </div>
  );
}
